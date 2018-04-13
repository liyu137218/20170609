/*
 主要实现h5上传图片的功能 合作者入驻只支持单张上传，多张上传也是可以的，只是为了跟flash同步就，只要在html上加上multler就可以多张上传
 2017-1-06
 */
/**
 *  上传头像抓取cookie  其他地方不建议使用这个函数 直接使用jquery cookie 14kb
 */
var wCookie = {};

wCookie.Cookies = {
  gmt: 28800000,
  sw: function (st) {
    //时间转换
    var i = new String(st).length,
      sta = st.substring(1, i) * 1,//取数字
      stb = st.substring(0, 1);//取单位s\h\d
    switch (stb) {
      case 's':
        return sta * 1000;
        break;
      case 'h':
        return sta * 1000 * 60 * 60;
        break;
      case 'd':
        return sta * 1000 * 60 * 60 * 24;
        break;
    }
  },
  get2: function (key) {
    var key = ' ' + key;    //获取cookie时 浏览器会添加一个空格，匹配时需要添加上
    var arrStr = document.cookie.split(";"), temp = [], j = 0, n = 0;
    var reg = new RegExp('^(' + key + ')', 'ig');
    for (var i = 0; i < arrStr.length; i++) {
      if (reg.test(arrStr[i])) {
        n = arrStr[i].replace(key + '=', '');
        break;
      }
    }
    return n;
  },
  get: function (key) {
    var key = ' ' + key;    //获取cookie时 浏览器会添加一个空格，匹配时需要添加上
    var arrStr = document.cookie.split(";"), temp = [], j = 0;
    for (var i = 0; i < arrStr.length; i++) {
      temp.push(arrStr[i].split("="));
    }
    for (j = temp.length - 1; j > -1; j--) {
      if (key == temp[j][0]) {
        return temp[j][1];
      }
    }
  },
  set: function (key, value, time) {
    var strsec = cookies.sw(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + cookies.gmt + strsec * 1);
    document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
  },
  remove: function (key) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.get(key);
    if (cval) {
      document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
    }
  }
}

var H5_upload = function (userId) {
  // 上传默认
  this.size = 5000000; // 5M
  this.type = /.jpg|.gif|.png|.bmp/i;

  // 上传图片涉及的元素
  this.fileBtn = $('#file_upload');
  this.editor = $('#Editor');
  this.loading = $('#loading_pic');

  // 上传地址
  this.hostname = 'http://api.zhibo.hexun.com/';
  this.oringin = 'http://post.photo.hexun.com/Upload/UploadPhoto.aspx?encode=utf-8&type=4&extName=';
  this.url = this.hostname + 'user/upload/uploadimg?hxck_sq_common=' + this.common + '&userToken=' + this.token;

  // cookie
  this.common = wCookie.Cookies.get2('hxck_sq_common');
  this.SnapCookie = wCookie.Cookies.get('SnapCookie');
  this.LoginStateCookie = wCookie.Cookies.get('LoginStateCookie');
  this.userToken = wCookie.Cookies.get('userToken');


  // 当前要入驻的用户id
  this.userId = userId;

  // 失败时间，超过这个时间就取消上传,默认时间是5s
  this.timerCancel = 5000;
};

