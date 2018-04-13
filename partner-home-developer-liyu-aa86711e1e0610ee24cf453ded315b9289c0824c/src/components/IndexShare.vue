<!--首页 分享-->
<template>
  <div id="IndexShare" class="IndexShare">
    <div :class="['item', item.disable]" v-for="item in comData">
      <a @click="clickEvent(item.name)"  :target="item.type" :class="[item.className]">{{item.name}}</a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'IndexShare',
    data() {
      return {
        msg: 'this is IndexShare',
        data: [
          {
            name: '发财圈',
            className: 'caiquan',
            disable: 'disable',
            type: '_blank'
          },
          {
            name: '发文章',
            className: 'bowen',
            type: '_self'
            // link: 'http://post.blog.hexun.com/28140828/newpostblog.aspx'
          },
//          {
//            name: '发观点',
//            className: 'guandian',
//            link: 'http://tg.hexun.com/addarticle.aspx',
//            type: '_blank'
//          },
          {
            name: '发计划',
            className: 'jihua',
//            disable: 'disable',
            link:'http://zhibiao.hexun.com/InventorManage/SendAPlan',
            type: '_blank'
          }

        ]
      }
    },
    computed: {
      isBindPhone() {
        return this.$store.state.isBindPhone
      },
      userLevel() {
        return this.$store.state.userLevel;
      },
      comData() {
        const data = this.data;
        // remove faguandian
//        if(this.userLevel !== 2) {
//          data[2].disable = 'disable';
//          delete data[2].link;
//        } else {
//          delete data[2].disable
//          data[2].link = 'http://tg.hexun.com/addarticle.aspx';
//        }
//        data[1].link = `#/WriteBlog`
        return data;
      },
    },
    methods: {
      clickEvent(name) {
        if (this.data[1].name == name) {
          this.checkPhone(() => {
            this.$router.push('/WriteBlog')
          })
        } else if (this.data[2].name == name) {
          this.checkPhone(() => {
            location.href = 'http://zhibiao.hexun.com/InventorManage/SendAPlan'
          })

        }
      },
      checkPhone(fn) {
        if(!this.isBindPhone) {
          this.$store.dispatch('CHECKOUT_BINGPHONE');
        } else {
          fn()
        }
      }
    },

  }
</script>
<style lang="stylus">
  .IndexShare {
    display: flex
    height 70px
    border-bottom 1px solid #e5e5e5
    >.item {
      flex 1
      display flex
      align-items center
      justify-content center
      cursor pointer
      a {
        width 100%
        height 100%
        display flex
        align-items center
        justify-content center
        box-sizing border-box
        line-height 38px
        border-right  1px solid #ededed
        color #2a2a2a

      }
      .caiquan {
        background url("../assets/facaiquan.png") 50px center/38px 29px no-repeat
        text-indent 50px
      }
      .bowen {
        background url("../assets/fabowen.png") 50px center/31px 34px no-repeat
        text-indent 45px
      }
      .guandian {
        background url("../assets/faguandian.png") 50px center/33px 34px no-repeat
        text-indent 45px
      }
      .jihua {
        background url("../assets/fajihua.png") 50px center/34px 34px no-repeat
        text-indent 45px
      }
    }
    >.item:last-child {
      p {
        border none
      }
    }
    >.item:hover {
      a {
        color #dd5050
      }
      .caiquan {
        background url("../assets/facaiquanhover.png") 50px center/38px 29px no-repeat
      }
      .bowen {
        background url("../assets/fabowenhover.png") 50px center/31px 34px no-repeat
        text-indent 45px
      }
      .guandian {
        background url("../assets/faguandianhover.png") 50px center/33px 34px no-repeat
        text-indent 45px
      }
      .jihua {
        background url("../assets/fajihuahover.png") 50px center/34px 34px no-repeat
        text-indent 45px
      }
    }
    >.disable {
      cursor default
      a {
         color #c1c1c1
         cursor default
      }
      .caiquan {
        background url("../assets/facaiquandisable.png") 50px center/38px 29px no-repeat
        color #c1c1c1
      }
      .bowen {
        background url("../assets/fabowendisable.png") 50px center/31px 34px no-repeat
        text-indent 45px
      }
      .guandian {
        background url("../assets/faguandiandisable.png") 50px center/33px 34px no-repeat
        text-indent 45px
      }
      .jihua {
        background url("../assets/fajihuadisable.png") 50px center/34px 34px no-repeat
        text-indent 45px
      }
    }
    >.disable:hover {
      a {
        color #c1c1c1
      }
      .caiquan {
        background url("../assets/facaiquandisable.png") 50px center/38px 29px no-repeat

      }
      .bowen {
        background url("../assets/fabowendisable.png") 50px center/31px 34px no-repeat
        text-indent 45px
      }
      .guandian {
        background url("../assets/faguandiandisable.png") 50px center/33px 34px no-repeat
        text-indent 45px
      }
      .jihua {
        background url("../assets/fajihuadisable.png") 50px center/34px 34px no-repeat
        text-indent 45px
      }
    }
  }
</style>