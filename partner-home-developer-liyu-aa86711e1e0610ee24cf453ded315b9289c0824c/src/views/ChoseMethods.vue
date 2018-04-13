<template>
  <div id="ChoseMethods" class="ChoseMethods">
    <!-- <div class="cho-container">
      <header class="head">选择发起方式</header>
      <section class="section">
        <div class="item">
          <div class="item-img" @click="eventChose('app')">
            <img v-if="chose==='app'" src="../assets/methods_06.jpg" alt="">
            <img v-else src="../assets/methods_03.jpg" alt="">
          </div>
          <h3 class="item-title">直播助手发起</h3>
          <p class="item-desc">功能更为强大，支持多种视频采集卡
            <br/>拥有共享桌面、插入视频等功能</p>
        </div>
        <div class="item">
          <div class="item-img" @click="eventChose('web')">
            <img v-if="chose === 'web'" src="../assets/methods_12.jpg" alt="">
            <img v-else src="../assets/methods_08.jpg" alt="">
          </div>
          <h3 class="item-title">网页发起</h3>
          <p class="item-desc">一键发起直播无需安装任何直播插件</p>
        </div>
      </section>
      <footer class="footer">
        <button @click="eventGoLive" :class="['btn', btnDisAbled? 'btnDisabled':'']">
          发起直播
        </button>
        <p class="desc">
          如果启动不成功,您可能没有安装最新版本的和讯直播助手， 点击此处 <a target="_blank" href="http://cnstatic01.e.vhall.com/upload/assistant/file_url/e7/cd/VhallTool.exe">下载最新版本和讯直播助手</a>， 安装后如果无法启动
          <br/> 请拨打客服电话010-85697400 服务时间：工作日9：00-18：00
        </p>
      </footer>
    </div> -->
    <!-- new add 20180205 by TinaGao-s -->
    <div class="inBoxcon clearfix">
      <div class="inBoxl">
        <p>多媒体互动直播</p>
        <p><a class="inbtn-qd" @click="eventGoLive()">点击启动</a></p>
      </div>
      <div class="inBoxr">
        <p>启动不成功？可能您还没有安装最新版本的和讯直播助手。
          <br/>请按以下步骤进行安装：</p>
        <p class="i-mt20"><span class="i-c">1</span><a class="a-dj" href="http://cnstatic01.e.vhall.com/upload/assistant/file_url/e7/cd/VhallTool.exe" target="_blank">下载和讯直播助手</a></p>
        <p class="i-mt20"><span class="i-c">2</span>安装和讯助手</p>
        <p class="i-mt20"><span class="i-c">3</span>重新点击“<a class="a-dj" @click="eventGoLive()">点击启动</a>”按钮</p>
        <p class="i-mt20">安装后如果无法启动，请拨打客服电话：<i class="n-num">010-85697400</i>
          <br/>服务时间：工作日<i class="n-num">09：00 - 18：00</i></p>
      </div>
    </div>
    <!-- new add 20180205 by TinaGao-s -->
  </div>
