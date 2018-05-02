<template>
  <div id="CommonHeader" class="CommonHeader">
    <div class="top">
      <div class="com-container">
        <ul class="top-left">
          <li v-for="item in topList.left"
            @mouseout.self="eventCodeHide(item.name)"
            @mouseover.self="eventCodeShow(item.name)" :class="item.class">
            <a
              @mouseout.self="eventCodeHide(item.name)"
              @mouseover.self="eventCodeShow(item.name)"
             :href="item.link">
              {{item.name}}
              <transition name="code">
                <div v-if="item.name==='手机客户端'&& codeShow " class="fhone-upload">
                  <h4 class="fhone-tit"><span>学投资</span>,上财道</h4>
                  <p class="mt15"><img src="http://zb.hexun.com/static/images/zb-ewm.jpg" alt=""></p>
                  <p class="sty2">扫一扫下载“财道”APP</p>
                </div>
              </transition>
              
            </a>
          </li>
        </ul>
        <ul class="top-right">
          <li v-if="!isLogin">
            <a v-on:click="eventLIRshow('LOGIN')">登录</a>
            <a v-on:click="eventLIRshow('REGISTER')">注册</a>
          </li>
          <li v-else >
            <a >{{nickname}}</a>
            <a v-on:click="eventExit()">退出</a>
          </li>
          <li v-for="item in topList.right">
            <a :href="item.link" v-text="item.name"></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <div id="navigation" class="navigation">
        <ul class="nav-container">
          <li class="nav-img">
            <img src="../assets/zb-logo.jpg" alt="">
          </li>
          <li class="search-group">
            <input id="input_val"
             class="search-input" type="text" 
              v-bind:placeholder="placeholder"
              v-model.trim="searchQuery"
            
              >
            <button id="btnsearch"  class="search-btn" @click="eventSearchBtn">搜索</button>
            <ul class="search-group-searchReslut" v-if="searchReslut">
              <li v-for="item in compliteSearchReslut">
                <a :href="`${oldHost}/teacher/admin/searchList.html?keyWord=${item.keyWord}`" target="_blank">{{item.ownerNick}}</a>
              </li>
            </ul>
          </li>
          <li :class="['nav-list', item.name == nav ? 'nav-active' : '']" @click="eventSwitchNav(item.name)"  v-for="item in navLists">
            <a :href="item.path">{{item.name}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {config} from '../config';
  export default {
    name: 'CommonHeader',
    data() {
      return {
        msg: 'this is top',
        codeShow: false,
        topList: {
          left: [
            {
              name: '手机客户端',
              link: '',
              class:'phoneCode'
            },
            {
              name: '申请直播人',
              link: `${config.web}/partner/request.html`
            }

          ],
          right: [
            {
              name: '我的钱包',
              link: 'https://epay.hexun.com/site/my/home.htm?fl=1'
            },
            {
              name: '股票首页',
              link: 'http://stock.hexun.com/'
            },
            {
              name: '投资学院',
              link: 'http://px.hexun.com/'
            },
            {
              name: 'A股雷达',
              link: 'http://leida.zhibo.hexun.com/rest/aguleida.aspx'
            }

          ]
        },
        nav: '首页', // 当前展示的模块
        placeholder: '实盘直播 领你紧跟投资热点',
        navLists: [
          {
            name: '首页',
            path: '/'
          },
          {
            name: 'A股',
            path: 'http://zb.hexun.com/stockCategory?hdtagIds=131&hdisLine=0'
          },
          {
            name: '美股',
            path: 'http://zb.hexun.com/stockCategory?hdtagIds=134&hdisLine=0'
          },
          {
            name: '外汇',
            path: 'http://zb.hexun.com/stockCategory?hdtagIds=246&hdisLine=0'
          }
        ],
        searchQuery: '',
        searchQueryIsDirty: false,
        isCalculating: false,
        searchReslut: '',
        }
    },
  
    computed: {
      isLogin() {
        return this.$store.state.isLogin;
      },
      nickname() {
        return this.$store.state.userInfo.nickname
      },
      searchIndicator(){
        if (this.isCalculating) {
          return 'recalculating' 
        } else if (this.searchQueryIsDirty) {
          return 'typing'
        } else {
          return 'done'
        }
      },
      compliteSearchReslut() {
        const searchReslut = this.searchReslut;
        let arr = [];
         if(searchReslut && Array.isArray(searchReslut.roomEsList)) {
            arr = searchReslut.roomEsList.map((item) => {
              return {
                ownerNick: item.ownerNick,
                keyWord: escape(item.ownerNick)
              }
            })
         }

         return arr;
      },
      oldHost() {
        return this.$store.state.oldHost;
      },
    },
    watch: {
      searchQuery () {
          this.searchQueryIsDirty = true
          this.expensiveOperation()
      },
      searchIndicator(val) {
        if(val === 'done') {
          this.getSerachInfo();
        }
      },
      

    },
    methods: {
      eventLIRshow(type) {
        this.$store.commit('UPDATE_SLOR',type)
      },
      eventSwitchNav(title) {
        this.nav = title
      },
      eventExit() { // 退出登录
        this.$store.dispatch('EXIT_LOGIN')
      },
      eventSearchBtn() {
        window.open(`${this.oldHost}/teacher/admin/searchList.html?keyWord=${escape(this.searchQuery)}`)
      },
      eventCodeShow(name) {
        if(name === '手机客户端') {
          this.codeShow = true;
        }
      },
      eventCodeHide(name) {
        if(name === '手机客户端') {
          this.codeShow = false;
        }
      },
      expensiveOperation: _.debounce(function () {
          this.isCalculating = true
          setTimeout(function () {
            this.isCalculating = false
            this.searchQueryIsDirty = false
          }.bind(this), 1000)
      }, 500),
      getSerachInfo() {
          this.$store.dispatch('GET_SEARCH', this.searchQuery).then(
            res => {
              this.searchReslut = res;
            }
          )
      },
    
    }
  }
</script>
<style lang="stylus">
  libefore($width, $height, $src) {
  content: ''
  display: inline-block
  width: $width
  height:$height
  margin-right: 10px
  vertical-align: top
  background: $src
  }

  .CommonHeader {
    background: #444444;
    .top {

      .com-container {
        width: 1000px;
        margin: auto;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        height 40px
        font-size 12px
        ul {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align:center;
          -ms-flex-align:center;
          align-items:center;
          height: 40px;
          li {
            a {
              color: white;
            }
          }
        }
        .top-left {
          width: 300px;
          -webkit-box-pack: start;
          -ms-flex-pack: start;
          justify-content: flex-start;

          li {
            margin: 0 10px;
            display flex
            align-items center
            padding 5px
            border-top-right-radius 4px
            border-top-left-radius 4px
          }
          li:nth-child(1):before {
            libefore(12px, 20px, url("../assets/icos.gif") 0 -29px no-repeat)
          }
          li:nth-child(2):before {
            libefore(20px, 20px, url("../assets/icos.gif") 0 -55px no-repeat);
          }
           li:nth-child(1):hover:before {
            libefore(12px, 20px, url("../assets/icos.gif") -13px -29px no-repeat)
          }
          .phoneCode {
              position relative
              z-index 20
              .fhone-upload {
                position absolute
                top 30px
                left 0
                z-index 10
                background #fff
                width: 172px;
                // padding: 15px 0 0;
                background: #fff url(http://zb.hexun.com/static/images/phone-bg.jpg) no-repeat bottom left;
                border: solid 1px #e5e5e5;
                border-top: none;
                text-align: center;
                z-index: 100;
                overflow hidden
              }

               .fhone-tit {
                  font-size: 18px;
                  color: #4c4c4c;
                  font-family: "microsoft yahei";
                  font-weight: bold;
                }
                .mt15 {
                  margin-top: 15px;
                }
                .sty2 {
                  line-height: 40px;
                  color: #fff;
                  font-family: "microsoft yahei";
                }
            }
            }

            .phoneCode:hover {
              background #fff
              a {
                color #000
              }

             
            
        }
        .top-right {
          -webkit-box-pack: end;
          -ms-flex-pack: end;
          justify-content: flex-end;
          li {
            padding: 0 10px;
            border-right: 1px white solid;
            cursor pointer
          }
          li:nth-child(1) {
            a {
              display: inline-block;
              margin: 0 5px;
            }
            a:last-child {
              color: #D75A4D;
            }

          }
          li:last-child {
            border: none;
          }
        }
      }
    }
    .bottom {
      $navborderColor = #e74c3c;
      $navborderColorHover = #f34e42;
      $navBackground = #fff;
      .navigation {
        background: #fff;
        box-shadow: 2px 0 3px 3px #cbcbcb;
        .nav-container {
          box-sizing: border-box;
          width: 1000px;
          display: flex;
          margin: 0 auto;
          align-items: center;
          justify-content: space-around;
          font-size: 18px;
        //padding: 5px 0;
        }

        .search-group {
          box-sizing: border-box;
          width: 364px;
          border: 2px solid $navborderColor;
          height: 42px;
          line-height: 42px;
          display: flex;
          position relative

          .search-btn {
            width: 80px;
            background: $navborderColor;
            color: $navBackground;
            cursor: pointer;
            transition: all linear .3s;
          }

          .search-btn:hover {
            background: $navborderColorHover;
          }

          .search-input {
            flex: 1;
            text-indent: 1em;
          }

          .search-input::-webkit-input-placeholder {
            font-size: 18px;
          }
        }

        .search-group-searchReslut {
          position absolute
          top 50px
          width 100%
          text-align left
          z-index 999
          background #fff
          li {
            font-size 14px
            padding 8px 0
            margin 0
            line-height 14px
            width 100%
            a {
              color #333
              display inline-block
              width 100%
            }
          }
          
          li:nth-child(2n-1) {
            background #EEEEEE
          }
          li:hover,li:nth-child(2n-1):hover {
            background #B9D1E9
          }
        }

        .nav-list, .nav-img {
        //height: 100%;
          align-self: stretch;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .nav-list {
          border-bottom: 2px solid $navBackground;
          transition: all linear .3s;
          a {
            color: #333;
          }
        }
        .nav-active, .nav-list:hover {
          border-bottom: 2px solid $navborderColor;
        }

      }
    }
  }


.code-enter-active, .code-leave-active {
  transition: all .3s
  height 216px
}
.code-enter, .code-leave-active {
  height 0
}
</style>