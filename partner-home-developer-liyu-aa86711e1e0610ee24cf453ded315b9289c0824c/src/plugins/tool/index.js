/**
 * Created by wuxingjiang on 2017/5/9.
 */

const MyPlugin = {};
 MyPlugin.install = function(Vue, options) {
  // 添加全局方法
  Vue.globalMethods = {
    getCookie(name){
      let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

      if(arr=document.cookie.match(reg)) {
        return unescape(arr[2]);
      }else {
        return null;
      }
    },
    delCookie(name) {
      let exp = new Date();
      exp.setTime(exp.getTime() - 1);
      let cval = this.getCookie(name);
      console.log(cval)

      if(cval!==null) {
        document.cookie= `${name}=''";expires=${exp.toGMTString()}`;
        console.log( this.getCookie(name))
      }
   }
 }
  Vue.prototype.$myPlugin = {
    /**
     * 将时间戳转成特定的格式
     * @param {*} timestamp 
     * @param {*} format 
     */
    format(timestamp, format = 'yyyy-MM-dd hh:mm') {
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
    },
    /**
     *  将时间转换特定的格式 
     * @param {*} timeStr 20150312112230 
     * @param {*} format 
     */
    splitTime(timeStr, format = 'YYYY-MM-DD hh:mm:ss') {
      timeStr = String(timeStr);
      let date = {
        "Y+": timeStr.substr(0, 4),
        "M+": timeStr.substr(4, 2),
        "D+": timeStr.substr(6, 2),
        "h+": timeStr.substr(8, 2),
        "m+": timeStr.substr(10, 2),
        "s+": timeStr.substr(12, 2),
      };

      for (let k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, date[k])
        }
      }
      return format;
    },
 }

}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MyPlugin);
}

export default MyPlugin;