<style lang="stylus">

  .BaseInfoHistory {

  }
</style>
<template>
  <div id="BaseInfoHistory" class="BaseInfoHistory">
    <div class="tab_right_area border_1" id="parterInfo_one" style="display: block;">
      <!--<div class="parterInfo">-->
        <!--<h2 class="co_info"><i></i>合作者资料</h2>-->
      <!--</div>-->
      <form action="#" method="post" id="myInformation1" name="myInformation1">
        <div class="info-list2 admin_page">
          <dl class="list-dl clearfix list-dl-first">
            <dt>用户昵称：</dt>
            <dd>
              <p class="inp-p"><input type="text" id="username" name="username"/></p>
              <p class="tips blue">由于本平台前端显示为昵称，请先修改您的昵称。</p>
            </dd>
            <div class="rig mg-r_60">
              <p class="tx" id="touxiang"><img src=""></p>
              <p class="pT10"><a class="btn_blue120" href="http://i.hexun.com/newhome/set/photo"
                                 target="_blank">修改头像</a></p>
            </div>
          </dl>
          <dl class="list-dl clearfix">
            <dt><span class="red">*&nbsp;</span>真实姓名：</dt>
            <dd>
              <p class="inp-p"><input type="text" placeholder="请如实填写您的姓名" id="realname" name="realname"/></p>
            </dd>
          </dl>
          <dl class="list-dl clearfix">
            <dt><span class="red">*&nbsp;</span><span>性&nbsp;&nbsp;别：</span></dt>
            <dd class="pT10">
              <p class="sex clearfix" id="sex"><i class="on"></i><span>男</span><i></i><span>女</span></p>
            </dd>
          </dl>
          <dl class="list-dl clearfix" id="oparents">
            <dt><span class="red">*&nbsp;</span><span>居住地：</span></dt>
            <dd class="clearfix">
              <div class="inp-p cityP fl" id="prince_P">
                <p class="city m_zlxg prince"><span class="select" id="sub_s">省份</span><i><img
                    src="../assets/arrow.png"></i></p>
                <div class="selectHide ps" id="prince_hide">
                  <!-- <a>北京</a>
                  <a>上海</a> -->
                </div>
              </div>
              <div class="inp-p cityP fl" id="city_P">
                <p class="city cityName"><span class="select" id="sub_c">城市</span><i><img src="../assets/arrow.png"></i>
                </p>
                <div class="selectHide ci" id="city_hide">
                  <!-- <a>北京</a>
                  <a>上海</a> -->
                </div>
              </div>
            </dd>
          </dl>
          <dl class="list-dl clearfix">
            <dt><span class="red">*&nbsp;</span><span>手机号：</span></dt>
            <dd class="clearfix" id='iphone_y'>
              <p class="inp-p"><input type="text" name="myCellphone" id="myCellphone"/></p>
            </dd>
            <dd class="clearfix changeTel" id='iphone_n'><!--class名为changeTel的dd为未绑定手机号时的样式-->
              <p class="fl" id="cellphone"></p>
              <p class="fl changeTel">
                <i></i><a href="javascript:;" class="blue chanTele_number">更换号码</a>
              </p>
            </dd>
          </dl>
          <dl class="list-dl hide clearfix" id="se_send">
            <dt><span class="red">*&nbsp;</span><span>验证码：</span></dt>
            <dd class="clearfix relati">
              <p class="inp-p fl yzmP"><input type="text" id="code" name="code"/></p>
              <p class="fl"><a class="btn_blue_radius120" id="reg1_send">发送验证码</a><span class="hide">重新发送验证码时，添加btn_bg_gray样式</span>
              </p>
              <p class="fl yzm-tips fc_9 errorInfo">验证码错误，请重新输入</p>
            </dd>
          </dl>
          <dl class="list-dl clearfix">
            <dt>所属公司：</dt>
            <dd>
              <p class="inp-p com"><input type="text" class="inpw578" id="company" name="company"/></p>
            </dd>
          </dl>
          <div class="clearfix email">
            <dl class="list-dl fl clearfix">
              <dt>常用邮箱：</dt>
              <dd>
                <p class="inp-p emailQQ"><input type="text" class="inpw217" id="email" name="email"/></p>
              </dd>
            </dl>
            <dl class="list-dl fl clearfix">
              <dt class="qq">QQ：</dt>
              <dd>
                <p class="inp-p emailQQ"><input type="text" class="inpw217" id="qq" name="qq"/></p>
              </dd>
            </dl>
          </div>
          <dl class="list-dl clearfix">
            <dt>常用博客：</dt>
            <dd>
              <p class="inp-p com"><input type="text" class="inpw578" id="blog" name="blog"/></p>
            </dd>
          </dl>
          <dl class="list-dl clearfix">
            <dt>我的微博：</dt>
            <dd>
              <p class="inp-p com"><input type="text" class="inpw578" id="weibo" name="weibo"/></p>
            </dd>
          </dl>
          <dl class="list-dl clearfix">
            <dt><span>背景认证：</span></dt>
            <dd class="pT10">
              <p class="sex clearfix" id="bjrz">
                <i></i><span>知名博主</span><i></i><span>电视嘉宾</span><i></i><span>注册分析师</span><i></i><span>高手、达人</span></p>
              <p class="tips blue">只能勾选自认为最有代表性的一项。</p>
            </dd>
          </dl>
          <dl class="list-dl clearfix hide" id="zr-info">
            <dt><span class="red">*&nbsp;</span><span>认证资料：</span></dt>
            <dd class="clearfix assa">
              <!--<img src="images/loading.gif" height="50" width="50" style="display:block; position:absolute; top:135px; left:50%;margin-left:-25px;display:none; z-index:999;" id="loading_pic" >-->
              <!--  FK编辑器开始 2017-1-11-->
              <div class="datas" id="bg_ss">
                <!-- 入驻建议编辑器的提示信息部分 -->
                <div class="info_editor">
                  <p class="blue tips-blue">补充您的背景认证信息，验证您背景的有效性</p>
                  <p class="info-tips">包括且不限于（如有链接也请一并提供）：1、投资经历；2、个人实盘战绩截图；3、个人博客；4、微博；5、电视节目片段；6、视频；7、获奖证明等。</p>
                </div>
                <!-- 入驻建议编辑器 -->
                <div id="Editor" class="ifRTC" style="outline: none; width:100%;" contenteditable=true></div>
                <!-- 入驻建议编辑器隐藏域文档 -->
                <textarea class="data-txt hide" id="renzheng" name="renzheng"></textarea>
                <p class="upload clearfix"><input type="file" id="file_upload" name="file_upload"/><a
                    class="btn_blue_radius120 fr rrr">上传认证图片</a></p>
              </div>
              <!-- 编辑器结束 -->
            </dd>
          </dl>

          <dl class="list-dl clearfix">
            <dt><span class="red">*&nbsp;</span><span>个人简介：</span></dt>
            <dd>
              <textarea id="intro" name="intro"
                        placeholder="请填写您的教育、职业、人生经历、以及现任职位、擅长的领域和技能及取得的成就。如果您有某些权威的认证证书或职业资质，将使您更容易获得并通过认证。注：所获奖项等需网络可查！000000000请填写您的教育、职业、人生经历、以及现任职位、擅长的领域和技能及取得的成就。如果您有某些权威的认证证书或职业资质，将使您更容易获得并通过认证。注：所获奖项等需网络可查！请填写您的教育、职业、人生经历、以及现任职位、擅长的领域和技能及取得的成就。如果您有某些权威的认证证书或职业资质，将使您更容易获得并通过认证。注：所获奖项等需网络可查！请填写您的教育、职业、人生经历、以及现任职位、擅长的领域和技能及取得的成就。如果您有某些权威的认证证书或职业资质，将使您更容易获得并通过认证。注：所获奖项等需网络可查！"></textarea>
              <p class="red txtright pT10">
                <span style="text-align:left; color:#ccc; margin-right:10px;">已经输入了<span id="zishu"> 0 </span>字</span>
                <span class="blue">字数：</span><span>150</span><span>-</span><span>1000</span><span class="blue">之间</span>
              </p>
            </dd>
          </dl>
          <dl class="list-dl clearfix">
            <dt></dt>
            <dd class="rule-dd">
              <div class="rule">
                <label class="ft16"><i class="on" id="user_agreement"></i>我已阅读并同意《<a href="servcedoc.html"
                                                                                     target="_blank"
                                                                                     style="color: #3598db;">和讯合作者服务规范</a>》</label>
              </div><!-- btn_bg_gray -->
              <p class="submit"><input id="nextOne" type="button" class="btn_red_radius160 ft16 " value="下一步"></p>
            </dd>
          </dl>
        </div>
      </form>
    </div>
  </div>
  <!-- 合作者资料结束 -->
</template>
<script>

  export default {
    name: 'BaseInfoHistory',
    data() {
      return {
        msg: '历史版本的基本信息'
      }
    },
    create() {

    },
    mounted() {
//      import('@/assets/js/history/jquery-1.12.1.min.js')
//      require('@/assets/js/history/jquery-1.12.1.min.js')
//      require('@/assets/js/history/jquery.validate-1.13.1.js')
//      import('@/assets/js/history/comuserinfo.min.js');
//      require('@/assets/js/history/h5_upload.js');
//      require('@/assets/js/history/princeSelect.js');
//      require('@/assets/js/history/init.js');
//      require('@/assets/js/history/editor.js');
//      console.log(Hexun)
    }
  }
</script>