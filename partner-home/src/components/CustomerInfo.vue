<template>
  <div id="CustomerInfo" class="CustomerInfo">
    <!--表格导航，调用公共导航组件-->
    <table-nav
        v-model="activeIndex"
        :tabNavs="tabNavs">
    </table-nav>
    <div class="content">
      <all-data v-if="activeIndex === 'allData'"></all-data>
      <!--折线图-->
      <line-chart v-else :key="activeIndex" :activeIndex="activeIndex"></line-chart>
    </div>
  </div>
</template>
<script>
  import AllData from '@/components/AllData.vue'
  import LineChart from '@/components/LineChart.vue'
  export default {
    name: 'CustomerInfo',
    data() {
      return {
        msg: 'this is CustomerInfo',
        activeIndex: 'allData', // 默认选择标签
        tabNavs:{ // 导航信息
          allData: '整体用户',
          periodUser: '在期用户',
          newUser: '新增用户',
          expiredUser: '到期用户',
          dueUser: '续费用户',
        }
      }
    },
    computed: {

    },
    components: {
      'all-data': AllData,
      'line-chart': LineChart,
    }

  }
</script>
<style lang="stylus">
  .CustomerInfo {
    .section {
    }
  }
</style>