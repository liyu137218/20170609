<template>
  <div id="BaseInfo" class="BaseInfo">
    <!--第一步-->
    <div v-if="step === 1">
      <ul class="b-container">
        <li class="b-c-list">
          <label class="b-c-l-left start">真实姓名：</label>
          <div class="b-c-l-right">
            <input class="b-c-l-r-middle" v-model="teacher.realName"  type="text" placeholder="请输入您的真实姓名">
          </div>
        </li>
        <li class="b-c-list">
          <label class="b-c-l-left start">性别：</label>
          <div class="b-c-l-right">
            <input class="b-b-l-r-radio" v-model="teacher.hdsex" id="sexMan" type="radio" name="sex" value="男"><label for="sexMan">男</label>
            <input class="b-c-l-r-radio" v-model="teacher.hdsex" id="sexWoman" type="radio"  name="sex" value="女"><label for="sexWoman">女</label>
          </div>
        </li>
        <li class="b-c-list">
          <label class="b-c-l-left start" for="telPhone">手机号：</label>
          <div class="b-c-l-right">
            <input class="b-c-l-r-middle input-disable" v-model="teacher.mobile" :disabled="true" type="tel" id="telPhone" placeholder="请填写您的常用手机号">
            <a href="https://reg.hexun.com/user/ModifyPhone.aspx" target="_blank" class="b-c-l-btn">更换号码</a>
          </div>
        </li>
        <li class="b-c-list">
          <div class="b-c-l-left start">居住地：</div>
          <Distpicker hide-area 
            :placeholders="placeholders"
            :province="teacher.sfdq_tj" 
            :city="teacher.csdq_tj" 
            @selected="onSelected"></Distpicker>
        </li>
        <li class="b-c-list">
          <label class="b-c-l-left" for="email">绑定邮箱：</label>
          <div class="b-c-l-right">
            <input class="b-c-l-r-middle " :disabled="true" v-model="teacher.email" id="email" type="email">
            <a style="" href="http://i.hexun.com/newhome/set/email?flag=0" target="_blank" class="b-c-l-btn" >更换邮箱</a>
          </div>
        </li>
        <li class="b-c-list">
          <label class="b-c-l-left" for="">我的博客：</label>
          <div class="b-c-l-right">
            <input class="b-c-l-r-big" v-model="teacher.blog" type="text" placeholder="请输入您的博客">
          </div>
        </li>
        <li class="b-c-list">
          <div class="b-c-l-left leftTop" >背景认证：</div>
          <div class="b-c-l-right radioGroup-list">
            <div class="radioGroup">
              <input class="b-c-l-r-radio" v-model="teacher.notice_type" id="zhimingbozhu" type="radio" name="beijingrenzheng" value="知名博主">
              <label for="zhimingbozhu">知名博主</label>
            </div>
            <div class="radioGroup">
              <input class="b-c-l-r-radio" v-model="teacher.notice_type" id="dianshijiabin" type="radio" name="beijingrenzheng" value="电视嘉宾">
              <label for="dianshijiabin">电视嘉宾</label>
            </div>
            <div class="radioGroup">
              <input class="b-c-l-r-radio" v-model="teacher.notice_type" id="zhucefenxishi" type="radio" name="beijingrenzheng" value="注册分析师">
              <label for="zhucefenxishi">注册分析师</label>
            </div>
            <div class="radioGroup">
              <input class="b-c-l-r-radio" v-model="teacher.notice_type" id="gaoshouanddaren" type="radio" name="beijingrenzheng" value="高手、达人">
              <label for="gaoshouanddaren">高手、达人</label>
            </div>
          </div>
        </li>
        <li  class="b-c-list b-c-list-quill">
          <label class="b-c-l-left start">认证资料：</label>
          <div class="b-c-l-right b-c-l-right-edit">
            <div  id="editor-trigger" v-html="teacher.notice_info" style="height:320px">
            </div>
            <!--<img src="../assets/loading.gif" height="50" width="50" style="position: absolute; top: 135px; left: 50%; margin-left: -25px; z-index: 999; display: none;" id="loading_pic">-->
            <!--<div class="datas" id="bg_ss">-->
              <!--&lt;!&ndash; 入驻建议编辑器的提示信息部分 &ndash;&gt;-->
              <!--<div class="info_editor">-->
                <!--<p class="blue tips-blue" style="display: none;">补充您的背景认证信息，验证您背景的有效性</p>-->
                <!--<p class="info-tips" style="display: none;">包括且不限于（如有链接也请一并提供）：1、投资经历；2、个人实盘战绩截图；3、个人博客；4、微博；5、电视节目片段；6、视频；7、获奖证明等。</p>-->
              <!--</div>-->
              <!--&lt;!&ndash; 入驻建议编辑器 &ndash;&gt;-->
              <!--<div id="Editor" class="ifRTC" style="outline: none; width:100%;" contenteditable="true"></div>-->
              <!--&lt;!&ndash; 入驻建议编辑器隐藏域文档 &ndash;&gt;-->
              <!--<textarea class="data-txt hide" id="renzheng" name="renzheng"></textarea>-->
            <p class="upload clearfix">
              <input type="file" id="file_upload" @change="eventFileUp" name="file_upload">
              <label for="file_upload" class="btn_blue_radius120 fr rrr">上传认证图片</label>
            </p>
            <!--</div>-->
          </div>
        </li>
        <li  class="b-c-list">
          <label class="b-c-l-left" for="">所属机构：</label>
          <div class="b-c-l-right">
            <input class="b-c-l-r-small" v-model="teacher.orgname" id="" type="email">
          </div>
        </li>
        <li class="b-c-list">
          <label class="b-c-l-left" for="">营业部：</label>
          <div class="b-c-l-right">
            <input class="b-c-l-r-small" v-model="teacher.busDepartment"  id="" type="email">
          </div>
        </li>
        <li class="b-c-list">
          <label class="b-c-l-left" for="">投顾/理财师&nbsp;&nbsp;&nbsp;&nbsp;<br/>资质证号码：</label>
          <div class="b-c-l-right">
            <input class="b-c-l-r-small" v-model="teacher.jobCode" id="" type="email">
          </div>
        </li>
        <li class="b-c-list">
          <label  class="b-c-l-left leftTop" for="">个人简介：</label>
          <div class="b-c-l-right textareaGroup">
            <textarea class="b-c-l-r-textarea" v-model = "intro"></textarea>
            <p class="textareaGroup-tip">
              <span style="color:#a0a0a0">已经输入了{{intro.length}}字</span>
              字数：<i>50-250</i>之间
          </p>
          </div>
        </li>
      </ul>
      <div class="b-imgContainer">
        <img :src="teacher.pic" alt="">
        <a class="b-imgContainer-btn" href="http://i.hexun.com/newhome/set/photo" target="_blank">修改头像</a>
      </div>
      <div class="hasreadGroup">
        <input type="radio" checked="checked" id="hasRead">
        <label for="hasRead">我已阅读并同意<router-link to="/ServerDoc">《和讯合作者服务规范》</router-link></label>
      </div>
      <div class="btn-group">
        <a class="btn" @click="enevtNextStep" >下一步</a>
      </div>
    </div>
  </div>
