<template>
  <div class="WeChatListMore">
    <header class = "wm-header">
      <p>{{title}}</p>
      <p class="wm-head-btn no-select" @click="eventCheckShow">
         
        <svg :class="['icon', lsitShow?'icon-up':'icon-down']" aria-hidden="true">
          <use xlink:href="#icon-triangle-copy"></use>
        </svg>
      </p>             
    </header>
    <ul class="wm-container" v-if="lsitShow">
      <li class="wm-con-list" 
      v-for="item in list">
        <p class="wm-con-list-name" :title="item.textContent.name">
          {{item.textContent.name}}
        </p>
        <p class="wm-con-list-link" :title="item.h5Link">
          {{item.h5Link}}
        </p>
        <p class="wm-con-list-btn no-select"
         v-clipboard:copy="item.h5Link">
          复制链接
        </p>
      </li>
      <li v-if="!isHasList">
        <p class="wm-con-list-noHas" v-html="noContent">
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'WeChatListMore',
  props: {
    title: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      default: [],
    },
    noContent: {
      type: String,
      default: '暂无产品。联系客服：010-85697400'
    }
  },
  data() {
    return {
      msg: 'WeChatListStai!!c',
      lsitShow: true,
    }
  },
  computed: {
    isHasList() {
      return this.list.length > 0;
    }
  },
  methods: {
    eventCheckShow() {
      this.lsitShow = !this.lsitShow;
    }
  }
}
</script>
<style lang="stylus">
.WeChatListMore {
  font-size 16px
  padding 0 110px
  margin-bottom: 40px;
  .icon {
    /* 通过设置 font-size 来改变图标大小 */
    width: 1em; height: 1em;
    /* 图标和文字相邻时，垂直对齐 */
    vertical-align: -0.15em;
    /* 通过设置 color 来改变 SVG 的颜色/fill */
    fill: currentColor;
    /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
        normalize.css 中也包含这行 */
    overflow: hidden;
  }
  .icon-down {
    transform: rotate(180deg);
  }
  .wm-header {
    display flex
    justify-content space-between
    background #e9f5fc
    padding 12px 27px
  }
  .wm-head-btn {
    color: #3598db;
    cursor: pointer;
  }
  .wm-container {
    padding 0 27px
    border: 1px solid #e1ecf3; 
  }
  .wm-con-list {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed #e5e5e5;
    height: 50px;
    line-height: 50px;
  }
  .wm-con-list:last-child {
    border-bottom: none;
  }
  .wm-con-list-name {
    white-space: nowrap;
    width: 72px;
    overflow: hidden;
    text-align: left;
  }
  .wm-con-list-btn {
    color: #3598db;
    cursor: pointer;
    overflowl: hidden;
    white-space: nowrap;
    width: 100px;
    text-align: center;
  }
  .wm-con-list-btn:hover {
    text-decoration: underline;
  }
  .wm-con-list-link {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 20px;
    text-align: left;
    flex: 1;
    // width: 350px;
  }
  .wm-con-list-noHas {
    height: 50px;
    line-height: 50px;
    text-align: left;
    color: #a9a9a9;
    a {
      color: #3598db;
      text-decoration: underline;
    }
  }
}
</style>