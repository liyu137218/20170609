/**
  上线删除： api test && script和 css 中引用的test地址换成正式的地址
**/
 var domain =  'http://test.partner.px.hexun.com';
 var teacher = "http://test.api.zhibo.hexun.com";
 var applyteacherUrl = 'http://partner.px.hexun.com/partner/request.html'; // 线上环境合作者入驻地址
 var mypath = {
   searchList: teacher+"/api/search/query"
 };
 var Hexun = { 
  // 全网检测用户登录
  checklogin: "http://reg.tool.hexun.com/wapreg/checklogin.aspx?format=json&encode=no",

  // 获取合作者的基本信息(必须是登录用户)
  conallInfo: domain+"/api/partner/get_detail_info",
  
   // 投顾
  adviserInfo: domain+"/api/partner/fill_adviser_info",

  // 老师后台管理获取直播室id 参数必须加上合作者ID
  getLiveRoomInfo: teacher+"/api/user/get_teacher_rooms",

 // 保存直播室信息  如果roomid为空的话，是保存，否则就默认是编辑
  reserveLiveRoom: teacher+"/api/user/request_zhibo_room",

 // 判断是不是助理
 isAssiantes: teacher+"/api/user/is_teacher_assistant",

 // 搜索 keyWord=1  
  search: teacher+"/api/search/typeahead",

  searchList: teacher+"/api/search/query",

  init: function(){ 

      this.dataInit();  // 检测登录
      this.isTeacher(); // 检测老师
  },
 
  dataInit:function(){
   var This = this;  
   commonJs.jsonps(this.checklogin,'',function(data){ 
          if(data.islogin == 'False')
            {
               popupLogin();
           }else{
               var x = (data.islogin == 'False') ? false : true;
                   // 助理检测
               This.isAssiant();
           }        
      })  
     
    },
    isAssiant: function(){ 
       // 判断当前用户是不是助理，助理是不能成为合作者
       var This = this;
       commonJs.jsonps(This.isAssiantes,'',function(data){
            if(data.resultKey == 'ok'){
              // 是助理
               Realert('您当前是老师助理，系统不允许助理申请成为投顾');
               var t0 = setTimeout(function(){
                 window.location.href="http://zhibo.hexun.com/";
                 clearTimeout(t0)
               },3000) 
            }
       })
    },  
    isTeacher: function(){
      // 检测当前用户是不是老师\
      
      commonJs.jsonps(this.conallInfo,'',function(data){ 
        if( !(data.resultKey === 'ok'&& data.data.Partner.review ===2) ){
                Realert('您还不是合作者老师，请先申请合作者才能成为和讯投顾者。')
                setTimeout(function(){
                  window.location.href= applyteacherUrl
                },2000)
        }
      })
    }
}
var commonJs = {
   jsonps: function(url,data,callback){
    $.ajax({
      type:"GET",
      data: data,
      dataType:"jsonp",
      url:url,
      async:false,
      success:callback
    });
  }
}
function Realert(text){ 
  function __IsOK(obj,time){
          if(document.getElementById(obj))
          {
              return true;
          }
          window.setInterval(function(){
              __IsOK (obj,time);
          }, time);
      }
  function __forbot(obj){
          var bool = __IsOK(obj,10);
          var beel = __IsOK(obj,15); 
         if(bool){
              showBox('openWrap_unnormal');
          }
      
        if(beel){
          document.getElementById('openclose').onclick = function(){ 
            closeBox('openWrap_unnormal');
            setTimeout(function(){ 
              $('#openWrap_unnormal').remove(); 
            },100)
         };  
        }
          
  } 
   var str = '<div class="diaBox w560" id="openWrap_unnormal">\
      <div class="inviteTit clearfix">\
        <p class="fl ft18">系统提示：</p>\
        <a class="openclose fr" id="openclose" href="javascript:; "></a>\
      </div>\
      <p class="ft16 fc_6 sys-tips">{{text}}</p>\
    </div>';
    closeBox('openWrap_unnormal');
    $('#openWrap_unnormal').remove();
   $(str.replace('{{text}}',text)).appendTo($(document.body));
         __forbot('openWrap_unnormal');
         __forbot('openclose');
} 