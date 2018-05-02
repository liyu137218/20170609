<template>
	<div class="WriteBlog">
		<header class="w-head">
			<w-title :cssStyle="titleCssStyle">写文章</w-title>
		</header>
		<section class="w-section">
     
			<w-input v-model="params.articleTitle" title="标题：" :icon="false" placeholderText="请输入文章标题" :max="250" :errorTips="errorTips.articleTitle">
			</w-input>
			<div class="w-ul">
				<w-label title="发布栏目："></w-label>
				<FilterLabel class="w-ul-list" :label="columList" v-model="params.columnId"></FilterLabel>
			</div>
			<w-textarea :icon="false" v-if="params.columnId != 0" title="免费内容：" v-model="params.articleIntroduce" placeholderText="免费展示部分，最多300汉字" :max="300">
			</w-textarea>

			<div class="w-ul editor-ul">
				<w-label :title="params.columnId != 0?'付费内容：':''"></w-label>
				<div class="w-s-editorCon" >
					<div ref="editor" :class="['w-s-editor', errorTips.articleContent ? 'w-s-editor-error':'']" :id="editorId">
						<p class="placetext" style="color: #C7C7CD;font-size:15px">这样的文章更受读者喜欢:</p>
						<ul>
							<li style="list-style:disc;color: #C7C7CD;font-size:14px">逻辑清晰 , 排版简洁</li>
							<li style="list-style:disc;margin-top:10px;color: #C7C7CD;font-size:14px">分析热点事件 , 两市行情 , 投资机会</li>
							<li style="list-style:disc;margin-top:10px;color: #C7C7CD;font-size:14px">重点突出 , 有明确的观点和判断</li>
							<li style="list-style:disc;margin-top:10px;color: #C7C7CD;font-size:14px">好的标题是成功的一半</li>
						</ul>
					</div>
					<div class="articleContent-errorTip" v-if="errorTips.articleContent">
            {{errorTips.articleContent}}
            </div>
				</div>
			</div>

<div style="display:flex;margin-top:15px;overflow:hidden;align-items: baseline;" v-show="params.columnId != 0">
  	<w-label title="上传附件 :  "></w-label>
  <div>
    <input @change="pushPdf($event)"  ref="fileInput" id="fileUp" style="display: none" type="file" name="qq">
    <input readonly placeholder="请上传pdf附件" style="outline: rgb(255, 0, 0);border: 1px solid #ccc;height: 30px;width: 300px;padding-left: 10px;" id="fileType" type="text">
    <span v-show="params.fileNameList==''" class="pdfbtn"    @click="upLoadPdf">上传</span >
    <span v-show="params.fileNameList!=''" class="pdfbtn"   @click="DelePdf">删除</span >
  </div>
</div>


		</section>
		<footer>
			<div class="c-footer">
				<div class="c-f-btn-group">
					<w-button class="c-f-bg-btn" @click.native="eventCancel">取消</w-button>
					<w-button class="c-f-bg-btn" @click.native="eventSubmit">发布</w-button>
				</div>
				<input id="getFocus" type="text" value="获取焦点,引导用户点击富文本触发事件" autofocus="autofocus" style="opacity:0" >
			</div>
		</footer>

    <div  id="loading_pic" ><img id="pdf_img" 
    src="../assets/loading01.gif" alt=""></div>

		<iframe style="display: none;" ref="iframe" :src="iframeSrc" frameborder="0"></iframe>
		<w-dialog v-if="countDownShow" v-model="dialogshow">
			<header class="wui-confirm-hd">
				<strong class="wui-confirm-title">提示</strong>
			</header>
			<section class="wui-confirm-bd" style="padding: 20px 0">
				<strong style="color: #dd5050;font-size: 18px">{{countDownTime}}</strong>秒后系统将自动跳转回文章列表页
				<div class="c-f-btn-group">
					<w-button class="c-f-bg-btn" @click.native="goArtList">直接跳转</w-button>
				</div>
			</section>
		</w-dialog>
	</div>
</template>
<script>
const wangEditor = require("wangeditor");
import Schema from "async-validator";
import WDialog from "@/components/w-dialog";
import FilterLabel from "@/components/FilterLabel";
import { fetch } from "../store/fetch";
import upImg from "../libs/upImg";

