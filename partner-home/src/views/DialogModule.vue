<template>
  <div id="DialogModule" class="DialogModule">
    <Login v-if="isLogin"></Login>
    <ErrorTipsDialog v-show="sysError"></ErrorTipsDialog>

  </div>
</template>
<script>
  import Login from '@/components/Login'
  import ErrorTipsDialog from '@/components/ErrorTipsDialog'
  export default {
    name: 'DialogModule',
    data() {
      return {
        msg: 'this is DialogModule',
        show: true,
      }
    },
    created() {
      console.log(this.data)
    },
    computed: {
      isLogin() {
        return this.$store.state.showLoginOrRegistered;
      },
      sysError() {
        return this.$store.state.sysError;
      }
    },
    components: {
      Login,
      ErrorTipsDialog,
    }
  }
</script>
<style lang="stylus">

  .DialogModule {
    width: 100%;
    height: 100%;
    position: fixed;
    top 0
    left 0
    background: rgba(1,1,1,.3);
    display flex
    justify-content center
    align-items center
    z-index 99999999

    .v-dialog {
      background #fff
    }
  }
</style>
