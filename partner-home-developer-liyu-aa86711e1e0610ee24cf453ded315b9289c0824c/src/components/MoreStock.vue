<template>
  <div class="MoreStock">
    <iframe v-if="partnerLevel !== 3" :src="iframeSrc" frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  name: 'MoreStock',
  computed: {
    iframeSrc() {
      let src = 'partner/lhjx/index.html'
      if(this.config.env != 3) {
        src = 'partner/lhjx/shares_pool.html'
      }
      return `${this.$store.state.config.cmp}${src}`
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
  .MoreStock {
    margin: 0 auto;
    margin-top: 20px;
    height 1400px

    iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>