<template>
  <div id="StudioList" class="StudioList">
    <div class="header">
      <span class="button" @click.stop="eventEdit">{{title}}</span>
      <span class="activeTip" v-show="isEdit">拖动排序</span>
    </div>
    <draggable class="draggable"
               v-model="showList"
               :move="checkMove"
               :options="dragOptions">
      <transition-group  class="stu-container"  name="flip-list" tag="div">
        <div :class="[item.className, 'item', item.ismove && isEdit ?'edit': '']"
             :key="item"
             v-for="item in showList">
          <img v-if="!item.ismove" :src="item.imgHover" alt="">
          <img v-else :src="item.img" alt="">
          <p>{{item.name}}</p>
          <transition
              name="TRbutton"
              tag="p">
            <p v-show="item.ismove && isEdit" @click="eventRemove(item.name)" class="button rembutton" key="button">
            </p>
          </transition>
        </div>
      </transition-group>
    </draggable>
    <div class="header">
      <span class="button">已隐藏产品</span>
    </div>
    <div class="cantainer">
      <transition-group  class="stu-container"  name="flip-list" tag="div">
        <div :class="[item.className, 'item', item.ismove && isEdit ?'edit': '']"
             :key="item"
             v-for="item in hiddenList">
          <img :src="item.img" alt="">
          <p>{{item.name}}</p>
          <transition
              name="TRbutton"
              tag="p">
            <p v-show="isEdit" @click.stop="eventAdd(item.name)" class="button addbutton " key="button">
            </p>
          </transition>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
  import draggable from 'vuedraggable';

  export default {
    name: 'StudioList',
    data() {
      return {
        msg: 'this is StudioList',
        title: '管理',
        isEdit: false, // 是否处于编辑模式
        dataList: [
          {
            id: 'index',
            name: '首页',
            className: 'shouye',
            img: require('../assets/icon_index_666.png'),
            ismove: false, // 是否可移动
            imgHover: require('../assets/icon_index_ee5050.png'),
          },
          {
            id: 'course',
            name: '课程',
            className: 'kecheng',
            ismove: true,
            img: require('../assets/icon_kecheng_666.png'),
            imgHover: require('../assets/icon_kecheng_ee5050.png'),
          },
          {
            id: 'blog',
            name: '博文',
            className: 'bowen',
            ismove: true,
            img: require('../assets/icon_bowen_666.png'),
            imgHover: require('../assets/icon_bowen_ee5050.png'),
          },
          {
            id:'viewpoint',
            name: '观点',
            className: 'guandian',
            ismove: true,
            img: require('../assets/icon_guandian_666.png'),
            imgHover: require('../assets/icon_guandian_ee5050.png'),
          },
          {
            id: 'account',
            name: '账户',
            className: 'zhanghu',
            ismove: true,
            img: require('../assets/icon_zhanghu_666.png'),
            imgHover: require('../assets/icon_zhanghu_ee5050.png'),
          },
          {
            id: 'aplan',
            name: 'A股雷达',
            className: 'jihua',
            ismove: true,
            img: require('../assets/icon_jihua_666.png'),
            imgHover: require('../assets/icon_jihua_ee5050.png'),
          },
        ],
        showList: [

        ],
        hiddenList: [

        ]
      }
    },
    computed: {
      dragOptions() {
        return  {
          animation: 0,
          group: 'description',
          disabled: !this.isEdit,
          ghostClass: 'ghost'
        };
      },
      userLevel() {
        return this.$store.state.userLevel
      },

    },
    components: {
      draggable,
    },
    methods: {
      eventEdit(e) {
        // if(this.userLevel !== 1) {
        //    this.$store.dispatch('OPEN_SYS_DIALOG',
        //       {title: '系统提示', errorMsg: '当前用户无操作权限'});
        //   return;
        // }
        let listStr;
        this.isEdit = !this.isEdit;
        if(!this.isEdit) {
          listStr = this.showList.map(({id}) => {
            if(id !== 'index') {
              return id
            }
          }).filter((val) => { return val?true:false;}).join();

          this.$store.dispatch('SET_STUDIO_NAV', listStr)
        }
      },
      checkMove({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (!relatedElement || relatedElement.ismove) && draggedElement.ismove
      },
      eventRemove(name) {
        console.log('我要删除你了');
        this.showList.forEach((val, index)=>{
          if(val.name === name) {
            this.showList.splice(index, 1);
            this.hiddenList.push(val);
          }
        })
      },
      eventAdd(name) {
        console.log('我要添加你了');
        this.hiddenList.forEach((val, index)=>{
          if(val.name === name) {
            this.hiddenList.splice(index, 1);
            this.showList.push(val);
          }
        })
      },
      getArr(Arr) {
        const newArr = [];
        if(Arr && Array.isArray(Arr)) {
          Arr.forEach((sval) => {
            this.dataList.forEach((lval) => {
              if(sval.id === lval.id) {
                lval.name = sval.name
                newArr.push(lval)
              }
            })
          })
        }
        return newArr;
      }
    },
    watch: {
      isEdit: function (val) {
        this.title = val ? '完成': '管理'
      }
    },
    // 生命周期函数
    created () {
      this.$store.dispatch('GET_PARTNER_ID').then(
        () => {
          this.$store.dispatch('GET_STUDIO_NAV').then (
            res => {
              this.showList = this.getArr(res.show);
              // this.showList.unshift(this.dataList[0]); // 首页也从后台获取2017年6月19日14:27:09
              console.log(res.hide)
              this.hiddenList = this.getArr(res.hide)
            }
          )
        }
      )
    }
  }
</script>
<style lang="stylus">
  @import "../assets/styles/common.styl"
  .StudioList {
    >.header {
      text-align left
      border-bottom 1px solid #e5e5e5
      >.button {
        @extend .no-select
        display inline-block
        padding 17px 15px
        border-bottom 2px solid #e74c3c
        color #747474
        transform translateY(1px);
        cursor pointer

      }
      >.activeTip {
        float right
        padding 17px 15px
      }
    }
    >.draggable {

    }
    .stu-container {
      width 788px;
      display flex
      align-items center
      flex-wrap wrap
      >.item {
        width 100px
        height 100px
        display flex
        justify-content center
        flex-direction column
        align-items center
        margin 28px 14px
        border 1px solid #eee
        transition all .3s linear;
        @extend .no-select
      }
      >.edit {
        position relative
        overflow hidden
        .button {
          width 16px
          height 16px
          position absolute
          z-index 99
          top 6px
          right 6px
          border-radius 50%
          display flex
          justify-content center
          align-items center
          padding 0
          background #ddd
          transform-origin 50% 50%
          transition: all .1s linear
        }
        .rembutton:after {
          content ''
          display block
          width 8px
          height 2px
          background #fff

        }
        .rembutton:hover {
          background #ee5050
          transform rotate(180deg)
        }

        .addbutton:after {
          content ''
          display block
          width 8px
          height 2px
          background #fff
          transform translatex(-1px)
        }
        .addbutton:before {
          content ''
          display block
          width 2px
          height 8px
          background #fff
          transform translatex(4px)
        }
    
        .addbutton:hover {
          background #ee5050
          transform rotate(90deg)
        }
      }
      >.edit:hover {
        width 110px
        height 110px
        margin 18px 6px
        border none
        box-shadow 1px 1px 2px 1px #fef0f0, -1px -1px 2px 1px #fef0f0
        cursor pointer

      }
    }
  }

  .flip-list-move {
    transition: transform 1s;
  }

  .TRbutton-enter-active{
    transition: all .3s linear
  }
  .TRbutton-enter{
    transition: all .3s linear

    opacity: 0
    transform translate(20px, -20px)
  }

  .TRbutton-leave-active {
    transition: all .3s linear

    transform translate(10px, -10px)
  }
</style>