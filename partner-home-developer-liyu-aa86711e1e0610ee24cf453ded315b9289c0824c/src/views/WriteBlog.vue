<template>
  <div class="WriteBlog">
    <header class="w-head">
      <w-title :cssStyle="titleCssStyle">写文章</w-title>
    </header>
    <section class="w-section">
      <w-input
        v-model="params.articleTitle"
        title="标题："
        :icon="false"
        placeholderText="请输入文章标题"
        :max="250"
        :errorTips="errorTips.articleTitle">
      </w-input>
      <div class="w-ul">
        <w-label title="发布栏目："></w-label>
        <FilterLabel
            class="w-ul-list"
            :label="columList"
            v-model="params.columnId"></FilterLabel>
      </div>
      <w-textarea
          :icon="false"
          v-if="params.columnId != 0"
          title="免费内容："
          v-model="params.articleIntroduce"
          placeholderText="免费展示部分，最多300汉字"
          :max="300">
      </w-textarea>
      <div class="w-ul editor-ul">
        <w-label :title="params.columnId != 0?'付费内容：':''"></w-label>
        <div class="w-s-editorCon">
          <div ref="editor" :class="['w-s-editor', errorTips.articleContent ? 'w-s-editor-error':'']" :id="editorId"></div>
          <div
              class="articleContent-errorTip"
              v-if="errorTips.articleContent">{{errorTips.articleContent}}</div>
        </div>
      </div>
      
    </section>
    <footer>
      <div class="c-footer">
        <div class="c-f-btn-group">
          <w-button class="c-f-bg-btn" @click.native="eventCancel">取消</w-button>
          <w-button class="c-f-bg-btn" @click.native="eventSubmit">发布</w-button>
        </div>
      </div>
    </footer>
    <iframe style="display: none;" ref="iframe" :src="iframeSrc" frameborder="0"></iframe>
    <w-dialog v-if="countDownShow" v-model="dialogshow">
      <header class="wui-confirm-hd">
        <strong class="wui-confirm-title">提示</strong>
      </header>
      <section class="wui-confirm-bd" style="padding: 20px 0">
        <strong style="color: #dd5050;font-size: 18px" >{{countDownTime}}</strong>秒后系统将自动跳转回文章列表页
        <div class="c-f-btn-group">
          <w-button class="c-f-bg-btn" @click.native="goArtList">直接跳转</w-button>
        </div>
      </section>
    </w-dialog>
  </div>
</template>
<script>

const wangEditor = require('wangeditor');
import Schema from 'async-validator'
import WDialog from '@/components/w-dialog'
import FilterLabel from '@/components/FilterLabel'
import {fetch} from '../store/fetch'
import upImg from '../libs/upImg'

//import '../assets/js/ueditor/ueditor.config'
//import '../assets/js/ueditor/ueditor.all'
//import '../assets/js/ueditor/lang/zh-cn/zh-cn'
import WLabel from '../components/w-label'
import WTitle from '../components/w-title'
import WInput from '../components/w-input'
import WButton from '../components/w-button'
import WTextarea from '../components/w-textarea'

