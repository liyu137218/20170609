<template>
  <div id="TableList" class="TableList">
    <div
          class="t-content"
          v-for="(item,index) in data">
      <div :class="['t-c-text', thead&&i ===0?'t-c-nav':'']" v-for="(v, i) in item">

        <input
            v-model="valueArr"
            v-if="i!==0 && check && index === 'id'"
            :value="v"
            type="checkbox">
        <span v-else>{{v}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'tableList',
    props: {
      tableList: {
        type: Array,
        required: true
      },
      thead:{ // 是否需要表头
        type: Boolean,
        default: false,
      },
      check: { // 是否出现复选框
        type: Boolean,
        default: false,
      },
      value: { // 返回复选框选中的值
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        msg: 'this is tableList',
        valueArr: []
      }
    },
    computed: {
      checkArray() {
        return this.value
      },
      data() {// 把表格数据按列分割
        const obj = {
        };
        if(Array.isArray(this.tableList)) {
          this.tableList.forEach((item, index ) => {
            for(let i in item) {
              if(typeof obj[i] === "undefined") {
                obj[i] = [].concat(item[i])
              } else {
                obj[i].push(item[i])
              }
            }
          })
        }

        return obj
      },
    },
    methods: {

    },
    watch: {
      checkArray(nv) {
        this.valueArr = nv;
      },
      valueArr(nv) {
        this.checkArray = nv;
        this.$emit('input', nv);
      }
    }
  }
</script>
<style lang="stylus">
  .TableList {
    display flex
    .t-content {
      flex 1
    }
    .t-content:first-child {
      .t-c-nav {
        margin-left 0!important
        padding-left 30px!important
      }
      .t-c-text {
        margin-left 20px
        padding-left 10px
        box-sizing border-box
        justify-content flex-start

      }
    }
    .t-content:last-child {

      .t-c-text {
        margin-right  20px
        padding-right  10px
        box-sizing border-box
        justify-content flex-end

      }
    }

    .t-c-text {
      height 50px
      display flex
      align-items center
      justify-content center
      border-bottom 1px dashed rgba(229,229,229,1)
      box-sizing border-box

      input[type="checkbox"] {
        box-sizing border-box
        height 17px
        width 17px
        background #fff
      }
    }

    .t-c-nav {
      height 30px
      background #e9f5fc
    }

  }
</style>