<template>
  <div id="MyAccount" class="MyAccount">
    <SafetyVerification v-if="!isVerification"
        @checkoutAccountList="checkoutAccountList"
        :phone="phone"
        v-model="code"
        :isVerification="isVerification" >
    </SafetyVerification>
    <AccountList
      :code="code"
      :defaultTime="defaultTime"
       @checkoutAccountList="checkoutAccountList"
       v-if="isVerification"></AccountList>
  </div>
</template>
<script>
  import SafetyVerification from '@/components/SafetyVerification'
  import AccountList from '@/components/AccountList'
  export default {
    name: 'MyAccount',
    components: {
      SafetyVerification,
      AccountList,
    },
    data() {
      return {
        msg: '我的账务',
        isVerification: true,
        phone: '',
        code: ''
      }
    },
    computed: {
      defaultTime() {
        const localTime = Date.parse(new Date());
        const yearOld = localTime - (365*24*60*60*1000);
        return {
          end: this.$myPlugin.format(localTime,'yyyy-MM'),
          start: this.$myPlugin.format(yearOld,'yyyy-MM'),
        }
      }
    },
    methods: {
      checkoutAccountList(params) {
        console.log(params)
       if(params.source === 'list') { // 如果请求来自表单
         if(!params.info.res) { // 如果请求结果为否
            this.isVerification = false; // 切换到验证码页面
            this.phone = params.info.phone;
         }
       }

       if(params.source === 'code') { // 如果请求来自验证码则表明验证码已经输入
          this.isVerification = true;
          this.code = params.info.code;
       }
      },
      
    },
    created() {
      
    }
  }
</script>
<style lang="">
  .MyAccount {

  }
</style>