// (function (window) {
//   // 获取 wangEditor 构造函数和 jquery
//   var E = window.wangEditor;
//   var $ = window.jQuery;
//
//   E.createMenu(function (check) {
//     var menuId = 'upImg';
//
//     if(!check(menuId)) {
//       return;
//     }
//
//     var editor = this;
//
//     var menu = new E.Menu({
//       editor: editor,
//       id: menuId,
//       title: '图片',
//
//       // 正常状态和选中装下的dom对象，样式需要自定义
//       $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-omega"></i></a>'),
//       $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-omega"></i></a>')
//     })
//
//     $container.on('click', 'a', function (e) {
//       console.log('dsds')
//     })
//
//     // 添加panel
//     menu.dropPanel = new E.DropPanel(editor, menu, {
//       $content: $container,
//       width: 350
//     });
//
//     // 增加到editor对象中
//     editor.menus[menuId] = menu;
//   })
// })(window);

const upImg = {
  init: function (pid) {
    // 获取 wangEditor 构造函数和 jquery
    var E = window.wangEditor;
    var $ = window.jQuery;

    E.createMenu(function (check) {
      var menuId = 'upImg';

      if (!check(menuId)) {
        return;
      }

      var editor = this;

      var menu = new E.Menu({
        editor: editor,
        id: menuId,
        title: '图片',

        // 正常状态和选中装下的dom对象，样式需要自定义
        $domNormal: $('<a href="#" tabindex="-1"><label for="blog_file_upload" class="wangeditor-menu-img-picture"></label><input id="blog_file_upload" type="file" style="display: none"></a>'),
        $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-picture"></i></a>')
      })

      // 菜单正常状态下，点击将触发该事件
      menu.clickEvent = function (e) {
        // console.log('dd')
        var $inputObj = $('#blog_file_upload');
        $inputObj.val('');//清除原來選擇的文件
        $inputObj.off().on('click', function (e) {
          e.stopPropagation();

          // input file
        }).on('change', function (e) {
          // 优化开始   读取图片等待的动画 未完成
          var reader = new FileReader();
          reader.readAsDataURL(document.getElementById("blog_file_upload").files[0]); //发起异步请求
          reader.onloadstart = function () {
            // console.log('start');  //开始读取
            // 这里可以让等待动画出现
          };
          // <img src="http://test.caidao.hexun.com/toolbar/img/onload.gif">
          //为文件读取成功设置事件
          reader.onload = function (e) {
            // console.log('文件读取完成');
          };
          reader.onabort = function () {
            alert("图片读取阻断,请稍后再试")
          }
          reader.onerror = function () {
            alert("图片读取错误,请稍后再试")
          }
          reader.onprogress = function () {
            // 读取文件等待
            // console.log("onprogress 周期")
          }
          reader.onloadend = function () {
            // console.log('end');  //读取结束
            // 这里可以让等待动画消失
          }
          // 优化结束
          e.stopPropagation();
          let h5 = new H5_upload(pid);
          h5.init();
          h5.attributes(event.target).then(
            res => {
              editor.command(event, 'insertHtml', `<img src="${res}" />`);
            }
          )
        });

        $('#blog_file_upload').trigger('click');
      };
      // 增加到editor对象中
      editor.menus[menuId] = menu;
    })
  }
}

export default upImg


// WEBPACK FOOTER //
// src/libs/upImg.js
