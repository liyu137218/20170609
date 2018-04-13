<template>
  <div id="CommonFooter" class="CommonFooter">
    <div class="conbg">
      <div class="wrap1000 f-pt20">
        <div class="modfx">风险提示</div>
        <p class="sty1">和讯公司系政府批准的证券投资咨询机构[ZX0005]。参阅本服务上所提供的资料及图表的人士，被视为已经理解并愿意自行承担投资服务的风险和损失。投资者依据本服务提供的信息、资料及图表进行金融、证券等投资项目所造成的盈亏与本网站无关。同时本网承诺诚信提供专业服务，不承诺投资者获取投资收益，也不与投资者约定分享投资收益或分担投资损失。本服务所提供的信息、资料及图表仅供参考，并不构成对任何股票的收购、购买、认购、抛售或持有的邀约或意图。</p>
      </div>
    </div>
    <div class="footerbg">
      <div class="wrap1000">
        投资学院恭候您的意见 - 联系我们 - 关于我们 - 广告服务<br>
        本站郑重声明：和讯网 北京和讯在线信息咨询服务有限公司所载文章、数据仅供参考，使用前请核实，风险自负。<br>
        [<a href="http://img.hexun.com/2015/company/ICP100713/index.html" target="_blank">京ICP证100713号</a>]  <a href="http://img.hexun.com/2012/company/0223/index.html" target="_blank">互联网新闻信息服务许可</a> <a href="http://img.hexun.com/2014/company/B220090331/index.html" target="_blank">增值电信业务经营许可证[B2-20090331]</a>　广告经营许可证[京海工商广字第0407号] <a href="http://img.hexun.com/2015/company/1110434/index.html" target="_blank">测绘资质证书[乙测资字1110434]</a><br>
        <a href="http://img.hexun.com/2015/company/0604/index.html" target="_blank">信息网络传播视听节目许可证：0109404号</a> <a href="http://img.hexun.com/2014/company/Broadcast707/" target="_blank">广播电视节目制作经营许可证（京）字第707号</a> [<a href="http://img.hexun.com/2014/company/JWW2014/index.html" target="_blank">京网文[2014]0945-245号</a>] <a href="http://img.hexun.com/2013/company/hlwyp.jpg" target="_blank">互联网药品信息服务资格证书</a><br>
        <img src="http://zb.hexun.com/static/images/ghs.png">&nbsp;<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11000002000026" target="blank">11000002000026号</a><br>
        Copyright©和讯网 北京和讯在线信息咨询服务有限公司 All Rights Reserved 版权所有 复制必究<br>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'CommonFooter',
    data() {
      return {
        msg: 'this is CommonFooter'
      }
    }
  }
</script>
<style lang="stylus">
  .CommonFooter {

    .wrap1000 {
      width: 1000px;
      margin: 0 auto;
    }
    .conbg {
      background: #eee;
      font:12px/22px "microsoft yahei"
    }
    .modfx {
      padding-left: 30px;
      background: url('../assets/icos_tips.png') no-repeat 0 0;
      color: #e74c3c;
      font-size: 18px;
      font-family: "microsoft yahei";
      line-height: 22px;
      vertical-align: top;
      text-align left
    }
    .sty1 {
      padding: 10px 0 25px;
      color: #999;
    }
    .footerbg {
      padding: 10px 0 20px;
      font:12px/22px 'microsoft yahei';
      background: #444;
      color: #999;
      text-align: center;
    }
    .footerbg a{color: #999;}
    .footerbg a:hover{text-decoration:none;}
    .f-pt20{padding-top:20px;}
  }
</style>