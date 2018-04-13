<template>
  <div id="NewsList" class="NewsList">
    <ul class="n-container">
      <li class="n-c-list" v-for="list in newsList">
        <p class="n-c-l-text">{{list.content}}</p>
        <p class="n-c-l-time">{{list.createTime}}</p>
      </li>
    </ul>
    <div class="n-footer">
      <uib-pagination v-if="pageShow"
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
  export default {
    name: 'NewsList',
    data() {
      return {
        msg: 'this is NewsList',
        pagination: { }, // 当前显示页数
//        totalItems: 2000, // 总数
        itemPerPage: 15, // 每页显示个数
      }
    },
    computed: {
      totalItems() {
        let item;
        const newsList = this.$store.state.newsLists;
        if(newsList) {
          item = newsList.count
        } else {
          item = 10
        }
        return item
      },
      newsList() {
        const newsList = this.$store.state.newsLists;
        let newsInfo;
        if(Array.isArray(newsList.Info)) {
          newsInfo = newsList.Info
          newsInfo.forEach((val) => {
            val.createTime = this.$myPlugin.format(val.createTime)
          })
        } else {
          newsInfo = null
        }
        return newsInfo
      },
      pageShow() {
        return this.totalItems >= this.itemPerPage
      }
    },
    watch: {
      pagination(nal,oal) {
        if(oal.currentPage) {
          this.getNewsLists(nal.currentPage)
        }
      }
    },
    created() {
      this.getNewsLists()
    },
    methods: {
      getNewsLists(val = 1) {
        this.$store.dispatch('GET_NEWS_LISTS',{
          currentPage: val,
          pageSize: this.itemPerPage
        })
      }
    },
    components: {
    }
  }
</script>
<style lang="stylus">

  .NewsList {
    .n-c-list {
      border-bottom 1px solid #e5e5e5
      color #666666
      font-size 14px
      text-align left
      padding 20px
    }
    .n-c-l-time {
      margin-top 20px
      color #999999
    }
    .n-footer {
      padding 20px 0
    }
  }
</style>