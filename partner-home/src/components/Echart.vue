<template>
  <div id="Echert" class="Echert">

  </div>
</template>
<script>
  const echarts = require('echarts');

  export default {
    name: 'Echert',
    props: {
      styles: {
        type: Object,
        default() {
          return ({
            'width': '788px',
            'height': '500px'
          })
        }
      },
      options: {
        type: Object,
      }
    },
    data() {
      return {
        msg: 'this is Echert',
      }
    },
    methods: {
      setDomStyles(dom, styles = this.styles) {
        for(let i in styles) {
          dom.style[i] = styles[i]
        }
      },
      echartInit(dom) {
        const E = echarts.init(dom);
        E.setOption(this.options)
      }
    },
    watch: {
      options() {
        this.echartInit(this.$el)
      }
    },
    mounted() {
      const dom = (this.$el);
      this.setDomStyles(dom);
//
//      // 初始化echart 传入dom
      if(this.options) {
        this.echartInit(this.$el)
      }

    },

  }

</script>
<style lang="stylus">
  .Echert {

  }
</style>