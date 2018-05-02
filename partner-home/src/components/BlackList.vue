<template>
  <div id="BlackList" class="BlackList">
    <div class="b-select">
      <div class="b-label">
        选择直播室：
      </div>
      <VSelect
          v-model="selectValue"
          :options="selectOptions"
      ></VSelect>
    </div>
    <div class="b-dateSelect">
      <span class="b-label">查&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;询：</span>
      <date-picker
          :date="ckeckTime.startTime"
          :option="datePicker.option">
      </date-picker>
      <span class="b-d-jiange">&nbsp;&#822;&nbsp;</span>
      <date-picker
          :date="ckeckTime.endTime"
          :option="datePicker.option">
      </date-picker>
    </div>
    <div class="b-table" v-if="tableShow">
      <!--表格组件 保函表头 保函复选框-->
      <TableList
          v-model="checkedValue"
          :tableList="backList"
          :thead="true"
          :check="true"></TableList>
    </div>
    <div class="b-footer"  v-if="pageShow">
      <div class="b-f-selectGroup" >
        <input id="bfSelect"
               v-model="allChecked"
               type="checkbox">
        <label for="bfSelect" >全选</label>
      </div>
      <div  class="b-f-btn" @click="eventRemBlackRoom">
        解锁选中
      </div>
      <uib-pagination
                      v-model="pagination"
                      :total-items="totalItems"
                      :item-per-page="itemPerPage"
                      first-text="第一页"
                      next-text="下一页"
                      previous-text="上一页"
                      last-text = "最后一页"
                      :max-size = "2"
                      :force-ellipses="true"
                      :boundary-link-numbers="true"
      ></uib-pagination>
    </div>
  </div>
