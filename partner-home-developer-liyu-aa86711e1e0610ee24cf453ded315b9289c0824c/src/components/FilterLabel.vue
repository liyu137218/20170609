<template>
  <div class="FilterLabel">
    <div 
      class="a-head-con"
      v-for="item in label">
        <span
        @click="eventClick(item.name)"
        :class="['a-head-list',activeIndex == item.name?'a-head-list-active':'']" 
        >{{item.title}}</span>
      </div>
  </div>
</template>
<script>
export default {
  name: 'FilterLabel',
  props: ['label', 'value'],
  data() {
    return {
      activeIndex: this.value
    }
  },
  methods: {
    eventClick(name) {
      this.activeIndex = name;
      this.$emit('input', name)
    }
  }
}
</script>
<style lang="stylus">
.FilterLabel {
  padding 13px 0
  display flex;
  .a-head-con {   
    border-right 1px solid #d2d2d2
    padding 0 13px
  }
  .a-head-list {
    
    padding 2px 6px
    border-radius 4px
    cursor pointer
  }
  .a-head-list:hover {
    background #378fff
    color #fff
  }
  :last-child {
    border none
  }
  .a-head-list-active {
    background #5d9cec
    color #fff
   
  }
}
</style>