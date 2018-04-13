/**
 * Created by wuxingjiang on 2017/8/25.
 */
import * as Browser from './browser.js';

const browser = new Browser.Browser();

console.log(browser)
if(browser.browser === 'IE' && parseFloat(browser.version )<= 9) {
  alert('当前浏览器版本过低，请升级到最新版本！')
}
