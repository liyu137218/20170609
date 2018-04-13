<template>
  <div id="NotFound" class="NotFound">
    <img src="../assets/newTips.png" alt="">
    <p>{{data}}</p>
  </div>
</template>
<script>
  export default {
    name: 'NotFound',
    data() {
      return {
        msg: 'this is NotFound',
        data: '新版正在拼命开发中…'
      }
    }
  }
</script>
<style lang="stylus">
  .NotFound {
    margin-top 100px
    p {
      font-size 14px
      padding 20px 0
      color #999999
    }
  }
</style>