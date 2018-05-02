$(function() {
	var _host = window.location.host;
    var _isTest=_host.match('test') || $.trim(_host)==''|| _host.match('127.0'),
        _host={
            callvipHost:"http://"+(_isTest?"test-":"")+"callvip.hexun.com/"
        }
        ;
	
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
	console.log(item)
		var orders = '';
	    var obj = '';
	    if(item.ispackage==0&&item.issuborder==0){
	    	obj = '<dl class="clearfix">'+
                           ' <dt>订单对象：</dt>'+
                           ' <dd>'+item.tousername+'</dd>'+
                   '</dl>'
	    }
	    var operate = '';
	    if(item.operateName){
	    	if(item.operateUrl!=''){
	    		operate = '<a href="'+item.operateUrl+'" class="a-red-btn orderInfoBtn">'+item.operateName+'</a>';
	    	}
	    	
	    }
	    var endtime = '';
	    if(item.status==1){
	    	endtime = ' <dl class="clearfix dlDshed">'+
                           ' <dt>到期时间：</dt>'+
                            '<dd>'+item.displayEndCreatetime+'</dd>'+
                        '</dl>'
	    }
	    orders+= '<dl class="clearfix">'+
                           ' <dt style="letter-spacing:4px;">订单号：</dt>'+
                            '<dd>'+orderId+'</dd>'+
                       ' </dl>'+
                      ' <dl class="clearfix">'+
                            '<dt>订单状态：</dt>'+
                           ' <dd><strong class="red">'+item.orderstatus+'</strong></dd>'+
                      '</dl>'+obj+
                        '<dl class="clearfix">'+
                            '<dt>产品编号：</dt>'+
                            '<dd>'+item.productid+'</dd>'+
                        '</dl>'+
                        '<dl class="clearfix">'+
                            '<dt style="letter-spacing:14px;">单价：</dt>'+
                            '<dd>￥'+item.price+'</dd>'+
                            '<dd class="pl60">数   量：'+item.num+'</dd>'+
                        '</dl>'+
                        '<dl class="clearfix">'+
                            '<dt>下单时间：</dt>'+
                            '<dd>'+item.displayCreatetime+'</dd>'+
                       ' </dl>'+
                       	endtime+
                        '<dl class="clearfix mt5">'+
                            '<dt  style="letter-spacing:4px;">总金额：</dt>'+
                            '<dd>￥'+item.amount+'</dd>'+
                            '<dd class="pl60">优惠券：￥'+item.couponAmount+'</dd>'+
                        '</dl>'+
                      '  <dl class="clearfix">'+
                           ' <dt style="letter-spacing:4px;">实付款：</dt>'+
                           ' <dd>￥'+item.shijiAmount+'</dd>'+
                         ' </dl>'+operate
                      

			$('#orders').append(orders)
				}
			});	

});