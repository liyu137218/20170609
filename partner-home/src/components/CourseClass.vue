<template>
  <div id="CourseClass" class="CourseClass">
    <div class="cou-container">
      <div v-for="(list, key) in lists" class="list">
        <div v-if="list.isOpen" class="open">
          <div class="header">{{list.title}}</div>
          <div v-for="(item, index) in list.content"
               v-if="index < 5 || list.show "
               class="list-item">
            <div class="imgcontent">
              <!--<a :href="item.textContent.link" target="_blank"><img :src="item.imgSrc" alt=""></a>-->
              <a href="javascript:void(0);" target="_self" @click="item.textContent.link&&btnClick(item.textContent.link)"><img :src="item.imgSrc" alt=""></a>
            </div>
            <div class="textContent">
              <!--<p class="name"><a :href="item.textContent.link" target="_blank">{{item.textContent.name}}</a></p>-->
              <p class="name"><a href="javascript:void(0);" target="_self" @click="item.textContent.link&&btnClick(item.textContent.link)">{{item.textContent.name}}</a></p>
              <p class="time">授课时间：{{item.textContent.time}}</p>
              <p class="people">当前服务人数：<span class="number">{{item.textContent.people}}</span></p>
            </div>
            <div class="buttonContent">
              <a
                  v-for="link in item.buttomContent"
                  :key="link.href"
                  @click="btnClick(link)">{{link.text}}</a>

            </div>
          </div>
        </div>
        <div v-else class="noOpen">
          <div class="imgContent">
            <img :src="list.defaultContent.imgSrc" alt="">
          </div>
          <div class="textContent">
            <p v-for="p in list.defaultContent.textContext">
              {{p}}
            </p>
          </div>
          <div class="buttonContent">
            <router-link
              v-if="p.router"
              :to="p.href"
              :key="p.href"
              v-for="p in list.defaultContent.buttonContext"
            >
              {{p.text}}
            </router-link>
            <a
                v-else
                :href="p.href" target="_blank"
                :key="p.href"
               >
              {{p.text}}
            </a>
          </div>
        </div>
        <div v-if="list.more" @click="eventShowMore(key)" class="list-more">
          <button v-if="!list.show" class="iconfont">&#xe70f;</button>
          <button v-else class="iconfont">&#xe605;</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'CourseClass',
    props:{

    },
    data() {
      return {
        msg: 'this is CourseClass',
        listData:false
      }
    },
    computed: {
      isBindPhone() {
        return this.$store.state.isBindPhone
      },
      /*lists: {
        get :function(){
          this.listData=!this.listData;
          return this.$store.getters.courseList;
        },
        set :function(_val){
          this.listData=_val;
        }

      }*/
      lists(){
        this.listData=!this.listData;
        return this.$store.getters.courseList;
      }
    },
    methods: {
      eventShowMore(key) {
        const lists = this.$store.getters.courseList;
      //this.$set(lists[key],'show',!lists[key].show)
        lists[key].show = !lists[key].show;
        this.listData = !this.listData;
      },
      btnClick (link) {
        console.log('link=',link)
        if(!this.isBindPhone) {
          this.$store.dispatch('CHECKOUT_BINGPHONE');
          return false
        }
        if(link.router) {
          this.$router.push(link.href)
        } else {
          window.open(link.href||link);
        }
      }
    },
  }
</script>
<style lang="stylus">
  .CourseClass {
    >.cou-container {
      display flex
      flex-direction column
      padding-left 15px
      .list {
        text-align left
        .noOpen {
          display flex
          border-bottom 1px solid #e5e5e5
          .imgContent {
            width 212px
            box-sizing border-box
            margin  24px 0
            padding 0 18px
            border-right 1px dashed #e5e5e5
            img {
              width 150px
              height 150px
            }
          }
          .textContent {
            flex 1
            display flex
            flex-direction column
            justify-content center
            align-items center
            color #999999
            font-size 18px
            padding 0 18px
            p {
              width 100%
              text-align left
            }
          }
          .buttonContent {
            display flex
            width 180px
            flex-direction column
            justify-content center
            align-items center
            a {
              display block
              padding 10px 20px
              background #ee5050
              cursor pointer
              border-radius 4px
              color #fff
              font-size 16px
            }
            a:hover {
              background #DD5050
            }
          }
        }
        .open {
          padding-left 20px
          border-bottom 1px solid #e5e5e5
          padding-bottom 20px
          >.header {
            border-left 4px solid #e74c3c
            padding 0 0 0 10px
            margin 20px 0
            color #747474

          }
          >.list-item {
            display flex
            border-bottom 1px solid #e5e5e5
            padding-bottom 10px
            margin-bottom 10px
            .imgcontent {
              width 190px
              height 135px
              box-sizing border-box
              overflow hidden
              padding-right 20px;
              border-right 1px dashed #e5e5e5
              img {
                width 100%
                height 100%
                background #fff
              }
            }
            .textContent {
              flex 1
              padding 0 20px
              display flex
              flex-direction column
              justify-content space-around
              font-size 18px
              color #999
              .name {
                color #666
                font-weight bold
                a {
                  color #666
                }
              }
              .time {

              }
              .people {
                .number {
                  color #ee5050
                }
              }
            }
            .buttonContent {
              width 180px
              display flex
              flex-direction column
              justify-content center
              align-items center
              a {
                display block
                padding 10px 20px
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
              a:hover {
                background #DD5050
              }
            }
          }
          >.list-item:last-child {
            border none
            padding-bottom 0
            margin-bottom 0
          }
        }
        .list-more {
          text-align center
          padding 10px 0
          cursor pointer
          button {
            background transparent
            cursor pointer
          }
        }
      }

    }
  }
</style>
