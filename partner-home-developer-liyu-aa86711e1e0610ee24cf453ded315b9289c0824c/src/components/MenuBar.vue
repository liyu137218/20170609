<template>
  <div id="MenuBar" class="MenuBar">
    <header class="menu-header">
      <div class="menu-header-img">
        <img @click="gotoUserCenter" title="个人中心" :src="teacherInfo.photo" alt="">
        <a href="http://i.hexun.com/newHome/set/userinfo"
           target="_blank" class="menu-header-img-edit">
          <img src="../assets/editor.png" alt="">
          编辑
        </a>
      </div>
      <p class="menu-header-name">
        {{teacherInfo.nickName || teacherInfo.nickname}}
        <img v-if="userLevel === 2" src="../assets/icon_v.png" alt="">
      </p>
      <a  @click="eventGotoRetg" class="menu-header-link">
        增加我的资质
      </a>
      <div class="menu-header-btnGroup">
        <button v-tooltip.bottom="selectTags.biaode">标的</button>
        <button v-tooltip.bottom="selectTags.method">方法</button>
      </div>
    </header>
    <ul class="menu-lists" >
      <li :class="['menu-container', 
        path == '/Index/WXGZSPZ' && value.name == 'WXGZSPZ'?'wechatStudio-active':'',
        value.name == 'WXGZSPZ'?'wechatStudio':'',]"
        
        v-for="(value, key, index) in menuInfo.menuMap">
        <p :class="[value.solo?'menu-index':'menu-lists-title']">
          <img v-if="value.icon" :src="value.icon" alt="">
          <a
              @click="eventFlash(value.path)"
              v-if="value.solo"

              >{{value.title}}</a>
          <span v-if="!value.solo">{{value.title}}</span>
        </p>
        <div class="listsub" v-if="value.children ">
          <div v-for="listSub in value.children" v-if="listSub.showEnv >= env">
            <a :class="['listsub-item','']"
              @click="eventFlash(`${value.path}/${listSub.path}`)"
              ><span v-html="listSub.title"></span></a>
          </div>
        </div>
      </li>
    </ul>
    <footer class="menu-footer">
      <div class="menu-footer-btn">
        <a :href="menuInfo.footer.button.link">
          {{menuInfo.footer.button.name}}
        </a>
      </div>
      <div class="menu-footer-img">
        <img :src="menuInfo.footer.codeImg" alt="">
        <!--<p>-->
        <!--{{menuInfo.footer.desc}}-->
        <!--</p>-->
      </div>
    </footer>
  </div>
