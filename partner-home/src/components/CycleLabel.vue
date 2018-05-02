<template>
  <div id="CycleLabel" class="CycleLabel">
    <div class="section-label">
      <span
          v-for="(val, key) in list"
          @click="updateVal(key)"
          :class="[showCycle === key? 'active': '']"
      >{{val}}</span>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'CycleLabel',
    props: {
      value: {

      },
      list: {
        type: Object,
        default() {
          return {
            week: '周',
            month: '月',
            halfYear: '半年',
            year: '年'
          }
        }
      }
    },
    computed: {
      showCycle() {
        return this.value
      }
    },
    data() {
      return {
        msg: 'this is CycleLabel',

      }
    },
    methods: {
      updateVal(key) {
//        this.$store.commit('UPDATE_SHOWCYCLE', key)
        this.$emit('input', key)
      }
    }
  }
</script>
<style lang="stylus">
  .CycleLabel {
   .section-label {
      display: inline-block;
      float: right;
      padding-right: 20px;
    }

   .section-label span{
      display: inline-block;
      border: 1px solid #cccccc;
      padding: 0 12px;
      margin: 0 5px;
      border-radius: 2px;
      cursor: pointer
    }

   .section-label .active {
      background: #2c9cde;
      border: 1px  solid #2c9cde;
      color: white;
    }

   .section-label span:hover {
      background: #2c9cde;
      border: 1px  solid #2c9cde;
      color: white;
    }
  }
</style>