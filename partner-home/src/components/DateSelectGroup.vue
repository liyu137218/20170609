<template>
  <div id="DateSelectGroup" class="DateSelectGroup">
    <date-picker
        :date="value.startTime"
        :option="optionsStart"
        :limit="limitStart"
    ></date-picker>
    <span class="d-split">{{split}}</span>
    <date-picker
        :date="value.endTime"
        :option="optionsEnd"
        :limit="limitEnd"
    ></date-picker>
  </div>
</template>
<script>
  export default {
    name: 'DateSelectGroup',
    props: {
      split: {
        type: String,
        default() {
          return '--'
        }
      },
      value: {
        required: true
      },
      dateOptionsStart: {
        type: Object,
        default() {
          return {}
        }
      },
      dateOptionsEnd: {
        type: Object,
        default() {
          return {}
        }
      },
      limitStart: {
        type: Array,
      },
      limitEnd: {
        type: Array
      },
    },
    data() {
      return {
        msg: 'this is DateSelectGroup',

        defaultOptions: {
          type: 'day',
          week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          format: 'YYYY-MM-DD',
          placeholder: '2017-12-12',
          inputStyle: {
            'display': 'inline-block',
            'padding': '6px',
            'line-height': '22px',
            'font-size': '16px',
            'border': '1px solid rgba(0, 0, 0, 0.2)',
            'color': '#033333',
            'box-sizing': 'border-box',
            'width': '130px',
            'background-image': `url(${require('../assets/icon_datepicker.png')})`,
            'background-repeat': 'no-repeat',
            'background-position': 'right 8px center',
            'cursor': 'pointer'
          },
          color: {
            header: '#ccc',
            headerText: '#f00'
          },
          buttons: {
            ok: '确定',
            cancel: '取消'
          },
          overlayOpacity: 0.5, // 0.5 as default
          dismissible: true // as true as default
        },
      }
    },
    computed: {
      optionsStart() {
        return Object.assign({},this.defaultOptions, this.dateOptionsStart)
      },
      optionsEnd() {
        return Object.assign({},this.defaultOptions, this.dateOptionsEnd)
      },

    },
    watch: {
      value:{
        handler(val) {
          this.$emit('input', val);
        },
        deep: true
      }
    }
  }
</script>
<style lang="stylus">
  .DateSelectGroup {
    .d-split {
      margin 0 10px
    }
  }
</style>