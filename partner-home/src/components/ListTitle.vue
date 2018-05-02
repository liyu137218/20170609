<template>
  <div id="ListTitle" class="ListTitle">
    <span class="name" v-html="listTitle">

    </span>
    <span 
        class="desc"
        v-if="type === 'WXGZSPZ'">复制链接，粘贴到公众号菜单里即可使用。
    </span>
    <span
        class="desc"
        v-if="type === 'TGMyFans'">根据昨日数据来计算
    </span>
    <a
      class="btn"
      v-if="type === 'WXGZSPZ'" target="_blank" href="#/WeChatCotch">查看详细教程
    </a>
    <a
        class="am-btn"
        @click="eventClikWirteBlog"
        v-if="type === 'AllProductArticleManagement'"
        >
      +写文章
    </a>
  </div>
</template>
<script>
  import {routerMap} from '../router/routerMap'
  export default {
    name: 'ListTitle',
    props: {
      type: String
    },
    data() {
      return {
        msg: 'this is ListTitle'
      }
    },
    computed: {
      isBindPhone() {
        return this.$store.state.isBindPhone
      },
      listTitle() {
        return (routerMap.filter(({name} = {}) => name === this.type).map(({title} = {})=> title).join())
      },
      pid() {
        return this.$store.state.partnerId;
      },
      nickName() {
        return this.$store.state.userInfo.nickname;
      }
    },
    methods: {
      eventClikWirteBlog () {
        if(!this.isBindPhone) {
          this.$store.dispatch('CHECKOUT_BINGPHONE');
        } else {
          this.$router.push('/WriteBlog')
        }
        dplus_Click("点击事件", {
          "事件功能": "发文章",
          "类型": "互动",
          "事件类别": "非体验",
          "所属平台": "基础平台",
          "合作者ID": this.pid,
          "合作者名称": this.nickName,
        })
      }
    },
  }
</script>
<style lang="stylus">
  .ListTitle {
    padding 10px 0
    border-top 1px solid #e5e5e5
    border-bottom 1px solid #e5e5e5
    text-align left
    >.name {
      font-size 16px
      color #e74c3c
      border-left 4px solid #e74c3c
      text-align left
      display inline-block
      padding-left 10px
    }
    >.desc {
      font-size 14px
      color #A4A4A4
    }
    >.btn {
      float right
      padding-right 10px
      color #E65742
    }
    .am-btn {
      float right
      color #fff
      background: #5d9cec;
      padding 0 10px
      margin-right 10px
      border-radius 4px
      cursor pointer
    }
  }
</style>