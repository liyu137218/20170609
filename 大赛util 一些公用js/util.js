/**
* @class hxcd
* @Author XuRuFei
* @createTime 20171130
* @version 1.0
*/
if (typeof(hxds)=='undefined') {var hxds = { lang: {}, params: {} }};
(function(){
	//组件
	hxds.util={
		isprand:"true",
	/**
	 	*转换时间格式
	    *@param {String} de       字符串
	*/
	setDate:function(de){
			if (typeof(de) == 'undefined') {
				var date = new Date();
			} else {
				var date = new Date(parseInt(de));
			}
			var nian = (date.getFullYear());
			var yue = date.getMonth() + 1 < 10 ? '0' + parseInt(date.getMonth() + 1) : date.getMonth() + 1;
			var ri = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
			var shi = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
			var fen = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
			var miao = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			return {
				n: nian,
				y: yue,
				r: ri,
				s:shi,
				f:fen,
				m:miao
			}
	},
	//写cookies
	setCookie:function(name,value)
	{
		var Days = 100000000000000000000;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	},
	getCookie:function (name)
	{
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
	    if(arr=document.cookie.match(reg))
	 
	        return unescape(arr[2]); 
	    else 
	        return null; 
	},
	/**
	 	*获取url参数
        *@param {String} string       字符串
	*/
	getUrlParam:function(string){  
    	//构造一个含有目标参数的正则表达式对象  
   		var reg = new RegExp("(^|&)"+ string +"=([^&]*)(&|$)");  
    	//匹配目标参数  
    	var r = window.location.search.substr(1).match(reg);  
    	//返回参数值  
    	if (r!=null) return unescape(r[2]);   
    	return null;  
	},
    /**
	 	*ajax
        *@param {String} option       字符串数组
	*/ 
	SetAjax:function(option)
	{
			jQuery.ajax({
				dataType: "jsonp",
				type: "get",
				url: option.urlstr,
				success: function(str) {
					option.getresult(str);
				},
				error: function(msg) {
					option.getresult(msg)
				}
			});
	},
	/**
	 *extend
	 *@param {String} obj1    key   继承
	 *@param {String} obj2    value   继承
	 */
	extend: function(obj1, obj2) {
		for (var attr in obj2) {
			obj1[attr] = obj2[attr]
		}
	},
	/**
	    *返回中英文字符长度
        *@param {String} str       字符串
		*@param {String}           字符个数
	*/
	getRealLen:function(str) {
		return str.replace(/[^\x00-\xff]/g, '__').length; //这个把所有双字节的都给匹配进去了  
	},
	/**
	    *截取字符串
        *@param {String} str       要截取的字符串
		*@param {String} len       要截取的字符个数
	*/
	beautySub:function( str, len) {  
       var reg = /[\u4e00-\u9fa5]/g,    //专业匹配中文  
           slice = str.substring(0,len),  
           realen = len - ( ~~( slice.match(reg) && slice.match(reg).length ) );  
           return slice.substring(0, realen ? realen : 1);  
	},
	/** 
	 * 同步加载js脚本 
	 * @param id   需要设置的<script>标签的id 
	 * @param url   js文件的相对路径或绝对路径 
	 * @return {Boolean}   返回是否加载成功，true代表成功，false代表失败 
	 */
	loadJs: function(url,fn){
			jQuery.ajax({
				url: url,
				dataType: "script",
				success:function(data)
				{
					if(typeof(fn)!='undefined')
					{
						fn(data);
					}
				}
			})
	},
	/** 
	 * 处理图片清晰度
	 * @param url,rt,lt   图片地址 ,替换数字
	 * @return {Boolean}   返回是否加载成功，true代表成功，false代表失败 
	 */
	filtimg:function(url,rt,lt){
			return url.replace(rt,lt)
	},
	/**
		*获取滚动条当前的位置 
	*/
	getScrollTop:function () { 
		var scrollTop = 0; 
	    if (document.documentElement && document.documentElement.scrollTop) { 
	    scrollTop = document.documentElement.scrollTop; 
	    } 
	    else if (document.body) { 
	    scrollTop = document.body.scrollTop; 
	    } 
	    return scrollTop; 
    },
	/**
		*获取当前可视范围的高度 
	*/
	getClientHeight:function () { 
    	var clientHeight = 0; 
	    if (document.body.clientHeight && document.documentElement.clientHeight) { 
	    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight); 
	    } 
	    else { 
	    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight); 
	    } 
	    return clientHeight; 
 	 },
 	 /**
		*获取文档完整的高度 
	*/
 	 getScrollHeight:function () { 
		return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
	},
	/**
	 	*判断是否是财道APP
        *@param {bool} return      字符串
	*/
	isApp:function()
	{
		var ua = navigator.userAgent.toLowerCase();
		if(ua.indexOf('hxappid')>0) {
			return true;
	 	} else {
			return false;
		}
	},
	getUserMsg:function(){
		$.ajax({
			type:"get",
			url:hxds.interface.islogin,
			dataType:"jsonp",
			success:function(data){
				hxds.util.obj={userid:data.userid,islogin:data.islogin}
			}
		});
	},
	//四舍五入
	toDecimal:function(x) {    
        var f = parseFloat(x);    
        if (isNaN(f)) {    
            return false;    
        }    
        var f = Math.round(x*100)/100;    
        var s = f.toString();    
        var rs = s.indexOf('.');    
        if (rs < 0) {    
            rs = s.length;    
            s += '.';    
        }    
        while (s.length <= rs + 2) {    
            s += '0';    
        }    
        return s;    
    },
	//写cookies
	setCookie:function(name,value)
	{
		var Days = 100000000000000000000;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	},
	getCookie:function (name)
	{
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
	    if(arr=document.cookie.match(reg))
	 
	        return unescape(arr[2]); 
	    else 
	        return null; 
	},
	myaccount:function(status){
		$.ajax({
			type:"get",
			url:hxds.interface.islogin,
			dataType:"jsonp",
			success:function(data){
//					console.log(data);
				hxds.util.userId=data.userid;
				hxds.util.myaccountf(status);
			}
		});
	},
	myaccountf:function(status){
		var checkPhone = new RealInformation();
		checkPhone.init({isLogin:false}).then(function(){
			$.ajax({
				type:"get",
				url:hxds.interface.getUserInfo+"?hexunId="+hxds.util.userId,
				dataType:"jsonp",
				success:function(data){
					
					if(data.data==null){
						$('<div class="mess" id="tc-sign">\
			                <div class="tctit">\
			                    温馨提示\
			                    <i class="close close1"></i>\
			                </div>\
			                <div class="tcCon">\
			                    <div class="tipTxt borB clearfix">\
			                        <span></span><p class="fl">用户，您好！成功创建账户即可获得100万模拟炒股资金，并且您的账户成绩将直接参加和讯网举办的模拟周赛及模拟月赛无需再次报名，更有万元奖金等你来拿！</p>\
			                    </div>\
			                    <div class="tcBtn clearfix">\
			                        <a href="javascript:void(0)" class="btn-redBor fl cancel">取消</a><a  href="javascript:void(0)" class="red-btn red-btn-160 fr sure">确定</a>\
			                    </div>\
			                </div>\
			            </div>\
			            <div class="mask"></div>').appendTo("body");
			            $(".mess").css("margin-top","-"+($(".mess").height()/2)+"px")
						//状态为不为1判断我的账户点击，状态为1判断大赛排行参赛点击按钮
						if(status==1){
							yz(status)
						}else{
							yz(status)
						}
						function yz(status){
							$(".mask").show();
							$(".mess").show();
							$(".cancel,.close").click(function(){
								$(".mask,.mess").remove();
								if(status!=1){
//									var str=window.location.pathname.replace(/(^.*\/)/ig,'').split(".")[0];
									location.href=location.href;
								}
							})
							$(".sure").click(function(){
								$.ajax({
									type:"get",
									url:hxds.interface.regUser+"?hexunId="+hxds.util.userId,
									dataType:"jsonp",
									success:function(data){
//										console.log(data);
										if(data.code==1){
											$(".mask,.mess").remove();
											if(status==1){
												$('.take').html('已参赛').removeClass('boxid')
												$('.take').eq(0).addClass('wek');
												$('.take').eq(1).addClass('mon');
												$('.wek').bind('click',function(){
													window.open('gameinfo.html?type=2');
												})
												$('.mon').bind('click',function(){
													
													window.open('gameinfo.html?type=1');
												})
											}else if(status==2){
												$('.take').html('已参赛').removeClass('signUp');
												location.href=location.href;
											}else{
												location.href="account.html?userid="+hxds.util.userId
											}
											
										}else{
											$(".mask,.mess").remove();
											if(status==2){
												location.href=location.href;
											}else{
												location.href="account.html?userid="+hxds.util.userId
											}
											
										}
									}
								});
							})
						}
						
					}else{
						if(status!=1){
							location.href="account.html?userid="+hxds.util.userId
						}
						
					}
				}
			});
			
		})
	},
   userLogo:function(img){
   	if(img == null || img == ""){
   		img="http://logo1.tool.hexun.com/9d4edd-40.jpg"
   	}else{
   		img=img
   	}
   	return img;
   },
   setHost:function() {
        var _host = window.location.host, _hostName = window.location.hostname
            ,_isTest=_host.match('test.') || _host.match('172.0')|| _host.match('127') || _host.match('192.168') || _host.match('10.4.22.116') || _host.replace(/\s*/ig,'')==''
            ,_key;
        for(_key in hxds.hostList){
            hxds.hostList[_key]=hxds.hostList[_key][_isTest?0:1];
        }
        for(_key in hxds.interface){
            hxds.interface[_key]=hxds.hostList[hxds.interface[_key][0]]+hxds.interface[_key][1];
        }
    }
}})();
(function(){
	//接口数据
	hxds.interface={
		sypm:['vipHost','api/rank/getListRankInfo'],// 获取排行榜列表信息
		conduct:['vipHost','api/season/queryRealMatch'],//进行中的实盘赛期
		spsph:['vipHost','api/season/queryRealRank'],//实盘排行
		nrdynamic:['vipHost','api/tradeinfo/queryLimit'],//牛人动态,
		islogin:['regHost','wapreg/checklogin.aspx?format=json&encode=no'],//判断是否登录
		getUserInfo:['vipHost','api/account/getUserInfo'],//判断是否报名
		regUser:['vipHost','api/account/regUser'],//去报名
		news:['vipHost','api/news/query'],//首页赛事新闻
		personal:['vipHost','api/rank/getUserRankInfo'],//获取个人排名信息及收益率
		ranking:['vipHost','api/rank/getListRankInfo'],//获取当期排行榜列表信息
		getUserRankInfo:['vipHost','api/rank/getUserRankInfo'],//用户排行信息及收益率
		getUsercc:['vipHost','api/positioninfo/query'],//用户持仓
		getUserwt:['vipHost','api/delegate/query'],//用户委托
		applycd:['vipHost','api/delegate/cancelOrder'],//撤单
		latelydeal:['vipHost','api/positioninfo/queryLately'],//最近五笔交易
		dealdetail:['vipHost','api/tradeinfo/query'],//交易明细
		gameing:['vipHost','api/season/queryUnderway'],//进行中的模拟赛期
		gamecount:['vipHost','api/account/getActiveCount'],//模拟参赛人数
		todayMaxRetreat:['vipHost','api/account/getTodayProfitMaxRetreat'],//最大回撤及今日收益
		RankInfoHistory:['vipHost','api/rank/getUserRankInfoHistory'],//赛事列表
		getcodeinfo:['vipHost','api/positioninfo/queryOne'],//获取单只股票
		codebuysell:['vipHost','api/delegate/obuySell'],//股票买入卖出
		getSubscribe:['vipHost','api/season/getSubscribe'],//订阅列表   //分割线
		personal:['vipHost','api/rank/getUserRankInfo'],//获取个人排名信息及收益率
		//ranking:['vipHost','api/rank/getListRankInfo'],//获取当期排行榜列表信息
		firm:['vipHost','api/season/queryRealRank'],//实盘赛排行
		firmSchedules:['vipHost','api/season/queryRealMatch'],//进行中的实盘赛期
		rankTime:['vipHost','api/season/queryUnderway'],//周、月模拟时间
		population:['vipHost','api/account/getActiveCount'],//参赛人数
		inquire:['vipHost','api/season/queryTabulation'],//查询赛期
		listHistory:['vipHost','api/rank/getListRankInfoHistory'],//获取历史排行数据
		isexistReal:['vipHost','api/account/isExistReal'],//是否参加实盘
		exam:['vipHost','api/account/getUserInfo'],//查询用户信息
		line:['vipHost','api/tradeinfo/query'],//图表1
		lines:['vipHost','api/assetshistory/queryProfitRateDay'],//图表2
		getTime:['vipHost','api/tradeinfo/getServiceDateTime'],//获取服务器时间
		getKey:['vipHost','api/delegate/getLockKey'],//获取交易Key值
		getdate:['vipHost','api/season/queryRealMatch'],//获取实盘期数
	}
	hxds.hostList={//[测试域名,正式域名]
        staticHost:['http://test.caidao.hexun.com/','http://imgcd.hexun.com/']////静态js,img,css文件,
        ,vipHost:['http://testapi.match.vip.hexun.com/','http://api.match.hexun.com/'],
        regHost:['http://reg.tool.hexun.com/','http://reg.tool.hexun.com/']
            //10.4.22.116:8185
    }
        //区分环境
    hxds.util.setHost();
})();