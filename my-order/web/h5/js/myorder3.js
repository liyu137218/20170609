$(function () {
    var _host = window.location.host;
    var _isTest = _host.match('test') || $.trim(_host) == '' || _host.match('127.0'),
        _host = {
            callvipHost: "http://" + (_isTest ? "test-" : "") + "callvip.hexun.com/",
            caidaoh5: "http://" + (_isTest ? "test." : "") + "caidao.hexun.com/",
        };
    var pageIndex = 0;
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
            success: function (res) {
                if (res.respCode == 0) {
                    pageIndex++;
                    var arr = res.result.myOrderList;
                    var cont = '';
                    var PrePayOrfinalpay = ''; //预付or尾款\
                    var sta = '';
                    var str = '';
                    var strO = "" //
                    if (res.result.totalCount != 0) {
                        arr.forEach(function (item, index) {
                            var prepayUseStatus = ''
                            var fuweikuanStatus = "a-buy" //付尾款的class
                            var moneystatus = "" //定金使用状态
                            var clickUrl = item.operateUrl
                            //不是套餐
                            if (item.isPackage == 0) {
                                strO = ""
                            } else {
                                // 展开 <td width="7%">####</td>
                                strO = '<dl class="orderdl-1 clearfix">' +
                                    '<dt><span class="f16">子订单</span></dt>' +
                                    '<dd><span class="i-jtb" temp="' + item.strorderid + '" onclick="opens(this,event)"></span></dd>' +
                                    '</dl>'
                            }
                            // 不是预付
                            if (item.isPrePay == 0) {
                                if (item.isFinalPay == 1) {
                                    // 是尾款
                                    // console.log(item.isFinalPay);
                                    PrePayOrfinalpay = '尾款'
                                } else {
                                    // 既不是预付也不是尾款
                                    PrePayOrfinalpay = ''
                                }
                            } else {
                                // 是预付
                                PrePayOrfinalpay = "预付"
                                // 预付使用时间判断
                                if (item.status == 1) {
                                    // 预付使用时间timeOk
                                    // 是预售 但是没有付款 那么也就没有时间呀 这里要判断只有在已支付的情况下 才会有时间处理  就是 预付>订单状态(已支付)
                                    var timeOk01 = yufuTime01(item.preCouponStartTime)
                                    var timeOk02 = yufuTime01(item.preCouponStartTime)
                                    timeOk = timeOk01 + "-" + timeOk02
                                    moneystatus = '<p class="orderp-txt">请在有效期内使用' + timeOk + '</p>'
                                }
                            }
                            //判断支付状态
                            if (item.status == 0) {
                                sta = '未支付';
                                if (item.operateUrl != '') {
                                    str = '<p class="txt-r ptb10 bgfff"><a class="a-off" href="javascript:void(0);" code="' + item.strorderid + '" onclick="cancelorder(this,event);">取消</a><a class="a-buy" href="javascript:void(0);" url="' + item.operateUrl + '" onclick="tongji(this,event,' + item.shijiAmount + ',' + item.operateName + ')" teacherid="' + item.touserid + '" proname="' + item.productname + '" productid="' + item.productid + '" teaname="' + item.tousername + '">' + item.operateName + '</a></p>'
                                }

                            } else if (item.status == 1) {
                                sta = '已支付';
                                if (item.operateUrl != '') {
                                    // 已支付的情况下 直接判断定金使用情况 决定操作里的样式和文字
                                    if (item.prepayUseStatus == "可使用") {
                                        item.operateName = "付尾款"
                                        prepayUseStatus = "/可使用"
                                        if (item.finalPayUrl) {
                                            clickUrl = item.finalPayUrl
                                        }
                                    } else if (item.prepayUseStatus == "不可用") {
                                        item.operateName = "付尾款"
                                        prepayUseStatus = "/不可用"
                                        fuweikuanStatus = "a-off"
                                    } else if (item.prepayUseStatus == "已使用") {
                                        prepayUseStatus = "/已使用"
                                    }
                                    str = '<p class="txt-r ptb10 bgfff"><a class="' + fuweikuanStatus + '" href="javascript:void(0);" url="' + clickUrl + '" class="red" onclick="tongji(this,event,' + item.shijiAmount + ',' + item.operateName + ')" teacherId="' + item.touserid + '" proname="' + item.productname + '" productId="' + item.productid + '" teaname="' + item.tousername + '">' + item.operateName + '</a></p>' + moneystatus
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
                                '<dd><span class="c-999">' + sta + prepayUseStatus + '</span></dd>' +
                                '</dl>' +
                                '<dl class="orderdl-1 clearfix">' +
                                '<dt>' +
                                '<a class="a-order" href="javascript:void(0);">' +
                                '<p class="f16"><a style="text-decoration:none;color:#333;" href="javascript:void(0);" onclick="studio(this,event)">' + getNewline(item.productname) + '</a><span class="order-sp">' + PrePayOrfinalpay + '</span></p>' +
                                '<p class="mt5"><span class="c-999 f12">' + item.createtime + '</span></p>' +
                                '</a>' +
                                '</dt>' +
                                '<dd><p class="mt10 f14"><strong>￥' + item.shijiAmount.toFixed(2) + '</strong></span></p>' +
                                '</dl>' + strO + str + '</li>'
                        });
                        $('#more').append(cont)
                        window.opens = function (ts, event) {
                            event.stopPropagation();
                            var content = '';
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
                                    success: function (data) {
                                        var order01 = '';
                                        var order02 = '';
                                        if (data.respCode == 0) {
                                            //子订单如果该尾款订单无子订单，则只显示“预付款信息”、
                                            if (data.result.myOrderItems) {
                                                data.result.myOrderItems.forEach(function (itemC, index) {
                                                    order01 += '<li><a style="text-decoration:none;color:#333;" href="javascript:void(0);" onclick="studio(this,event)">' + itemC.productname + '</a></li>'
                                                });
                                            }
                                            if (data.result.prepayOrderVO) {
                                                var itemC = data.result.prepayOrderVO
                                                order02 += '<li><a style="text-decoration:none;color:#333;" href="javascript:void(0);" onclick="studio(this,event)">' + itemC.productname + '</a><span class="order-sp">预付</span></li>'
                                            }
                                            content = '<ul class="orderul bgfff">' + order01 + order02 + '</ul>'
                                            $(ts).parent().parent().after(content);
                                            $(ts).parent().parent().next('.orderul').show();
                                        }
                                    }
                                });
                                $(ts).parents('.yhqtopbox').next().slideDown();
                                $(ts).addClass('i-tb-on')
                            }
                        }
                        window.studio = function (es, ev) {
                            ev.stopPropagation();
                            //window.location = es.getAttribute('href');
                        }
                        window.detail = function (es) {
                            window.location = _host.caidaoh5 + 'home/orders/h5/detail.html?orderid=' + es.getAttribute('code');
                        }


                        window.cancelorder = function (es, ev) {
                            ev.stopPropagation();
                            var code = es.getAttribute('code');
                            $('.gztsBox').show();
                            $('.yes').one('click', function () {
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
                            $('.fou').one('click', function () {
                                $('.gztsBox').hide();
                            })
                        }
                    } else {
                        $('#Not').show();
                    }
                } else {
                    alert(res.errorMgs)
                }
            }



        });
    }
    $('#more').dropload({
        scrollArea: window,
        loadDownFn: function (me) {
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
                success: function (res) {

                    pageIndex++;
                    var arr = res.result.myOrderList;
                    var cont = '';
                    var PrePayOrfinalpay = ''; //预付or尾款\
                    var sta = '';
                    var str = '';
                    var strO = "" //

                    arr.forEach(function (item, index) {

                        var prepayUseStatus = ''
                        var fuweikuanStatus = "a-buy" //付尾款的class
                        var moneystatus = "" //定金使用状态
                        var clickUrl = item.operateUrl
                        //不是套餐
                        if (item.isPackage == 0) {
                            strO = ""
                        } else {
                            // 展开 <td width="7%">####</td>
                            strO = '<dl class="orderdl-1 clearfix">' +
                                '<dt><span class="f16">子订单</span></dt>' +
                                '<dd><span class="i-jtb" temp="' + item.strorderid + '" onclick="opens(this,event)"></span></dd>' +
                                '</dl>'
                        }
                        // 不是预付
                        if (item.isPrePay == 0) {
                            if (item.isFinalPay == 1) {
                                // 是尾款
                                // console.log(item.isFinalPay);
                                PrePayOrfinalpay = '尾款'
                            } else {
                                // 既不是预付也不是尾款
                                PrePayOrfinalpay = ''
                            }
                        } else {
                            // 是预付
                            PrePayOrfinalpay = "预付"
                            // 预付使用时间判断
                            if (item.status == 1) {
                                // 预付使用时间timeOk
                                // 是预售 但是没有付款 那么也就没有时间呀 这里要判断只有在已支付的情况下 才会有时间处理  就是 预付>订单状态(已支付)
                                var timeOk01 = yufuTime01(item.preCouponStartTime)
                                var timeOk02 = yufuTime01(item.preCouponStartTime)
                                timeOk = timeOk01 + "-" + timeOk02
                                moneystatus = '<p class="orderp-txt">请在有效期内使用' + timeOk + '</p>'
                            }
                        }
                        //判断支付状态
                        if (item.status == 0) {
                            sta = '未支付';
                            if (item.operateUrl != '') {
                                str = '<p class="txt-r ptb10 bgfff"><a class="a-off" href="javascript:void(0);" code="' + item.strorderid + '" onclick="cancelorder(this,event);">取消</a><a class="a-buy" href="javascript:void(0);" url="' + item.operateUrl + '" onclick="tongji(this,event,' + item.shijiAmount + ',' + item.operateName + ')" teacherid="' + item.touserid + '" proname="' + item.productname + '" productid="' + item.productid + '" teaname="' + item.tousername + '">' + item.operateName + '</a></p>'
                            }

                        } else if (item.status == 1) {
                            sta = '已支付';
                            if (item.operateUrl != '') {
                                // 已支付的情况下 直接判断定金使用情况 决定操作里的样式和文字
                                if (item.prepayUseStatus == "可使用") {
                                    item.operateName = "付尾款"
                                    prepayUseStatus = "/可使用"
                                    if (item.finalPayUrl) {
                                        clickUrl = item.finalPayUrl
                                    }
                                } else if (item.prepayUseStatus == "不可用") {
                                    item.operateName = "付尾款"
                                    prepayUseStatus = "/不可用"
                                    fuweikuanStatus = "a-off"
                                } else if (item.prepayUseStatus == "已使用") {
                                    prepayUseStatus = "/已使用"
                                }
                                str = '<p class="txt-r ptb10 bgfff"><a class="' + fuweikuanStatus + '" href="javascript:void(0);" url="' + clickUrl + '" class="red" onclick="tongji(this,event,' + item.shijiAmount + ',' + item.operateName + ')" teacherId="' + item.touserid + '" proname="' + item.productname + '" productId="' + item.productid + '" teaname="' + item.tousername + '">' + item.operateName + '</a></p>' + moneystatus
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
                            '<dd><span class="c-999">' + sta + prepayUseStatus + '</span></dd>' +
                            '</dl>' +
                            '<dl class="orderdl-1 clearfix">' +
                            '<dt>' +
                            '<a class="a-order" href="javascript:void(0);">' +
                            '<p class="f16"><a style="text-decoration:none;color:#333;" href="javascript:void(0);" onclick="studio(this,event)">' + getNewline(item.productname) + '</a><span class="order-sp">' + PrePayOrfinalpay + '</span></p>' +
                            '<p class="mt5"><span class="c-999 f12">' + item.createtime + '</span></p>' +
                            '</a>' +
                            '</dt>' +
                            '<dd><p class="mt10 f14"><strong>￥' + item.shijiAmount.toFixed(2) + '</strong></span></p>' +
                            '</dl>' + strO + str + '</li>'
                    });
                    setTimeout(function () {
                        $('#more').append(cont)
                        me.resetload();
                    }, 500);
                    window.studio = function (es, ev) {
                        ev.stopPropagation();
                        //	window.location = es.getAttribute('href');
                    }
                    window.detail = function (es) {
                        window.location = _host.caidaoh5 + 'home/orders/h5/detail.html?orderid=' + es.getAttribute('code');
                    }
                    window.cancelorder = function (es, ev) {
                        ev.stopPropagation();
                        var code = es.getAttribute('code');
                        $('.gztsBox').show();
                        $('.yes').one('click', function () {
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
                        $('.fou').one('click', function () {
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

    function yufuTime01(params) {
        if (params) {
            var time01 = params.split(" ")[0].split("-")
            time01[1] = deleling(time01[1])
            time01[2] = deleling(time01[2])
            return timeOk01 = time01[1] + "." + time01[2] + " " + "00:00"
        }
    }
    // 时间格式处理 去除头部0
    function deleling(param) {
        if (param.indexOf("0") == 0) {
            return param.substring(1)
            // console.log(param);
        } else {
            return param
        }
    }

    function tongji(es, event, fld_planmoney, name) {
        // dup 
        event.stopPropagation();
        var skip = es.getAttribute('url');
        setTimeout(function () {
            window.location.href = skip;
        }, 300)
        var productId = es.getAttribute('productId');
        var priceId = es.getAttribute('priceId');
        var teaname = es.getAttribute('teaname');
        var proname = es.getAttribute('proname');
        var teacherId = es.getAttribute('teacherId');
        if (fld_planmoney < 10) {
            var os = {
                "事件功能": name,
                "页面名称": "个人中心-订单页",
                "页面类型": "列表页",
                "功能分类": "购买",
                "所属平台": "财道社区",
                "事件类别": "体验",
                "体验类型": "付费",
                "PLATFORM": "H5",
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
                "PLATFORM": "H5",
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
                "PLATFORM": "H5",
                "合作者名称": teaname,
                "合作者ID": teacherId,
                "产品ID": productId,
                "产品名称": proname,
                "产品分类": "视频课堂",
                "价格区间": "0元"
            }
        }
        dplus_Click("点击事件", os);
    }


});