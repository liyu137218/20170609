<template>
  <div class="ArticleItem">
    <header class="a-head">
      <span class="a-h-title">
        <a v-if="!status" :href="linkSrc" target="_blank">{{data.articleTitle}}</a>
        <span v-else>{{data.articleTitle}}</span>
        <span class="a-h-t-state" v-if="status">{{status}}</span>
      </span>
      <span class="a-h-identy" v-if="data.columnId != 0">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-unie65b"></use>
        </svg>
        {{data.columnId == 0 ? '免费文章': '收费文章'}}
      </span>
    </header>
    <section class="a-con">
      {{articleIntroduce}}
    </section>
    <footer class="a-footer">
      <span class="a-f-time">{{time}}</span>
      <span class="a-f-type" v-if="data.columnId != 0"><i>栏目：</i>{{data.columnName}}</span>
      <span class="a-f-talk">
        <svg class="icon icon-color-gray icon-xiaoxi" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        <span class="a-f-number">{{data.commentNum}}</span>
      </span>
      <span class="a-f-look">
        <svg class="icon icon-color-gray icon-eye" aria-hidden="true">
          <use xlink:href="#icon-eye"></use>
        </svg>
        <span class="a-f-number">{{data.accessNum}}</span>
      </span>
      <span class="a-f-btn" @click="eventDel(data.id)">
        删除
      </span>
    </footer>
  </div>
</template>
<script>
  import {fetch} from '../store/fetch'

  export default {
  name: 'ArticleItem',
  props: ['data', 'index'],
  data() {
    return {
     
    }
  },
  computed: {
    pid() {
      return this.$store.state.partnerId;
    },
    nickName() {
      return this.$store.state.userInfo.nickname;
    },
    time() {
      return this.$myPlugin.format(this.data.createTime)
    },
    articleIntroduce() {
      const articleIntroduce = this.data.articleIntroduce;
      if(articleIntroduce.length > 67) {
        return this.data.articleIntroduce.substr(0, 67) + '…'
      } else {
        return articleIntroduce
      }

    },
    linkSrc() {
      return `${this.$store.state.config.caidaoweb}/${this.data.teacherId}/article${this.data.id}.html`
    },
    status() {
      let str = '';

      if(this.data.auditStatus != 2) {
        str = '审核中'
      }
      return str;
    }
  },
  methods: {
    eventClick(name) {
      this.activeIndex = name;
      this.$emit('input', name)
    },
    eventDel(id) {
      this.$vuw.confirm.show({
        type: 'warn',
        content: `<div><p>确定要删除此文章吗？</p><p>删除后不可恢复</p></div>`,
        onConfirm: () => {
          fetch.delArticle(id).then(
            () => {
              this.$emit('eventDel', this.index)
            }
          )
        }
      })
      dplus_Click("点击事件", {
        "事件功能": "删除",
        "类型": "互动",
        "事件类别": "非体验",
        "所属平台": "基础平台",
        "合作者ID": this.pid,
        "合作者名称": this.nickName,
      })
    }
  }
}
</script>
<style lang="stylus">
.ArticleItem {
  text-align left
  padding 30px 20px
  .icon {
    width: 1.5em; height: 1.5em; 
  }
  .a-h-title {
    color #000000
    font-size 18px
    a {
      color #000
    }
  }
  .a-h-identy {
    color #ee5050
    font-size 14px
    margin-left 22px
  }
  .a-con {
    margin 20px 0
  }
  .a-footer {
    >:nth-child(1n) {
      margin-right: 40px
    }
    >:last-child {
      margin 0
    }
  }
  .a-f-time {
    color #b6b6b6
  }
  .a-f-type {
    i {
      font-style normal
      color #b6b6b6
    }
  }
  .icon-color-gray {
    color #9d9d9d
  }
  .icon-xiaoxi {
    vertical-align: -.2em;
    width: 1.3em; height: 1.3em; 
  }
  .icon-eye {
    width: 1.3em; height: 1.3em; 
    vertical-align: -.3em;
  }
  .a-f-btn {
    float right
    cursor pointer
  }
  .a-f-number {
    margin-left 5px
  }
  .a-h-t-state {
    float right
    color #e74c3c
  }
}
</style>