<template>
  <div id="ErrorTips_Input" class="ErrorTips_Input">
    <svg v-if="errorMsg" class="icon" aria-hidden="true">
      <use xlink:href="#icon-icon52"></use>
    </svg>
    {{errorMsg}}
  </div>
</template>
<script>
  export default {
    name: 'ErrorTips_Input',
    props: {
      errorMsg: {
        type: String,
        default() {
          return '';
        }

      }
    },
    data() {
      return {
        msg: 'this is ErrorTips_Input'
      }
    },

  }
</script>
<style lang="stylus">
  .ErrorTips_Input {
    text-align left
    font-size 12px
    padding 3px 0
    height 22px
    box-sizing border-box
    svg {
      color #C60001
    }

  }
</style>