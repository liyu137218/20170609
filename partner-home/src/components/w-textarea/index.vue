<template>
  <div class="vuw-textarea wui-textarea-con">
    <w-label v-if="title" :icon="icon" :title="title" :cssStyle="labelStyle"></w-label>
    <div>
      <div :class="['wui-textarea-box',errorTips?'wui-textarea-box-error':'']">
        <textarea
            v-model="currentValue"
            :placeholder="placeholderText"
            class="wui-textarea"
            :maxlength="max">

        </textarea>
        <p class="wui-textarea-error">{{errorTips}}</p>
      </div>
      <div class="wui-textarea-tips">
        <span class="wui-textarea-tips-label">已经输入了{{currentLength}}字</span>
        <span class="wui-textarea-max-string">字数：<i class="wui-textarea-max-number">{{max}}</i>之内</span>
      </div>
    </div>
  </div>
  
</template>
<script>
  import WLabel from '../w-label'
  export default {
    name: 'vuw-textarea',
    components: {
      WLabel
    },
    props: {
      value: String,
      title: String,
      icon: {
        type: Boolean,
        default: true,
      },
      max: {
        type: Number,
        default: 100,
      },
      placeholderText: String,
      errorTips: String,
    },
    data() {
      return {
        currentValue: '',
      }
    },
    computed: {
      labelStyle() {
        return {
          padding: '10px  10px 0 10px'
        }
      },
      currentLength() {
        return this.currentValue.length;
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
  @import "../../assets/styles/wui/wuicompontent/wui_textarea/wui_textatea.styl"
</style>