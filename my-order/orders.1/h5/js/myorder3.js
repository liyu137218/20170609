$(function() {
    var _host = window.location.host;
    var _isTest = _host.match('test') || $.trim(_host) == '' || _host.match('127.0'),
        _host = {
            callvipHost: "http://" + (_isTest ? "test-" : "") + "callvip.hexun.com/",
            caidaoh5: "http://" + (_isTest ? "test." : "") + "caidao.hexun.com/",
        };


    var pageIndex = 1;
    attend()


    function attend() {

        $.ajax({
            url: _host.callvipHost + 'jsapi/order/getorders',
            type: 'get',
            data: {
                begindate: '',
                enddate: '',
                status: '-1',
                page: pageIndex,
                gettotalcount: '1',
                pagesize: '15',
                productid: '',
                userid: ''
            },
            dataType: 'jsonp',
            success: function(res) {

                pageIndex++;
                var arr = res.result.myOrderList;
                var cont = '';

                if (res.result.totalCount != 0) {
                    arr.forEach(function(item, index) {
                        // ##########################################################################################################################################################################################3##########################################################################################################################################################################################3##########################################################################################################################################################################################3##########################################################################################################################################################################################3##########################################################################################################################################################################################3
                        if (item.isPackage == 1) {
                            var strO = '<dl class="orderdl-1 clearfix">' +
                                '<dt><span class="f16">子订单</span></dt>' +
                                '<dd><span class="i-jtb" temp="' + item.strorderid + '" onclick="opens(this,event)"></span></dd>' +
                                '</dl>'
                            var str = '';
                            var sta = '';
                            if (item.status == 0) {
                                sta = '未支付';
                                if (item.operateUrl != '') {
                                    str = '<p class="txt-r ptb10 bgfff"><a class="a-off" href="javascript:void(0);" code="' + item.strorderid + '" onclick="cancelorder(this,event);">取消</a><a class="a-buy" href="javascript:void(0);" url="' + item.operateUrl + '" class="red" onclick="dup(this,event,' + item.shijiAmount + ')" teacherId="' + item.touserid + '" proname="' + item.productname + '" productId="' + item.productid + '" teaname="' + item.tousername + '">' + item.operateName + '</a></p>'
                                }
                            } else if (item.status == 1) {
                                sta = '已支付';
                                if (item.operateUrl != '') {
                                    str = '<p class="txt-r ptb10 bgfff"><a class="a-buy" href="javascript:void(0);" url="' + item.operateUrl + '" class="red" onclick="dpl(this,event,' + item.shijiAmount + ')" teacherId="' + item.touserid + '" proname="' + item.productname + '" productId="' + item.productid + '" teaname="' + item.tousername + '">' + item.operateName + '</a></p>'
                                }
                            } else if (item.status == 2) {
                                sta = '已取消'
                            } else if (item.status == 4) {
                                sta = '退款中'
                            } else if (item.status == 5) {
                                sta = '已退款'
                            }


                            cont += '<li code="' + item.strorderid + '" onclick="detail(this)">' +
                                '<dl class="orderdl-1 mt10 clearfix">' +
                                '<dt><span class="c-999">订单编号：' + item.strorderid + '</span></dt>' +
                                '<dd><span class="c-999">' + sta + '</span></dd>' +
                                '</dl>' +
                                '<dl class="orderdl-1 clearfix">' +
                                '<dt>' +
                                '<a class="a-order" href="javascript:void(0);">' +
                                '<p class="f16"><a style="text-decoration:none;color:#333;" href="javascript:void(0);" onclick="studio(this,event)">' + getNewline(item.productname) + '</a></p>' +
                                '<p class="mt5"><span class="c-999 f12">' + item.createtime + '</span></p>' +
                                '</a>' +
                                '</dt>' +
                                '<dd><p class="mt10 f14"><strong>￥' + item.shijiAmount.toFixed(2) + '</strong></span></p>' +
                                '</dl>' + strO + str '</li>'

                        } else {
                            var str = '';
                            var sta = '';
                            if (item.status == 0) {
                                sta = '未支付';
                                if (item.operateUrl != '') {
                                    str = '<p class="txt-r ptb10 bgfff"><a class="a-off" href="javascript:void(0);" code="' + item.strorderid + '" onclick="cancelorder(this,event);">取消</a><a class="a-buy" href="javascript:void(0);" url="' + item.operateUrl + '" class="red" onclick="dup(this,event,' + item.shijiAmount + ')" teacherId="' + item.touserid + '" proname="' + item.productname + '" productId="' + item.productid + '" teaname="' + item.tousername + '">' + item.operateName + '</a></p>'
                                }
                            } else if (item.status == 1) {
                                sta = '已支付';
                                if (item.operateUrl != '') {
                                    str = '<p class="txt-r ptb10 bgfff"><a class="a-buy" href="javascript:void(0);" url="' + item.operateUrl + '" class="red" onclick="dpl(this,event,' + item.shijiAmount + ')" teacherId="' + item.touserid + '" proname="' + item.productname + '" productId="' + item.productid + '" teaname="' + item.tousername + '">' + item.operateName + '</a></p>'
                                }
                            } else if (item.status == 2) {
                                sta = '已取消'
                            } else if (item.status == 4) {
                                sta = '退款中'
                            } else if (item.status == 5) {
                                sta = '已退款'
                            }

                            cont += '<li code="' + item.strorderid + '" onclick="detail(this)">' +
                                '<dl class="orderdl-1 mt10 clearfix">' +
                                '<dt><span class="c-999">订单编号：' + item.strorderid + '</span></dt>' +
                                '<dd><span class="c-999">' + sta + '</span></dd>' +
                                '</dl>' +
                                '<dl class="orderdl-1 clearfix">' +
                                '<dt>' +
                                '<a class="a-order" href="javascript:void(0);">' +
                                '<p class="f16"><a style="text-decoration:none;color:#333;" href="javascript:void(0);" onclick="studio(this,event)">' + getNewline(item.productname) + '</a></p>' +
                                '<p class="mt5"><span class="c-999 f12">' + item.createtime + '</span></p>' +
                                '</a>' +
                                '</dt>' +
                                '<dd><p class="mt10 f14"><strong>￥' + item.shijiAmount.toFixed(2) + '</strong></span></p>' +
                                '</dl>' + str '</li>'
                        }





                    });


                    // ##########################################################################################################################################################################################3##########################################################################################################################################################################################3##########################################################################################################################################################################################3##########################################################################################################################################################################################3##########################################################################################################################################################################################3
                    $('#more').append(cont)
                        // 展开下拉列表  二级菜单请求
                    window.opens = function(ts, event) {
                        event.stopPropagation();
                        var content = '';
                        var order = '';
                        var temp = ts.getAttribute('temp');
                        if ($(ts).hasClass('i-tb-on')) {
                            $(ts).parents('.yhqtopbox').next().slideUp();
                            $(ts).removeClass('i-tb-on')
                            $(ts).parent().parent().next('.orderul').remove();
                        } else {
                            $.ajax({
                                url: _host.callvipHost + 'jsapi/order/getsuborders',
                                type: 'get',
                                data: {
                                    mainorderid: temp,
                                    userid: ''
                                },
                                dataType: 'jsonp',
                                success: function(data) {

                                    if (data.respCode == 0) {

                                        //子订单

                                        data.result.forEach(function(itemC, index) {

                                            order += '<li><a style="text-decoration:none;color:#333;" href="javascript:void(0);" onclick="studio(this,event)">' + itemC.productname + '</a></li>'
                                        });
                                        content = '<ul class="orderul bgfff">' + order + '</ul>'
                                        $(ts).parent().parent().after(content);
                                        $(ts).parent().parent().next('.orderul').show();
                                    }

                                }
                            });
                            $(ts).parents('.yhqtopbox').next().slideDown();
                            $(ts).addClass('i-tb-on')
                        }


                    }

                    window.studio = function(es, ev) {
                            ev.stopPropagation();
                            //window.location = es.getAttribute('href');
                        }
                        // 整个li都是可点击的 跳转到详情页  所以在里面的点击事件都需要阻止冒泡
                    window.detail = function(es) {

                            window.location = _host.caidaoh5 + 'home/orders/h5/detail.html?orderid=' + es.getAttribute('code');
                        }
                        // 记录时间 并且跳转页面   取消和再购买 只所以分开写 只是 事件功能不同
                    window.dpl = function(es, event, fld_planmoney) {
                        event.stopPropagation();
                        var skip = es.getAttribute('url');
                        setTimeout(function() {
                            window.location.href = skip;
                        }, 300)
                        var productId = es.getAttribute('productId');
                        var priceId = es.getAttribute('priceId');
                        var teaname = es.getAttribute('teaname');
                        var proname = es.getAttribute('proname');
                        var teacherId = es.getAttribute('teacherId');
                        if (fld_planmoney < 10) {
                            var os = { "事件功能": "再次购买", "页面名称": "个人中心-订单页", "页面类型": "列表页", "功能分类": "购买", "所属平台": "财道社区", "事件类别": "体验", "体验类型": "付费", "PLATFORM": "H5", "合作者名称": teaname, "合作者ID": teacherId, "产品ID": productId, "产品名称": proname, "产品分类": "视频课堂", "价格区间": "10元以下" }
                        } else if (fld_planmoney > 10) {
                            var os = { "事件功能": "再次购买", "页面名称": "个人中心-订单页", "页面类型": "列表页", "功能分类": "购买", "所属平台": "财道社区", "事件类别": "体验", "体验类型": "付费", "PLATFORM": "H5", "合作者名称": teaname, "合作者ID": teacherId, "产品ID": productId, "产品名称": proname, "产品分类": "视频课堂", "价格区间": "10元以上" }
                        } else if (fld_planmoney == 0) {
                            var os = { "事件功能": "再次购买", "页面名称": "个人中心-订单页", "页面类型": "列表页", "功能分类": "购买", "所属平台": "财道社区", "事件类别": "体验", "体验类型": "付费", "PLATFORM": "H5", "合作者名称": teaname, "合作者ID": teacherId, "产品ID": productId, "产品名称": proname, "产品分类": "视频课堂", "价格区间": "0元" }
                        }

                        dplus_Click("点击事件", os);

                    }
                    window.dup = function(es, event, fld_planmoney) {
                            event.stopPropagation();
                            var skip = es.getAttribute('url');
                            setTimeout(function() {
                                window.location.href = skip;
                            }, 300)
                            var productId = es.getAttribute('productId');
                            var priceId = es.getAttribute('priceId');
                            var teaname = es.getAttribute('teaname');
                            var proname = es.getAttribute('proname');
                            var teacherId = es.getAttribute('teacherId');
                            if (fld_planmoney < 10) {
                                var os = { "事件功能": "去付款", "页面名称": "个人中心-订单页", "页面类型": "列表页", "功能分类": "购买", "所属平台": "财道社区", "事件类别": "体验", "体验类型": "付费", "PLATFORM": "H5", "合作者名称": teaname, "合作者ID": teacherId, "产品ID": productId, "产品名称": proname, "产品分类": "视频课堂", "价格区间": "10元以下" }
                            } else if (fld_planmoney > 10) {
                                var os = { "事件功能": "去付款", "页面名称": "个人中心-订单页", "页面类型": "列表页", "功能分类": "购买", "所属平台": "财道社区", "事件类别": "体验", "体验类型": "付费", "PLATFORM": "H5", "合作者名称": teaname, "合作者ID": teacherId, "产品ID": productId, "产品名称": proname, "产品分类": "视频课堂", "价格区间": "10元以上" }
                            } else if (fld_planmoney == 0) {
                                var os = { "事件功能": "去付款", "页面名称": "个人中心-订单页", "页面类型": "列表页", "功能分类": "购买", "所属平台": "财道社区", "事件类别": "体验", "体验类型": "付费", "PLATFORM": "H5", "合作者名称": teaname, "合作者ID": teacherId, "产品ID": productId, "产品名称": proname, "产品分类": "视频课堂", "价格区间": "0元" }
                            }

                            dplus_Click("点击事件", os);

                        }
                        // 取消事件
                    window.cancelorder = function(es, ev) {
                        ev.stopPropagation();
                        var code = es.getAttribute('code');
                        $('.gztsBox').show();
                        $('.yes').one('click', function() {
                            $.ajax({
                                url: _host.callvipHost + 'jsapi/order/cancel-order',
                                type: 'get',
                                data: {
                                    orderid: code,
                                    userid: ''
                                },
                                dataType: 'jsonp',
                                success: function(data) {

                                    if (data.respCode == 0) {
                                        $(es).parent().siblings().first().children('dd').children().html('已取消')
                                        $(es).parent().remove();
                                        $('.gztsBox').hide();
                                    } else if (data.respCode == 1) {
                                        $('.gztsBox').hide();
                                        //alert('订单撤销失败')
                                    } else {
                                        $('.gztsBox').hide();
                                        //alert('取消订单失败,订单不是未支付 状态')
                                    }
                                }
                            });
                        });
                        $('.fou').one('click', function() {
                            $('.gztsBox').hide();
                        })
                    }
                } else {
                    $('#Not').show();

                }
            }
        });
    }
    // ##########################################################################################################################################################################################3##########################################################################################################################################################################################3##########################################################################################################################################################################################3##########################################################################################################################################################################################3##########################################################################################################################################################################################3
    // pageIndex 为1 还是为0
    $('#more').dropload({
        scrollArea: window,
        loadDownFn: function(me) {
            $.ajax({
                url: _host.callvipHost + 'jsapi/order/getorders',
                type: 'get',
                data: {
                    begindate: '',
                    enddate: '',
                    status: '-1',
                    page: pageIndex,
                    gettotalcount: '0',
                    pagesize: '15',
                    productid: '',
                    userid: ''
                },
                dataType: 'jsonp',
                success: function(res) {

                    pageIndex++;
                    var arr = res.result.myOrderList;
                    var cont = '';

                    arr.forEach(function(item, index) {

                        if (item.isPackage == 1) {
                            var strO = '<dl class="orderdl-1 clearfix">' +
                                '<dt><span class="f16">子订单</span></dt>' +
                                '<dd><span class="i-jtb" temp="' + item.strorderid + '" onclick="opens(this,event)"></span></dd>' +
                                '</dl>'
                            var str = '';
                            var sta = '';
                            if (item.status == 0) {
                                sta = '未支付';
                                if (item.operateUrl != '') {
                                    str = '<p class="txt-r ptb10 bgfff"><a class="a-off" href="javascript:void(0);" code="' + item.strorderid + '" onclick="cancelorder(this,event);">取消</a><a class="a-buy" href="javascript:void(0);" url="' + item.operateUrl + '" class="red" onclick="dup(this,event,' + item.shijiAmount + ')" teacherId="' + item.touserid + '" proname="' + item.productname + '" productId="' + item.productid + '" teaname="' + item.tousername + '">' + item.operateName + '</a></p>'
                                }
                            } else if (item.status == 1) {
                                sta = '已支付';
                                if (item.operateUrl != '') {
                                    str = '<p class="txt-r ptb10 bgfff"><a class="a-buy" href="javascript:void(0);" url="' + item.operateUrl + '" class="red" onclick="dpl(this,event,' + item.shijiAmount + ')" teacherId="' + item.touserid + '" proname="' + item.productname + '" productId="' + item.productid + '" teaname="' + item.tousername + '">' + item.operateName + '</a></p>'
                                }
                            } else if (item.status == 2) {
                                sta = '已取消'
                            } else if (item.status == 4) {
                                sta = '退款中'
                            } else if (item.status == 5) {
                                sta = '已退款'
                            }

                            cont += '<li code="' + item.strorderid + '" onclick="detail(this)">' +
                                '<dl class="orderdl-1 mt10 clearfix">' +
                                '<dt><span class="c-999">订单编号：' + item.strorderid + '</span></dt>' +
                                '<dd><span class="c-999">' + sta + '</span></dd>' +
                                '</dl>' +
                                '<dl class="orderdl-1 clearfix">' +
                                '<dt>' +
                                '<a class="a-order" href="javascript:void(0);">' +
                                '<p class="f16"><a style="text-decoration:none;color:#333;" href="javascript:void(0);" onclick="studio(this,event)">' + getNewline(item.productname) + '</a></p>' +
                                '<p class="mt5"><span class="c-999 f12">' + item.createtime + '</span></p>' +
                                '</a>' +
                                '</dt>' +
                                '<dd><p class="mt10 f14"><strong>￥' + item.shijiAmount.toFixed(2) + '</strong></span></p>' +
                                '</dl>' + strO + str '</li>'

                        } else {
                            var str = '';
                            var sta = '';
                            if (item.status == 0) {
                                sta = '未支付';
                                if (item.operateUrl != '') {
                                    str = '<p class="txt-r ptb10 bgfff"><a class="a-off" href="javascript:void(0);" code="' + item.strorderid + '" onclick="cancelorder(this,event);">取消</a><a class="a-buy" href="javascript:void(0);" url="' + item.operateUrl + '" class="red" onclick="dup(this,event,' + item.shijiAmount + ')" teacherId="' + item.touserid + '" proname="' + item.productname + '" productId="' + item.productid + '" teaname="' + item.tousername + '">' + item.operateName + '</a></p>'
                                }
                            } else if (item.status == 1) {
                                sta = '已支付';
                                if (item.operateUrl != '') {
                                    str = '<p class="txt-r ptb10 bgfff"><a class="a-buy" href="javascript:void(0);" url="' + item.operateUrl + '" class="red" onclick="dpl(this,event,' + item.shijiAmount + ')" teacherId="' + item.touserid + '" proname="' + item.productname + '" productId="' + item.productid + '" teaname="' + item.tousername + '">' + item.operateName + '</a></p>'
                                }
                            } else if (item.status == 2) {
                                sta = '已取消'
                            } else if (item.status == 4) {
                                sta = '退款中'
                            } else if (item.status == 5) {
                                sta = '已退款'
                            }

                            cont += '<li code="' + item.strorderid + '" onclick="detail(this)">' +
                                '<dl class="orderdl-1 mt10 clearfix">' +
                                '<dt><span class="c-999">订单编号：' + item.strorderid + '</span></dt>' +
                                '<dd><span class="c-999">' + sta + '</span></dd>' +
                                '</dl>' +
                                '<dl class="orderdl-1 clearfix">' +
                                '<dt>' +
                                '<a class="a-order" href="javascript:void(0);">' +
                                '<p class="f16"><a style="text-decoration:none;color:#333;" href="javascript:void(0);" onclick="studio(this,event)">' + getNewline(item.productname) + '</a></p>' +
                                '<p class="mt5"><span class="c-999 f12">' + item.createtime + '</span></p>' +
                                '</a>' +
                                '</dt>' +
                                '<dd><p class="mt10 f14"><strong>￥' + item.shijiAmount.toFixed(2) + '</strong></span></p>' +
                                '</dl>' + str '</li>'
                        }

                    });


                    setTimeout(function() {
                        $('#more').append(cont)
                        me.resetload();
                    }, 500);

                    window.studio = function(es, ev) {
                        ev.stopPropagation();
                        //	window.location = es.getAttribute('href');
                    }
                    window.detail = function(es) {

                        window.location = _host.caidaoh5 + 'home/orders/h5/detail.html?orderid=' + es.getAttribute('code');
                    }
                    window.dpl = function(es, event, fld_planmoney) {
                        event.stopPropagation();
                        var skip = es.getAttribute('url');
                        setTimeout(function() {
                            window.location.href = skip;
                        }, 300)
                        var productId = es.getAttribute('productId');
                        var priceId = es.getAttribute('priceId');
                        var teaname = es.getAttribute('teaname');
                        var proname = es.getAttribute('proname');
                        var teacherId = es.getAttribute('teacherId');
                        if (fld_planmoney < 10) {
                            var os = { "事件功能": "再次购买", "页面名称": "个人中心-订单页", "页面类型": "列表页", "功能分类": "购买", "所属平台": "财道社区", "事件类别": "体验", "体验类型": "付费", "PLATFORM": "H5", "合作者名称": teaname, "合作者ID": teacherId, "产品ID": productId, "产品名称": proname, "产品分类": "视频课堂", "价格区间": "10元以下" }
                        } else if (fld_planmoney > 10) {
                            var os = { "事件功能": "再次购买", "页面名称": "个人中心-订单页", "页面类型": "列表页", "功能分类": "购买", "所属平台": "财道社区", "事件类别": "体验", "体验类型": "付费", "PLATFORM": "H5", "合作者名称": teaname, "合作者ID": teacherId, "产品ID": productId, "产品名称": proname, "产品分类": "视频课堂", "价格区间": "10元以上" }
                        } else if (fld_planmoney == 0) {
                            var os = { "事件功能": "再次购买", "页面名称": "个人中心-订单页", "页面类型": "列表页", "功能分类": "购买", "所属平台": "财道社区", "事件类别": "体验", "体验类型": "付费", "PLATFORM": "H5", "合作者名称": teaname, "合作者ID": teacherId, "产品ID": productId, "产品名称": proname, "产品分类": "视频课堂", "价格区间": "0元" }
                        }

                        dplus_Click("点击事件", os);

                    }
                    window.dup = function(es, event, fld_planmoney) {
                        event.stopPropagation();
                        var skip = es.getAttribute('url');
                        setTimeout(function() {
                            window.location.href = skip;
                        }, 300)
                        var productId = es.getAttribute('productId');
                        var priceId = es.getAttribute('priceId');
                        var teaname = es.getAttribute('teaname');
                        var proname = es.getAttribute('proname');
                        var teacherId = es.getAttribute('teacherId');
                        if (fld_planmoney < 10) {
                            var os = { "事件功能": "去付款", "页面名称": "个人中心-订单页", "页面类型": "列表页", "功能分类": "购买", "所属平台": "财道社区", "事件类别": "体验", "体验类型": "付费", "PLATFORM": "H5", "合作者名称": teaname, "合作者ID": teacherId, "产品ID": productId, "产品名称": proname, "产品分类": "视频课堂", "价格区间": "10元以下" }
                        } else if (fld_planmoney > 10) {
                            var os = { "事件功能": "去付款", "页面名称": "个人中心-订单页", "页面类型": "列表页", "功能分类": "购买", "所属平台": "财道社区", "事件类别": "体验", "体验类型": "付费", "PLATFORM": "H5", "合作者名称": teaname, "合作者ID": teacherId, "产品ID": productId, "产品名称": proname, "产品分类": "视频课堂", "价格区间": "10元以上" }
                        } else if (fld_planmoney == 0) {
                            var os = { "事件功能": "去付款", "页面名称": "个人中心-订单页", "页面类型": "列表页", "功能分类": "购买", "所属平台": "财道社区", "事件类别": "体验", "体验类型": "付费", "PLATFORM": "H5", "合作者名称": teaname, "合作者ID": teacherId, "产品ID": productId, "产品名称": proname, "产品分类": "视频课堂", "价格区间": "0元" }
                        }

                        dplus_Click("点击事件", os);

                    }
                    window.cancelorder = function(es, ev) {
                        ev.stopPropagation();
                        var code = es.getAttribute('code');
                        $('.gztsBox').show();
                        $('.yes').one('click', function() {
                            $.ajax({
                                url: _host.callvipHost + 'jsapi/order/cancel-order',
                                type: 'get',
                                data: {
                                    orderid: code,
                                    userid: ''
                                },
                                dataType: 'jsonp',
                                success: function(data) {

                                    if (data.respCode == 0) {
                                        $(es).parent().siblings().first().children('dd').children().html('已取消')
                                        $(es).parent().remove();
                                        $('.gztsBox').hide();

                                    } else if (data.respCode == 1) {
                                        $('.gztsBox').hide();
                                        //alert('订单撤销失败')
                                    } else {
                                        $('.gztsBox').hide();
                                        //alert('取消订单失败,订单不是未支付 状态')
                                    }
                                }
                            });
                        });
                        $('.fou').one('click', function() {
                            $('.gztsBox').hide();
                        })

                    }
                }
            });
        }
    });
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

    //时间规则：YYY-MM-DD HH:MM:SS
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
            " " + date.getHours() + seperator2 + date.getMinutes() +
            seperator2 + date.getSeconds();
        return currentdate;
    }
    //console.log(getNowFormatDate() )
});