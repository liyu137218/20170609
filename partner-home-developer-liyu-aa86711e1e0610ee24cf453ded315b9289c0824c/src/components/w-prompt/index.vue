<template>
  <div>
    <w-dialog
        v-model="showValue"
        :maskTransition="maskTransition"
        :dialogTransition="dialogTransition">
      <header class="wui-confirm-hd">
        <strong class="wui-confirm-title" v-if="!!title">{{title}}</strong>
        <button class="wui-confirm-colseBtn wui-iconfont icon-guanbi" @click="eventClickClose"></button>
      </header>
      <section class="wui-confirm-bd">
        <div v-if="type != 'text'" class="wui-confirm-bd-icon-con">
          <i :class="['wui-confirm-bd-icon','wui-iconfont', ' icon-' + type]"></i>

        </div>
        <slot>
          <div class="wui-confirm-bd-text" v-html="content"></div>
        </slot>
      </section>
    </w-dialog>
  </div>
</template>
<script>
  import WDialog from '../w-dialog'
  export default {
    components: {
      WDialog
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '提示'
      },
      maskTransition: {
        type: String,
        default: 'vuw-fade'
      },
      dialogTransition: {
        type: String,
        default: 'vuw-dialog'
      },
      content: String,
      type: {
        type: String,
        default: 'text'
      }
    },
    data () {
      return {
        showValue: this.value
      }
    },
    created () {
      console.log(this.title)
    },
    methods: {
      eventClickClose () {
        this.showValue = false;
        this.$emit('on_hideEvent')
      },
    }
  }
</script>
<style lang="stylus">
  @import "../../assets/styles/transition.styl";
  @import "../../assets/styles/wui/wuicompontent/wui_tips/wui_confirm.styl"
</style>