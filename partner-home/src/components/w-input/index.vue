<template>
  <div class="vuw-w-input wui-input-com">
    <w-label v-if="title" :icon="icon" :title="title"></w-label>
    <div :class="['wui-input-box', errorTips?'wui-input-box-error':'']">
      <input class="wui-input"
             v-if="inputType == 'text'"
             v-model="currentValue"
             :maxlength="max"
             :disabled="disabled"
             :placeholder="placeholderText"
             type="text">
      <input class="wui-input"
             v-if="inputType == 'number'"
             v-model="currentValue"
             :maxlength="max"
             :disabled="disabled"
             :placeholder="placeholderText"
             type="number">
      <p class="wui-input-error" v-if="errorTips">{{errorTips}}</p>
    </div>
    <div class="wui-input-tips" v-if="tips">
      {{tips}}
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script>
  import WLabel from '../w-label'
  export default {
    name: 'w-input',
    components: {
      WLabel
    },
    props: {
      value: {

      },
      title: String,
      icon: {
        type: Boolean,
        default: true,
      },
      placeholderText: String,
      tips: String,
      errorTips: String,
      max: Number,
      inputType: {
        String,
        default: 'text',
      },
      disabled: String
    },
    data () {
      return {
        currentValue: ''
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
      },
      currentValue (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
<style lang="stylus">
  @import "../../assets/styles/wui/wuicompontent/wui_input/wui_input.styl"
</style>