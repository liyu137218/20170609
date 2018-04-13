<template>
  <div class="MoreStockmenu">
    <iframe v-if="partnerLevel !== 3" :src="iframeSrc" frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  name: 'MoreStockmenu',
  computed: {
    iframeSrc() {
        let src = 'partner/lhjxbeta/shares_pool.html'
        if(this.config.env != 3) {
          src = 'partner/lhjx/shares_pool.html'
        }
        return `${this.$store.state.config.cmp}${src}?${(new Date()).getTime()}`
    },
    partnerLevel () {
      return this.$store.getters.partnerLevel
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
