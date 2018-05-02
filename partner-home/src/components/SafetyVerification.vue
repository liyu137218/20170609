<template>
  <div id="SafetyVerification" class="SafetyVerification">
    <p class="sv-list sv-tips">为了您的账户资产安全请通过手机验证！</p>
    <p class="sv-list sv-tel">
      <label for="svTel">手机号：</label>
      <input id="svTel" :class="['sv-input','sv-i-tel'] " :value="telphone" :disabled="true" type="tel">
    </p>
    <p class="sv-list sv-verification">
      <label class="sv-v-list" for="svVerification">验证码：</label>
      <input id="svVerification" class="sv-v-list sv-input sv-i-ver "
             @blur="eventBlurVerification"
             @focus="eventFocusVerification"
             v-model="verification" type="tel">
      <button @click="eventGetCode" :class="['sv-v-list',' sv-v-getBtn', isNotOpen?'sv-v-getBtn-disabled': '']">{{btnInfo}}</button>
      <button class="sv-v-list sv-v-remBtn"></button>
      <span class="sv-v-errorTips sv-v-list">{{errorTips}}</span>
    </p>
    <p class="sv-list sv-btnGroup">
      <a href="https://reg.hexun.com/user/ModifyPhone.aspx?step=2" target="_blank" class="sv-b-list">无法收到短信</a>
      <a href="https://reg.hexun.com/user/ModifyPhone.aspx" target="_blank" class="sv-b-list">更换手机号码</a>
    </p>
    <p class="sv-list">
      <button class="sv-loginBtn" @click="eventLogin">
        登录
      </button>
    </p>
  </div>
</template>
<script>
  export default {
    name: 'SafetyVerification',
    props: {
      isVerification: null,
      phone: null,
      value: null,
    },
    data() {
      return {
        msg: '安全验证',
        errorTips: '验证码错误，请重新输入',
        verification: '请输入验证码',
        time: 60,
        isNotOpen: false, // 按钮是否可点击
        btnInfo: '获取验证码',
      }
    },
    computed: {
      telphone() {
        return this.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      },
      code() {
        return this.value;
      },
      userLevel() {
        return this.$store.state.userLevel;
      }
    },
    watch: {
      verification() {
       this.$emit('input', this.verification)
      }
    },
    methods: {
      eventLogin() {
        // 登录事件
        this.$emit('checkoutAccountList',{
          source: 'code',
          info: {
            code: this.verification
          }
        });

      },
      eventGetCode() {
        // if(this.userLevel !== 1) {
        //   this.$store.dispatch('UPGRADE');
        //   return false;
        // }
        this.isNotOpen = true;
        this.$store.dispatch('GET_PHONE_CODE').then(
          res => {
            console.log('验证码已发送');
            this.countDown()
          },
          rej => {
            console.log('获取验证码失败');
            this.isNotOpen = false;
          }
        )
       
      },
      eventFocusVerification() {
        this.verification = this.verification == "请输入验证码" ? '': this.verification
      },
      eventBlurVerification() {
        this.verification = this.verification == "" ? '请输入验证码': this.verification
      },
      countDown() {
        let time= this.time
        let timer = setTimeout(() => {
          this.time = this.time - 1;
          this.btnInfo = `${this.time}s后重新获取验证码`;
          if(this.time <= 0) {
            clearTimeout(timer);
             this.btnInfo = `重新获取验证码`;
             this.time = 60;
             this.isNotOpen = false;
          } else {
            this.countDown()
          }
        },1000)
      }
    }
  }
</script>
<style lang="stylus">
  .SafetyVerification {
    padding 25px 0 0 50px
    text-align left
    font-size 16px
    // list的通用样式
    .sv-list {
      padding 10px 0
      display flex
      align-items center

    }
    // input的通用样式
    .sv-input {
      box-sizing border-box
      height 40px
      border 1px solid rgba(204,204,204,1)
      font-size 14px
      margin-left 18px
      padding-left 10px
    }
    .sv-verification {
      display flex
      align-items center
    }

    .sv-v-getBtn {
      margin-left 20px
      height 40px
      background rgba(53,152,219,1)
      color #fff
      border-radius 5px
      padding 0 20px
      cursor pointer
    }

    .sv-v-getBtn-disabled {
      background #ACACAC
      cursor none
    }

    .sv-v-remBtn {
      margin 0 20px
      width 24px
      height 24px
      border-radius 50%
      background rgba(231,76,60,1);
      position relative
      cursor pointer

    }

    .sv-v-remBtn:after {
      content ''
      display block
      position absolute
      top 0
      left 0
      width 3px
      height 25px
      background #fff
      transform scale(.5) rotate(45deg) translate(15px,-15px)
    }

    .sv-v-remBtn:before  {
      content ''
      display block
      position absolute
      top 0
      right  0
      width 3px
      height 25px
      background #fff
      transform scale(.5) rotate(135deg) translate(15px,15px)
    }

    .sv-v-errorTips {
      color rgba(153,153,153,1)
      font-size 14px
    }

    .sv-btnGroup {
      display flex
      padding-left 82px
    }

    .sv-loginBtn {
      height 40px
      width 280px
      margin 0 auto
      font-size 18px
      color #fff
      background rgba(53,152,219,1)
      border-radius 5px
      cursor pointer
    }

    .sv-b-list {
      background transparent
      color rgba(53,152,219,1)
      font-size 14px
      box-sizing border-box
      cursor pointer
      padding 0 10px
    }

    .sv-b-list:first-child {
      border-right 1px solid rgba(204,204,204,1);
    }

    .sv-i-tel {
      width 278px
    }
    .sv-i-ver {
      width 140px
    }
    .sv-tips {
      color rgba(231,76,60,1)
    }

  }
</style>