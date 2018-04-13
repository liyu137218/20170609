<template>
  <div id="Select" class="Select">
    <div class="selecrGrupop">
      <div class="s-select">
        <div class="s-show no-select"
          @click="eventClickSelect"
        >
          {{selectName}}
          <span class="s-icon">
            <span ref="selectArrow" :class="['s-arrow',show?'':'s-arrow-show']"></span>
          </span>

        </div>
        <ul class="s-options" v-show="show">
          <li
              v-for="option in options"
              @click="eventSelectList(option.id)"
              class="option-list no-select">
            {{option.name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Select',
    props: {
      options: {
        type: Array,
        default() {
          return ([
            {
              id: 1,
              name: 'test'
            }])
        }
      },
      value: {
      },
      diyStyle: {
        type: Object,
        default() {
          return({
            width: '240px'
          })
        }
      }
    },
    data() {
      return {
        msg: 'this is Select',
        show: false,
        id: ''
      }
    },
    computed: {
      selectName() {
        let [str] = this.options.filter(({id}) => {
          return id === this.value
        }).map(({name}) => { return name});

        if(!str && this.options[0]) {
          this.$emit('input', this.options[0].id)
        }

        return str;
      }
    },
    methods: {
      eventClickSelect(e) {
        if(this.options.length > 0) {
          this.show = !this.show;
        }
      },
      eventSelectList(id) {
        this.show = false;
        this.id = id;
      },
      setStyle() {
        const dom = this.$el;
        const style = this.diyStyle;
        for (let i in style) {
          dom.style[i] =  style[i]
        }
      }
    },
    watch: {
      // show(val) {
      //   const dom = this.$refs.selectArrow;
      //   if(val) {
      //     dom.style.webkitTransform = 'translate(5px,10px) rotate(180deg)'
      //   } else {
      //     dom.style.webkitTransform = 'translate(5px,10px)'
      //   }
      // },
      id(val) {
        this.$emit('input', val)
      }
    },
    // 生命周期函数
    // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
    mounted() {
      this.setStyle()
    }

  }
</script>
<style lang="stylus">
  .Select {
    display flex
    align-items center
    border 1px solid #cccccc
    box-sizing border-box
    .selecrGrupop {
      width 100%
      display flex
      align-items center
      box-sizing border-box
      .s-select {
        width 100%
        height 30px
        position relative
        box-sizing border-box
      }
      .s-options {
        border 1px solid #cccccc
        width 100%
        box-sizing content-box
        position absolute
        top 30px
        left -1px
        z-index 999999
        background #fff
        li {
          height 30px
          line-height 30px
          padding-left 10px
          cursor pointer
        }
        li:hover {
          background #ccc
        }
      }

      .s-show {
        width 100%
        line-height 30px
        padding-left 10px
        box-sizing border-box
      }

      .s-icon {
        float right
        display inline-block
        box-sizing border-box
        height 100%
        width 30px
        background #f4f4f4
        border-left 1px solid #ccc
        position relative
      }
    // 箭头符号
      .s-arrow {
        display inline-block
        border: 10px solid transparent;
        border-top: 10px solid #aaaaaa;
        transform translate(5px,10px);
        transition all .3s linear
        transform-origin 50% 25%
        cursor pointer
      }

      .s-arrow-show {
        transform translate(5px,10px) rotate(180deg)
      }
    }
  }
</style>