export default {
  name: 'WriteBlog',
  components: {
    WLabel,
    WTitle,
    WInput,
    WButton,
    WTextarea,
    FilterLabel,
    WDialog
  },
  data() {
    return {
      editorId: 'editorTarget',
      editor:'',
      columList: [{
        name: 0,
        title: '免费阅读'
      }],
      params: {
        articleTitle: '',
        articleIntroduce: '',
        articleContent: '',
        columnId: 0
      },
      errorTips: {
        articleTitle: '',
        articleContent: '',
      },
      countDownShow: false,
      dialogshow: true,
      countDownTime: 5,
      subBtnDisable: false,
    }
  },
  watch: {
    params:{
      deep: true,
      handler() {
       console.log('hello')
      }
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    isBindPhone() {
      return this.$store.state.isBindPhone
    },
    titleCssStyle() {
      return {
        color: '#000',
        borderLeft: '3px solid #e74c3c',
        fontSize: '24px'
      }
    },
    pid() {
      return this.$store.state.partnerId;
    },
    ruleValidate() {
      let rule = {
        articleTitle (rule, value, callback, source, options) {
          let errors = [];
          if(!value) {
            errors.push('标题不能为空')
          } else {
            errors = []
          }
          callback(errors);
        },
        articleContent: {
          required: true,
          message: '文章内容不能为空'
        },
      }

      if(this.params.columnId != 0) { // 收费摘要 必填
        rule = Object.assign(rule, {
          articleIntroduce: {
            required: true,
            message: '文章摘要不能为空'
          }
        })
      }
      return rule
    },
    iframeSrc() {
      return `${this.$store.state.config.caidao}/partnerpost.jsp`
    }
  },
  methods: {
    // 获取栏目
    getColumListArt() {
      fetch.getColumListArt().then(
        res => {
          this.columList = this.columList.concat(res.map((item) => {
            item.title = item.columnName
            item.name = item .id
            return item
          }))
        }
      )
    },

    eventSubmit () {
      if(this.subBtnDisable) {
        return false
      }

      if(!this.isBindPhone) {
        this.$store.dispatch('CHECKOUT_BINGPHONE');
        return false
      }
      this.testParams(() => {
        const iframe = this.$refs.iframe
        const self = this;
        iframe.contentWindow.saveArticle(self.params, (res)=> {
          if(res.code == 0) {
            self.countDownShow = true;
            self.countDown()
          } else {
            self.subBtnDisable = false;
            self.$vuw.prompt.show({
              content: res.msg
            })
          }
        })
      })
    },
    // 返回文章列表
    goArtList () {
      this.$router.push('/Index/AllProduct/ArticleManagement')
    },
    testParams (callback) {
      const validator = new Schema(this.ruleValidate);

      validator.validate(this.params, (errors, fields) => {
        if(errors) {
//          errors.forEach(({field, message}) => {
//            this.errorTips[field] = message
//          })
          this.$vuw.prompt.show({
            content: errors[0].message
          })
        } else {
          if(callback && typeof callback === 'function') {
            this.subBtnDisable = true;
            callback()
          }
        }
      })

    },
    // 取消
    eventCancel () {
      this.$router.go(-1)
    },
    // 倒计时跳转
    countDown () {
      const timer = setInterval(() => {
        this.countDownTime--
        if(this.countDownTime <= 0) {
          clearInterval(timer);
          this.goArtList()
        }
      }, 1000)
    },

  },
  created() {
    this.$store.dispatch('GET_PARTNER_ID').then(
      () => {
        this.getColumListArt()
      }
    );
    if(this.isLogin) {
       this.$store.dispatch('CHECKOUT_BINGPHONE')
    }
   
  },
  mounted() {
    document.domain = "hexun.com";
    const vm = this
    upImg.init(this.pid);
    this.editor = new wangEditor('editorTarget');
    // 普通的自定义菜单
    this.editor.config.menus = [
//      'source',
//      '|',
      'bold',
      'underline',
      'italic',
      'strikethrough',
      'eraser',
      'forecolor',
      'bgcolor',
//      '|',
      'quote',
      'fontfamily',
      'fontsize',
      'head',
      'unorderlist',
      'orderlist',
      'alignleft',
      'aligncenter',
      'alignright',
//      '|',
      'link',
      'unlink',
      'table',
//      'emotion',
//      '|',
      'upImg',
//      'video',
//      'location',
//      'insertcode',
//      '|',
      'undo',
      'redo',
      'fullscreen'
    ];
    // 上传图片
    this.editor.config.uploadImgUrl = 'http://post.photo.hexun.com/Upload/UploadPhoto.aspx';

    // 配置 onchange 事件
    this.editor.onchange = function () {
      // 编辑区域内容变化时，实时打印出当前内容
      console.log('change')
      vm.params.articleContent = this.$txt.html()
    };
    this.editor.create();

    this.$nextTick(
      // 保证this.$el已经插入

    )



  }
}
</script>
<style lang="stylus">
  .WriteBlog {
    text-align left
    width: 1000px;
    margin: 0 auto;
    background #fff
    padding 33px 0 33px 80px
    box-sizing border-box
    font-size 16px;
    .w-head {
      padding 33px 0 33px 80px
    }
    .w-section {
      padding 33px 0 33px 80px
    }
    .w-s-editorCon {
      width 580px

    }
    .w-s-editor {
      height 400px
      padding 10px
    }

    .w-s-editor-error {
      border: 1px solid #dd5050
    }

    .articleContent-errorTip {
      font-size 12px
      color #dd5050
    }

    .w-ul {
      display flex
      align-items center
    }

    .editor-ul {
      align-items baseline
    }
  }
  .c-f-btn-group {
    display flex
    justify-content center
    padding 30px 0
    .c-f-bg-btn {
      margin 0 20px
      box-sizing border-box
      width 140px
      height 40px
    }
  }
</style>