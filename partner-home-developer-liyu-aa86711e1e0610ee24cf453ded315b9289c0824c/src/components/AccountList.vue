<template>
  <div id="AccountList" class="AccountList">
    <div class="a-header">
      <span class="a-h-serch">查&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;询：</span>
      <date-select-group
          v-model="dateGroup"
          :dateOptionsStart="dateOptionsStart"
          :dateOptionsEnd="dateOptionsEnd"
          :split="'至'"
      ></date-select-group>
    </div>
    <div class="a-tab">
      <table-nav
          v-model="activeIndex"
          :tabNavs="tabNavs">
      </table-nav>
      <div class="a-t-list">
        <div v-if="activeIndex === 'time'">
          <TableList :tableList="tableList"></TableList>
        </div>
        <div v-if="activeIndex === 'sales'">
            <e-chart :options = 'salesInfo' key="sales"></e-chart>
        </div>
        <div v-if="activeIndex === 'refunds'">
            <e-chart :options = 'refundsInfo' key="refunds"></e-chart>
        </div>
        <div v-if="activeIndex === 'income'">
            <e-chart :options = 'incomeInfo' key="income"></e-chart>
        </div>
        <div v-if="activeIndex === 'aythority'">
            <e-chart :options = 'aythorityInfo' key="aythority"></e-chart>
        </div>
      </div>
    </div>
    <div class="a-footer">
      <p>说明:</p>
      <p>1、权责计算方式是指各类产品按照服务周期计算应计在当月的收入额及递延额；</p>
      <p>2、您的当期具体收入额=各月“权责总计”×协议分成比例；</p>
      <p>3、最终数据以财务数据为准。</p>
    </div>
  </div>