H5_upload.prototype = {
  init: function () {
    var _self = this;
    // this.fileBtn.on('change',function(){
    //   console.log(this);
    // 	_self.attributes(this);
    // });
  },
  attributes: function (tarObject) {
    return new Promise((resolve, reject) => {
      var _self = this, html, b_64, extName, errLength;
      //获取file对象
      for (var i = 0; i < tarObject.files.length; i++) {
        var t = tarObject.files[i].type;
        var s = tarObject.files[i].size;
        var n = tarObject.files[i].name;
        var c = tarObject.files[i].lastModifiedDate;
        var reader = new FileReader();
        this.onwitting();
        reader.readAsDataURL(tarObject.files[i]);
        errLength = _self.filter(t, s, n);
        //上传之前先检测，如果不符合条件就不走http,节约资源。这句话是真的吗？fuck!
        if (!errLength.length) return;
        var fd = new FormData();
        reader.onload = function (e) {
          b_64 = this.result.split(',')[1];
          extName = t.split('/')[1];

          fd.append('postStr', b_64);
          fd.append('userToken', _self.userToken);
          fd.append('userId', _self.userId);
          _self.tosend(b_64, extName, fd, function (u, pid) {
            // 原本打算添加删除图片的功能，但是没有实现，暂不做删除
            // html_0 = '<div class="wp_img" contenteditable=false; style="display:inline-block;max-width:210px;margin:2px; position:relative;" >\
            //                          <img src=\"' + u + '\" style="max-width:200px; contenteditable=false; display:inline-block;">\
            //                          <a id="' + pid + '" onClick="__deletepic(this)" contenteditable=false; class="cancel_img_btn" style="z-index:-1;cursor:pointer;position:absolute;width:30px;height:30px;background:#333;border-radius:100%;display:block;right:-15px;top:-15px;text-align:center;line-height:30px;color:#fff;font-weight:bold;">X</a>\
            //                        </div>';
            //
            // html_1 = '<img src=\"' + u + '\" style="max-width:200px; contenteditable=false; display:inline-block;margin:5px;">';
            // // 拿到图片后，先进行预加载
            // var img = new SImage(recallFn);
            // img.get(u);
            // function recallFn(obj) {
            //   var w = obj.width;
            //   var h = obj.height;
            //   $(html_1).appendTo(_self.editor);
            //   var t = _self.editor.scrollTop();
            //   setTimeout(function () {
            //     _self.editor.scrollTop(t + h);
            //   }, 50)
            // }
            _self.onfailure();
            resolve(u);
          })
        }

      }
    })

  },
  filter: function (file, dsize, name) {
    var _self = this, arrFiles = [];
    if (file.indexOf("image") == 0) {
      if (dsize >= _self.size) {
        Realert('您这张"' + name + '"图片不能超过5M')
      }
      else {
        arrFiles.push(file);
      }
    } else {
      Realert('文件"' + name + '"不是图片');
      _self.onfailure();
    }
    return arrFiles;
  },
  tosend: function (b, e, fd, fb) {
    var _self = this;

    $.ajax({
      url: _self.oringin + e,
      data: fd,
      type: 'POST',
      timeout: _self.timerCancel,
      crossDomain: true,
      processData: false,
      contentType: false,
      //xhrFields: {withCredentials: true},// 异步
    }).done(function (data) {
      var data = JSON.parse(data);
      if (data.code == 1) {
        fb(data.url, data.photoid);
      } else if (data.code == 0) {
        Realert('上传失败,请检查您的图片文件是否符合条件，如有问题可与和讯客服联系');
        _self.onfailure();
      } else {
        Realert('错误代码是：' + data.code + ' ;返回的错误原因是：' + data.msg);
        _self.onfailure();
      }
    })

  },
  onfailure: function () {
    this.loading.hide();
    this.fileBtn.attr('disabled', false);
    $('.btn_blue_radius120').css('background', '#3598db');
  },
  onwitting: function () {
    //等待载入gif动画
    this.loading.show();
    this.fileBtn.attr('disabled', true);
    $('.btn_blue_radius120').css('background', '#ccc');
  }

};
// 修复bug 由于在编辑器中 删除的是会删除--图片上的删除按钮
//
function __deletepic(o) {
  $(o).parent('.wp_img').remove();
};

/**
 image preloading
 **/
function SImage(callback) {
  var img = new Image();
  this.img = img;
  var appname = navigator.appName.toLowerCase();
  if (appname.indexOf("netscape") == -1) {
    //ie
    img.onreadystatechange = function () {
      if (img.readyState == "complete") {
        callback(img);
      }
    };
  } else {
    //firefox
    img.onload = function () {
      if (img.complete == true) {
        callback(img);
      }
    }
  }
}

SImage.prototype.get = function (url) {
  this.img.src = url;
}

window.H5_upload = H5_upload;


function Realert(text) {
  alert(text)
}