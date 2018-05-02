<template>
  <div id="Notice" class="Notice">
    <router-link to="/Index/NewsCenter" class="not-container">
      <img src="../assets/icon_laba.png" alt="">
      <span>您有{{total}}未读消息。</span>
    </router-link>
    <div class="closebtn" @click="eventCloseNotice">

    </div>

  </div>
</template>
<script>
  export default {
    name: 'Notice',
    data() {
      return {
        msg: 'this is Notice',
      }
    },
    computed: {
      total() {
        return this.$store.state.notice
      }
    },
    methods: {
      eventCloseNotice() {
        this.$store.commit('CLOSE_NOTICE')
      }
    },

  }
</script>
<style lang="stylus">
  .Notice {
    display flex
    justify-content space-between
    align-items center
    background #fff
    border solid 1px #e5e5e5
    height 40px
    line-height 40px
    padding 0 8px
    margin-bottom 10px;
    >.not-container {
      display flex
      justify-content space-between
      align-items center
      color #999999
      >img {
        padding-right 8px
      }
    }
    >.closebtn {
      height 26px
      width 26px
      background #e9e9e9
      border-radius 50%
      position relative
      cursor pointer
      /*overflow hidden*/
    }
    >.closebtn:after {
      content ' '
      position absolute
      top 0
      left 0
      display block
      width 3px
      height 32px
      background #b5b5b5
      transform scale(.5) rotate(45deg) translate(13px,-20px)
    }
    >.closebtn:before {
      content ' '
      position absolute
      top 0
      right  0
      display block
      width 3px
      height 32px
      background #b5b5b5
      transform scale(.5) rotate(135deg) translate(13px,20px)
    }
  }
</style>