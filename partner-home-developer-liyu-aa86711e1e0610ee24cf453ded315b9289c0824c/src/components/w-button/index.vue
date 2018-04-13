<template>
  <button class="vuw-button wui-button" :class="className" :style="cssStyle" @click="eventClick">
    <slot></slot>
  </button>
</template>
<script>
  export default {
    name: 'vuw-botton',
    props:{
      cssStyle: Object,
      className: String,
    },
    methods: {
      eventClick() {
        this.$emit('vuw-button-click')
      }
    }
  }
</script>
<style lang="stylus">
  @import "../../assets/styles/wui/wuicompontent/wui_button/wui_button.styl"
</style>