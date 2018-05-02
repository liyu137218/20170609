<template>
  <div id="Labels" class="Labels">
    <LabelNav
        @activeChange="activeChange"
        :activeIndex="activeIndex"
        :lists="lists"></LabelNav>
    <CourseClass v-show="activeIndex === 'CourseClass'"></CourseClass>
    <WordInteraction  v-show="activeIndex === 'WordInteraction'"></WordInteraction>
  </div>
</template>
<script>
  import LabelNav from '@/components/LabelNav'
  import CourseClass from '@/components/CourseClass'
  import WordInteraction from '@/components/WordInteraction'
  export default {
    name: 'Labels',
    components: {
      LabelNav,
      CourseClass,
      WordInteraction
    },
    data() {
      return {
        msg: 'this is Tabs',
        activeIndex: 'CourseClass',
        lists: [
          {
            title: '文字互动',
            compontentName: 'WordInteraction'
          },
          {
            title: '培训课程',
            compontentName: 'CourseClass'
          }
        ]
      }
    },
    methods: {
      activeChange(val) {
        if(val !== this.activeIndex) {
          this.activeIndex = val
        }
      }
    },
    created() {
      if(this.$router.currentRoute.query.course === 'true') {
        this.activeChange('CourseClass')
      }
    },

  }
</script>
<style lang="">
  .Labels {

  }
</style>