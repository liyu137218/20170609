<template>
  <div id="ErrorTipsDialog" class="ErrorTipsDialog">
    <header :class="['e-head', sysInfo.type === 'confirm'?'confirm-head':'']">
          <span  class="e-h-title no-select">{{sysInfo.title}}</span>
    </header>
    <section class="e-content">
     <p class="errMsg" v-if="sysInfo.errorMsg">
      <i class="iconfont" v-if="sysInfo.type === 'warn'">&#xe602;</i>
      <span class="no-select">{{sysInfo.errorMsg}}</span>
      </p>
      <p class="link-btn" v-if="sysInfo.linkText">
      <a :href="sysInfo.linkHref" target="_blank">{{sysInfo.linkText}}</a>
      </p>
      <p class="closeRoomContainer" v-if="sysInfo.type === 'closeRoom'">
        <button class="cancel" @click="eventCloseDialogCloseRoom">取消</button>
        <button class="determine" @click="eventCloseDeterCloseRoom">确认</button>
      </p>
      <p class="confirmContainer" v-if="sysInfo.type === 'confirm'">
        <button class="confirm-cancel" @click="eventOnCancel">{{sysInfo.cancel || '取消'}}</button>
        <button class="confirm-determine" @click="eventOnConfirm">{{sysInfo.confirm || '确定'}}</button>
      </p>
    </section>
    <aside class="e-h-btn iconfont " @click="eventCloseDialogCloseRoom">&#xe600;</aside>
  </div>
</template>
<script>
  export default {
    name: 'ErrorTipsDialog',
    data() {
      return {
        msg: 'this is ErrorTipsDialog',
        title: '系统提示',
        errorMsg: 'CLOSE_SYS_DIALOG'
      }
    },
    computed: {
      sysInfo() {
        return this.$store.state.sysInfo
      }
    },
    methods: {
      eventCloseDialogCloseRoom() {
        this.$store.dispatch('CLOSE_SYS_DIALOG')
      },
      eventCloseDeterCloseRoom() {
        this.$store.dispatch('CLOSE_LIVE_ROOM',this.sysInfo.params)
      },
      eventOnCancel() {
        if(typeof this.sysInfo.onCancel == 'function') {
          this.sysInfo.onCancel();
        }
        this.$store.dispatch('CLOSE_SYS_DIALOG')
      },
      eventOnConfirm() {
        if(typeof this.sysInfo.onConfirm == 'function') {
          this.sysInfo.onConfirm();
        }
        this.$store.dispatch('CLOSE_SYS_DIALOG')
      }
    }
  }
</script>
<style lang="stylus">
  .ErrorTipsDialog {
    position: relative
    background: #fff
    min-width: 300px
    padding: 30px
    border-radius 5px

    .e-head {
      display flex
      justify-content center
      align-items center
      padding 30px 0 10px 0
      text-align center
      color #333
      font-size 16px
      font-weight 500
    }


    .confirm-head {
      color #dd5050
      font-weight bold
    }



    .e-h-btn {
      cursor pointer
      color: #999
      position: absolute
      top 10px
      right 10px
    }
    .e-content {
      p {
        padding 5px 0
      }
      i {
        font-size 28px
        color #ee5050
        padding 0 10px
      }
      .errMsg {
        display flex
        justify-content center
        align-items center
        color #707070
      }
      .link-btn {
        color #ee5050
        font-size 14px
        a {
          color #ee5050
        }
      }

      .closeRoomContainer {
        display flex
        justify-content center
        padding-top 20px
        button {
          padding 10px 30px
          border-radius 5px
          margin 0 20px
          color #fff
          cursor pointer
        }
        .cancel {
          background #E74C3C
        }
        .determine {
          background  #3598DB
        }
        .cancel:hover {
          background #ff5242
        }
        .determine:hover {
          background #3cb1ff
        }
      }
      .confirmContainer {
        display flex
        justify-content center
        padding-top 20px
        button {
          padding 10px 30px
          border-radius 5px
          margin 0 20px
          color #dd5050
          border 1px solid #dd5050
          background #fff;
          cursor pointer
        }
        .confirm-cancel {
          // background #E74C3C
        }
        .confirm-determine {
          // background  #3598DB
        }
        .confirm-cancel:hover {
          background #dd5050
          color #fff
        }
        .confirm-determine:hover {
          background #dd5050
          color #fff
        }
      }
    }
  }
</style>