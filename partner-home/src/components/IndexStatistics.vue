<!--首页 统计-->
<template>
  <div id="IndexStatistics" class="IndexStatistics">
    <div class="item" v-for="item in serverData">
      <p class="top"><span class="number">{{item.total}}</span>{{item.danwei}}</p>
      <router-link to="TG/Myuser" class="bottom">{{item.name}}</router-link>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'IndexStatistics',
    data() {
      return {
        msg: 'this is IndexStatistics',
        staticData: [
          {
            name: '昨日付费新增用户',
            total: '0',
            danwei: '人',
            id:'newBuyUserCount'
          },
           {
            name: '到期用户',
            total: '0',
            danwei: '人',
            id: 'nearlyAMonthUserExpire'
          },
          {
            name: '在期用户',
            total: '0',
            danwei: '人',
            id: 'userCount'
          },
         
        ]
      }
    },
    computed: {
      serverData() {
        const myUserAllData = this.$store.state.myUserAllData;

        for(let i in myUserAllData) {
          this.staticData.forEach((item) => {
            if(i === item.id) {
              item.total = myUserAllData[i];
            }
          })
        }

        return this.staticData;
      }
    }

  }
</script>
<style lang="stylus">
  .IndexStatistics {
    display flex
    border 1px solid #e5e5e5
    border-left none
    border-right none
    background #fff
    >.item {
      display flex
      flex-direction column
      justify-content center
      align-items center
      flex 1
      height 110px
      font-size 16px
      .top {
        color #ee5050
        .number {
          font-size 28px
          border-bottom 1px solid red
        }
      }
      .bottom {
        color #a0a0a0
        padding 5px 0
      }
      .bottom:hover {
        color #dd5050
      }
    }
   
  }
</style>