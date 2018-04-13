<template>
  <div class="HXPDOC">
    <input type="radio" checked="checked" id="hasRead">
    <label for="hasRead">我已阅读并同意<router-link to="/ServerDoc">《和讯合作者服务规范》</router-link></label>
  </div>
</template>
<script>
  export default{
    name: 'HXPDOC',
  }
</script>
<style lang="stylus">
  .HXPDOC {
    margin 20px
    display flex
    justify-content center
    align-items center
  }
</style>