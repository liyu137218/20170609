<template>
  <div id="WeChatStudio" class="WeChatStudio">
      <div v-if="isOpenWechatStudio != '1'" class="w-container no-open">
        <div class="c-btn" @click="eventOpenDialog">
          <svg class="wechat" aria-hidden="true">
            <use xlink:href="#icon-wechat"></use>
          </svg>
          开通微信工作室
        </div>
        <div class="c-text">
          客服电话：010-85696800
        </div>
      </div>
      <div v-else class="w-container">
        <header class="w-con-head">
          已创建的产品
        </header>
        <WeChatListStaic
        :title = "'自选股'"
        :link="`${weChat}/mystock`"
        ></WeChatListStaic>
        <WeChatListStaic
        :title = "'客服'"
        :link="`${weChat}/contactus/contact-us.html`"
        ></WeChatListStaic>
        <WeChatListMore
        v-if="moreLists.courseware"
        :title = "'文字直播室'"
        :list="liveRoom"
        :noContent = "vipRoomNoContent">
        </WeChatListMore>
        <WeChatListMore 
        v-if="moreLists.course"
        :title = "'视频课程'"
        :list="moreLists.course.content">
        </WeChatListMore>
        <WeChatListMore
        v-if="moreLists.courseware"
        :title = "'精品课程'"
        :list="JPC">
        </WeChatListMore>
        <!--
        <WeChatListMore
        :title = "'量化选股(beta)'"
        :list="fomartStockList">
        </WeChatListMore>
        -->
        <WeChatListMore  
        :title = "'量化选股'"
        :list="fomartStockList2">
        </WeChatListMore>
        <WeChatListMore
            :title = "'文章列表'"
            :list="artList">
        </WeChatListMore>
        <WeChatListMore
            :title = "'委托账户'"
            :list="AccountList">
        </WeChatListMore>
      </div>
  </div>
</template>
<script>
import {fetch} from '../store/fetch'
import WeChatListStaic from "@/components/WeChatListStaic"
import WeChatListMore from "@/components/WeChatListMore"

  export default {
    name: 'WeChatStudio',
    components: {
      WeChatListStaic,
      WeChatListMore,
    },
    data() {
      return {
        msg: '信息',
        stockList: [],
        stockList2: [],
        artList: [],
        AccountList: [],
        
      }
    },
    computed: {
      pid() {
        return this.$store.state.partnerId;
      },
      config() {
        return this.$store.state.config
      },
      zhiboshiHost() {
        return this.$store.state.oldHost;
      },
      weChat() {
        return this.$store.state.weChat;
      },
      isOpenWechatStudio() {
        return this.$store.getters.isOpenWeChatStudio;
      },
      moreLists() {
        return this.$store.getters.courseList;
      },
      JPC() {
        const courseware = this.moreLists.courseware;
        // 如果有课程添加详情页
        if(courseware && courseware.content.length > 0) {
          courseware.content.unshift({
            textContent: {
              name: '课程列表'
            },
            h5Link: `${this.weChat}/lesson/${this.$store.state.partnerId}?utm_campaign=weixin_zhibo
`
          })
        }

        return courseware.content;
      },
      liveRoom() {
        const arr = this.$store.state.liveRooms.map((item) => {
          if(item.isOpen && item.isHas) {
            return {
              textContent: {
                name: item.name
              },
              h5Link: `${this.zhiboshiHost}/room/mini_room.html?roomId=${item.roomId}&utm_campaign=weixin_zhibo
`
            }
          }
        }).filter((item) => {
          return item
        })

        return arr;
      },
      vipRoomNoContent() {
        return `暂无产品，<a href="${this.zhiboshiHost}/teacher/admin/vipLiverApply.html?pid=" target="_blank">点击链接去创建</a>`
      },
      fomartStockList() {
        const arr = this.stockList.map((item) => {
          return {
             textContent: {
                name: item.poolName
              },
              h5Link: item.url + '?utm_campaign=weixin_lianghua'
          }
        })
        return arr;
      },
      fomartStockList2 () {
        const arr = this.stockList2.map((item) => {
          return {
             textContent: {
                name: item.poolName
              },
              h5Link: item.url + '&utm_campaign=weixin_lianghua'
          }
        })
        return arr;
      }
    },
    created() {
      this.$store.dispatch('GET_PARTNER_ID').then(
        () => {
          // this.$store.dispatch('GET_STOCKLIST').then(
          //   res => {
          //     this.stockList = res;
          //   }
          // )
          this.$store.dispatch('GET_STOCKLIST2').then(
            res => {
              this.stockList2 = res;
            }
          )

          this.getArticleList();
          this.getAccountList();
        }
      );
    },
    methods: {
      eventOpenDialog() {
        this.$store.dispatch('OPEN_SYS_DIALOG', {
          title: '温馨提示',
          type: 'confirm',
          errorMsg: '是否开通微信工作室',
          confirm: '开通',
          onCancel() {
            console.log('cancel')
          },
          onConfirm: () => {
            console.log(this)
            this.$store.dispatch('OPEN_WECHAT_STUDIO').then(
              () => {
                console.log('开通成功');
                this.$store.dispatch('GET_PARTNER_SHOW')
              }
            )
          }
        })
      },
      getArticleList() {
        fetch.getColumListArt().then(
          res => {
            this.artList = this.artList.concat(res.map((item) => {
              return {
                textContent: {
                  name: item.columnName
                },
                h5Link: `${this.config.caidaoweb}/${this.pid}/column${item.id}.html?utm_campaign=weixin_wenzhang`
              }
            }))
          }

        )
      },
      getAccountList () {
        fetch.getAccountList({uid: this.pid}).then(
          res => {

            this.AccountList = this.AccountList.concat(res.map((item) => {
              return {
                textContent: {
                  name: item.productname
                },
                h5Link: `${this.config.weChat}/commission/wap/?tid=${this.pid}&pid=${item.productid}`
              }
            }))
          }
        )
      }
    }
  }
</script>
<style lang="stylus">
.WeChatStudio {
  .wechat {
    /* 通过设置 font-size 来改变图标大小 */
    width: 40px;
    height: 40px;
    /* 图标和文字相邻时，垂直对齐 */
    vertical-align: -0.15em;
    /* 通过设置 color 来改变 SVG 的颜色/fill */
    fill: currentColor;
    /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
        normalize.css 中也包含这行 */
    overflow: hidden;
  }

  .w-container {

    
  }

  .no-open {
    padding-top 80px
    display flex
    justify-content center
    flex-direction column
    align-items center
  }
  
  .c-btn {
    height 100px
    width 366px
    color #FEFEFE
    background #62CC68
    display flex
    justify-content center
    align-items center
    cursor pointer
  }
  .c-btn:hover {
    background #39b742
  }
  .c-text {
    padding 20px 0
  }
  .w-con-head {
    font-weight: bold;
    height: 50px;
    line-height: 50px;
  }
}
</style>