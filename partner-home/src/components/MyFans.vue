<template>
  <div class="MyFans">
    <div class="m-overall">
      <p class="o-title">昨日关键指标</p>
      <ul class="o-con">
        <li class="c-list">
          <p class="l-top"><span class="l-t-number">{{fansYesterday.focus_count}}</span><span class="l-t-unit">人</span></p>
          <p class="l-bottom">新关注人数</p>
        </li>
        <li class="c-list">
          <p class="l-top"><span class="l-t-number">{{fansYesterday.cancel_count}}</span><span class="l-t-unit">人</span></p>
          <p class="l-bottom">取消关注人数</p>
        </li>
        <li class="c-list">
          <p class="l-top"><span class="l-t-number">{{fansYesterday.net_fans}}</span><span class="l-t-unit">人</span></p>
          <p class="l-bottom">净增关注人数</p>
        </li>
        <li class="c-list">
          <p class="l-top"><span class="l-t-number">{{fansYesterday.current_fans}}</span><span class="l-t-unit">人</span></p>
          <p class="l-bottom">累计关注人数</p>
        </li>
      </ul>
    </div>
    <div class="m-echar">
      <table-nav
          class="e-nav"
          v-model="activeIndex"
          :tabNavs="tabNavs">
      </table-nav>
      <div class="e-header">
        <!--<vs-select-->
            <!--class="h-vss"-->
            <!--v-model="select.value"-->
            <!--:options="select.options"-->
            <!--:diyStyle="select.style"-->
        <!--&gt;</vs-select>-->
        <date-select-group
            @click.native="eventClickInput"
            v-model="dateGroup"
            :dateOptionsStart="dateOptionsStart"
            :dateOptionsEnd="dateOptionsEnd"
            :split="'至'"
            :limitStart="limit"
            :limitEnd="limit"
        ></date-select-group>
        <span class="h-tip">
        最多显示365天数据
      </span>
        <cycle-label v-model="cycleValue" :list="cycleOptions" class="h-cycle" ></cycle-label>
      </div>

      <!--折线图-->
      <div id="echartsContainer" class="newUser">
        <div v-if="activeIndex == '1'">
          <e-chart :options = 'getEchartOptions' key="1"></e-chart>
        </div>
        <div v-if="activeIndex == '2'">
          <e-chart :options = 'getEchartOptions' key="2"></e-chart>
        </div>
        <div v-if="activeIndex == '3'">
          <e-chart :options = 'getEchartOptions' key="3"></e-chart>
        </div>
        <div v-if="activeIndex == '4'">
          <e-chart :options = 'getEchartOptions' key="4"></e-chart>
        </div>
      </div>
    </div>
    <div class="m-table">
      <date-select-group
          class="t-header"
          v-model="tableDate"
          :dateOptionsStart="dateOptionsStart"
          :dateOptionsEnd="dateOptionsEnd"
          :split="'至'"
          :limitStart="limit"
          :limitEnd="limit"
      ></date-select-group>
      <table-list
          class="t-section"
          :thead="true"
          :tableList="fansList"
          ></table-list>
      <uib-pagination
          v-if="this.totalItems > this.itemPerPage"
          class="t-footer"
          v-model="pagination"
          :total-items="totalItems"
          :itemsPerPage="itemPerPage"
          first-text="第一页"
          next-text="下一页"
          previous-text="上一页"
          last-text = "最后一页"
          :max-size = "7"
          :force-ellipses="true"
          :boundary-link-numbers="true"
      ></uib-pagination>
    </div>
  </div>