</template>
<script>
  const img = require('../assets/logo.png');
  import {menuMap} from '../router/routerMap';
  export default {
    name: 'MenuBar',
    data() {
      return {
        menu: '直播室管理', // 展示的菜单
        msg: 'this is menu?',
//        userInfo: {
//          name: '正宗好人',
//          img: img
//        },
        menuInfo: {
          menuMap,
          footer: {
            button: {
              name: '返回个人中心',
              link: 'http://zhibo.hexun.com/user/profile.html'
            },
            codeImg: require('../assets/co_parter.png'),
//            desc: '扫一扫，手机做直播'
          }
        },

      }
    },
    computed: {
      isBindPhone() {
        return this.$store.state.isBindPhone
      },
      env () {
        return this.$store.state.config.env
      },
      path() {
        return this.$route.path
      },
      webRetg() {
        return this.$store.state.webRetg
      },
      webPar () {
        return `${this.$store.state.config.cmp}partner/request.html`
      },
      teacherInfo() { 
        return this.$store.state.teacherInfo
      },
      userLevel() {
        return this.$store.state.userLevel
      },
      pid() {
        return this.$store.state.partnerId;
      },
      selectTags() {
        const selectTage = this.$store.state.teacherInfo.selecttag;
        const biaode = [];
        const method = [];
        if(selectTage && Array.isArray(selectTage)) {
          selectTage.forEach((item) => {
            if(item.tagType == 1) {
              biaode.push(item.tag)
            } else {
              method.push(item.tag)
            }
          })
        }

        function getHtmlStr(arrStr) {
          let htmlStr = ' ';
          if(arrStr.length > 0) {
              arrStr.forEach((item) => {
            htmlStr += `<span>${item}</span>`
          })
          }
          
          return htmlStr;
        }
       
        return {
          biaode: {
            content: getHtmlStr(biaode),
            classes: 'menu-header-tips',
            trigger : 'hover'
          },
          method: {
            content: getHtmlStr(method),
            classes: 'menu-header-tips',
            trigger : 'hover'
          }
        }
      },
      partnerLevel () {
        return this.$store.getters.partnerLevel
      }
    },
    methods: {
      switchMenu(name) {
        this.menu = name
      },
      createdTips(Array) {
        let outerHtml;
      },
      eventGotoRetg() {

        if(this.userLevel === 3) { // 如果是被降级
          this.$store.dispatch('OPEN_SYS_DIALOG', {
            title: '系统提示',
            errorMsg: '您已被降级为直播人',
            type: 'warn',
            // linkHref: state.webRetg,
            linkText: '请联系客服：010-85697400'
          });
          
        }else if(this.userLevel === 2) {
          this.$store.dispatch('OPEN_SYS_DIALOG', {
            title: '系统提示',
            errorMsg: '您已经是投顾',
            
          });
        } else if (this.partnerLevel === 3) { // 名家
          window.open(this.webPar)
        } else {
          window.open(this.webRetg)
        }
       
      },
      upgradeTeacher () {
        this.$store.dispatch('OPEN_SYS_DIALOG', {
          title: '系统提示',
          errorMsg: '您还不是讲师',
          type: 'warn',
          linkHref: `${this.$store.state.config.cmp}partner/request.html`,
          linkText: '马上成为讲师'
        });
      },
      eventWeituo () {
        if(this.teacherInfo.Partner.openEntrust === 0) {
          this.$store.dispatch('OPEN_SYS_DIALOG', {
            title: '系统提示',
            errorMsg: '您当前未开通委托账户权限，请联系客服申请',
            type: 'warn',
            linkText: '客服热线：010-85696800'
          });
        } else {
          window.open(this.$store.state.config.weituo)
        }
      },
      eventFlash(path) {
        if(path === 'ZhInfo') {
          if(!this.isBindPhone) {
            this.$store.dispatch('CHECKOUT_BINGPHONE');
            return false;
          }
        }
        this.$router.push(`/Index/${path}`);

        this.checkoutLevel(path);
        

      },

      checkoutLevel (path) {
        if(this.userLevel === 2) { // 如果是投顾 直接跳转
          this.tougujump(path);
          if(path == 'AllProduct/Weituo' || path == '/Index/AllProduct/Weituo') {
            this.eventWeituo();
          }
        } else {
          // 提示
          this.otherJump(path);
        } 

      },
      tougujump(val) {
        switch(val) {
          case 'Guandianguanli': 
            window.open('http://tg.hexun.com/addarticle.aspx')
            break;
          case 'AllProduct/Wendaguanli':
            window.open('http://tg.hexun.com/manage/askanswer.aspx')
            break;
          default:
            break;
        }
      },
      otherJump(val) {
         switch(val) {
          case 'Guandianguanli': 
            // tishi
            this.$store.dispatch('UPGRADE');
            break;
          case 'AllProduct/Wendaguanli':
             // tishi
            this.$store.dispatch('UPGRADE');
            break
          case 'Bowen': 
            window.open(`http://${this.pid}.blog.hexun.com/`)
            break;
          case 'AllProduct/Stock':
            if(this.partnerLevel === 3 ) { // 名家
              this.upgradeTeacher();
            }
            break;
          case 'AllProduct/Weituo':
            this.$store.dispatch('UPGRADE');
            break;

          default:
            break;
        }
      },
      // 去個人中心
      gotoUserCenter () {
        setTimeout(() => {
          location.href = `http://caidao.hexun.com/${this.pid}/index.html`
        }, 300)
      }
    },
    mounted () {
      
      if(this.$route.name == 'AllProductWeituo') {
        let timer = setInterval(() => {
          
          if(this.teacherInfo) {
            console.log(this.$route.path)
            this.checkoutLevel(this.$route.path);
            clearInterval(timer);
          }
        }, 500)
        
      }
    }
  }
