// JavaScript Document
function showBox(idname) {
  var isIE = (document.all) ? true : false;
  //var isIE6 = isIE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6);
  var isIE6 = isIE && ([/MSIE (\d+)\.0/i.exec(navigator.userAgent)][0][1] == 6); //¼æÈÝie10£¬IE10²»Ö§³Ö¼ì²âIE6µÄ´úÂë
  var newbox = document.getElementById(idname);
  newbox.style.zIndex = "8999";
  newbox.style.display = "block";
  if (!isIE6) {
    var mt, ml, t, l;
    mt = ($(window).height() - newbox.offsetHeight) / 2 + "px";
    ml = ($(window).width() - newbox.offsetWidth) / 2 + "px";

    $("#" + idname).css({ marginLeft: ml, marginTop: 0, left: 0, top: 0, opacity: "0" });
    $("#" + idname).animate({ marginLeft: ml, marginTop: mt, left: l, opacity: "1" }, 500)

  }
  var lay_l = $("#layer").length;
  var layer = $("#layer");
  if (lay_l == 0) {
    layer = $("<div/>");
    layer.attr("id", "layer");
    layer.css({ "width": "100%", "height": "100%", "top": "0", "left": "0" });
    layer.css("position", function () { return !isIE6 ? "fixed" : "absolute" });
    layer.appendTo("body");
    ishaslayer = true;
  }
  layer.css({ "background": "#000", "z-Index": "8998", "opacity": "0.7", "display": "" })
  var sel = document.getElementsByTagName("select");
  for (var i = 0; i < sel.length; i++) {
    sel[i].style.visibility = "hidden";
  }
  var nowsel = newbox.getElementsByTagName("select");
  for (var i = 0; i < nowsel.length; i++) {
    nowsel[i].style.visibility = "visible";
  }
  function layer_iestyle() {
    layer.style.width = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) + "px";
    layer.style.height = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) + "px";
  }
  if (isIE) {
    layer.style.filter = "alpha(opacity=70)";
  }
  if (isIE6) {
    layer_iestyle();
    window.attachEvent("onresize", layer_iestyle)
  }


}
function closeBox(boxId) {
  $("#" + boxId).animate({ marginTop: "0", top: "-50%", opacity: "0" }, 300, function () {
    $(this).hide();
    if ($("#layer").length > 0) {
      $("#layer").hide();
    }
  })

  //newbox.style.display = "none";
  var sel = document.getElementsByTagName("select");
  for (var i = 0; i < sel.length; i++) {
    sel[i].style.visibility = "visible";
  }
}

function h5CloseBox() {
  $('.d-wrapTc-div,.lottery-layer').css('display', 'none');
}

UserCenter().then(function (loginInfo) {
  var myCoupon = Vue.extend({
    name: 'js_myLottery',
    template: '#js_myLotteryTemplate',
    data: function () {
      return {
        pageConfig: {
          pageNum: 1,
          pageSize: 10
        },
        listData: [],
        lastPage: false,
        tc: null,
      }
    },
    computed: {
      api: function () {
        var _env = env();
        return {
          getList: _env.caidaoServer + '/lottery/win/list/',
          getAddress: _env.caidaoServer + '/lottery/address/my/',
          setAddress: _env.caidaoServer + '/lottery/address/update',
        }
      },
      isMobile: function () {
        return new Browser().device == 'Mobile'
      }
    },
    watch: {

    },
    methods: {
      getList: function () {
        var _this = this;
        var callback = function (res) {
          if (res.code == 0) {
            _this.lastPage = res.data.lastPage;
            _this.listData = _this.listData.concat(res.data.list.map(function (item) {
              if (_this.isMobile) {
                item.time = _this.dateFormat(item.winTime, 'yyyy-MM-dd hh:mm:ss')
              } else {
                item.time = _this.dateFormat(item.winTime, 'yyyy-MM-dd </br> hh:mm:ss')

              }
              return item;
            }))

            console.log(_this.listData)
          }
        }
        fetch(this.api.getList + this.pageConfig.pageNum + '/' + this.pageConfig.pageSize, callback)
      },
      loadMore: function () {
        if (this.lastPage) { // 如果是最后一页
          return false
        }
        this.pageConfig.pageNum++;
        this.getList();
      },
      showBox: function (domId, item) {
        var _this = this;
        var callback = function (res) {
          var params = {
            winId: item.id,
            receiveName: '',
            receivePhone: '',
            receiveAddress: ''
          }


          if (res.code == 0) {
            for (var p in params) {
              params[p] = res.data[p]
            }
          } else {

          }
          if (!_this.tc) {
            _this.tc = new Vue({
              el: '#' + domId,
              data: {
                data: params
              },
              methods: {
                setAddress: function () {
                  var telTest = /^1[0-9]{10}$/;

                  if (!this.data.receiveName) { // 如果姓名为空
                    alert('请输入真实姓名')
                    return false;
                  }
                  if (!telTest.test(this.data.receivePhone)) { // 如果姓名为空
                    alert('请输入正确电话号码')
                    return false;
                  }

                  if (!this.data.receiveAddress) { // 如果姓名为空
                    alert('请输入邮寄地址')
                    return false;
                  }

                  var _callback = function (res) {
                    alert(res.msg);
                    if (res.code == 0) {
                      _this.hidden(domId)
                    }
                  }
                  fetch(_this.api.setAddress, _callback, this.data)
                }
              },
              mounted: function () {
                console.log(this);
                _this.show(domId);

                this.$forceUpdate()
              }
            })
          } else {
            _this.tc.data = params;
            _this.show(domId);
          }

        }

        fetch(this.api.getAddress + item.id, callback)

      },
      show: function (domId) {
        if (this.isMobile) {
          this.h5Show();
        } else {
          showBox(domId);
          console.log('pc')
        }
      },
      hidden: function (domId) {
        if (this.isMobile) {
          h5CloseBox();
        } else {
          closeBox(domId);
        }
      },
      h5Show: function () {
        $('.d-wrapTc-div,.lottery-layer').css('display', 'block');
        $('.d-wrapTc-div').css('animation', 'mymovef 1s 1 alternate forwards')
      },
      h5Hidden: function () {
        $('.d-wrapTc-div,.lottery-layer').css('display', 'none');
      },
      dateFormat: function (timestamp, format) {
        const time = new Date(timestamp);
        let date = {
          "M+": time.getMonth() + 1,
          "d+": time.getDate(),
          "h+": time.getHours(),
          "m+": time.getMinutes(),
          "s+": time.getSeconds(),
          "q+": Math.floor((time.getMonth() + 3) / 3),
          "S+": time.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
          format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (let k in date) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
              ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
          }
        }
        return format;

      }
    },
    created: function () {
      this.getList();
    },
    mounted: function () {
      var _this = this;
      if (this.isMobile) {
        $(window).scroll(function () {
          if (ScrollFunc.getScrollTop() + ScrollFunc.getWindowHeight() == ScrollFunc.getScrollHeight()) {
            // 加载更多
            _this.loadMore()
          }
        })
      }
    }
  })

  new myCoupon().$mount('#js_myLottery')
})


  // 渲染