</template>
<script>
export default {
  name: 'ChoseMethods',
  data() {
    return {
      msg: 'this is ChoseMethods',
      chose: 'app',
      urlData: '',
      type: '',
      id: ''
    }
  },
  // computed: {
  //   btnDisAbled() {
  //     if ((this.chose === 'app' && this.urlData) || this.chose === 'web') {
  //       return false
  //     } else {
  //       return true
  //     }
  //   }
  // },
  watch: {

  },
  methods: {
    // eventChose(val) { // this.chose = val // },

    eventGoLive() {
      // if (!this.btnDisAbled) {

        console.log('點擊启动:',this,this.$store.state.isTest)
        console.log(`http://${this.$store.state.isTest?'test':''}lesson.hexun.com/web/record.html?classId=${this.id}`)
      switch (this.chose) {
        case 'app':
          //              window.open(this.urlData);
          /*20180308 恢复20180302修改前
          if(parseFloat(this.$router.currentRoute.query.classSource)==2 && this.$router.currentRoute.query.PriceID){//展视
            window.open(`http://${this.$store.state.isTest?'test':''}lesson.hexun.com/web/record.html?classId=${this.id}`)
            //window.open(`http://vip.hexun.com/viproom/video/transit.aspx?PriceID=${this.$router.currentRoute.query.PriceID}`)
          }else{
            let iframe = document.createElement('iframe');
            iframe.src = this.urlData;
            iframe.style.display = "none";
            document.body.appendChild(iframe);
          }*/
          let iframe = document.createElement('iframe');
                      iframe.src = this.urlData;
                      iframe.style.display = "none";
                      document.body.appendChild(iframe);
          return;
        case 'web':
          if (this.type === 'lesson') {
            window.open(`http://${this.$store.state.isTest?'test':''}lesson.hexun.com/web/record.html?classId=${this.id}`)
          } else {
            window.open(`http://bo.caidao.hexun.com/video/edit.html`)
          }
          return;
        default:
          return;
      }
      // }
    },
    getUrlData(params) {
      if(parseFloat(this.$router.currentRoute.query.classSource)==2 && this.$router.currentRoute.query.PriceID)return;//20180305 判断如果是展视直播过来的,则不发以下请求
      this.$store.dispatch('GET_WEIHOU_URL', params).then(
        res => {
          this.urlData = res
        }
      )
    }

  },
  created() {
    this.$store.dispatch('GET_PARTNER_ID').then(
      () => {
        if (this.$router.currentRoute.query.webinarId) {
          this.id = this.$router.currentRoute.query.webinarId;
          const params = {
            webinarId: this.id,
            type: 'caibo'
          };
          this.type = 'caibo';
          this.getUrlData(params)
        }

        if (this.$router.currentRoute.query.classId) {
          this.id = this.$router.currentRoute.query.classId;
          const params = {
            id: this.id,
            type: 'course'
          };
          this.type = 'lesson';

          this.getUrlData(params)
        }
      }
    );

  }
}

</script>
<style lang="stylus">
      .inBoxcon {
        padding: 100px 80px 70px 80px;
        overflow: hidden;
        width: 1020px;
        margin: 0 auto;
        font-family: 'microsoft yahei';
        background: #fff;
      }
      .inBoxl {
        float: left;
        padding-top: 80px;
        width: 446px;
        height: 230px;
        font-size: 16px;
        line-height: 200%;
        color: #000;
        background: url(http://test.partner.px.hexun.com/partner/home/img/timg.jpg) no-repeat 0 0;
        text-align: center;
      }
      .inBoxl a {
        cursor: pointer;
      }
      .inbtn-qd {
        margin-top: 30px;
        display: inline-block;
        width: 130px;
        height: 42px;
        font: 16px/42px 'microsoft yahei';
        color: #fff;
        background: #ee504f;
        -webkit-border-radius: 42px;
        -moz-border-radius: 42px;
        -ms-border-radius: 42px;
        -o-border-radius: 42px;
        border-radius: 42px;
        text-align: center;
        text-decoration: none;
      }
      .inBoxr {
        float: right;
        /*margin-left: 73px;*/
        width: 400px;
        height: 300px;
        padding-left: 100px;
        border-left: solid 1px #f3f3f3;
        color: #777;
        font-size: 14px;
        line-height: 200%;
        text-align: left !important;
      }

      .i-c {
        display: inline-block;
        margin-left: 20px;
        margin-right: 20px;
        width: 20px;
        height: 20px;
        font-family: 'arial';
        font-size: 12px;
        line-height: 20px;
        color: #fff;
        background: #ee504f;
        text-align: center;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        -ms-border-radius: 50%;
        -o-border-radius: 50%;
        border-radius: 50%;
      }
      .a-dj {
        font: 14px/200% 'microsoft yahei';
        color: #ee504f;
        text-decoration: underline !important;
        cursor: pointer;
      }
      .n-num {
        font-family: 'arial';
        font-style: normal;
      }
      .inBoxr p {
        margin: 0;
        padding: 0;
      }
      .inBoxr p.i-mt20 {
        margin-top: 20px;
      }

      </style>