</script>
<style lang="stylus">
  .headerCommon{
    width 124px
    height 27px
    line-height 27px
    margin 6px 0
    box-sizing border-box
  }
  .MenuBar {
    position relative
    border: 1px solid #E5E5E5;
    width: 200px;
    box-sizing border-box
    background: #fff;
    text-align: center;
    font-size 16px
    .router-link-active {
      // border-left 4px solid #ee5050 !important
      position relative
    }
    .router-link-active:before {
      content ''
      display block
      height 15px;
      border-left 4px solid #ee5050;
      position absolute
      top 0
      bottom 0
      margin auto
    }
  
    .menu-header {
      height: 240px;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items center

    }
    .wechatStudio {
      font-weight bold
    }

    .wechatStudio:hover {
      background #dd5050
      font-weight bold
      a {
        color #fff !important;
      }

    }
    .wechatStudio-active {
      background #ee5050
      a {
        color #fff !important;
      }
    }
    .menu-header-img {
      width: 120px;
      height: 120px;
      margin: 0 auto;
      border-radius: 50%;
      border: 1px solid red;
      overflow: hidden;
      position relative
      img {
        height: 120px;
        width: 120px;
        cursor pointer
      }

      .menu-header-img-edit {
        position absolute
        bottom 10px
        left -15px
        right -15px
        width 65px
        height 24px
        background #f7f7f7
        margin auto
        display flex
        justify-content center
        align-items center
        color #2c9cde
        cursor pointer
        box-sizing border-box
        img {
          width 16px
          height 16px
          margin-right 6px
        }
      }
      .menu-header-img-edit:hover {
        background #eaeaea
      }
    }

    .menu-header-name {
      @extend .headerCommon
      margin 0
      color #b6b6b6
      display flex
      justify-content center
      align-items center
      img {
        width 22px
        height 22px
      }
    }

    .menu-header-link {
      @extend .headerCommon
      display block
      border 1px solid #ee5050
      color #ee5050
      cursor pointer
    }
    .menu-header-link:hover {
      border-color #dd5050
      color #dd5050
    }
    .menu-header-btnGroup {
      @extend .headerCommon
      display flex
      justify-content space-between
      
      button {
        color #b6b6b6
        background transparent
        height 100%;
        padding 0 10px
        border 1px solid #b6b6b6
        cursor pointer
        font-size 16px
      }
      button:hover {
        border-color #666
        color #666
      }
    }

  

    .menu-index {
      display block
      width 100%
      box-sizing border-box
      cursor pointer
      // height 40px
      // line-height 40px
      display block
      margin 10px 0
      font-size 18px
      a {
        display block
        font-size 18px
        color #2c3e50
      }
    }
    .menu-index:hover {
      color #dd5050
      a {
        color #dd5050
      }
    }

     .menu-index:hover {
        // border-left 4px solid #ee5050 !important
        position relative
      }
      .menu-index:hover:before {
        content ''
        display block
        height 15px;
        border-left 4px solid #ee5050;
        position absolute
        top 0
        bottom 0
        margin auto
      }

    // .menu-index-active {
    //   a {
    //     border-left 4px solid #ee5050
    //     color #ee5050
    //   }
    // }
    .menu-lists {
      >li:first-child {
       border-top 1px solid #e5e5e5
      }
      .menu-container {
        border-bottom  1px solid #e5e5e5
        padding 8px 0
      }
      .menu-lists-title {
        display flex
        justify-content flex-start
        align-items center
        height 40px
        position relative
        padding-left 70px
        font-size 18px
        color #000
        img {
          margin-right 5px;
          position absolute
          left 70px - 25px
          top 11px
        }

      }
      .listsub {
        .listsub-item {
          display flex
          justify-content flex-start
          align-items center
          // height 40px
          // line-height 40px
          margin 10px 0
          // position relative
          cursor pointer
          font-size 16px
          color #666
          span {
            padding-left 70px;
          }
        }
        .listsub-item:hover {
          color #dd5050
        }
        .listsub-item:hover {
          // border-left 4px solid #ee5050 !important
          position relative
        }
        .listsub-item:hover:before {
          content ''
          display block
          height 15px;
          border-left 4px solid #ee5050;
          position absolute
          top 0
          bottom 0
          margin auto
        }
      }
    }
    .menu-footer {
      padding 20px 0
    }
    .menu-footer-btn {
      

    //padding-bottom: 10px;

      a {
        padding: 8px 15px;
        border-radius: 5px;
        background: #ee5050;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
      }

      a:hover {
        background: #dd5050;
      }
    }

    .menu-footer-img {
      padding: 20px 0;
      img {
        height: 152px;
        width: 135px;
      }
    }
  }
</style>