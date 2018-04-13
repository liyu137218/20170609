<template>
  <div class="WeChatCotch">
    <header class="we-head">微信菜单配置教程</header>
    <div class="page" v-show="index == 1">
      <h2 class="title-1">1.&nbsp;&nbsp;&nbsp;&nbsp;概述</h2>
      <p class="text">文档服务于通过审核的合作者商户，主要用于配合管理后台来方便商户配置自身的微信公众号菜单，目的是为了让商户可以按照指定规则进行微信菜单栏设置，已达到最好的展示效果。</p>
      <h3 class="title-2">1.1&nbsp;&nbsp;&nbsp;目标用户</h3>
      <p class="text">审核过的合作者</p>
      <h3 class="title-2">1.2&nbsp;&nbsp;&nbsp;文档目的</h3>
      <p class="text">帮助合作者商户配置微信公众号里的菜单栏。</p>
      <h3 class="title-2">1.3&nbsp;&nbsp;&nbsp;前置条件</h3>
      <p class="text">老师已经在合作者后台创建好自己的产品，并且生成了对应的产品链接。老师有一个自己的微信公众账号（服务号、订阅号）</p>
      <h2 class="title-1">2&nbsp;&nbsp;&nbsp;使用说明</h2>
      <h3 class="title-2">2.1&nbsp;&nbsp;&nbsp;微信公众号账号(认证号)</h3>
      <p class="text">登录您的微信公众号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class="link" target="_blank" href="https://mp.weixin.qq.com">https://mp.weixin.qq.com</a></p>
      <p class="img">
        <img src="../assets/wechatImg/aaa.jpg" alt="">
      </p>
      <p class="text">点选自定义菜单进入自定义菜单页面</p>
       <p class="img">
        <img src="../assets/wechatImg/bbb.jpg" alt="">
      </p>
      <p class="text">点击加号可以添加一个三级菜单</p>
       <p class="img">
        <img src="../assets/wechatImg/ccc.png" alt="">
      </p>
      <p class="text">
        之后可以添加子菜单，子菜单最多添加5个。</br>
        点击你添加的菜单栏，右侧会出现属性添加的框，里边可以添加菜单栏的名称。</br>
        然后设置菜单栏的内容，内容选择跳转网页，链接使用在合作者后台获得的对应产品链接。</br>
      </p>
      <p class="img">
        <img src="../assets/wechatImg/ddd.jpg" alt="">
      </p>
    </div>
    <div class="page" v-show="index == 2">
      <h3 class="title-2">2.2&nbsp;&nbsp;&nbsp;微信公众号账号(未认证)</h3>
      <p class="text">因为非认证的微信公众号，支持的功能非常有限，菜单栏的配置都不支持跳转外联。首先我们拿到的链接，通过链接生成一个二维码。</p>
      <p class="img">
        <img src="../assets/wechatImg/eee.jpg" alt="">
      </p>
      <p class="text">之后步骤同样来到菜单栏设置选择发送消息，然后点选新建图文，进入消息编辑页面。</p>
      <p class="img">
        <img src="../assets/wechatImg/ggg.jpg" alt="">
        <img src="../assets/wechatImg/hhh.jpg" alt="">
        <img src="../assets/wechatImg/iii.jpg" alt="">
      <p class="text">选择之前保存的二维码点击确定，然后保存图文。</p>
      <p class="img">
        <img src="../assets/wechatImg/jjj.jpg" alt="">
      </p>
      <p class="text">返回菜单栏配置页面 选择从素材库选择</p>
      <p class="img">
        <img src="../assets/wechatImg/kkk.jpg" alt="">
        <img src="../assets/wechatImg/lll.png" alt="">
      </p>
      <p class="text">勾选我们创建的图文，然后点击保存并且发布</p>
      <p class="img">
        <img src="../assets/wechatImg/mmm.jpg" alt="">
      </p>
      <p class="text">点击预览可以看到效果。这样非认证的微信公众号老师，可以使用产品链接。</p>
      <p class="img">
        <img src="../assets/wechatImg/nnn.jpg" alt="">
      </p>
    </div>
    <div class="btn-group">
      共2页/第{{index}}页
      <p :class="['btn', index == 1?'btn-active':'']" @click="swtichindex(1)">1</p>
      <p :class="['btn', index == 2?'btn-active':'']" @click="swtichindex(2)">2</p>
    </div>
  </div>
  
</template>
<script>
export default {
  name: 'WeChatCotch',
  data() {
    return {
      index: 1,
    }
  },
  methods: {
    swtichindex(index) {
      this.index = index;
      window.scrollTo(0,0);
    }
  }
}
</script>
<style lang="stylus">
.WeChatCotch {
  width: 1000px;
  background: #fff;
  margin: 0 auto;
  text-align: left;
  padding: 0 20px;
  box-sizing: border-box;
  .we-head {
    font-size: 18px;
    text-align: center;
    padding 10px 0;
    border-bottom: 1px solid #e5e5e5;
  }
  .title-1 {
    font-size: 18px;
    font-weight: normal;
    padding-bottom: 20px;
  }

  .title-1:nth-child(1) {
     padding-bottom: 0;
    padding-top: 20px;
  }

  
  .title-2 {
    font-size: 16px;
    font-weight: normal;
  }
  .text {
    font-size: 14px;
    padding: 20px 0 40px 0;
  }
  .img {
    text-align: center;
  }
  .btn-group {
    display: flex;
    justify-content: center;
    color:#a5a5a5;
    padding: 20px 0;
  }
  .btn {
    color: #a5a5a5;
    border: 1px solid #a5a5a5;
    height: 20px;
    width: 20px;
    text-align: center;
    margin: 0 5px;
    cursor: pointer;
  }
  .btn-active {
    color:#2da4ff;
    border: 1px solid #2da4ff;
  }
  .link {
    color: #82b3ee;
  }
  .link:hover {
    color: #008dcd;
  }
}
</style>