//import '../assets/js/ueditor/ueditor.config'
//import '../assets/js/ueditor/ueditor.all'
//import '../assets/js/ueditor/lang/zh-cn/zh-cn'
import WLabel from "../components/w-label";
import WTitle from "../components/w-title";
import WInput from "../components/w-input";
import WButton from "../components/w-button";
import WTextarea from "../components/w-textarea";
export default {
  name: "WriteBlog",
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
      editorId: "editorTarget",
      editor: "",
      columList: [
        {
          name: 0,
          title: "免费阅读"
        }
      ],
      params: {
        articleTitle: "",
        articleIntroduce: "",
        articleContent: "",
        columnId: 0,
        fileNameList: ""
      },
      errorTips: {
        articleTitle: "",
        articleContent: ""
      },
      countDownShow: false,
      dialogshow: true,
      countDownTime: 5,
      subBtnDisable: false
    };
  },
  watch: {
    params: {
      deep: true,
      handler() {
        console.log("hello");
      }
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    isBindPhone() {
      return this.$store.state.isBindPhone;
    },
    titleCssStyle() {
      return {
        color: "#000",
        borderLeft: "3px solid #e74c3c",
        fontSize: "24px"
      };
    },
    pid() {
      return this.$store.state.partnerId;
    },
    ruleValidate() {
      let rule = {
        articleTitle(rule, value, callback, source, options) {
          let errors = [];
          if (!value) {
            errors.push("标题不能为空");
          } else {
            errors = [];
          }
          callback(errors);
        },
        articleContent: {
          required: true,
          message: "文章内容不能为空"
        }
      };
      if (this.params.columnId != 0) {
        // 收费摘要 必填
        rule = Object.assign(rule, {
          articleIntroduce: {
            required: true,
            message: "文章摘要不能为空"
          }
        });
      }
      return rule;
    },
    iframeSrc() {
      return `${this.$store.state.config.caidao}/partnerpost.jsp`;
    }
  },
  methods: {
    // 获取栏目
    getColumListArt() {
      fetch.getColumListArt().then(res => {
        this.columList = this.columList.concat(
          res.map(item => {
            item.title = item.columnName;
            item.name = item.id;
            return item;
          })
        );
      });
    },
    eventSubmit() {
      if (this.subBtnDisable) {
        return false;
      }
      if (!this.isBindPhone) {
        this.$store.dispatch("CHECKOUT_BINGPHONE");
        return false;
      }
      this.testParams(() => {
        const iframe = this.$refs.iframe;
        const self = this;
        //TODO: 发送数据  判断要不要发送pdf 免费的不发送
        if (this.params.columnId == 0) {
          this.params.fileNameList = "";
        }
        iframe.contentWindow.saveArticle(self.params, res => {
          if (res.code == 0) {
            self.countDownShow = true;
            self.countDown();
          } else {
            self.subBtnDisable = false;
            self.$vuw.prompt.show({
              content: res.msg
            });
          }
        });
      });
    },
    // 返回文章列表
    goArtList() {
      this.$router.push("/Index/AllProduct/ArticleManagement");
    },
    testParams(callback) {
      if (this.params.articleContent.indexOf("placetext") != -1) {
        // console.log("内容为默认文字 点击提交拦截");
        this.params.articleContent = "";
      }
      const validator = new Schema(this.ruleValidate);
      validator.validate(this.params, (errors, fields) => {
        if (errors) {
          //          errors.forEach(({field, message}) => {
          //            this.errorTips[field] = message
          //          })
          this.$vuw.prompt.show({
            content: errors[0].message
          });
        } else {
          if (callback && typeof callback === "function") {
            this.subBtnDisable = true;
            callback();
          }
        }
      });
    },
    // 取消
    eventCancel() {
      this.$router.go(-1);
    },
    // 倒计时跳转
    countDown() {
      const timer = setInterval(() => {
        this.countDownTime--;
        if (this.countDownTime <= 0) {
          clearInterval(timer);
          this.goArtList();
        }
      }, 1000);
    },
// 模拟触发隐藏的真实file-input 
    upLoadPdf() {
      this.$refs.fileInput.click();
    },
    // 删除pdf
    DelePdf() {
      this.params.fileNameList = "";
      $("#fileType").val("");
    },
    // 上传pdf
    pushPdf(e) {
      var that = this;
      var file = e.target.files[0];
      var type = file.type.split("/")[1];
      if(type.toLowerCase()!="pdf"){
        alert("请上传pdf文件");
        return
      }
      var size = Math.round(file.size / 1024 / 1024);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      console.log("object");
      $("#loading_pic").show();
      reader.onerror = function(params) {
        alert("上传出错,请稍后再试");
        $("#loading_pic").hide();
      };
      reader.onabort = function(params) {
        alert("上传中断,请稍后再试");
        $("#loading_pic").hide();
      };
      var formData = new FormData();
      formData.append("fileUp", file);
      $.ajax({
        url: "http://test.apicaidao.hexun.com/partner/article/upload",
        data: formData,
        type: "POST",
        xhrFields: { withCredentials: true },
        processData: false,
        cache: false,
        async: false,
        contentType: false
      })
        .done(function(data) {
          console.log(data);
          if (data.code == 0) {
            that.params.fileNameList = data.data[0];
            $("#fileType").val(file.name+"----已上传成功");

            $("#loading_pic").hide();
          } else {
            alert("pdf上传失败,请稍后再试");
            $("#loading_pic").hide();
          }
        })
        .fail(function(data, status, xhr) {
          alert("服务器繁忙,请稍后再试");
          $("#loading_pic").hide();
        });
    }
  },
  created() {
    this.$store.dispatch("GET_PARTNER_ID").then(() => {
      this.getColumListArt();
    });
    if (this.isLogin) {
      this.$store.dispatch("CHECKOUT_BINGPHONE");
    }
  },
  mounted() {
    document.domain = "hexun.com";
    const vm = this;
    upImg.init(this.pid);
    wangEditor.config.printLog = true;
    this.editor = new wangEditor("editorTarget");
    // 普通的自定义菜单
    this.editor.config.menus = [
      // 编辑器不用的功能
      // 'underline',
      // 'italic',
      // 'strikethrough',
      // 'bgcolor',
      // 'quote',
      // 'fontfamily',
      // 'fontsize',
      //      'emotion',
      //      'video',
      //      'location',
      //      'insertcode',
      //      'source',
      // "bold",
      // "head",

      "eraser",
      "forecolor",
      "unorderlist",
      "orderlist",
      "alignleft",
      "aligncenter",
      "alignright",
      "link",
      "unlink",
      "table",
      "upImg",
      "undo",
      "redo",
      "fullscreen"
    ];
    // 上传图片
    this.editor.config.uploadImgUrl =
      "http://post.photo.hexun.com/Upload/UploadPhoto.aspx";
    // 配置 onchange 事件
    this.editor.onchange = function() {
      // 编辑区域内容变化时，实时打印出当前内容
      // console.log("change");
      vm.params.articleContent = this.$txt.html();
    };
    this.editor.create();
    // 注意 文档要求 用js让编辑器内容为空 必须 vm.editor.$txt.html('<p><br></p>');  而不能html("")  不然会导致付费内容样式诡异
    // 因为插件编辑器 内容为空 也只能<p><br></p>  失去焦点判断无效的空格 回车等 所有js添加内容加一个class名判断
    this.editor.$txt.focus(function() {
      var isul = vm.editor.$txt.find("p").hasClass("placetext");
      if (isul) {
        vm.editor.$txt.html("<p><br></p>");
      }
    });
    this.editor.$txt.blur(function() {
      var NulValt = vm.editor.$txt.text().replace(/[\r\n\s+]/g, "");
      if (NulValt == "" && $(vm.editor.$txt.html()).find("img").length <= 0) {
        var html1 =
          '<p class="placetext" style="color: #C7C7CD;font-size:15px">这样的文章更受读者喜欢:</p><ul><li style="list-style:disc;color: #C7C7CD;font-size:14px;margin-top:15px">逻辑清晰 , 排版简洁</li><li style="list-style:disc;margin-top:10px;color: #C7C7CD;font-size:14px">分析热点事件 , 两市行情 , 投资机会</li><li style="list-style:disc;margin-top:10px;color: #C7C7CD;font-size:14px">重点突出 , 有明确的观点和判断</li><li style="list-style:disc;margin-top:10px;color: #C7C7CD;font-size:14px">好的标题是成功的一半</li></ul>';
        vm.editor.$txt.html(html1);
      }
    });
    this.$nextTick();
    // 保证this.$el已经插入
    // 保证在文本框自动获取焦点之后 让隐藏input获取焦点
    $("#getFocus").focus();
  },
  updated() {
    //  切换免费和vip时 根据this.params.columnId判断
  }
};
</script>
<style lang="stylus">
.WriteBlog {
  text-align: left;
  width: 1000px;
  margin: 0 auto;
  background: #fff;
  padding: 33px 0 33px 80px;
  box-sizing: border-box;
  font-size: 16px;

  .w-head {
    padding: 33px 0 33px 80px;
  }

  .w-section {
    padding: 33px 0 33px 80px;
  }

  .w-s-editorCon {
    width: 580px;
  }

  .w-s-editor {
    height: 400px;
    padding: 10px;
  }

  .w-s-editor-error {
    border: 1px solid #dd5050;
  }

  .articleContent-errorTip {
    font-size: 12px;
    color: #dd5050;
  }

  .w-ul {
    display: flex;
    align-items: center;
  }

  .editor-ul {
    align-items: baseline;
  }
}

.c-f-btn-group {
  display: flex;
  justify-content: center;
  padding: 30px 0;

  .c-f-bg-btn {
    margin: 0 20px;
    box-sizing: border-box;
    width: 140px;
    height: 40px;
  }
}

.pdfbtn {
  height: 33px;
  width: 62px;
  display: inline-block;
  background: #4588DD;
  text-align: center;
  line-height: 30px;
  color: white;
  cursor: pointer;
}

#loading_pic {
  display: none;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999999;
}

#pdf_img {
  position: absolute;
  top: 50%;
  left: 50%;
}

.delePdf {
  display: none;
}
</style>
