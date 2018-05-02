
$(function() {
	var _host = window.location.host;
    var _isTest=_host.match('test') || $.trim(_host)==''|| _host.match('127.0'),
        _host={
            callvipHost:"http://"+(_isTest?"test-":"")+"callvip.hexun.com/",
            
        }
	
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
 
var orderId = GetQueryString("orderid");
	
			$.ajax({
				url: _host.callvipHost+'jsapi/order/getorderinfo',
				type: 'get',
				data: {
				orderid:orderId,
				userid:''
				},
				dataType: 'jsonp',
				success: function(res) {
					
					var item = res.result;
	
		var orders = '';
	    var operate = '';
	    if(item.operateName){
	   		if(item.operateUrl!=''){
	   		operate = '<div class="conbox mt10">'+
						'<dl class="orderdl clearfix">'+
						'<dt>订单状态</dt>'+
						'<dd><a class="a-red-btn" href="'+item.operateUrl+'">'+item.operateName+'</a></dd>'+
						'</dl>'+
					   '</div>'
			}
	    
	    }
	    var obj = '';
	    if(item.ispackage==0&&item.issuborder==0){
	    	obj = '<div class="conbox mt10">'+
					'<dl class="orderdl clearfix">'+
						'<dt>订购对象</dt>'+
						'<dd>'+item.tousername+'</dd>'+
					'</dl>'+
				  '</div>'
	    }
	    var endtime = '';
	    if(item.status==1){
	    	endtime ='<dl class="orderdl clearfix">'+
						'<dt>到期时间</dt>'+
						'<dd>'+item.displayEndCreatetime+'</dd>'+
					'</dl>'
	    }
	    orders+= '<div class="conbox">'+
					'<dl class="orderdl clearfix">'+
						'<dt>订单名称</dt>'+
						'<dd style="height:4.4rem;overflow: hidden;">'+item.productname+'</dd>'+
					'</dl>'+
					'<dl class="orderdl clearfix">'+
						'<dt>订单号</dt>'+
						'<dd>'+orderId+'</dd>'+
					'</dl>'+
					'<dl class="orderdl clearfix">'+
						'<dt>产品编号</dt>'+
						'<dd>'+item.productid+'</dd>'+
					'</dl>'+
				'</div>'+
				'<div class="conbox mt10">'+
					'<dl class="orderdl clearfix">'+
						'<dt>单价</dt>'+
						'<dd>￥'+item.price+'</dd>'+
					'</dl>'+
					'<dl class="orderdl clearfix">'+
						'<dt>产品数量</dt>'+
						'<dd>'+item.num+'</dd>'+
					'</dl>'+
					'<dl class="orderdl clearfix">'+
						'<dt>下单时间</dt>'+
						'<dd>'+item.displayCreatetime+'</dd>'+
					'</dl>'+
					 endtime+
				'</div>'+obj+
				'<div class="conbox mt10">'+
					'<dl class="orderdl clearfix">'+
						'<dt>总金额</dt>'+
						'<dd>￥'+item.amount+'</dd>'+
					'</dl>'+
					'<dl class="orderdl clearfix">'+
						'<dt>优惠券</dt>'+
						'<dd>￥'+item.couponAmount+'</dd>'+
					'</dl>'+
					'<dl class="orderdl clearfix">'+
						'<dt>实付款</dt>'+
						'<dd><span class="c-e50">￥'+item.shijiAmount+'</span></dd>'+
					'</dl>'+
				'</div>'+operate
				

			$('#orders').append(orders)
				}
			});	

	
});