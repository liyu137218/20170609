
// TODO: 改东西 一定要全部都改

$(function () {

	var _host = window.location.host;
	var _isTest = _host.match('test') || $.trim(_host) == '' || _host.match('127.0'),
		_host = {
			callvipHost: "http://" + (_isTest ? "test-" : "") + "callvip.hexun.com/",
			caidao: "http://" + (_isTest ? "test." : "") + "caidao.hexun.com/"
		};

		//状态的选择
	$('.orderArrow').click(function () {
		$('.ztHide').show();
		$('.orderArrow i').addClass('up');
	})
	$('.date-zt').mouseleave(function () {
		$('.ztHide').hide();
		$('.orderArrow i').removeClass('up');
	})
	$('.ztHide a').click(function () {
		$('.ztHide').hide();
		$('.date-zt').find('span').html($(this).html())
	})

	//我的订单日期选择;
	$('.date-i1').datepicker();
	$('.date-i2').datepicker();
	var pageIndex = 0;
	var nums=-1;
	var limit = 0;
	var begindate = '';
	var enddate = '';
	var status = -1;
	attend(begindate, enddate, status);

	//状态选择按钮
	$('.a-red-btn').click(function () {
		begindate = $('.date-i1').val();
		enddate = $('.date-i2').val();
		console.log(begindate + " " + enddate);
		val = $('#status').text()
		if (val == '所有状态') {
			status = -1;
		} else if (val == '未支付') {
			status = 0;
		} else if (val == '已支付') {
			status = 1;
		} else if (val == '已取消') {
			status = 2;
		} else if (val == '已退款') {
			status = 5;
		} else if (val == '退款中') {
			status = 4;
		}
		// pageIndex 为0 默认第一页呀
		$('#contents').html('');
		pageIndex = 0;
		attend(begindate, enddate, status);
		//		page();
	});
	
// 实例化分页插件
	function goPage(nums) {
	$("#pageTool").show();
	$("#pageTool").html("");
	var page = new Paging();
	page.init({
		target: $('#pageTool'),
		pagesize: 15,
		count: nums,
		callback: function (pagecount, size, count) {
			pageIndex = pagecount;
			limit = size
			attend(begindate, enddate, status)
			// 跳转到呢了  只是在后面加上了标识evaluate
			window.location.href = "#evaluate";

		}
	});
}

	function attend(begindate, enddate, status) {
		// http://test-callvip.hexun.com/jsapi/order/getorders
		$.ajax({

			url:"http://test-callvip.hexun.com/jsapi/order/getorders",
			type: 'get',
			data: {
				begindate: begindate,
				enddate: enddate,
				status: status,
				page: pageIndex,
				gettotalcount: '1',
				pagesize: '15',
				productid: '',
				userid: ''
			},
			dataType: 'jsonp',
			success: function (res) {
				console.log(res)
				//page
				var arr = res.result.myOrderList;
				var cont = '';
				if (res.respCode == 0 && pageIndex == 0) {
					// 总页数
					nums = res.result.totalCount
					//TODO: 如果订单总数为0 那么需要提示没有订单呀
					if (nums == 0) {
						$("#pageTool").hide();
					} else {
// 优化的可能 总也数不变的 不需要每次实例化分页插件
						// 如果总数没有变 就不需要实例化分页 需要吧上次
						goPage(nums)
						// 渲染页面
						renderDom(res.result.myOrderList)
					}
				}
				//page
			}
		});
	}
	//结束；

	// 渲染dom
	function renderDom(msg){
		var tablehHtml=""
		
		for (var i = 0; i < msg.length; i++) {
			tablehHtml +=`<table class="order-tab mt20">
                                    <tr class="tab-header">
                                        <td class="txt-l" colspan="4">订单号：${msg[i].strorderid}</td>
                                        <td class="txt-r c-666" colspan="4">创建时间：${msg[i].createtime}</td>
                                    </tr>
                                    <tr>
                                        <td class="txt-l" width="20%">${msg[i].productname}
                                            <span class="sp-yf">${msg[i].isPrePay == 0 ? "预付" : ""}</span>
                                        </td>
                                        <td width="15%">${msg[i].tousername}</td>
                                        <td width="10%">
                                            <span class="tab-red">￥${msg[i].amount}</span>
                                        </td>
                                        <td width="12%">
                                            <span class="tab-red">￥${msg[i].shijiAmount}</span>
                                            <p class="mt10 f12 c-333">(可抵扣${msg[i].prepayCoupAmount}元)</p>
                                        </td>
                                        <td width="10%">订单状态表${msg[i].status}</td>
                                        <td width="16%">预付款使用状态${msg[i].prepayUseStatus}
                                            <p class="mt10 tab-red f12">${msg[i].strorderid}请在有效期内使用
                                                <br/>${msg[i].preCouponEndTime}$ - {msg[i].preCouponEndTime}</p>
                                        </td>
                                        <td width="10%">
                                            <a class="a-blue" href="#">详情${msg[i].strorderid}</a>
                                            <p>
                                                <a href="#" class="a-wk mt10">付尾款${msg[i].finalPayUrl}</a>
                                            </p>
                                            </p>
                                        </td>
                                        <td width="7%">####</td>
                                    </tr>
                                </table>`
		}
		$(".pt20").append(tablehHtml)

	}




	//判断字符长度进行换行
	function getNewline(val) {
		return val.replace(/\s.*/ig, '');
		var str = new String(val);
		var bytesCount = 0;
		var s = "";
		for (var i = 0, n = str.length; i < n; i++) {
			var c = str.charCodeAt(i);
			//统计字符串的字符长度
			if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
				bytesCount += 1;
			} else {
				bytesCount += 2;
			}
			//换行
			s += str.charAt(i);
			if (bytesCount >= 12) {
				s = s + '\n';
				//重置
				bytesCount = 0;
			}
		}
		return s;
	}
});