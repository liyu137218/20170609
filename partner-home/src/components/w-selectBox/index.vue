<template>
  <div class="vuw-w-selectBox wui-select-box">
    <div :class="['wui-select-outline', disabled?'wui-select-innerline-disabled':'']" @click="eventClick">
      <div :class="['wui-select-innerline',
        currentValue?'wui-select-innerline-active':'']"></div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
  export default{
    name: 'w-selectBox',
    props: {
      value: Boolean,
      disabled: String
    },
    data () {
      return {
        currentValue: this.value,
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
      },
      currentValue (val) {
        this.$emit('input', val)
      }
    },
    methods: {
      eventClick() {
        this.currentValue = !this.currentValue
      }
    }
  }
</script>
<style lang="stylus">
  @import "../../assets/styles/wui/wuicompontent/wui_selectBox/wui_selectBox.styl"
</style>