</template>
<script>
  import LineChart from '@/components/LineChart.vue'
  import VSelect from '@/components/Select.vue'
  import TableList from '@/components/TableList.vue'
  import {fetch} from '../store/fetch'
  const echarts = require('echarts');

  export default {
    name: 'MyFans',
    components: {
      'line-chart': LineChart,
      'vs-select': VSelect,
      'table-list': TableList
    },
    data() {
      return {
        fansYesterday:{
          focus_count : '--', //新粉丝
          cancel_count: '--', // 取消关注
          net_fans: '--', // 净增关注
          current_fans: '--', // 累计关注
        },
        // echart 时间
        dateGroup: {
          endTime: {
            time: ''
          },
          startTime: {
            time: ''
          }
        },
        // table 时间
        tableDate: {
          endTime: {
            time: ''
          },
          startTime: {
            time: ''
          }
        },
        // 展示的时间
        time: null,
        activeIndex: '1',
        tabNavs: {
          1: '新关注人数',
          2: '取消关注人数',
          3: '净增关注人数',
          4: '累计关注人数',
        },
        cycleValue: '',
        cycleOptions: {
          week: '周',
          halfMonth: '半月',
          month: '月',
        },
        fansListThead: [
          {
            date: '时间',
            focus_count : '新关注人数',
            cancel_count : '取消关注人数',
            net_fans : '净增关注人数',
            current_fans : '累计关注人数',
          }
        ],
        fansList: [],
        pagination: {

        },
        totalItems: 0,
        itemPerPage: 10,
        echartOption: null,
        echartData: [],
      }
    },
    watch: {
      activeIndex() {
        this.getEchartFans()
      },
      pagination(nal, oal) {
        if(oal.currentPage) {
          this.$store.dispatch('GET_PARTNER_ID').then(
            () => {
              this.getTableFans()
            }
          )

        }

        // 隐藏上一页 和下一页
        this.$el.getElementsByClassName('pagination-prev')[0].style.display = 'block';
        this.$el.getElementsByClassName('pagination-next')[0].style.display = 'block';
        if(nal.currentPage == 1) {
          this.$el.getElementsByClassName('pagination-prev')[0].style.display = 'none'
        }
        if(nal.currentPage == nal.numPages) {
          this.$el.getElementsByClassName('pagination-next')[0].style.display = 'none'
        }
      },
      cycleValue(val) {
        switch (val) {
          case 'week':
            this.setTime(7);
            break;
          case 'halfMonth':
            this.setTime(15);
            break;
          case 'month':
            this.setTime(30);
            break;
          default:
            break;
        }

      },
      dateGroup: {
        deep: true,
        handler(nal, oal){
          this.$store.dispatch('GET_PARTNER_ID').then(
            () =>{
              if(this.checkTime(nal, oal)) {
                this.time={
                  start: nal.startTime.time,
                  end: nal.endTime.time,
                };

                this.getEchartFans()
              }
            }
          )

        }
      },
      tableDate: {
        deep: true,
        handler (nal, oal) {
          this.$store.dispatch('GET_PARTNER_ID').then(
            () => {
              if(this.checkTime(nal, oal)) {
                this.getTableFans()
              }
            }
          )

        }
      }
    },
    computed: {
      dateOptionsStart() { // 开始时间选择器设置
        return ({
          type: 'day',
          format: 'YYYY-MM-DD',
          placeholder: this.defaultDate.startTime.time
        })
      },
      dateOptionsEnd() { // 结束时间选择器设置
        return({
          type: 'day',
          format: 'YYYY-MM-DD',
          placeholder: this.defaultDate.endTime.time,
        })
      },
      /*
       * 获取默认时间
       */
      defaultDate () {
        const timeStr = new Date().getTime();
        return {
          endTime: {
            time: this.$myPlugin.format(timeStr - 24 * 60 * 60 * 1000, 'yyyy-MM-dd')
          },
          startTime: {
            time: this.$myPlugin.format((timeStr - 365 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
          }
        }
      },
      limit () {
        return [{
          type: 'fromto',
          from: '1916-01-01',
          to: this.$myPlugin.format(new Date().getTime(), 'yyyy-MM-dd')
        }]
      },

      getEchartOptions () {
        if(this.time) {
          const data = this.echartData;
          const start = this.time.start;
          const end = this.time.end;
          const unit = parseInt(24*60*60*1000); // 一天的时间戳
          const formatArr = [];

          const delay = parseInt((Date.parse(new Date(end)) - Date.parse(new Date(start))) / unit);
          // 创建一个查询月数的空数组  safd
          const nullArr = new Array(delay + 1).toString().split(',');

          nullArr[0] = Date.parse(new Date(start));
          // 填充数组
          nullArr.forEach((item, index, array) => {
            if(index !== 0) {
              array[index] = array[index - 1] + unit;
            }
            formatArr.push( {
              time: this.$myPlugin.format(new Date(array[index]), 'yyyy-MM-dd'),
              defalut: 0
            })
          })


          // 匹配加入数据
          formatArr.forEach( (item) => {
            data.forEach((item2) => {
              if(item.time === item2.date) {
                item.defalut = item2.count
              }
            })

          })

          let x = formatArr.map((item) => {
            return item.time
          })

          let y = formatArr.map((item) => {
            return item.defalut
          })

          let option = {
            color: ['#3398DB'],
            tooltip: {
              trigger: 'item',
              backgroundColor: '#fff',
              textStyle: {
                color: '#979797',
              },
              extraCssText: 'text-algin: left',
              confine:true,
              formatter: (params) => {
                return `${this.tabNavs[this.activeIndex]}：${params.value}`
              }
            },
            dataZoom: [
              {
                type: 'slider',
                startValue: this.time.start,
                endValue: this.time.end,
                left: '10%',
                right: '10%'
              }, {
                type: 'inside',
              }
            ],
            grid: {
              left: '5%',
              right: '5%',
              bottom: '10%',
              containLabel: true,
            },
            xAxis: [
              {
                type: 'category',
                data: x,
                axisTick: {
                  alignWithLabel: true,
                },
                axisPointer: {
                  show: false,
//                tiggerTooltip: false,
                }

              },
            ],
            yAxis: [
              {
                type: 'value',
//              axisPointer: {
//                show: true,
//                tiggerTooltip: false,
//              }
              },
            ],
            series: [
              {
                name: '',
                type: 'line',
                stack: '',
                data: y,
                itemStyle: {
                  normal: {
                    color: 'rgb(108, 182, 245)'
                  }
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 1,
                      color: 'rgb(255, 255, 255)'
                    }, {
                      offset: 0,
                      color: 'rgb(108, 182, 245)'
                    }])
                  }
                },
              },
            ],
          };

          return option
        }

      }
    },
    methods: {
      checkTime (nal, oal) {
        const start = Date.parse(new Date(nal.startTime.time));
        const end = Date.parse(new Date(nal.endTime.time));
        const defaultTime = this.defaultDate;
        const defaultEnd = Date.parse(new Date(defaultTime.endTime.time));
        const unit = 24*60*60*1000; // 一天的毫秒

        // 所选择的时间是否大于今天
        const isBeyondend = end > defaultEnd || start > defaultEnd;


        if(isBeyondend) {
          this.$vuw.prompt.show(
            {
              content: '所选日期不能大于今日'
            }
          )
          return false;
        }

        if(start > end) { // 如果开始时间大于结束时间
          this.$vuw.prompt.show(
            {
              content: '开始日期不能大于结束日期'
            }
          )
          return false;
        }

        if(((end - start) / unit) > 365) { // 如果选择日期大于365天

          this.$vuw.prompt.show(
            {
              content: '选择日期不能大于365天'
            }
          )
          return false;
        }

        return true

      },
      eventClickInput () {
        this.cycleValue = ''
      },
      // 设置数据展示的时间段
      setTime(day) {
        const end = Date.parse(new Date(this.defaultDate.endTime.time))
        this.dateGroup= {
          endTime: {
            time: this.dateGroup.endTime.time
          },
          startTime: {
            time: this.$myPlugin.format(end - (day * 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
          }
        }
      },
      getFansYesterday () {
        fetch.getFansYesterday().then(
          (data)=> {
            this.fansYesterday = data
          }
        )
      },
      getTableFans () { // 获取表格用的信息
        const params = {
          from_date: this.tableDate.startTime.time , // 开始时间
          to_date: this.tableDate.endTime.time, // 结束时间
          page: this.pagination.currentPage || 1, // 当前页
          count: this.itemPerPage  // 每页数量
        }

        fetch.getTableFans(params).then(
          data => {
            console.log(data)
            this.totalItems = data.pager.total_rows
            this.fansList = this.fansListThead.concat(data.data.map((item) => {
              return {
                date: item.date,
                focus_count: item.focus_count,
                cancel_count: item.cancel_count,
                net_fans: item.net_fans,
                current_fans: item.current_fans,
              }
            }))

          }
        )

      },
      getEchartFans () {
        const params = {
          from_date: this.dateGroup.startTime.time || this.defaultDate.startTime.time, // 开始时间
          to_date: this.dateGroup.endTime.time || this.defaultDate.endTime.time, // 结束时间
          type: this.activeIndex
        }
        fetch.getFansStatistics(params).then(
          data => {
            this.echartData = data
          }
        )
      },

    },
    created () {
      this.dateGroup = {
        endTime: {
          time: this.defaultDate.endTime.time
        },
        startTime: {
          time: this.defaultDate.startTime.time
        }
      }

      this.tableDate = {
        endTime: {
          time: this.defaultDate.endTime.time
        },
        startTime: {
          time: this.defaultDate.startTime.time
        }
      }
      this.$store.dispatch('GET_PARTNER_ID').then(
        () => {
          this.getFansYesterday()
//          this.getEchartFans()
//          this.getTableFans()
        }
      )
    }
  }
</script>
<style lang="stylus">
  .MyFans {
    text-align left
    .m-overall {
      .o-title {
        color #808080
        padding 16px
        border-bottom 1px solid #e5e5e5
      }
      .o-con {
        display flex
        padding 32px 0
      }
      .c-list {
        flex 1
        text-align center
        border-right 1px solid #e5e5e5
        .l-top {
          color #ee5050
          .l-t-number {
            font-size 28px
          }
          .l-t-unit {
            font-size 16px
          }
        }
        .l-bottom {
          color #808080
        }
      }
      :last-child {
        border none
      }
    }

    .e-nav {
      /*width 550px*/
    }
    .e-header {
      display flex
      align-items center
      padding 20px
      position relative
      .h-tip {
        color #999
        margin-left 20px
        font-size 12px
      }
      .h-cycle {

        position absolute
        right 0
        top 27px
      }
      .h-vss {
        width 140px
        margin-right 20px
      }
    }
    .m-table {
      .t-header {
        padding-left 20px
      }
      .t-section {
        padding 20px 0

        :last-child {
          .t-c-text {
            justify-content center
          }
        }
      }
      .t-footer {
        padding-bottom 20px
      }
    }
  }
</style>