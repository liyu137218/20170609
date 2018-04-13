<template>
  <p class="wui-title-name" :style="cssStyle">
    <slot></slot>
  </p>
</template>
<script>
  export default {
    name: 'ListTitle',
    props: {
      cssStyle: Object,
    },
  }
</script>
<style lang="stylus">
  @import "../../assets/styles/wui/wuicompontent/wui_title/wui_title.styl"

</style>