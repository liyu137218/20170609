<template>
  <div class="ColumnManagement">
    <header class="c-head">
      <w-button :cssStyle="routerBtnCssStyle" @vuw-button-click="eventGoCreateColum">创建栏目</w-button>
      <span class="c-h-desc">最多定义三个栏目</span>
    </header>
    <table v-if="columList.length > 0" class="c-table" cellpadding=0 cellspacing=0>
      <thead>
        <tr>
          <td>栏目名称</td>
          <td>类型</td>
          <td>状态</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in columList" :class="[item.auditStatus == 1 ? 'tr-disable': '']">
          <td>{{item.columnName}}</td>
          <td >{{item.id == 0 ? "免费":"收费"}}</td>
          <td>{{item.state}}</td>
          <td>
            <span class="t-btn color-ee5050" @click="eventGoCreateColum(item)">编辑</span>
            <span class="t-btn color-ee5050" @click="eventDel(item, i)">删除</span>
          </td>
        </tr>

      </tbody>
    </table>
    <p style="text-align: center">{{listStatus}}</p>
  </div>
</template>
<script>
import {fetch} from '../store/fetch'
import WButton from './w-button';

export default {
  name: 'ColumnManagement',
  components: {
    WButton,
  },
  data(){
    return {
      columList: [],
      listStatus: ''
    }
  },
  computed: {
    isBindPhone() {
      return this.$store.state.isBindPhone
    },
    pid() {
      return this.$store.state.partnerId;
    },
    nickName() {
      return this.$store.state.userInfo.nickname;
    },
    routerBtnCssStyle () {
      return {
        background: '#5d9cec',
        color: '#fff',
        border: 'none',
        padding: '3px 15px',
        marginRight: '10px'
      }
    },
    userLevel () {
      return this.$store.state.userLevel;
    },
    isMingjia () {
      return this.$store.getters.partnerLevel != 3;
    }

  },
  methods: {
    // 去创建栏目
    eventGoCreateColum (item) {
      if(!this.isBindPhone) {
        this.$store.dispatch('CHECKOUT_BINGPHONE');
        return false;
      }
      if(this.isMingjia) {
        if(!item && this.columList.filter((item) => {
            return item.auditStatus != 3
          }).length >= 3) {
          this.$vuw.prompt.show({
            content:'最多定义三个栏目',
            type: 'warn'
          })
          return false
        }
        this.$router.push('/CreateCloum'+ '?id=' + (item ? item.id : 'null' ));
//        window.open(location.origin + this.$router.options.base + 'CreateCloum'+ '?id=' + (id || 'null'))
      } else {
        this.$vuw.prompt.show({
          content:'<p style="padding: 5px 0">您没有权限创建收费栏目，请联系客服升级，</p><p style="padding: 5px 0">客服电话：010-85696800<p>',
          type: 'warn'
        })
      }



      if(item) {
        dplus_Click("点击事件", {
          "事件功能": "编辑栏目",
          "类型": "互动",
          "所属平台": "基础平台",
          "产品ID": item.id,
          "产品名称": item.columnName,
          "合作者ID": this.pid,
          "合作者名称": this.nickName,
          "产品分类": "合作者后台",
          "事件类别": "非体验",
        })
      } else {
        dplus_Click("点击事件", {
          "事件功能": "创建栏目",
          "类型": "互动",
          "事件类别": "非体验",
          "所属平台": "基础平台",
          "合作者ID": this.pid,
          "合作者名称": this.nickName,
        })
      }

    },
    // 删除栏目
    eventDel (item, index) {
      this.$vuw.confirm.show({
        type: 'warn',
        onCancel: () => {

        },
        onConfirm: () =>{
          fetch.delColum(item.id).then(
            res => {
              this.columList.splice(index, 1)
            }
          )
        },
        content: `<p>如果删除栏目，该栏目下的文章将一同删除，确定要</p>
          <p>删除该栏目吗？删除后不可恢复！</p>
          `
      })

      dplus_Click("点击事件", {
        "事件功能": "删除栏目",
        "类型": "互动",
        "所属平台": "基础平台",
        "产品ID": item.id,
        "产品名称": item.columnName,
        "合作者ID": this.pid,
        "合作者名称": this.nickName,
        "产品分类": "合作者后台",
        "事件类别": "非体验",
      })
    },
    getCloumList(pid) {
      fetch.getCloumList(pid).then(
        data => {
          if(data.listStatus == 0) {
            this.ArtListStatus = '您还没有创建栏目'
          }
          this.columList = data.map((item) => {
            if (item.auditStatus == 1) {
              item.state = "审核中"
            } else if (item.auditStatus == 2) {
              item.state = "审核通过"
            } else if (item.auditStatus == 3) {
              item.state = "审核不通过"
            }
            return item
          })
        }
      )
    }
  },
  created () {
    this.$store.dispatch('GET_PARTNER_ID').then(
      pid => {
        this.getCloumList(pid)
      }
    )

    dplus_Click("点击事件", {
      "事件功能": "栏目管理",
      "类型": "互动",
      "事件类别": "非体验",
      "所属平台": "基础平台",
      "合作者ID": this.pid,
      "合作者名称": this.nickName,
    })

  }
}
</script>
<style lang="stylus">
.ColumnManagement {
  text-align left
  .color-ee5050 {
    color #ee5050
  }
  .c-head {
    padding 10px 17px
  }
  .c-h-btn {
    margin-right 10px
    padding 3px 15px
    color #fff
    background #5d9cec
    border-radius 5px
  }
  .c-h-desc {
    color #a0a0a0
  }
  .c-table {
    width 100%
    text-align center
    thead {
      background #e9f5fc
      tr {
        td {
          padding 10px 0
        }
      }
    }
    tbody {
      tr {
        td {
          padding 18px 0
          position relative
          .t-btn {
            border 1px solid #ee5050
            display inline-block
            padding 0 10px
            border-radius 4px
            cursor pointer
          }
        }
        td:after {
          content ''
          display block
          position absolute
          bottom 0
          left 0
          width 100%
          border-bottom 1px dashed #e5e5e5
        }
        :first-child:after {
          width calc(100% - 20px)
          left 20px
        }
        :last-child:after {
          width calc(100% - 20px)
          left 0
        }
      }

    .tr-disable {
      td {
        .t-btn {
          border 1px solid #ccc
          color  #ccc
          pointer-events none;
        }
      }
    }
    }
  }
}

</style>