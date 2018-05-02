<template>
  <div class="vuw-w-dialog">
    <transition :name="maskTransition">
      <div class="wui-mask" v-show="currentValue"></div>
    </transition>
    <transition :name="dialogTransition">
      <div class="wui-dialog" v-show="currentValue" :style="dialogStyle">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'vuw-mask'
    },
    dialogTransition: {
      type: String,
      default: 'vuw-dialog'
    },
    dialogStyle: Object
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val
      },
      immediate: true
    },
    currentValue (val) {
      this.$emit(val ? 'on-show' : 'on-hide')
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="stylus">
@import "../../assets/styles/transition.styl";
@import "../../assets/styles/wui/wuicompontent/wui_tips/wui_mask.styl"
@import "../../assets/styles/wui/wuicompontent/wui_tips/wui_dialog.styl"
</style>