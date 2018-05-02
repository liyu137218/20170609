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
    var nums = -1;
    var limit = 0;
    var begindate = '';
    var enddate = '';
    var status = -1;
    attend(begindate, enddate, status);

    //状态选择按钮
    $('.a-red-btn').click(function () {
        begindate = $('.date-i1').val();
        enddate = $('.date-i2').val();
        // console.log(begindate + " " + enddate);
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

            url: "http://test-callvip.hexun.com/jsapi/order/getorders",
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
                // console.log(res)

                //page
                var arr = res.result.myOrderList;
                if (res.respCode == 0 && pageIndex == 0) {
                    $(".pt20").html("")

                    // 总页数  ==0 不重新渲染了
                    nums = res.result.totalCount
                    if (nums == 0) {
                        $("#pageTool").hide();
                        $('.noGz').show();
                    } else {
                        $('.noGz').hide();
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
    function renderDom(msg) {

        var cont = '';
        var dikou = "";
        var PrePayOrfinalpay = ''; //预付or尾款\
        var tab = ''; // 展开
        var sta = '';
        var str = '';
        var moneystatus = "" //定金使用状态
        var heat01 = '<table class="order-tab"><tbody><tr><th class="order-th1" width="20%">商品名称</th><th width="15%">订购对象</th><th width="10%">订单金额</th><th width="12%">实付款</th><th width="10%">订单状态</th><th width="16%">定金使用状态</th><th width="10%">操作</th><th width="7%">&nbsp;</th></tr></tbody></table>'
        msg.forEach((item, index) => {
            var fuweikuanStatus = "red" //付尾款的class
            var marginTop01 = "" //在只有详情的时候 不要padding-top: 5px; 样式问题
            clickUrl = item.operateUrl //付尾款连接 还是再次购买连接
            //不是套餐
            if (item.isPackage == 0) {
                tab = '<td width="7%" class="orderHs"><a href="javascript:void(0);" class="a-down" "></a></td>'
            } else {
                // 展开 <td width="7%">####</td>
                tab = '<td width="7%" class="orderHs"><a href="javascript:void(0);" temp="' + item.strorderid + '" class="a-down" onclick="opens(this,event)">展开</a></td>'
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
                dikou = ''
                moneystatus = '<td width="16%"></td>'
            } else {
                // 是预付
                PrePayOrfinalpay = "预付"
                // 折扣判断
                if (item.prepayCoupAmount) {
                    dikou = '<p class="mt10 f12 c - 333">(可抵扣' + item.prepayCoupAmount + '元)</p>'
                } else {
                    // TODO:  exremark  prepayCoupAmount什么关系 一致性 
                    // 后端新加字段exremark "可抵扣200元"
                    if (item.exremark) {
                        dikou = '<p class="mt10 f12 c - 333">' + item.exremark + '</p>'
                    } else {
                        dikou = '<p class="mt10 f12 c - 333"></p>'
                    }

                }
                // 预付使用时间判断
                if (item.status == 1) {
                    // 预付使用时间timeOk
                    // 是预售 但是没有付款 那么也就没有时间呀 这里要判断只有在已支付的情况下 才会有时间处理  就是 预付>订单状态(已支付)
                    var timeOk01 = yufuTime01(item.preCouponStartTime)
                    var timeOk02 = yufuTime01(item.preCouponStartTime)
                    timeOk = timeOk01 + "-" + timeOk02
                    moneystatus = ' <td width="16%">' + item.prepayUseStatus + ' <p class="mt10 tab-red f12">请在有效期内使用<br />' + timeOk + '</p></td>'
                } else {
                    moneystatus = '<td width="16%"></td>'
                }

            }

            //判断支付状态

            if (item.status == 0) {
                sta = '未支付';
                marginTop01 = "pt5"

                if (item.operateUrl != '') {
                    str = '<p><a href="' + item.operateUrl + '" target="_blank" class="red">' + item.operateName + '</a></p><p class="pt5"><a href="javascript:void(0);" code="' + item.strorderid + '" onclick="cancelorder(this);" target="_blank" class="c-999">取消</a></p>'
                }

            } else if (item.status == 1) {
                marginTop01 = "pt5"

                sta = '已支付';
                if (item.operateUrl != '') {
                    // 已支付的情况下 直接判断定金使用情况 决定操作里的样式和文字
                    if (item.prepayUseStatus == "可使用") {
                        item.operateName = "付尾款"
                        fuweikuanStatus = "a-wk a-red-btn mt10"
                        if (item.finalPayUrl) {
                            clickUrl = item.finalPayUrl
                        }
                    } else if (item.prepayUseStatus == "不可用") {
                        item.operateName = "付尾款"
                        fuweikuanStatus = "a-wk mt10"
                    }

                    str = '<p><a style="width:66px" href="' + clickUrl + '" target="_blank" url="' + clickUrl + '" target="_blank" class="' + fuweikuanStatus + '" onclick="dpl(this,event,' + item.shijiAmount + ')" proname="' + item.productname + '" productId="' + item.productid + '" teaname="' + item.tousername + '" teacherId="' + item.touserid + '">' + item.operateName + '</a></p>';
                    // operateName  再次购买
                }


            } else if (item.status == 2) {
                sta = '已取消'
                marginTop01 = ""

            } else if (item.status == 4) {
                sta = '退款中'
                marginTop01 = ""

            } else if (item.status == 5) {
                sta = '已退款'
                marginTop01 = ""
            }


            cont += '<table class="order-tab mt20">' +
                '<tr class="tab-header"><td class="txt-l" colspan="4">订单号：' + item.strorderid + '</td><td class="txt-r c-666" colspan="4">创建时间：' + item.createtime + '</td></tr>' +

                '<tr><td class="txt-l" width="20%">' + getNewline(item.productname) + '<span class="sp-yf">' + PrePayOrfinalpay + '</span></td>' +

                '<td width="15%" href="' + item.partnerWorkroomUrl + '" onclick="studio(this)">' + item.tousername + '</td>' +

                '<td width="10%"><span class="tab-red">￥' + item.amount.toFixed(2) + '</span></td>' +

                '<td width="12%"><span class="tab-red" >￥' + item.shijiAmount.toFixed(2) + '</span >' + dikou + '</td >' +

                '<td width="10%">' + sta + '</td>' +

                moneystatus +

                ' <td width="9%"  class="btnB">' +
                str +
                '<p class="' + marginTop01 + '"><a href="javascript:void(0);" code="' + item.strorderid + '" class="a-blue" onclick="detail(this)">详情</a></p>' +
                ' </td>' +
                tab +

                '</tr ></table >'


            //结束

        });
        // order-tab
        $(".pt20").html(heat01 + cont)

    }


    window.studio = function (es) {

        window.open(es.getAttribute('href'));
    }
    window.detail = function (es) {

        window.open(_host.caidao + '/home/orders/detail.html?orderid=' + es.getAttribute('code'));
    }
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    window.opens = function (ts, event) {
        var order = '';
        var contentChild = '';
        var temp = ts.getAttribute('temp');
        if ($(ts).hasClass('a-up')) {
            $(ts).removeClass('a-up').html('展开');
            $(ts).parent().parent().parent().find('.orderChild').remove();
        } else {
            order = '';
            // 已经展开 显示为收起
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
                    console.log(data);
                    if (data.respCode == 0) {
                        // 子订单
                        // 子订单 myOrderItems   预付prepayOrderVO
                        var cont01 = "" //正常子订单
                        var cont02 = "" //预付子订单
                        var cont03 = "" //实付款共计
                        var dikou = "";
                        var tab = '<td width="7%" class="orderHs"><a href="javascript:void(0);" class="a-down" "></a></td>' // 展开

                        // 子订单非预付列表
                        data.result.myOrderItems.forEach(function (item, index) {
                            // TODO:未支付  的情况下 不显示实际金额 需要前端判断
                            //不需要判断展开                        

                            // 不是预付
                            PrePayOrfinalpay = ''
                            dikou = ''
                            moneystatus = '<td width="16%"></td>'
                            dikou = '<p class="mt10 f12 c - 333"></p>'
                            moneystatus = '<td width="16%"></td>'

                            cont01 += '<tr class="orderChild"><td class="txt-l" width="20%">' + getNewline(item.productname) + '<span class="sp-yf">' + PrePayOrfinalpay + '</span></td>' +

                                '<td width="15%" href="' + item.partnerWorkroomUrl + '" onclick="studio(this)">' + item.tousername + '</td>' +

                                '<td width="10%"><span class="tab-red">￥' + item.amount + '</span></td>' +

                                '<td width="12%"><span class="tab-red" >￥' + item.shijiAmount + '</span ></td >' +

                                '<td width="10%"></td>' +

                                ' <td width="16%"></td>' +

                                ' <td width="9%"  class="btnB">' +
                                '<p class="pt5"><a href="javascript:void(0);"  class="a-blue" ></a></p>' +
                                ' </td>' +
                                tab +

                                '</tr >'

                        });
                        // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                        // 子订单预付展示
                        if (data.result.prepayOrderVO) {
                            var sta = '';
                            var prepayData = data.result.prepayOrderVO

                            if (prepayData.status == 0) {
                                sta = '未支付'
                            } else if (prepayData.status == 1) {
                                sta = '已支付'
                            } else if (prepayData.status == 2) {
                                sta = '已取消'
                            } else if (prepayData.status == 4) {
                                sta = '退款中'
                            } else if (prepayData.status == 5) {
                                sta = '已退款'
                            }
                            cont02 =
                                '<tr class="orderChild"><td class="txt-l" width="20%">' + getNewline(prepayData.productname) + '<span class="sp-yf">预付</span></td>' +

                                '<td width="15%" href="' + prepayData.partnerWorkroomUrl + '" onclick="studio(this)">' + prepayData.tousername + '</td>' +

                                '<td width="10%"><span class="tab-red">￥' + prepayData.amount + '</span></td>' +

                                '<td width="12%"><span class="tab-red" >￥' + prepayData.shijiAmount.toFixed(2) + '</span ><p class = "mt10 f12 c-333">(可抵扣' + prepayData.couponAmount + '元)</p></td > ' +

                                '<td width="10%">' + sta + '</td>' +

                                ' <td width="16%">' + prepayData.prepayUseStatus + '</td>' +

                                ' <td width="9%"  class="btnB">' +
                                '<p class="pt5"><a href="javascript:void(0);"  class="a-blue" ></a></p>' +
                                ' </td>' +
                                tab +

                                '</tr >'
                            cont03 = '<tr class="tab-tr-zj orderChild">' +
                                '<td class = "txt-l" colspan = "8" >' +
                                '<span class = "c-red" > 实付款共计: </span>' +
                                '<p class = "txt-center" > ' +
                                '<strong class = "f20 c-red" > ￥600.00 </strong>' +
                                '<span class="c-999">&nbsp;&nbsp;（预付款抵扣20，优惠券抵扣20）</span >' +
                                '</p>' +
                                '</td>' +
                                '</tr>'
                        }



                        // console.log($(ts).parent().parent().parent());
                        $(ts).parent().parent().parent().append(cont01 + cont02 + cont03);
                        // $(ts).parent().parent().parent().next('.orderChild').show();
                    }

                }
            });


        };


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

    function yufuTime01(params) {
        if (params) {
            var time01 = params.split(" ")[0].split("-")
            time01[1] = deleling(time01[1])
            time01[2] = deleling(time01[2])
            return timeOk01 = time01[1] + "." + time01[2] + " " + "00:00"
        }
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