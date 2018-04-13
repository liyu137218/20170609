<template>
  <div id="TableNav" class="TableNav">
    <div class="a-t-nav" >
      <div
          :class="['a-t-n-content', value===key?'a-t-nav-active':'']"
          @click="eventTabChange(key)"
          v-for="(nav, key) in tabNavs">
        {{nav}}
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'TableNav',
    props: {
      tabNavs: {
        type: [Array, Object],
        required: true
      },
      value: {
        required: true
      }
    },
    data() {
      return {
        msg: 'this is TableNav'
      }
    },
    methods: {
      eventTabChange(key) {
        this.$emit('input', key)
      }
    }
  }
</script>
<style lang="stylus">
  .a-t-nav-active {
    border-top 1px solid rgba(233,93,80,1) !important
    color rgba(233,93,80,1)
    border-bottom 1px solid transparent !important
  }
  .TableNav {
    .a-t-nav {
      display flex
      align-items center
      justify-content space-between

    }
    .a-t-n-content:hover {
      @extend .a-t-nav-active
    }
    .a-t-n-content {
      flex 1
      height 40px
      display flex
      align-items center
      justify-content center
      border 1px solid rgba(229,229,229,1)
      border-left none
      cursor pointer
    }
    .a-t-nav-active {
      @extend .a-t-nav-active
    }
  }
</style>