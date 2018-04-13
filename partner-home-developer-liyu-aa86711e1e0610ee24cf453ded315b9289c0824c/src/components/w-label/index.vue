<template>
  <div class="vuw-label wui-label" :style="cssStyle">
    <span class="wui-label-icon" v-if="icon">*</span><span>{{title}}</span>
  </div>
</template>
<script>
  export default {
    name: 'vuw-label',
    props: {
      title: String,
      icon: Boolean,
      cssStyle: Object,
    }
  }
</script>
<style lang="stylus">
  @import "../../assets/styles/wui/wuicompontent/wui_label/wui_label.styl"
</style>