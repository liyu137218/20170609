<template>
  <div class="WeChatListStaic">
    <header class = "ws-header">
      <p>{{title}}</p>
      <p></p>
    </header>
    <div class="ws-container">
      <div class="ws-con-text">
        {{link}}
      </div>
      <div class="ws-con-btn no-select"
      v-clipboard:copy="link">
        复制链接
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WeChatListStaic',
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      msg: 'WeChatListStai!!c'
    }
  },
}
</script>
<style lang="stylus">
.WeChatListStaic {
  font-size 16px
  padding 0 110px
  margin-bottom: 40px;
  .ws-header {
    display flex
    justify-content space-between
    background #e9f5fc
    padding 12px 27px
  }
  .ws-container {
    display flex
    justify-content space-between
    padding 34px 27px
    border: 1px solid #e1ecf3;
   
  }
  .ws-con-text {
    width: 345px;
    border: 1px solid #cccccc;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
  }
  .ws-con-btn {
    width: 110px;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    border-radius: 5px;
    background: #3598db;
    cursor: pointer;
    color: #fff;
  }
  .ws-con-btn:hover {
    background: #1e84c9;
  }
}
</style>