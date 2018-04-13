<template>
  <div id="AllData" class="AllData">
    <header class="all-head">整体数据<span class="all-head-icon">?</span></header>
    <div class="all">
      <div ref="echartsContainer" class="all-left">
        <e-chart key="allData"
                 :styles = "{height: '300px', width: '500px'}"
                 :options = "options"
        ></e-chart>
      </div>
      <div class="all-right">
        <div class="all-right-list all-right-list-top"><p class="all-right-list-title">目前在期学员</p>
          <p class="all-right-list-number">
            {{serverData.userCount || '0' }}
          </p>
        </div>
        <div class="all-right-list all-right-list-center"><p class="all-right-list-title">昨日总新增用户</p>
          <p class="all-right-list-number">
            {{serverData.buyUserCount || '0'}}
          </p>
        </div>
        <div class="all-right-list all-right-list-bottom"><p class="all-right-list-title">昨日新增付费用户</p>
          <p class="all-right-list-number">
            {{serverData.newBuyUserCount || '0'}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'AllData',
    data() {
      return {
        msg: 'this is AllData',
        // userCount: 50,
        // buyUserCount: 200,
        // newBuyUserCount: 300,
      }
    },
    computed: {
      serverData() {
        let data = this.$store.state.myUserAllData
        if(!data) {
          data = {
            userCount: '0',
             buyUserCount: '0',
             newBuyUserCount: '0',
          }
        }
        return data;

      },
      options() {
        const myUserAllData = this.serverData;

        return {
          tooltip: {
            trigger: 'item',
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: ['目前在期学员', '昨日总新增用户', '昨日新增付费用户'],

          },
          yAxis: [
            {
              type: 'value',
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#eeeeee',
                  type: 'dashed',
                },
              },
            },
          ],
          series: {
            type: 'bar',
            data: [
              {
                name: '目前在期学员',
                value: myUserAllData.userCount,
                itemStyle: {
                  normal: {
                    color: '#6cb6f5',
                  },
                },
              },
              {
                name: '昨日总新增用户',
                value: myUserAllData.buyUserCount,
                itemStyle: {
                  normal: {
                    color: '#f7b547',
                  },
                },
              },
              {
                name: '昨日新增付费用户',
                value: myUserAllData.newBuyUserCount,
                itemStyle: {
                  normal: {
                    color: '#f88a6f',
                  },
                },
              },
            ],
          },
        }
      }
    }
  }
</script>
<style lang="stylus">
  .AllData {
    padding 0 20px
    .all {
      width: 100%;
      height: 100%;
    }

    .all-head {
      height: 60px;
      line-height: 60px;
      vertical-align: middle;
      text-align left
    }

    .all-head .all-head-icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      background-color: #2c9cde;
      vertical-align: middle;
      color: white;
      margin-left: 10px;
    }

    .all-left {
      float: right;
      /*border: 1px solid red;*/
      width: 520px;
      height: 300px;
      position: relative;
    }

    .all-right {
      width: 210px;
      text-align: center;
    }

    .all-right .all-right-list {
      width: 100%;
      height: 90px;
      margin: 10px 0;
    }

    .all-right .all-right-list-title {
      font-size: 12px;
      color: #999999;
      padding-top: 20px;
      margin: 0;
    }

    .all-right .all-right-list-number {
      font-size: 24px;
      padding-top: 12px;
      margin-bottom: 0 ;
    }

    .all-right .all-right-list-top {
      background-color: #f0f8fe;
    }

    .all-right .all-right-list-center {
      background-color: #fef7ec;
    }

    .all-right .all-right-list-bottom {
      background-color: #fef3f0;
    }
  }
</style>