</template>
<script>
  const echarts = require('echarts'); // 设置渐变色

  import TableList from '@/components/TableList'
  export default {
    name: 'AccountList',
    props: ['code', 'defaultTime'],
    data() {
      return {
        msg: '账务列表',
        dateGroup: { // 用于时间选择插件
          endTime: {
            time: ''
          },
          startTime: {
            time: ''
          }
        },
        initGroup: {
          endTime: {
            time: ''
          },
          startTime: {
            time: ''
          }
        },
        activeIndex: 'time',
        tabNavs:{
          time: '时间',
          sales: '销售额（元）',
          refunds: '退款总额（元）',
          income: '引流收入（元）',
          aythority: '权责总计（元）'
        },
        tableList: [],
      }
    },
    computed: {
      salesInfo() { 
        return this.getOption('sales');
      },
      refundsInfo() {
        return this.getOption('refunds');
      },
      incomeInfo() {
        return this.getOption('income');
      },
      aythorityInfo() {
        return this.getOption('aythority');
      },
      dateOptionsStart() { // 开始时间选择器设置
        return ({
          type: 'day',
          format: 'YYYY-MM',
          placeholder: this.defaultTime.start
        })
      },
      dateOptionsEnd() { // 结束时间选择器设置
        return({
          type: 'day',
          format: 'YYYY-MM',
          placeholder: this.defaultTime.end,
        })
      },
    },
    watch: {
      dateGroup:{
        deep: true,
        handler(nal, oal) {
          const start = this.getTimer(nal.startTime.time);
          const end = this.getTimer(nal.endTime.time);
          const defaultTime = this.defaultTime;
          const defaultStart = this.getTimer(defaultTime.start);
          const defaultEnd = this.getTimer(defaultTime.end);
    

          const isBeyondend = end > defaultEnd || start > defaultEnd;
          if(isBeyondend) {
            this.$store.dispatch('OPEN_SYS_DIALOG',
              {title: '系统提示', errorMsg: '所选日期不能大于今日'});
              return false;
          } else {
            this.initTime = nal;
            this.getBusiness();
          }
        }
      }
    },
    methods: {
      eventTabChange(val) {
        this.activeIndex = val
      },
      getBusiness() {
        let params = {
          startDate:　this.dateGroup.startTime.time || this.defaultTime.start,
          endDate: this.dateGroup.endTime.time || this.defaultTime.end,
          phoneCode: this.code
        };
        this.$store.dispatch('GET_BUSINESS', params).then(
          res => {    
            this.tableList = res.map((item)=> {
              return {
                time: item.rmonth,
                sales: item.hexunSelfAmount,
                refunds: item.refundHexunSelf,
                income: item.drainageAmount,
                aythority: item.finalamount
              }
            })

          },
          rej => {
            this.$emit('checkoutAccountList', {
              source: 'list',
              info: {
                phone: rej,
                res: false,
              }
            })
          }
        )
      },
     // 将选择时间转成时间戳
      getTimer(timeStr) {
        timeStr = `${timeStr}-15`;
        return Date.parse(new Date(timeStr))
      },
      getOption(type) {
        const end = this.initGroup.endTime.time;
        const start = this.initGroup.startTime.time;
        const unit = parseInt(365/12*24*60*60*1000); // 一个月的时间戳
        const formatArr = [];
        let delay;


        delay = parseInt((this.getTimer(end) - this.getTimer(start)) / (30*24*60*60*1000));
        // 创建一个查询月数的空数组  safd
        const NullArr = new Array(delay + 1).toString().split(',');

        NullArr[0] = this.getTimer(start);
        
        const typeArr = NullArr.forEach((item, index, array) => {
          if(index !== 0) {
              array[index] = array[index - 1] + unit;
          } 
          formatArr.push( {
            time: this.$myPlugin.format(new Date(array[index]), 'yyyy-MM'),
            defalut: 0
          })
        })

        formatArr.forEach( (item) => {
          this.tableList.forEach((item2) => {
            if(item.time === item2.time) {
              item.defalut = item2[type]
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
            formatter: (params, ticket, callback) => {
              let option = {
                date: params.name
              };
              let value = params.value;
              if(value === 0) {
                return `${params.name}：${value}`;
              }
              this.$store.dispatch('GET_FINANCE_DATA', option).then(
                res => {

                //  res = [
                //    {
                //      "finalamount": "1.0",
                //      "hexunSelfAmount": "1.0",
                //      "refundHexunSelf": "3.0",
                //      "productName": "测试教室"
                //    },
                //    {
                //      "finalamount": "20",
                //      "hexunSelfAmount": "23",
                //      "refundHexunSelf": "24",
                //      "productName": "测试教室2"
                //    },
                //    {
                //      "finalamount": "1.0",
                //      "hexunSelfAmount": "01.0",
                //      "refundHexunSelf": "3.0",
                //      "productName": "测试教室"
                //    },
                //    {
                //      "finalamount": "20",
                //      "hexunSelfAmount": "3223",
                //      "refundHexunSelf": "24",
                //      "productName": "测试教室2"
                //    }
                //  ];
                  let str = '';
                  let source = (item) => {
                    switch (type) {
                      case 'sales':
                        return item.hexunSelfAmount;
                      case 'refunds':
                          return item.refundHexunSelf;
                      case 'aythority':
                          return item.finalamount;
                      default:
                        return '？';
                    }
                  };
                  // 引入没有来源
                  if(type !== 'income') {
                    if(res.length <= 0) {
                      str = `${params.name}:${params.value}`
                    } else {
                      res.forEach((item) => {
                        if(source(item) !== '0.0') {
                          str += `<p style="text-align: left;"><span>${item.productName}</span>：<span>${source(item)}元</span></p>`
                        }
           
                      })
                    }

                  } else {
                    str = `${params.name}：${params.value}`
                  }

                  if(str === '') {
                    str = `${params.name}：${params.value}`
                  }

                  callback(ticket, str)
                }
              );
              return 'Loading';
            }
          },
          dataZoom: [
            {
              type: 'slider',
              startValue: formatArr[0].time,
              endValue: formatArr[formatArr.length - 1].time,
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
        
        return option;
      }
    },
    components: {
      TableList
    },
    created() {
      this.getBusiness();
      this.initGroup = {
         endTime: {
            time: this.defaultTime.end
          },
          startTime: {
            time: this.defaultTime.start
          }
      }
    }
  }
</script>
<style lang="stylus">
  text-align left
  .a-t-nav-active {
    border-top 1px solid rgba(233,93,80,1) !important
    color rgba(233,93,80,1)
    border-bottom 1px solid transparent !important
  }

  .AccountList {
    .a-header {
      text-align left
      padding 20px 0
      display flex
      align-items center
    }
    .a-h-serch {
      padding-left 20px
    }
    .a-h-jiange {
      display inline-block
      width 10px
      padding 0 5px
    }
    .a-tab {
      width 100%;
    }



    .a-t-body {
      height 50px
      display flex
      align-items center
      justify-content center
    }
    .a-footer {
      text-align left
      padding-top 20px
      color rgba(53,152,219,1)
      p {
        padding (17/2)px
      }
    }
  }
</style>