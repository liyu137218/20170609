<template>
  <div id="LabelNav" class="LabelNav">
    <div
        v-for="item in lists"
        @click="eventChange(item.compontentName)"
        :class="['item',item.compontentName === activeIndex?'item-active':'']">
      {{item.title}}
    </div>
  </div>
</template>
<script>
  export default {
    name: 'LabelNav',
    props: {
      lists: {
        type: Array,
        required: true
      },
      activeIndex: null
    },
    data() {
      return {
        msg: 'this is LabelNav',
      }
    },
    methods: {
      eventChange(val) {
        this.$emit('activeChange',val)
      }
    }
  }
</script>
<style lang="stylus">
  .LabelNav {
    display flex
    height 46px
    align-items center
    border-bottom 1px solid #dadada
    >.item {
      position relative
      padding 0 15px
      border-right 1px solid #d2d2d2
      color #666666
      cursor pointer

    }
    >.item-active {
      color #e74c3c
    }
    >.item-active:after {
      content ' '
      position absolute
      left 0
      width 100%
      display block
      height 1px
      background red
      bottom -13px
    }
    >.item:last-child {
      border none
    }
  }
</style>