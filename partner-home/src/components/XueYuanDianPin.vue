<template>
  <div class="MoreStockmenu">
    <iframe v-if="partnerLevel !== 3 " :src="iframeSrc" frameborder="0"></iframe>
    <div v-if="config.env == 3">正在建设中....</div>
  </div>
</template>
<script>
export default {
  name: 'XueYuanDianPin',
  computed: {
    iframeSrc() {
        let src = '';//正式环境
        if(this.config.env != 3) {
          src = 'http://test.wechat.hexun.com/temp/fund_teach/fund_teach.html'
        }
        return `${src}?${(new Date()).getTime()}`
    },
    partnerLevel () {
      return 0;//this.$store.getters.partnerLevel
    },
    config() {
      return this.$store.state.config
    }
  }
}
</script>
<style lang="stylus">
  .MoreStockmenu {
    margin: 0 auto;
    margin-top: 20px;
    height 1400px

    iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>