</template>
<script>
  import Distpicker from '@/components/Distpicker.vue';
  const wangEditor = require('wangeditor');
//  import editor from 'vue2-medium-editor'
  export default {
    name: 'BaseInfo',
    data() {
      return {
        msg: 'this is 账户信息',
        step: 1,
        placeholders: {
          province: '--省--',
          city: '--市--',
        },
        picValue: '',
        // teacherInfo: {
        //   realName: '', //  *真实姓名
        //   hdsex: '', //  *性别
        //   sfdq_tj: '', //  *省
        //   csdq_tj: 'eee', //  *市
        //   mobile: '', //  *手机
        //   pic: '', // 头像
        //   qq: '', // qq
        //   email: '', // 邮箱
        //   blog: '', // 博客
        //   weibo: '', // 微博
        //   intro: '', // *简介
        //   code: '', // 验证码
        //   notice: '', // 背景认证
        //   notice_type: '', // 背景认证类型
        //   notice_info: '', // 背景认证内容
        //   level: '', // 合作这等级 现阶段为（zhibo）
        //   //如果orgname填了，busDepartment  与jobCode 必填
        //   orgname: '', // 公司机构
        //   busDepartment: '', // 营业部
        //   jobCode: '' // 固投编号
        // },
        editor: '',
        intro: '',
      }
    },
    computed: {
      teacher() {
        let serverDataP = this.$store.state.teacherInfo;
        

        let obj = {};
        if(serverDataP.Partner) {
          let serverData = serverDataP.Partner;

          obj = {
            realName:  serverData.truename , //  *真实姓名
            hdsex:  serverData.sex, //  *性别
            sfdq_tj:  serverData.province, //  *省
            csdq_tj: serverData.city, //  *市
            mobile:  serverDataP.phone, //  *手机
            pic:  serverDataP.photo, // 头像
            email:  serverData.email, // 邮箱
            blog:  serverData.blog, // 博客
            weibo:  serverData.weibo, // 微博
            intro:  serverData.intro, // *简介
            code:  serverData.notice, // 验证码
            notice:  serverData.notice, // 背景认证
            notice_type:  serverData.noticeType, // 背景认证类型
            notice_info:  serverData.noticeInfo, // 背景认证内容
            level:  serverData.level, // 合作这等级 现阶段为（zhibo）
            //如果orgname填了，busDepartment  与jobCode 必填
            orgname:  serverData.orgname, // 公司机构
            busDepartment:  serverData.busDepartment, // 营业部
            jobCode:  serverData.jobCode, // 固投编号
          }

          // this.placeholders = {
          //   province: locaData.sfdq_tj || serverData.province ,
          //   city: locaData.csdq_tj || serverData.city ,
          // }

          this.intro = obj.intro
        }
        return obj;
      },
      pid() {
        return this.$store.state.partnerId;
      },
      webOld() {
        return this.$store.state.oldHost;
      },
      userLevel() {
        return this.$store.state.userLevel;
      }

    },
    watch: {
      teacher: {
        // console.log(this.teacherInfo.csdq_tj)
        deet: true,
        handler() {
          console.log(this.teacher.csdq_tj)
        }
      },
      intro(val) {
        this.teacher.intro = val;
      }
    },
    components: {
      Distpicker,
    },
    methods: {
      enevtNextStep() {
//      :href="`${webOld}/teacher/admin/TagSelect.html`"
        // if(this.userLevel !== 1) {
        //   this.$store.dispatch('UPGRADE');
        //   return false;
        // }
        let isV = true;
        const data = this.teacher;
        // 必填项
        const testData = {
            realName:{
              // test:/^[\u4e00-\u9fa5]{2,10}$/,
              test:/\S/,
              tips: '请输入正确的姓名'
            }, //  *真实姓名
            hdsex: {
              test:/\S/,
              tips: '请选择称呼'
            }, //  *性别
            sfdq_tj: {
              test: /\S/,
              tips: '请选择居住地'
            }, //  *省
            csdq_tj: {
              test:/\S/,
              tip: '请选择居住地'
            }, //  *市
            // mobile: {
            //   test:/0?(13|14|15|18|17)[0-9]{9}/,
            //   tips: '请输入正确的手机号码'
            // }, //  *手机

//            code: '', // 验证码
//            notice: '', // 背景认证
//            notice_type: '', // 背景认证类型
//            notice_info: '', // 背景认证内容
//            level: '', // 合作这等级 现阶段为（zhibo）
//            //如果orgname填了，busDepartment  与jobCode 必填
//            orgname: '', // 公司机构
//            busDepartment: '', // 营业部
//            jobCode: '' // 固投编号
        };
        // 选填项
        const testAid1 = {
          qq: {
            test:/[1-9]([0-9]{5,11})/,
            tips: '请输入正确的qq号码'
          }, // qq
          email: {
            test:/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            tips: '请输入正确邮箱地址'
          }, // 邮箱
          blog: {
            test:/^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,
            tips:'请输入正确的博客地址'
          }, // 博客

          intro: {
            test: /^(?=.*?\S)[\s\S]{50,250}$/g,
            tips: '个人简介字数不符合规定'
          }, // *简介
        };
        const testAid = {
          orgname: {
            test:/\S/,
            tips: ''
          }, // 公司机构
          busDepartment: {
            test:/\S/,
            tips: '请输入营业部门'
          }, // 营业部
          jobCode: {
            test:/^[AS][0-9]{13}/,
            tips:'投顾/理财师资质证号码应该由A或S+13位数字组成'
          } // 固投编号
        };

        for( let i in data) {
          if(testData[i] && !testData[i].test.test(data[i])) {
            this.$store.dispatch('OPEN_SYS_DIALOG', {
              title:'系统提示',
              errorMsg: testData[i].tips
            });
            return false;
          }

          if(data[i] && testAid1[i] && !testAid1[i].test.test(data[i])) {
            this.$store.dispatch('OPEN_SYS_DIALOG', {
              title:'系统提示',
              errorMsg: testAid1[i].tips
            });
            return false;
          }
        }

        if(testAid.orgname.test.test(data['orgname'])) {
          for(let l in testAid) {
            if(!testAid[l].test.test(data[l])) {
              this.$store.dispatch('OPEN_SYS_DIALOG', {
                title:'系统提示',
                errorMsg: testAid[l].tips
              });
              return false
            }
          }

        }
        if(isV) {
          this.$store.dispatch('FILL_DETAIL_INFO', data).then(
            window.open(`${this.webOld}/teacher/admin/TagSelect.html`)
          )
        }
      },
      eventFileUp(event) {

        const pid = this.pid;
        let h5 = new H5_upload(pid);
        h5.init();
        h5.attributes(event.target).then(
          res => {
            this.editor.command(event, 'insertHtml', `<img src="${res}" />`);
            this.teacher.notice_info = this.editor.$txt.html()
          }
        )
      },
      onSelected(value) {
       this.teacher.sfdq_tj = value.province;
       this.teacher.csdq_tj = value.city;
      }
    },
    created() {
      this.$store.dispatch('GET_PARTNER_ID').then(
        () => {
          this.$store.dispatch('GET_TEACHER_INFO')
        }
      )
    },
    mounted() {
//      const pid = this.pid;
//      new H5_upload(pid).init();;
//      ajax({
//        url: _self.oringin+e,
//        data: fd,
//        type:'POST',
//        timeout: _self.timerCancel,
//        crossDomain: true,
//        processData: false,
//        contentType: false,

        this.editor = new wangEditor('editor-trigger');
        this.editor.config.menus = [];

        this.editor.create();
//      editor.command(e, 'insertHtml', s);
    }
  }
