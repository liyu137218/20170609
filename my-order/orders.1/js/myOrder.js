$(function () {

	var _host = window.location.host;
	var _isTest = _host.match('test') || $.trim(_host) == '' || _host.match('127.0'),
		_host = {
			callvipHost: "http://" + (_isTest ? "test-" : "") + "callvip.hexun.com/",
			caidao: "http://" + (_isTest ? "test." : "") + "caidao.hexun.com/"
		};

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
	var pageIndex = 1;
	var nums
	var limit = 0;
	var begindate = '';
	var enddate = '';
	var status = -1;
	attend(begindate, enddate, status);
	// page();
	//	$('.btn-blue').click(function() {
	//		attend(begindate,enddate,status)
	//	});
	$('.a-red-btn').click(function () {
		begindate = $('.date-i1').val();
		enddate = $('.date-i2').val();
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
		$('#contents').html('');
		pageIndex = 1;
		attend(begindate, enddate, status);
		//		page();
	});
	//	function page(){
	//		$.ajax({
	//			url: 'http://test-callvip.hexun.com/jsapi/order/getorders',
	//				type: 'get',
	//				data: {
	//					begindate: begindate,
	//					enddate: enddate,
	//					status: status,
	//					page: pageIndex,
	//					gettotalcount:'1',
	//					pagesize: '15',
	//					productid: '',
	//					userid: ''
	//				},
	//				dataType: 'jsonp',
	//				success: function(res) {
	//				
	//					//pageIndex++;
	//					var arr = res.result.myOrderList;
	//					var cont = '';
	//					if(res.respCode==0){
	//						
	//						nums = res.result.totalCount
	//						if(nums==0){
	//							$("#pageTool").hide();
	//						}else{
	//						$("#pageTool").show();
	//						$("#pageTool").html("");
	//						var page = new Paging();
	//						page.init({
	//							target: $('#pageTool'),
	//							pagesize: 15,
	//							count: nums,
	//							callback: function(pagecount, size, count) {
	//								
	//								//criticizeajax(num, pagecount);
	//								pageIndex=pagecount
	//								attend(begindate,enddate,status)
	//								window.location.href = "#evaluate";
	//								//alert('当前第 ' + pagecount + '页,每页 ' + size + '条,总页数：' + count + '页');
	//				
	//							}
	//						});
	//						}
	//						
	//					}
	//					
	//			}
	//	});
	//	}


	function attend(begindate, enddate, status) {

		$.ajax({
			url: _host.callvipHost + 'jsapi/order/getorders',
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
				if (res.respCode == 0 && pageIndex == 1) {

					nums = res.result.totalCount
					if (nums == 0) {
						$("#pageTool").hide();
					} else {
						$("#pageTool").show();
						$("#pageTool").html("");
						var page = new Paging();
						page.init({
							target: $('#pageTool'),
							pagesize: 15,
							count: nums,
							callback: function (pagecount, size, count) {

								//criticizeajax(num, pagecount);
								pageIndex = pagecount;
								limit = size
								attend(begindate, enddate, status)
								window.location.href = "#evaluate";
								//alert('当前第 ' + pagecount + '页,每页 ' + size + '条,总页数：' + count + '页');

							}
						});
					}

				}
				//page



				//pageIndex++;
				var compo = '<thead class="orderTit">' +
					'<tr>' +
					'<th width="6%">序号</th>' +
					' <th width="14%">订单号</th>' +
					'<th width="18%">商品名称</th>' +
					'<th width="10%">订购对象</th>' +
					'<th width="18%">创建时间</th>' +
					'<th width="9%">实付款</th>' +
					'<th width="9%">订单状态</th>' +
					'<th width="9%">操作</th>' +
					'<th width="7%"></th>' +
					'</tr>' +
					'</thead>';

				if (res.result.totalCount != 0) {
					$('.noGz').hide();
					nums = res.result.totalCount
					//主订单
					arr.forEach(function (item, index) {
						var obj = '';
						var tab = '';

						//var order = '';
						if (item.isPackage == 1) {
							tab = '<th width="7%" class="orderHs"><a href="javascript:void(0);" temp="' + item.strorderid + '" class="a-down" onclick="opens(this,event)">展开</a></th>'
							obj = '<th width="10%"></th>';
							//console.log(orders(item.strorderid))
							var mod = '';
							if ((index + 1) % 2 == 0) {
								mod = '<thead class="bg tit2">';
							} else {
								mod = '<thead class="tit2">'
							}
							var sta = '';
							var str = '';
							if (item.status == 0) {
								sta = '未支付';
								if (item.operateUrl != '') {
									str = '<p><a href="' + item.operateUrl + '" target="_blank" class="red">' + item.operateName + '</a></p><p class="pt5"><a href="javascript:void(0);" code="' + item.strorderid + '" onclick="cancelorder(this);" target="_blank" class="c-999">取消</a></p>'
								}

							} else if (item.status == 1) {
								sta = '已支付';
								if (item.operateUrl != '') {
									str = '<p><a href="' + item.operateUrl + '" target="_blank" url="' + item.operateUrl + '" target="_blank" class="red" onclick="dpl(this,event,' + item.shijiAmount + ')" proname="' + item.productname + '" productId="' + item.productid + '" teaname="' + item.tousername + '" teacherId="' + item.touserid + '">' + item.operateName + '</a></p>';
								}

							} else if (item.status == 2) {
								sta = '已取消'
							} else if (item.status == 4) {
								sta = '退款中'
							} else if (item.status == 5) {
								sta = '已退款'
							}
							//					var combo = '';
							//					if(item.partnerWorkroomUrl){
							//						combo='<th width="18%" href="'+item.partnerWorkroomUrl+'" onclick="studio(this)">'+getNewline(item.productname)+'</th>';
							//					}else{
							//						combo='<th width="18%" href="javascript:void(0);">'+getNewline(item.productname)+'</th>';
							//					}
							cont += mod +
								'<tr>' +
								'<th width="6%">' + [(pageIndex - 1) * limit + (index + 1)] + '</th>' +
								'<th width="14%">' + item.strorderid + '</th>' +
								'<th width="18%">' + getNewline(item.productname) + '</th>' +
								obj +
								'<th width="18%">' + item.createtime + '</th>' +
								'<th width="9%" class="red">￥' + item.shijiAmount.toFixed(2) + '</th>' +
								' <th width="9%" class="orderstatus">' + sta + '</th>' +
								' <th width="9%"  class="btnB">' +
								str +
								'<p class="pt5"><a href="javascript:void(0);" code="' + item.strorderid + '" class="blue" onclick="detail(this)">详情</a></p>' +
								' </th>' +
								tab +
								'</tr>' +
								' </thead>'


							//结束
						} else {
							obj = '<th width="10%" href="' + item.partnerWorkroomUrl + '" onclick="studio(this)">' + item.tousername + '</th>'
							tab = '<th width="7%" class="orderHs"><a href="javascript:void(0);"></a></th>'
							var mod = '';
							if ((index + 1) % 2 == 0) {
								mod = '<thead class="bg tit2">';
							} else {
								mod = '<thead class="tit2">'
							}
							var sta = '';
							var str = '';
							if (item.status == 0) {
								sta = '未支付';
								if (item.operateUrl != '') {
									str = '<p><a href="' + item.operateUrl + '" target="_blank" class="red">' + item.operateName + '</a></p><p class="pt5"><a href="javascript:void(0);" code="' + item.strorderid + '" onclick="cancelorder(this);" target="_blank" class="c-999">取消</a></p>'
								}
							} else if (item.status == 1) {
								sta = '已支付';
								if (item.operateUrl != '') {
									str = '<p><a href="' + item.operateUrl + '" url="' + item.operateUrl + '" target="_blank" class="red" onclick="dpl(this,event,' + item.shijiAmount + ')" proname="' + item.productname + '" productId="' + item.productid + '" teaname="' + item.tousername + '" teacherId="' + item.touserid + '">' + item.operateName + '</a></p>';
								}
							} else if (item.status == 2) {
								sta = '已取消'
							} else if (item.status == 4) {
								sta = '退款中'
							} else if (item.status == 5) {
								sta = '已退款'
							}
							cont += mod +
								'<tr>' +
								'<th width="6%">' + [(pageIndex - 1) * limit + (index + 1)] + '</th>' +
								'<th width="14%">' + item.strorderid + '</th>' +
								'<th width="18%">' + getNewline(item.productname) + '</th>' +
								obj +
								'<th width="18%">' + item.createtime + '</th>' +
								'<th width="9%" class="red">￥' + item.shijiAmount.toFixed(2) + '</th>' +
								' <th width="9%" class="orderstatus">' + sta + '</th>' +
								' <th width="9%"  class="btnB">' +
								str +
								'<p class="pt5"><a href="javascript:void(0);" code="' + item.strorderid + '" class="blue" onclick="detail(this)">详情</a></p>' +
								' </th>' +
								tab +
								'</tr>' +
								' </thead>'
						}


					});

					$('#contents').html(compo + cont)
					window.dpl = function (es, event, fld_planmoney) {

						var skip = es.getAttribute('url');
						/*setTimeout(function(){

						window.open(skip);
						},300)*/
						var productId = es.getAttribute('productId');
						var priceId = es.getAttribute('priceId');
						var teaname = es.getAttribute('teaname');
						var teacherId = es.getAttribute('teacherId');
						var proname = es.getAttribute('proname');
						if (fld_planmoney < 10) {
							var os = {
								"事件功能": "再次购买",
								"页面名称": "个人中心-订单页",
								"页面类型": "列表页",
								"功能分类": "购买",
								"所属平台": "财道社区",
								"事件类别": "体验",
								"体验类型": "付费",
								"PLATFORM": "WEB",
								"合作者名称": teaname,
								"合作者ID": teacherId,
								"产品ID": productId,
								"产品名称": proname,
								"产品分类": "视频课堂",
								"价格区间": "10元以下"
							}
						} else if (fld_planmoney > 10) {
							var os = {
								"事件功能": "再次购买",
								"页面名称": "个人中心-订单页",
								"页面类型": "列表页",
								"功能分类": "购买",
								"所属平台": "财道社区",
								"事件类别": "体验",
								"体验类型": "付费",
								"PLATFORM": "WEB",
								"合作者名称": teaname,
								"合作者ID": teacherId,
								"产品ID": productId,
								"产品名称": proname,
								"产品分类": "视频课堂",
								"价格区间": "10元以上"
							}
						} else if (fld_planmoney == 0) {
							var os = {
								"事件功能": "再次购买",
								"页面名称": "个人中心-订单页",
								"页面类型": "列表页",
								"功能分类": "购买",
								"所属平台": "财道社区",
								"事件类别": "体验",
								"体验类型": "付费",
								"PLATFORM": "WEB",
								"合作者名称": teaname,
								"合作者ID": teacherId,
								"产品ID": productId,
								"产品名称": proname,
								"产品分类": "视频课堂",
								"价格区间": "0元"
							}
						}
						console.log('点击事件:dplus')
						dplus_Click("点击事件", os);

					}
					window.opens = function (ts, event) {
						var order = '';
						var contentChild = '';
						var temp = ts.getAttribute('temp');
						if ($(ts).hasClass('a-up')) {
							$(ts).removeClass('a-up').html('展开');
							$(ts).parent().parent().parent().next('.orderChild').remove();
						} else {
							order = '';
							$(ts).addClass('a-up').html('收起');
							$.ajax({
								url: _host.callvipHost + 'jsapi/order/getsuborders',
								type: 'get',
								data: {
									mainorderid: temp,
									userid: ''
								},
								dataType: 'jsonp',
								success: function (data) {

									if (data.respCode == 0) {
										//子订单

										data.result.myOrderItems.forEach(function (itemC, index) {
											order += '<tr>' +
												'<td width="6%"></td>' +
												'<td width="14%"></td>' +
												'<td style="line-height:20px">' + getNewline(itemC.productname) + '</td>' +
												'<td style="line-height:20px" href="' + itemC.partnerWorkroomUrl + '" onclick="studio(this)">' + itemC.tousername + '</td>' +
												'<td>' + itemC.createtime + '</td>' +
												'<td class="red">￥' + itemC.shijiAmount.toFixed(2) + '</td>' +
												'<td colspan=""></td>' +
												'<td colspan=""></td>' +
												'<td colspan=""></td>' +
												'</tr>'

										});
										contentChild = '<tbody class="orderChild">' + order + '</tbody>'

										$(ts).parent().parent().parent().after(contentChild);
										$(ts).parent().parent().parent().next('.orderChild').show();
									}

								}
							});


						};


					}
					window.studio = function (es) {

						window.open(es.getAttribute('href'));
					}
					window.detail = function (es) {

						window.open(_host.caidao + '/home/orders/detail.html?orderid=' + es.getAttribute('code'));
					}
					window.cancelorder = function (es) {
						var code = es.getAttribute('code');
						$('#cleartc').show();
						$('#layer').show();
						$('.a-wfff').one('click', function () {
							$.ajax({
								url: _host.callvipHost + 'jsapi/order/cancel-order',
								type: 'get',
								data: {
									orderid: code,
									userid: ''
								},
								dataType: 'jsonp',
								success: function (data) {
									if (data.respCode == 0) {

										$(es).parent().parent().prev().html('已取消')
										$(es).parent().prev().remove();
										$(es).parent().remove();
										$('#cleartc').hide();
										$('#layer').hide();

									} else if (data.respCode == 1) {
										$('#cleartc').hide();
										$('#layer').hide();
										//alert('订单撤销失败')
									} else {
										$('#cleartc').hide();
										$('#layer').hide();
										//alert('取消订单失败,订单不是未支付 状态')
									}
								}
							})
						});
						$('.a-wred,.wrap-close').one('click', function () {
							$('#cleartc').hide();
							$('#layer').hide();
						})

					}


				} else {
					$('.noGz').show();
					//$('.date ').hide();
				}



			}
		});
	}
	//结束；

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