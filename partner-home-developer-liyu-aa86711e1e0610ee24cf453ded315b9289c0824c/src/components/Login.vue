<template>
  <div id="Login" class="Login">
    <iframe :src="src" frameborder="0"></iframe>
    <button class="l-close iconfont"
            @click="eventClickClose"
    >&#xe600;</button>
  </div>
</template>
<script>
  import errTips from '@/components/ErrorTips_Input'
  export default {
    name: 'Login',
    data() {
      return {
        msg: 'this is Login',
      }
    },
    computed: {
      src() {
        const mode = this.$store.state.showLoginOrRegistered;
        const target = this.$store.state.webUrl;
        if(mode !== 'LOGIN') {
          return `http://reg.hexun.com/rest/regbox.aspx?gourl=${target}`
        } else {
          return `http://reg.hexun.com/rest/loginbox.aspx?gourl=${target}`
        }
      }
    },
    methods: {
      r_userName(val) {
        console.log(val)
      },
      eventClickClose() {
        this.$store.commit('CLOSE_SLOR', false)
      }
    },
    components: {
      errTips,
    }
  }
</script>
<style lang="stylus">
  .Login {
    width: 558px;
    height: 400px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size 14px;
    padding-top 50px
    position relative
    iframe {
      width 100%
      height 100%
    }
    .l-close {
      position absolute
      top 20px
      right 20px
      cursor pointer
      background #fff
    }

  }
</style>