</script>
<style lang="stylus">
  .BaseInfo {
    // *号标记
    padding-top 40px
    padding-right 60px
    position relative
    .start:before {
      content '*'
      color #ee5050
      font-size 20px
      transform translate(0,6px)
      margin-right 5px
    }
    .b-c-list {
      display flex
      padding-bottom 20px

    }

    .b-c-list-quill {
      height 370px
      align-items flex-start
    }
      // 左侧
    .b-c-l-left {
      width 130px
      display flex
      justify-content flex-end
      align-items center
    }
      // 右侧
    .b-c-l-right {
      flex 1
      display flex
      flex-wrap wrap
      justify-content flex-start
      align-items center
      position relative
    }
    .ql-toolbar.ql-snow + .ql-container.ql-snow {
      border-top: 1px solid #ccc;
    }
    .b-c-l-right-edit {
      display flex
      width 500px
      height 320px
      position relative
      box-sizing border-box

      .wangEditor-container {
        /*width 100%*/
        height 320px
        .wangEditor-menu-container {
          border none !important
        }
      }

      .btn_blue_radius120 {
        display: block;
        background: #3598db;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        width: 120px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        Z-INDEX: 88;
      }

      .clearfix {
        position absolute
        bottom 20px
        right 20px
        z-index 99
        input {
          display none
        }
      }

    }

    input {
      height 40px
      box-sizing border-box
      margin-left 10px
      padding-left 10px
      font-size 14px
      box-shadow none
    }
      // 中号input
    .b-c-l-r-middle {
      width 280px
      border 1px solid #ccc
    }

     // 单选
    .b-b-l-r-radio {
      margin-left 20px
    }
    // 右侧更换按钮
    .b-c-l-btn {
      margin-left 20px
      color #ee5050
      cursor pointer
    }
      // 小号input
    .b-c-l-r-small {
      width 240px
      border 1px solid #ccc
    }
      // 大号input
    .b-c-l-r-big {
      flex 1
      border 1px solid #ccc
    }
    // 右侧居上
    .leftTop {
      height 43px
    }
    // 点选列表
    .radioGroup-list {
      justify-content space-between
      position relative
    }
    .radioGroup-list:after {
      content '(提示：只能勾选自认为最有代表性的一项)'
      color #3598db
    }
    .radioGroup {
      display flex
      align-items center
    }
    // textarea
    .b-c-l-r-textarea {
      flex 1
      height 160px
      border 1px solid #ccc
      resize none
      font-size: 14px;
	    color: #999;
      padding 5px
      box-sizing border-box
    }
    .textareaGroup-tip {
      position absolute
      right 0
      bottom -30px
      color #3598db
      i {
        color #ee5050
        font-style normal
      }
    }

    .b-imgContainer {
      display flex
      flex-direction column
      position absolute
      top 40px
      right 60px
      img {
        width 120px
        height 120px
        background blue
      }

      .b-imgContainer-btn {
        width 100%
        height 30px
        display flex
        align-items center
        justify-content center
        background #3598db
        color #fff
        margin-top 10px
      }
    }
    .hasreadGroup {
      margin 20px
      display flex
      justify-content center
      align-items center
    }
    // 底部按钮
    .btn-group {
      display flex
      justify-content center
      padding  50px 0
      .btn {
        height 40px
        width 140px
        display flex
        align-items center
        justify-content center
        background #e74c3c
        color #fff
        border-radius 5px
        cursor pointer
        margin 0 20px
      }

    }
    .b-tag-header {
      text-align left
    }

  }
</style>