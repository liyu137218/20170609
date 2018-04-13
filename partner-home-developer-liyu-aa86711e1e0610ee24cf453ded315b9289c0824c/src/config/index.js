/**
 * Created by wuxingjiang on 2017/5/9.
 */
const env = process.env.NODE_ENV;
const createconfig = () => {
  let _env = 'release';
  let host = { //线上
    env: 3,
    cmp: 'http://partner.px.hexun.com/', // 合作者后台
    live: 'http://api.zhibo.hexun.com/', // 直播后天
    webOld: 'http://zhibo.hexun.com', // 直播室
    web: 'http://partner.px.hexun.com/', // web前端
    apiopencd: 'http://apiopencd.hexun.com/', // 微吼
    apilesson: 'http://apilesson.hexun.com/',
    webUrl: 'http://partner.px.hexun.com/partner/home/index.html',
    weChat: 'http://wechat.hexun.com', // 微信项目
    lhjx: 'http://lhjx.hermes.hexun.com',// 量化精选
    caidao: 'http://apicaidao.hexun.com', // 财道
    caidaoweb: 'http://caidao.hexun.com',
    fans: 'http://followdata.zq.hexun.com',
    tg: 'http://tg.hexun.com', // 委托账户
    weituo: 'http://weituo.caidao.hexun.com/manager', // 新委托账户

  };
  if(env === 'development') { // 本地开发环境
    _env = 'development';
    host = {
      env: 1,
      cmp: 'http://test.partner.px.hexun.com/',
      live: 'http://test.api.zhibo.hexun.com/',
      web: 'http://www.hxcmp.hexun.com:9999/',
      webOld: 'http://test.zhibo.hexun.com',
      apiopencd: 'http://testapiopencd.hexun.com/', // 微吼
      apilesson: 'http://test.apilesson.hexun.com/',
      webUrl: 'http://www.hxcmp.hexun.com:9999/',
      weChat: 'http://test.wechat.hexun.com', // 微信项目
      lhjx: 'http://60.28.251.103:8083',
      caidao: 'http://test.apicaidao.hexun.com', // 财道
      caidaoweb: 'http://test.caidao.hexun.com',
      fans: 'http://testfollowdata.zq.hexun.com',
      tg: 'http://test.tg.hexun.com', // 委托账户
      weituo: 'http://test.weituo.caidao.hexun.com/manager/login.html', // 新委托账户
    }
  }
  if(window.location.hostname === 'test.partner.px.hexun.com') { // 测试环境
    _env = 'test';
    host = {
      env: 2,
      cmp: 'http://test.partner.px.hexun.com/',
      live: 'http://test.api.zhibo.hexun.com/',
      web: 'http://test.partner.px.hexun.com/',
      webOld: 'http://test.zhibo.hexun.com',
      apiopencd: 'http://testapiopencd.hexun.com/', // 微吼
      apilesson: 'http://test.apilesson.hexun.com/',
      webUrl: 'http://test.partner.px.hexun.com/partner/home/index.html',
      weChat: 'http://test.wechat.hexun.com', // 微信项目
      lhjx: 'http://60.28.251.103:8083',
      caidao: 'http://test.apicaidao.hexun.com', // 财道
      caidaoweb: 'http://test.caidao.hexun.com',
      fans: 'http://testfollowdata.zq.hexun.com',
      tg: 'http://test.tg.hexun.com', // 委托账户
      weituo: 'http://test.weituo.caidao.hexun.com/manager/login.html', // 新委托账户
    }
  }
  return host;
};

const config = createconfig();
export {config}