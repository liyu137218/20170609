<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>
    </div>
    <DialogModule v-show="isShowDialog"></DialogModule>
  </div>
</template>

<script>
  import DialogModule from '@/views/DialogModule'
  // import CommonHeader from '@/components/CommonHeader' // 顶部
  import IndexStatistics from '@/components/IndexStatistics'

  export default {
    name: 'app',
    computed: {
      isShowDialog() {
        return this.$store.state.isShowDialog;
      },
      route() {
        return this.$store.state.route;
      },
      pid() {
        return this.$store.state.partnerId;
      },
      nickName() {
        return this.$store.state.userInfo.nickname;
      }
    },
    watch: {
      route(newValue, oldValue) {
        // 路由切换
        this.dplus(newValue.name);
      }
    },
    components: {
      DialogModule,
    },
    methods: {
      dplus(name) {
        const nameList = {
          Index: '合作者管理后台首页',
          AllProductZbAndPx: '直播&培训',
          ManagementStudio: '工作室管理',
          ManagementBlackList: '黑名单管理',
          TGMyuser: '我的用户',
          TGMyzhangwu: '我的账务',
          ZhInfo: '账户信息',
          NewsCenter: '消息中心',
          WXGZSPZ: '微信工作室配置',
          AllProductArticleManagement: '文章管理',
          AllProductWeituo: '委托账户',
          TGMyFans: '我的粉丝'
        }

        if(nameList[name]) {
          dplus_Click("页面浏览", {
            "页面名称": nameList[name],
            "产品分类": "合作者后台",
            "所属平台": "基础平台",
            "合作者ID": this.pid,
            "合作者名称": this.nickName
          })
        }


      }
    },
     created() {

    },
    mounted() {
      this.$store.dispatch('CHECKOUT_USER');
      this.$store.dispatch('GET_PARTNER_ID').then(
        () => {
           // 页面刷新或者首次进入
           this.dplus(this.route.name);
        }
      )
    },
   
  }
</script>

<style lang="stylus">
  @import "assets/styles/common.styl";
  @import "assets/font/iconfont.css"


  #app {
    font-family: Microsoft YaHei
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
    background #f5f5f5
  }

</style>