</template>
<script>
  import VSelect from '@/components/Select.vue'
  import TableList from '@/components/TableList.vue'
  export default {
    name: 'BlackList',
    data() {
      return {
        msg: 'this is BlackList',
        allChecked: false, //
        checkedValue:[],
        defaultSelectOptions:[
          {
            id: 0,
            name: '所有直播室',
          }
        ],
        selectValue: '',  // 当前查询的房间号
        pagination: {},
//        totalItems: 200,
        itemPerPage: 10,
        ckeckTime: {
          startTime: {
            time: ''
          },
          endTime: {
            time: ''
          },
        },
        datePicker: {
          option: {
            type: 'day',
            week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            format: 'YYYY-MM-DD',
            placeholder: '',
            inputStyle: {
              'display': 'inline-block',
              'padding': '6px',
              'line-height': '22px',
              'font-size': '16px',
              'border': '1px solid rgba(0, 0, 0, 0.2)',
              'color': '#033333',
              'box-sizing': 'border-box',
              'width': '130px',
              'background-image': `url(${require('../assets/icon_datepicker.png')})`,
              'background-repeat': 'no-repeat',
              'background-position': 'right 8px center',
              'cursor': 'pointer'
            },
            color: {
              header: '#ccc',
              headerText: '#f00'
            },
            buttons: {
              ok: '确定',
              cancel: '取消'
            },
            overlayOpacity: 0.5, // 0.5 as default
            dismissible: true // as true as default
          },
        },

        tableHeader: [
          {
            id: '选中',
            name: '昵称',
            time: '黑名单时间',
            person: '操作人'
          },
        ]
      }
    },
    computed: {
      selectOptions() {
        const arr = [];

        this.$store.state.liveRooms.forEach(({name, roomId}) => {
          if(name&&roomId) {
            arr.push({
              id: roomId,
              name: name
            })
          }
          })

        return this.defaultSelectOptions.concat(arr);
      },
      backList() {
        const blackInfo = this.$store.state.blackInfo;
        if(!blackInfo.list && !Array.isArray(blackInfo.list)) {
          return this.tableHeader;
        }
        return (
          this.tableHeader.concat(
            blackInfo.list.map(({userId, createTime, createnickname, nickname,roomId}) => {
              return {
                id: `${roomId}*${userId}`,
                name: nickname,
                time: this.$myPlugin.splitTime(createTime),
                person: createnickname,
              }
            })
          )
        )
      },
      totalItems() {
        let item;
        const blackInfo = this.$store.state.blackInfo;

        if(blackInfo) {
          item = blackInfo.count
        } else {
          item = 10
        }
        return item
      },
      pageShow() {
        return this.totalItems !== 0;
      },
      tableShow() {
        return this.totalItems !== 0;
      },
      partnerId() {
        return this.$store.state.userInfo.userid
      }
    },
    watch: {
      selectValue(nv) {
        this.pagination.currentPage = 1;
        this.getBlackList();
      },
      ckeckTime:{
        handler(nv) {
          if(nv.startTime.time && nv.endTime.time) {
            this.pagination.currentPage = 1;
            this.getBlackList();
          }
        },
        deep: true
      },
      allChecked(nv) {
        if(nv) {
          this.backList.forEach(({id}) => {
            // Number.isInteger = Number.isInteger || function(value) {
            //     return typeof value === "number" &&
            //       isFinite(value) &&
            //       Math.floor(value) === value;
            //   };
            if(id !== '选中') {
              if(this.checkedValue.indexOf(id) < 0) {
                this.checkedValue.push(id)
              }
            }
          })
        } else { // 取消全选 如果开始状态是全选才能取消
          if(this.checkedValue.length == this.backList.length - 1) {
            this.checkedValue = []
          }
        }
      },
      checkedValue(nv) {
        if(nv.length < this.backList.length - 1) {
          this.allChecked = false
        } else {
          if(this.checkedValue.length == this.backList.length - 1) {
            this.allChecked = true
          }
        }
      },
      pagination: {
        deep: true,
        handler(nv,{currentPage}) {
          if(currentPage) {
            this.getBlackList()
          }
        }
      }
    },
    methods: {
      getBlackList() {
        this.checkedValue = [];
        const partnerId = this.partnerId;
        let params = {
          partnerId: this.partnerId,
          roomId: this.selectValue,
          currentPage: this.pagination.currentPage || 1,
          pagesize: this.itemPerPage,
          startdate: this.ckeckTime.startTime.time,
          enddate: this.ckeckTime.endTime.time
        };
        if(partnerId) {
          this.$store.dispatch('GET_BLACK_LIST', params)
        } else {
          this.$store.dispatch('GET_PARTNER_ID').then(
            () => {
              this.getBlackList()
            }
          )
        }
      },
      eventRemBlackRoom() {
        const arr = this.checkedValue;
        if(arr.length > 0) {
          let userids = arr.toString();

          this.$store.dispatch('REM_BLACK_LIST',{userids: userids}).then(
            () => {
              this.getBlackList()
            }
          )
        }

      }
    },
    created() {
    },
    components: {
      VSelect,
      TableList
    }
  }
</script>
<style lang="stylus">
  .BlackList {
    text-align: left;
    .b-select {
      display flex
      padding 20px
    }
    .b-label {
      width 114px
      display flex
      justify-content center
      align-items center
    }
    .b-dateSelect {
      padding 10px 20px 10px 20px
      display flex
      justify-content flex-start
      align-items center
    }
    .b-d-jiange {
      padding 0 10px
    }
    .b-table {
      padding-top 20px
    }
    .b-footer {
      display flex
      padding 20px 0
      align-items center
      justify-content center
    }
    .b-f-selectGroup {
      display flex
      align-items center
      padding-left 30px
      margin-right 30px
      input {
        box-sizing border-box
        width 17px
        height 17px
      }
    }
    .b-f-btn {
      box-sizing border-box
      width 80px
      height 25px
      display flex
      justify-content center
      align-items center
      border 1px solid #2c9cde
      border-radius 2px
      color #2c9cde
      margin-right 20px
      cursor pointer
      transition .3s all linear
    }
    .b-f-btn:hover {
      background #2c9cde
      color #fff
      border 1px solid transparent
    }
  }
</style>