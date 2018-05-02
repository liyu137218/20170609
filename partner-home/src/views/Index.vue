<template>
  <div id="Index" class="Index">
    <div class="section">
      <MenuBar></MenuBar>
      <div class="right">
        <Notice v-if="isShowSysNotice"></Notice>
        <router-view class="right-content"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import MenuBar from '@/components/MenuBar' // 右侧菜单
  import Notice from '@/components/Notice' // 通知

  export default {
    name: 'Index',
    computed: {
      isShowSysNotice() {
        return this.$store.state.isShowSysNotice && this.$route.name!== 'NewsCenter'
      },
    },
    components: {
      MenuBar,
      Notice,
    },
    data() {
      return {
        msg: 'this is Index'
      }
    },


  }
</script>
<style lang="stylus">
  .Index {
    /*display flex*/
    /*flex-direction column*/
    /*justify-content center*/
    /*align-items center*/

    display flex
    justify-content center
    align-items center
    flex-direction column
    padding-top 20px
    .section {
      width 1100px
      display flex
      >.right {
        flex 1
        display flex
        flex-direction column
        margin-left 10px
        width 790px;
        background #fff
        border-left 1px solid #e5e5e5
        border-right 1px solid #e5e5e5
        >.right-content {
          background #fff
          // flex 1


        }
      }
    }


  }
</style>
