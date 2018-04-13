<template>
  <div class="ArticleManagement">
    <LabelNav
        @activeChange="activeChange"
        :activeIndex="activeIndex"
        :lists="lists">
    </LabelNav>
    <ArticleList v-if="activeIndex == 'wenzhang'"></ArticleList>
    <ColumnManagement  v-if="activeIndex == 'lanmu'"></ColumnManagement>
    <CommentSet v-if="activeIndex == 'comment'"></CommentSet>
  </div>
</template>
<script>
  import {fetch} from '../store/fetch'
  import LabelNav from '@/components/LabelNav'
  import CommentSet from '@/components/CommentSet'
  import ColumnManagement from '@/components/ColumnManagement'
  import ArticleList from '@/components/ArticleList'
  export default {
    name: 'ArticleManagement',
    components: {
      LabelNav,
      ArticleList,
      ColumnManagement,
      CommentSet
    },
    data() {
      return {
        msg: 'this is in',
        activeIndex: 'wenzhang',
      }
    },
    computed: {
       lists() {
        const Arr = [
          {
            title: '文章列表',
            compontentName: 'wenzhang'
          },
          {
            title: '栏目管理',
            compontentName: 'lanmu'
          },
          {
            title: '评论设置',
            compontentName: 'comment'
          }
        ]
        return Arr;
      }
    },
    methods: {
      activeChange(val) {
        if(val !== this.activeIndex) {
          this.activeIndex = val
        }

      },

    },
    created() {
      const navIndex = this.$route.query.activeIndex
      if(navIndex) {
        this.activeIndex = navIndex
      }
    }
    
  }
</script>
<style lang="stylus">
</style>