<template>
  <div id="IndexDirectRoomEntrance" class="IndexDirectRoomEntrance">
    <router-link class="item"
                 v-if="!item.isOut"
                 :to="item.path"
                 :key="item"
                 v-for="item in dataList">
        <img :src="item.icon" alt="">
        <p v-html="item.name"></p>
        <p class="wechat" v-if="isOpenWechatStudio == '1'">微信+</p>
    </router-link>
    <a v-else :href="item.path" target="_blank" class="item">
      <img :src="item.icon" alt="">
      <p>
          {{item.name}}</br>
        <router-link :to="item.link" v-if="item.id === 'course'">
          {{item.linkContext}}
        </router-link>
      </p>
      <p class="wechat" v-if="isOpenWechatStudio == '1'">微信+</p>
    </a>
    
  </div>
</template>
<script>
  export default {
    name: 'IndexDirectRoomEntrance',
    data() {
      return {
        msg: '首页直播室入口',
        // data: [
        //   {
        //     name: '徐小明直播室',
        //     path: '/',
        //     icon: require('../assets/zhiboshi.png'),
        //   },
        //   {
        //     name: '徐小明VIP直播室',
        //     path: '/',
        //     icon: require('../assets/vipzhiboshi.png'),
        //   },
        //   {
        //     name: '徐小明直播室xxx',
        //     path: '/',
        //     icon: require('../assets/allkecheng.png'),
        //   },
        //   {
        //     name: '徐小明直播室xxxx',
        //     path: '/',
        //     icon: require('../assets/wenti.png'),
        //   },
        //   {
        //     name: '徐小明直播室xxxx',
        //     path: '/',
        //     icon: require('../assets/allzhibiao.png'),
        //   }
        // ],
      }
    },
    computed: {
      isOpenWechatStudio() {
        return this.$store.getters.isOpenWeChatStudio;
      },
      dataList() {
        const userLevel = this.$store.state.userLevel;
        const live = this.$store.state.liveRooms;
        const otherData = this.$store.state.indexOtherData;
        let arr = [];
        let pro,
          iconLiveVip = require('../assets/vipzhiboshi.png'),
          iconLive = require('../assets/zhiboshi.png');

        live.forEach((item) => {
          pro = {
            name: item.name,
            path: item.link,
            icon:item.isVip ? iconLiveVip: iconLive,
            isOut: true,
          };
          console.log(item);
          if(item.isHas && item.auditStatus === 'pass') {
            arr.unshift(pro)
          }
          
        });

        if(otherData.coursecount) {
          pro = {
            name: `${otherData.course[0].className}直播课程`,
            link: 'AllProduct/ZbAndPx?course=true',
            linkContext: `查看全部${parseInt(otherData.coursecount)}个课程`,
            path: `${otherData.course[0].hrefUrl}`,
            icon:require('../assets/allkecheng.png'),
            isOut: true,
            id: 'course',
          };

          arr.push(pro);
        }
        if(otherData.questionCount && userLevel === 2) {
          pro = {
            name: `您有${parseInt(otherData.questionCount)}条问题待解答`,
            path: `http://tg.hexun.com/manage/askanswer.aspx`,
            // path: `AllProduct/Wendaguanli`,
            isOut: true,
            icon:require('../assets/wenti.png'),
          };

          arr.push(pro);
        }
        if(otherData.indexCount) {
          pro = {
            name: `全部${otherData.indexCount}个指标`,
            // path: `AllProduct/Zhibiaoyun`,
            path: 'http://zhibiao.hexun.com/InventorManage/IndexManage',
            icon:require('../assets/allzhibiao.png'),
            isOut: true
          };

          arr.push(pro);
        }

        return arr;
      }
    },
    created() {

    }
  }
</script>
<style lang="stylus">
  .IndexDirectRoomEntrance {
    display: flex;
    flex-wrap wrap
    color #fff
    padding 20px
    background #fff
    >.item {
      display flex
      align-items center
      justify-content center
      height 100px
      box-sizing border-box
      margin-bottom 20px
      cursor pointer
      padding 10px
      text-align left
      color #fff !important
      position relative
      img {
        margin-right 10px
      }

      p {
        max-width 160px
        a {
          color #fff
          text-decoration underline
        }

      }
      .wechat {
        position absolute
        top 0
        right 0
        background #51c658
        padding 2px 5px
      }
    }
    >:nth-child(6n-5) {
      background #ef7e83
      width calc(50% - 20px)
      margin-right 20px
      margin-bottom 20px
    }
    >:nth-child(6n-5):hover {
      background #f18d91
    }
    >:nth-child(6n-4) {
      background #ffc56a
      width calc(50% - 20px)
      margin-right 20px
      
    }
    >:nth-child(6n-4):hover {
      background #ffcc7b
    }
    >:nth-child(6n-3) {
      background #51bde8
      width calc(33.3333% - 20px)
      margin-right 20px
    }
    >:nth-child(6n-3):hover {
      background #65c5eb
    }
    >:nth-child(6n-2) {
      background #a76abc
      width calc(33.3333% - 20px)
      margin-right 20px
    }
    >:nth-child(6n-2):hover {
      background #b17bc4
    }
    >:nth-child(6n-1) {
      background #92a5b1
      width calc(33.3333% - 20px)
      margin-right 20px
    }
    >:nth-child(6n-1):hover {
      background #9eafb9
    }
    >:nth-child(6n) {
      background #ef7e83
      width calc(33.3333% - 20px)
      margin-right 20px
    }
    >:nth-child(6n):hover {
      background #f18d91
    }
  }
</style>