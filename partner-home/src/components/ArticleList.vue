<template>
  <div class="ArticleList">
    <header class="a-head">
      <FilterLabel
       :label="filterList"
       v-model="filterIndex"></FilterLabel>
    </header>
    <section class="a-con">
      <ArticleItem
          v-for="(item, i) in artList"
          @eventDel="eventDelArticle"
          :key="item.id"
          :data="item"
          :index="i"
          class="a-c-item"></ArticleItem>
    </section>
    <p>{{ArtListStatus}}</p>
    <footer class="a-footer">
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
    </footer>
  </div>
</template>
<script>
import {fetch} from '../store/fetch'
import FilterLabel from '@/components/FilterLabel'
import ArticleItem from '@/components/ArticleItem'
export default {
  name: 'ArticleList',
  components: {
    FilterLabel,
    ArticleItem,
  },
  data(){
    return {
      pagination: { }, // 当前显示页数
      totalItems: 0,

      itemPerPage: 10, // 每页显示个数
      artList: [],
      ArtListStatus: '',
      filterList: [
        {
          name: 'all',
          title: '全部'
        }
      ],
      filterIndex: 'all'
    }
  },
  computed: {
    pageShow () {
      return this.totalItems > this.itemPerPage
    },
    pid() {
      return this.$store.state.partnerId;
    },
    nickName() {
      return this.$store.state.userInfo.nickname;
    }
  },
  watch: {
    pagination(nal, oal) {
      if(oal.currentPage) {
        this.getArticleList()
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
    // 切换栏目
    filterIndex() {
      this.getArticleList()
      this.pagination.currentPage = 1
      this.ArtListStatus = ''

    }
  },
  methods: {

    /*pid() {
      return this.$store.state.partnerId;
    },
    nickName() {
      return this.$store.state.userInfo.nickname;
    },*/
    getArticleList() {
      let params = {
        pageNum: this.pagination.currentPage || 1,
        pageSize: this.itemPerPage,
        type: this.filterIndex
      };

      fetch.getArticleList(params).then(
        res => {
          this.totalItems = res.total;
          if(res.length == 0) {
            if(this.filterIndex == 'all') {
              this.ArtListStatus = '您还没有发布文章'
            } else {
              this.ArtListStatus = '您还没有在该栏目下发布文章'
            }

          }
          console.log("res.list=",res.list)
          this.artList = res.list
        }
      )
    },
    getColumListArt() {
      fetch.getColumListArt().then(
        res => {
          this.filterList = this.filterList.concat(res.map((item) => {
            item.title = item.columnName
            item.name = item .id
            return item
          }))
        }

      )
    },
    // 参数文章
    eventDelArticle(index) {
      this.artList.splice(index, 1)
    }
  },
  created() {
    dplus_Click("点击事件", {
      "事件功能": "文章列表",
      "类型": "互动",
      "事件类别": "非体验",
      "所属平台": "基础平台",
      "合作者ID": this.pid,
      "合作者名称": this.nickName,
    })
    this.$nextTick(() => {
      this.$store.dispatch('GET_PARTNER_ID').then(
        () => {
          this.getColumListArt();
          this.getArticleList();
        }
      )

    })
  }
}
</script>
<style lang="stylus">
.ArticleList {

  .a-c-item {
    border-bottom 1px solid #e5e5e5
  }
  >.a-footer {
    padding 60px 0
  }
}

</style>
