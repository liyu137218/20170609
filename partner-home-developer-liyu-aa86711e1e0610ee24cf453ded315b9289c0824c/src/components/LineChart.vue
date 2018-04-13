<template>
  <div id="LineChart" class="LineChart">
    <header class="p-header">
      <vs-select
          v-if="activeIndex === 'newUser'"
          v-model="selectValue"
          :options="selectOptions"
          :diyStyle="selectStyle"
      ></vs-select>
      <date-select-group
          v-model="dateGroup"
          :dateOptionsStart="dateOptionsStart"
          :dateOptionsEnd="dateOptionsEnd"
          :split="'至'"
      ></date-select-group>
      <span class="p-h-tips">
        最多显示365天数据
      </span>
      <cycle-label class="p-h-label" v-model="cycleValue" ></cycle-label>
    </header>
    <div id="echartsContainer" class="newUser">
      <e-chart
          :options="options"></e-chart>
    </div>
  </div>
</template>
<script>
  import VSelect from '@/components/Select.vue'
  const echarts = require('echarts');
  export default {
    name: 'LineChart',
    props: ['activeIndex'],
    // 实例属性
    data() {
      return {
        msg: 'this is PeriodUser',
        // 是否是特殊账户
        isSpecialAccount: false,
        serverData: {
          time: [],
          data: [],
        },
        initTime: { // 用于判断是否重新请求数据
          start: '',
          end: '',
        },
        dateGroup: { // 用于时间选择插件
          endTime: {
            time: ''
          },
          startTime: {
            time: ''
          }
        },
        time: { // 用于更新echart绘图
          start: '',
          end: '',
        },
        selectValue: '0',
        selectOptions: [
          {
            id: 0,
            name: '全部'
          },
          {
            id: 4,
            name: '月'
          },
          {
            id: 2,
            name: '半年'
          },
          {
            id: 1,
            name: '年'
          },
        ],
        selectStyle: {
          width: '80px',
          height: '36px',
          margin: '0 10px 0 0'
        },
        cycleValue: 'year'
      }
    },
    // 实例计算属性
    computed: {
      dateOptionsStart() { // 开始时间选择器设置
        return ({
          type: 'day',
          format: 'YYYY-MM-DD',
          placeholder: this.dateGroup.startTime.time
        })
      },
      dateOptionsEnd() { // 结束时间选择器设置
        return({
          type: 'day',
          format: 'YYYY-MM-DD',
          placeholder: this.dateGroup.endTime.time,
        })
      },
//      data() {
//        const arr = new Array(365).toString().split(',');
//        return arr.map((val) => parseInt(Math.random() * 100))
//      },
//      year() {
//        return ('2000-06-05,2000-06-06,2000-06-07,2000-06-08,2000-06-09,2000-06-10,2000-06-11,2000-06-12,2000-06-13,2000-06-14,2000-06-15,2000-06-16,2000-06-17,2000-06-18,2000-06-19,2000-06-20,2000-06-21,2000-06-22,2000-06-23,2000-06-24,2000-06-25,2000-06-26,2000-06-27,2000-06-28,2000-06-29,2000-06-30,2000-07-01,2000-07-02,2000-07-03,2000-07-04,2000-07-05,2000-07-06,2000-07-07,2000-07-08,2000-07-09,2000-07-10,2000-07-11,2000-07-12,2000-07-13,2000-07-14,2000-07-15,2000-07-16,2000-07-17,2000-07-18,2000-07-19,2000-07-20,2000-07-21,2000-07-22,2000-07-23,2000-07-24,2000-07-25,2000-07-26,2000-07-27,2000-07-28,2000-07-29,2000-07-30,2000-07-31,2000-08-01,2000-08-02,2000-08-03,2000-08-04,2000-08-05,2000-08-06,2000-08-07,2000-08-08,2000-08-09,2000-08-10,2000-08-11,2000-08-12,2000-08-13,2000-08-14,2000-08-15,2000-08-16,2000-08-17,2000-08-18,2000-08-19,2000-08-20,2000-08-21,2000-08-22,2000-08-23,2000-08-24,2000-08-25,2000-08-26,2000-08-27,2000-08-28,2000-08-29,2000-08-30,2000-08-31,2000-09-01,2000-09-02,2000-09-03,2000-09-04,2000-09-05,2000-09-06,2000-09-07,2000-09-08,2000-09-10,2000-09-11,2000-09-12,2000-09-13,2000-09-14,2000-09-15,2000-09-17,2000-09-18,2000-09-19,2000-09-20,2000-09-21,2000-09-22,2000-09-23,2000-09-24,2000-09-25,2000-09-26,2000-09-27,2000-09-28,2000-09-29,2000-09-30,2000-10-01,2000-10-02,2000-10-03,2000-10-04,2000-10-05,2000-10-06,2000-10-07,2000-10-08,2000-10-09,2000-10-10,2000-10-11,2000-10-12,2000-10-13,2000-10-14,2000-10-16,2000-10-17,2000-10-18,2000-10-19,2000-10-20,2000-10-21,2000-10-22,2000-10-23,2000-10-24,2000-10-25,2000-10-26,2000-10-27,2000-10-28,2000-10-29,2000-10-30,2000-11-01,2000-11-02,2000-11-03,2000-11-04,2000-11-05,2000-11-06,2000-11-07,2000-11-08,2000-11-09,2000-11-10,2000-11-11,2000-11-12,2000-11-13,2000-11-14,2000-11-15,2000-11-16,2000-11-17,2000-11-18,2000-11-19,2000-11-20,2000-11-21,2000-11-22,2000-11-23,2000-11-24,2000-11-25,2000-11-26,2000-11-27,2000-11-28,2000-11-29,2000-11-30,2000-12-01,2000-12-02,2000-12-03,2000-12-04,2000-12-05,2000-12-07,2000-12-08,2000-12-09,2000-12-10,2000-12-11,2000-12-12,2000-12-13,2000-12-15,2000-12-16,2000-12-17,2000-12-18,2000-12-19,2000-12-20,2000-12-21,2000-12-22,2000-12-23,2000-12-24,2000-12-25,2000-12-26,2000-12-27,2000-12-28,2000-12-29,2000-12-30,2000-12-31,2001-01-01,2001-01-02,2001-01-03,2001-01-05,2001-01-06,2001-01-07,2001-01-08,2001-01-09,2001-01-10,2001-01-11,2001-01-12,2001-01-13,2001-01-14,2001-01-15,2001-01-16,2001-01-17,2001-01-18,2001-01-19,2001-01-20,2001-01-21,2001-01-22,2001-01-23,2001-01-24,2001-01-25,2001-01-26,2001-01-27,2001-01-28,2001-01-29,2001-01-30,2001-01-31,2001-02-01,2001-02-02,2001-02-03,2001-02-04,2001-02-05,2001-02-06,2001-02-07,2001-02-08,2001-02-09,2001-02-10,2001-02-11,2001-02-12,2001-02-13,2001-02-14,2001-02-15,2001-02-16,2001-02-17,2001-02-18,2001-02-19,2001-02-20,2001-02-21,2001-02-22,2001-02-23,2001-02-24,2001-02-25,2001-02-26,2001-02-27,2001-02-28,2001-03-01,2001-03-02,2001-03-03,2001-03-04,2001-03-05,2001-03-06,2001-03-07,2001-03-08,2001-03-10,2001-03-11,2001-03-12,2001-03-13,2001-03-14,2001-03-15,2001-03-16,2001-03-17,2001-03-18,2001-03-19,2001-03-20,2001-03-21,2001-03-22,2001-03-24,2001-03-25,2001-03-26,2001-03-27,2001-03-28,2001-03-29,2001-03-30,2001-03-31,2001-04-01,2001-04-02,2001-04-03,2001-04-04,2001-04-05,2001-04-06,2001-04-07,2001-04-08,2001-04-09,2001-04-10,2001-04-11,2001-04-12,2001-04-13,2001-04-14,2001-04-15,2001-04-16,2001-04-17,2001-04-18,2001-04-19,2001-04-20,2001-04-21,2001-04-22,2001-04-23,2001-04-24,2001-04-25,2001-04-26,2001-04-27,2001-04-28,2001-04-29,2001-04-30,2001-05-01,2001-05-02,2001-05-03,2001-05-04,2001-05-05,2001-05-06,2001-05-07,2001-05-08,2001-05-09,2001-05-10,2001-05-11,2001-05-12,2001-05-13,2001-05-14,2001-05-15,2001-05-16,2001-05-17,2001-05-17,2001-05-17,2001-05-18,2001-05-19,2001-05-20,2001-05-21,2001-05-22,2001-05-23,2001-05-24,2001-05-25,2001-05-26,2001-05-27,2001-05-28,2001-05-29,2001-05-30,2001-05-31,2001-06-01,2001-06-02,2001-06-03,2001-06-04,2001-06-05,2001-06-07,2001-06-08,2001-06-09,2001-06-10,2001-06-11,2001-06-12'.split(','));
//      },
      options() {
        let option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis'
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
              data: this.serverData.time,
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '',
              type: 'line',
              stack: '',
              data: this.serverData.data,
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
        if(this.activeIndex === 'newUser') {
          let hxOption = {
            name: '和讯用户',
            type: 'line',
            data: this.serverData.dataArrHX,
            itemStyle: {
              normal: {
                color: 'rgb(248, 145, 119)'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 1,
                  color: 'rgb(255, 255, 254)'
                }, {
                  offset: 0,
                  color: 'rgb(248, 138, 111)'
                }])
              }
            },
          },
              otherOption = {
            name: '其他用户',
            type: 'line',
            data: this.serverData.dataArrOT,
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
              selfOption = {
            name: '自己用户',
            type: 'line',
            data: this.serverData.dataArrSELF,
            itemStyle: {
              normal: {
                color: 'rgb(242, 204, 136)'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 1,
                  color: 'rgb(255, 255, 255)'
                }, {
                  offset: 0,
                  color: 'rgb(242, 205, 136)'
                }])
              }
            },
          };

          const series = [hxOption,otherOption];
          let legend = ['和讯用户', '其他用户'];

          if(this.isSpecialAccount) {
            series.push(hxOption,otherOption,selfOption);
            legend.push('自己用户');
          }
          option.series = series;
          option.legend= {
            data: legend
          };
        }
        return option
      },
    },
    // 属性监听
    watch: {
      cycleValue(val) {
        switch (val) {
          case 'week':
            this.setTime(7);
            break;
          case 'month':
            this.setTime(30);
            break;
          case 'halfYear':
            this.setTime(182);
            break;
          case 'year':
            this.setTime(365);
            break;
          default:
            break;
        }
      },
      dateGroup: {
        deep: true,
        handler(nal, oal){
          const start = Date.parse(new Date(nal.startTime.time));
          const end = Date.parse(new Date(nal.endTime.time));
          const defaultTime = this.getDefaultDate();
          const defaultStart = Date.parse(new Date(defaultTime.startTime.time));
          const defaultEnd = Date.parse(new Date(defaultTime.endTime.time));
          const initTime =  this.initTime;
          const initStart = Date.parse(new Date(initTime.start));
          const initEnd = Date.parse(new Date(initTime.end));
          const unit = 24*60*60*1000; // 一天的毫秒

          // 所选择的时间是否大于今天
          const isBeyondend = end > defaultEnd || start > defaultEnd;


          if(isBeyondend) {
            this.$store.dispatch('OPEN_SYS_DIALOG',
              {title: '系统提示', errorMsg: '所选日期不能大于今日'});
            return false;
          }

          if(start > end) { // 如果开始时间大于结束时间
            this.$store.dispatch('OPEN_SYS_DIALOG',
              {title: '系统提示', errorMsg: '开始日期不能大于结束日期'});
            return false;
          }

          if(((end - start) / unit) > 365) { // 如果选择日期大于365天
            this.$store.dispatch('OPEN_SYS_DIALOG',
              {title: '系统提示', errorMsg: '选择日期不能大于365天'});
            return false;
          }

          if(start < initStart) { // 如果选择的开始时间小于默认开始时间需要重新请求数据
            this.getData();
            return false;
          }

          this.time={
            start: nal.startTime.time,
            end: nal.endTime.time,
          };
        }
      },
      selectValue() {
        this.getData();
      }
    },
    // 实例方法
    methods: {
      // 设置数据展示的时间段
      setTime(day) {
        const yearLen = this.serverData.time.length;
         this.dateGroup= {
          endTime: {
            time: this.serverData.time[yearLen - 1]
          },
          startTime: {
            time: this.serverData.time[yearLen - day] || this.serverData.time[0]
          }
        }
      },
      setInitTime() {
        this.initTime = {
          start: this.dateGroup.startTime.time,
          end: this.dateGroup.endTime.time
        };
      },
      setData(data) {
        this.setInitTime();
        this.time= this.initTime;
        this.serverData = this.complementData(data)
      },
      // 获取数据
      getData() {
        this.$store.dispatch('GET_PARTNER_ID').then(
          res => {
            const partnerId = this.$store.state.userInfo.userid;
            this.isSpecialAccount = (this.userID == '4128648' || this.userID == '17168021') ? true : false;
            let params = {
              partnerId: partnerId,
              startDate: this.dateGroup.startTime.time,
              endDate: this.dateGroup.endTime.time,
            };
            switch (this.activeIndex) {
              case 'periodUser': // 在期用户
                this.$store.dispatch('GET_MY_USER_PERIOD', params).then(res => {
                  this.setData(res)
                });
                return;
              case 'expiredUser': // 到期用户
                this.$store.dispatch('GET_MY_USER_EXPIRED', params).then(res => {
                  this.setData(res)
                });
                return;
              case 'dueUser': // 续费用户
                this.$store.dispatch('GET_MY_USER_Due', params).then(res => {
                  this.setData(res)
                });
                return;
              case 'newUser': // 新增用户
                params.unit = this.selectValue;
                this.$store.dispatch('GET_MY_USER_NEW', params).then(res => {
                  this.setData(res)
                });
                return;
              default :
                this.$store.dispatch('OPEN_SYS_DIALOG',
                  {title: '系统提示', errorMsg: '发生未知错误'});
                return;
            }

          }
        );


      },
      /*
       * desc 自动补全查询时间内的数据
       * return {Array} 补全后的数据
       */
      complementData(serverArr) {
        let start = Date.parse(new Date(this.initTime.start)),
            end = Date.parse(new Date(this.initTime.end)),
            unit = 24*60*60*1000,
            day = (end - start) / unit + 1,
            timeArr = [], // 保存查询时间
            dataArr = [], // 保存数据
            dataArrHX = [], // 新增用户三分数据 和讯用户
            dataArrOT= [], // 其他用户
            dataArrSELF= []; // 自己的用户

        // 创建所查询天数长度的数组 用来用来保存时间戳格式的数据
        let arr = new Array(day).toString().split(',');
        let typeArr = []; // 用来保存特定个格式的时间 2001-02-03
//        let allYear = [];
        arr[0] = start; // 设置起始时间
        arr.forEach((item, index, array ) => {
          // 重置数组内容
          if(index !== 0) {
            array[index] = array[index - 1] + unit;
          };
          typeArr.push({
            time: this.$myPlugin.format(new Date(array[index]), 'yyyy-MM-dd'),
            defalut: 0
          });
        });
        if(serverArr && Array.isArray(serverArr)) {
          let arrItem;

          typeArr.forEach((item1, index, array) => {
            serverArr.forEach((item2) => {
              if(item1.time === item2.sdate) {
                array[index] = item2;
              }
            });

            arrItem = array[index];
            timeArr.push(arrItem.sdate || arrItem.time);
            dataArr.push(arrItem.userCountInPeriod || arrItem.userCount || arrItem.defalut);
            if(this.activeIndex === 'newUser') {
              dataArrHX.push(arrItem.userCounthx || arrItem.defalut);
              dataArrOT.push(arrItem.userCountother || arrItem.defalut);
              dataArrSELF.push(arrItem.userCountself || arrItem.defalut);
            }
          })
        }

        return(
          {
            time: timeArr,
            data: dataArr,
            dataArrHX: dataArrHX,
            dataArrOT: dataArrOT,
            dataArrSELF: dataArrSELF,
          }
        )
      },
      /*
       * 获取默认时间
       */
      getDefaultDate () {
        const timeStr = new Date().getTime();
        return {
          endTime: {
            time: this.$myPlugin.format(timeStr, 'yyyy-MM-dd')
          },
          startTime: {
            time: this.$myPlugin.format((timeStr - 365 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
          }
        }
      },
      reSetdateGroup(val) {
        this.dateGroup = val
      }
    },
    // 子组件
    components: {
      'vs-select': VSelect
    },
    // 生命周期
    beforeCreate() {

    },
    created() {
      // 默认时间为距离当前一年的时间
      this.dateGroup = this.getDefaultDate();
      this.getData()
    }
  }
</script>
<style lang="stylus">
  .LineChart {
    text-align: left;
    .p-header {
      height: 60px;
      display flex
      align-items center
      padding 0 0 0 20px
      position relative
    }
    .p-h-tips {
      color #999
      margin-left 20px
      font-size 12px
    }
    .p-h-label {
      position absolute
      right 0
    }
  }
</style>