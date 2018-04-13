<template>
  <div id="WordInteraction" class="WordInteraction">
    <!--直播室统一管理入口 begin-->
    <div class="list">
      <div class="imgContent"><img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACMCAYAAACauYAiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4OEVFMTQzNjJBRjQxMUU3OTJBN0FERjNENzY1RTU5MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4OEVFMTQzNzJBRjQxMUU3OTJBN0FERjNENzY1RTU5MiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg4RUUxNDM0MkFGNDExRTc5MkE3QURGM0Q3NjVFNTkyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg4RUUxNDM1MkFGNDExRTc5MkE3QURGM0Q3NjVFNTkyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+202/rAAADMxJREFUeNrsXQ2MVFcV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"
        alt=""></div>
      <div class="infoContent">
        <div>
          <div class="infoContent-top">
            <div class="flex info"><p class="name"><a :href="TYlinkUrl"
                                                      target="_black">直播室统一管理入口</a></p>
              <div class="desc"><!--<span class="title"></span>-->
                <div class="desc-text">可复制链接提供给助理</div>
              </div>
            </div>
            <!--<div class="flex operating"><a
              href="http://test.zhibo.hexun.com/teacher/admin/vipLiverApply.html?pid=17168021&amp;roomid=10086#edit"
              target="_blank" class="editbtn">编辑</a> <a class="closebtn">关闭直播间</a> <a class="sendbtn">发布广告</a>
            </div>-->
          </div> <!---->
          <div class="desc"><p class="title" v-clipboard:copy="TYlinkUrl" v-clipboard:success="onCopy" v-clipboard:error="onError">{{TYlinkUrl}}</p>
            <p class="desc-text"></p></div>
        </div>
      </div>
    </div>
    <!--直播室统一管理入口 end-->
    <div v-for="list in liveLists" class="list">
      <div class="imgContent">
        <img :src="list.isVip ? imgSrcVip: imgSrc " alt="">
      </div>
      <div v-if="list.isHas" class="infoContent">
        <div v-if="list.auditStatus === 'pass'">
          <div class="infoContent-top">
            <div class="flex info">
              <p class="name"><a :href="list.link" target="_black">{{list.name}}</a></p>
              <div class="desc">
                <span class="title">标的：</span>
                <div class="desc-text">
                  <span v-for="label in list.label" class="label ">{{label}}</span>
                </div>
              </div>
            </div>
            <div class="flex operating">
              <a :href="list.isVip?`${oldHost}/teacher/admin/vipLiverApply.html?pid=${pid}&roomid=${list.roomId}#edit`:`${oldHost}/teacher/admin/freeLiverApply.html?pid=${pid}&roomid=${list.roomId}#edit`"
                class="editbtn"
                target="_blank"
              >编辑</a>
              <a  class="closebtn" @click="eventCloseRoom(list.roomId, list.isOpen)">{{list.isOpen? '关闭直播间' : '打开直播间'}}</a>
              <a @click="pushAD(`${oldHost}/teacher/admin/adRobot.html?pid=${pid}&roomid=${list.roomId}#free`)"
                class="sendbtn">发布广告</a>
            </div>
          </div>
          <div v-if="list.price" class="price">
            <span class="title">价格：</span>{{list.price}}
          </div>
          <div class="desc">
            <p class="title">简介：</p>
            <p class="desc-text">{{list.desc}}</p>
          </div>
        </div>
        <div v-else class="noPassCon">
          <p class="n-title">{{list.isVip?'VIP':'免费'}}<i>（审核中）</i></p>
          <p class="n-desc">我们将在12个小时内完成对直播室的审核！请您耐心等待...</p>
          <p class="n-tel">如有疑问，欢迎致电010-8569-7400咨询。</p>
        </div>
      </div>
      <div v-else class="otherContent">
        <div class="descContent">
          {{list.defalutValue.desc}}
        </div>
        <div class="btnContent">
          <a @click="openWindow(list.defalutValue.href)">{{list.defalutValue.btnText}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {fetch} from '../store/fetch'
  export default {
    name: 'WordInteraction',
    data() {
      return {
        msg: 'this is WordInteraction',
        imgSrc: require('../assets/free.png'),
        imgSrcVip: require('../assets/vip.png'),
        lists: [
//          {
//            name: '大于老师',
//            isOpen: false,
//            isVip: false,
//            defalutValue: {
//              desc: '您还没有开通免费直播室哟',
//              btnText: '开通免费直播室',
//              href: '/'
//            },
//            price: '2000',
//            label: [
//              'A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股','A股',
//              'B股',
//            ],
//            desc: '跑赢大盘的王者，和讯投资学院首席教授，首届博客大赛草根组冠军，和讯投资学院首席教授，首届博客大赛草根组冠军，著选牛股秘籍《猎杀黑马》《过顶擒龙》跑赢大盘的王者，和讯投资学院首席教授，首届博客大赛草根组冠军，和讯投资学院首席教授，首届博客大赛草根组冠军，著选牛股秘籍《猎杀黑马》《过顶擒龙》跑赢大盘的王者，和讯投资学院首席教授，首届博客大赛草根组冠军，和讯投资学院首席教授，首届博客大赛草根组冠军，著选牛股秘籍《猎杀黑马》《过顶擒龙》......'
//          },
//          {
//            name: '大于老师',
//            isOpen: true,
//            isVip: true,
//            defalutValue: {
//              desc: '您还没有开通VIP直播室哟!',
//              btnText: '开通VIP直播室',
//              href: '/'
//            },
//            label: [
//              'A股',
//              'B股',
//            ],
//            desc: '跑赢大盘的王者，和讯投资学院首席教授，首届博客大赛草根组冠军，和讯投资学院首席教授，首届博客大赛草根组冠军，著选牛股秘籍《猎杀黑马》《过顶擒龙》跑赢大盘的王者，和讯投资学院首席教授，首届博客大赛草根组冠军，和讯投资学院首席教授，首届博客大赛草根组冠军，著选牛股秘籍《猎杀黑马》《过顶擒龙》跑赢大盘的王者，和讯投资学院首席教授，首届博客大赛草根组冠军，和讯投资学院首席教授，首届博客大赛草根组冠军，著选牛股秘籍《猎杀黑马》《过顶擒龙》......'
//          }
        ],
        TYlinkUrl:'http://'+(this.$store.state.isTest?'test.':'')+'zhibo.hexun.com/teacher/console/html/default.html',//直播室统一管理入口
      }
    },
    computed: {
      isBindPhone() {
        return this.$store.state.isBindPhone
      },
      liveLists() {
        const live = this.$store.state.liveRooms;
        live.forEach((item) => {
          // item.price = this.priceFormat(item.price);
          if(item.isVip) {
            fetch.getVipRoomPrice({roomId:item.roomId}).then((res)=> {
              item.price = this.priceFormat(res)
            })
          }

        });

        return live
      },
      pid() {
        return this.$store.state.partnerId
      },
      oldHost() {
        return this.$store.state.oldHost;
      },
      partnerLevel () {
        return this.$store.getters.partnerLevel
      }
    },
    methods: {
      /**
       *
       * @param str ''M*100,T*200,B*300,Y*400''
       *
       */
      priceFormat(str) {
        if(str) {
          str = str.split(',').map((item) => {
            return item.split('*')
          }).map( (item) => {
            switch (item[0]) {
              case 'M':
                return `${item[1]}元/月`;
              case 'T':
                return `${item[1]}元/季`;
              case 'Y':
                return `${item[1]}元/年`;
              case 'B':
                return `${item[1]}元/半年`;
              default:
                return ''
            }
          }).join(' ');
        }

        return str
      },
      eventCloseRoom(roomId, isOpen) {
        var tipsStr = isOpen? '是否关闭直播间': '是否打开直播间';
        this.$store.dispatch('OPEN_SYS_DIALOG', {
          title:'温馨提示',
          errorMsg: tipsStr,
          type: 'closeRoom',
          params: {
            roomId:roomId,
            suspend: isOpen,
          }
        });
      },
      openWindow(link) {
        if(this.partnerLevel === 3) {
          this.$store.dispatch('OPEN_SYS_DIALOG', {
            title: '系统提示',
            errorMsg: '您还不是讲师',
            type: 'warn',
            linkHref: `${this.$store.state.config.cmp}partner/request.html`,
            linkText: '马上成为讲师'
          });
          return false
        }

        window.open(link)
      },
      pushAD(path) {
        if(!this.isBindPhone) {
          this.$store.dispatch('CHECKOUT_BINGPHONE');
        } else {
          window.open(path)
        }
      },
      //复制链接
      onCopy(e){
        alert('链接地址已复制到剪贴板!'+this.TYlinkUrl)
      },
      onError(e){
        alert('浏览器不支持剪贴板功能')
      }
    },
    // 生命周期函数
    // 组件实例化后调用
    created() {
      // console.log("this.$store=",this.$store.state.isTest)
    }
  }
</script>
<style lang="stylus">
  .WordInteraction {
    display flex
    flex-direction column
    .list {
      display flex
      align-items flex-start
      .imgContent {
        padding 25px 15px
        border-right 1px dashed rgba(229,229,229,1)

      }
      .infoContent {
        flex 1
        padding 20px
        font-size 14px
        text-align left

        .noPassCon {
          .n-title {
            font-size 24px
            i {
              color #f04740
              font-style normal
            }
          }
          .n-desc {
            font-size: 16px;

	          margin: 25px 0;
          }
        }
        .infoContent-top {
          display flex
          justify-content space-between
          .flex {
            display flex
            flex-direction column
            justify-content space-between
          }
          .info {
            flex 1
            .name {
              font-size 24px
              color #333333
              padding-bottom 10px
              a {
                color #333
              }
            }
            .label {
              display inline-block
              background rgba(44,156,222,1)
              padding 2px 8px
              margin 0 5px 5px 0
              border-radius 5px
              color #fff
            }
          }
          .operating {
            display flex
            flex-direction column
            justify-content flex-start
            // align-items flex-start
            text-align right
            width 80px
            a {
              display block
              color rgba(44,156,222,1)
              margin 2px 0
              cursor pointer
            }

          }
        }
        .title {
          color rgba(153,153,153,1)
          width 45px
        }
        .price {
          padding 5px 0;
        }
        .desc {
          padding 5px 0
          display flex
          flex-wrap wrap
          color rgba(102,102,102,1)
          .desc-text {
            flex 1
            max-width 524px
            overflow-wrap break-word
            word-wrap break-word
          }
        }
      }
      .otherContent {
        flex 1
        align-self center
        display flex
        align-items center

        height 100%
        .descContent {
          flex 1
          color #a1a1a1
        }
        .btnContent {
          width 200px
          display flex
          flex-direction column
          justify-content center
          align-items center
          a {
            padding 10px 10px
            width 141px
            height 40px
            box-sizing border-box
            text-align center
            background #ee5050
            cursor pointer
            border-radius 4px
            color #fff
            font-size 16px
            margin 5px 0
          }
        }
      }
    }
  }
</style>
