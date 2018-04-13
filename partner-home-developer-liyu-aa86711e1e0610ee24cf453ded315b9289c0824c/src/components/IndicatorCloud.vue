<template>
  <div id="IndicatorCloud" class="IndicatorCloud">
    <LabelNav
        @activeChange="activeChange"
        :activeIndex="activeIndex"
        :lists="lists">
    </LabelNav>
  </div>
</template>
<script>
  import LabelNav from '@/components/LabelNav'
  export default {
    name: 'IndicatorCloud',
    data() {
      return {
        msg: 'this is in',
        activeIndex: 'zhibiaoguanli',
        // lists: [
        //   {
        //     title: '指标管理',
        //     compontentName: 'zhibiaoguanli'
        //   },
        //   {
        //     title: 'A计划',
        //     compontentName: 'Ajihua'
        //   }
        // ]
      }
    },
    computed: {
       lists() {
        const Arr = [
          {
            title: '指标管理',
            compontentName: 'zhibiaoguanli'
          },
          {
            title: 'A计划',
            compontentName: 'Ajihua'
          }
        ]
        
        if(this.$store.state.userLevel !== 1) {
          Arr[1].title = 'A股雷达'
        }
        
        return Arr;
      }
    },
    methods: {
      activeChange(val) {
        if(val !== this.activeIndex) {
          this.activeIndex = val
        }

        switch(val) {
          case 'zhibiaoguanli':
            window.open('http://zhibiao.hexun.com/InventorManage/IndexManage')
            return;
          case 'Ajihua' :
            window.open('http://zhibiao.hexun.com/InventorManage/SendAPlan')
          default:
            return
        }
      },
     
    },
    components: {
      LabelNav,
    }
  }
</script>
<style lang="stylus">
</style>