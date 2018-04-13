// DISCOUNT_COUPON：折扣券 
// FULL_REDUCTION_COUPON： 满减券 
// CASH_COUPON： 代金券 
// EVERY_FULL_REDUCTION_COUPON ： 每满减券 
// EXPERIENCE_COUPON： 体验券
// http://test.apicaidao.hexun.com/recommendposition/19/1/10 
// h5的推荐位id18
// pc班的推荐位19

$(function () {
  var _api = api()
  UserCenter().then(function(loginInfo) {
    var myCoupon = Vue.extend({
      name: 'myCoupon',
      template: '#js_myCouponTemplate',
      data: function () {
        return {
          indexValue: 'have',
          isPullAD: false, // 是否拉取广告
          adList: [], // 广告列表
          hasCoupon: true, // 是否有数据 
          haveList: [], // 可用优惠券列表
          usedList: [], // 已用优惠券
          outdateList: [], // 过期优惠券
        }
      },
      computed: {
        isMobile: function () {
          return new Browser().device !== 'PC'
        },
      },
      watch: {
        indexValue: function () {
          this.getCouponsList();
        },
        isPullAD: function (val) {
          if(val) {
            this.getAd()
          }
        }
      },
      methods: {
        showDetils: function (e) {  
          var showhid=function(obj,itemclass,con){
              if(obj.hasClass(itemclass)){
                con.next().slideUp();
                obj.removeClass(itemclass)
              }
              else{
                con.next().slideDown();
                obj.addClass(itemclass)
              }	
          };
          var el = e.target;
          var con=$(el).parents('.yhqtopbox');
            showhid($(el),'i-tb-on',con);
        },
        // 切换标签
        checkNav: function (val) {
          this.indexValue = val;
        },
        dataMar: function (price,rmb,priceDesc,type,name,useScope,usedate,useUrl,pid,coupon_type) {
          var obj = {
            price: price, // 优惠价格
            rmb: rmb,
            priceDesc: priceDesc, // 说明
            type: type, // 类型
            name: name, // 名称
            useScope: useScope, // 使用范围
            useDate: usedate, // 到期时间
            useUrl: useUrl, // 使用地址
            pid: pid, // 券id
            coupon_type:coupon_type
          }
          return obj;
        },
        // 数据处理
        dataFormat: function (item) {
          var _this = this;
          var obj = null;
          var type = item.coupon_type;

          if(item.forward_url) {
            item.useUrl = item.forward_url.split('Page:')[1]
          }
          switch(type) {
            case 'CASH_COUPON': // 代金券
              obj = _this.dataMar(
                item.replaceCashAmount,
                true,
                '',
                '代金券',
                item.plan_name,
                item.useScope,
                item.coupon_start_date + '~' + item.coupon_end_date,
                item.useUrl,
                item.couponid,
                  item.coupon_type
              )
            break;
            case 'DISCOUNT_COUPON': // 折扣券
              obj = _this.dataMar(
                (100 - item.percent) / 10 + '折',
                false,
                '',
                '折扣券',
                item.plan_name,
                item.useScope,
                item.coupon_start_date + '~' + item.coupon_end_date,
                item.useUrl,
                item.couponid,
                  item.coupon_type
              )
            break;
            case 'FULL_REDUCTION_COUPON': // 满减券
              obj = _this.dataMar(
                item.fullReductionAmount,
                true,
                '满' + item.fullLimitAmount + '减' + item.fullReductionAmount,
                '满减券',
                item.plan_name,
                item.useScope,
                item.coupon_start_date + '~' + item.coupon_end_date,
                item.useUrl,
                item.couponid,
                  item.coupon_type
              )
            break;
            case 'EXPERIENCE_COUPON': // 体验券
              obj = _this.dataMar(
                  '体验',
                  false,
                  '',
                  '体验券',
                  item.plan_name,
                  item.useScope,
                  item.coupon_start_date + '~' + item.coupon_end_date,
                  item.useUrl,
                  item.couponid,
                  item.coupon_type
                )
            break;
            case 'EVERY_FULL_REDUCTION_COUPON': // 每满减卷
             obj = _this.dataMar(
                item.everyFullReductionAmount,
                true,
                '每满' + item.everyFullLimitAmount + '减' + item.everyFullReductionAmount,
                '体验券',
                item.plan_name,
                item.useScope,
                item.coupon_start_date + '~' + item.coupon_end_date,
                item.useUrl,
                item.couponid,
                 item.coupon_type
             )
            default:
            break;
          }
          return obj
        },
        // 优惠券类型
        couponType: function (type) {
          var obj = {
            DISCOUNT_COUPON: '折扣券',
            FULL_REDUCTION_COUPON: '满减券',
            CASH_COUPON: '代金券',
            EVERY_FULL_REDUCTION_COUPON:  '满减券',
            EXPERIENCE_COUPON: '体验券'
          }

          return obj[type];
        },
        // 优惠券适用平台
        couponUseScope: function (type) {
          var obj = {
            ALL_PLATFORM: '全平台',
            COMMUNITY_PLATFORM: '社区平台'
          }

          return '使用范围：仅限和讯'+obj[type] + '进行使用'
        },
        getCouponsList: function () {
          var _this = this;
          fetch(_api.getCouponsList, function (data) {
            if(data.respCode == 0) {
              if (data.result.length != 0) {
                _this.hasCoupon = true;
                if(_this.indexValue == 'have') {
                  _this.haveList = $(data.result).map(function () {
                    return(_this.dataFormat(this))
                  }).get()
                } else if (_this.indexValue == 'used') {
                  _this.usedList = $(data.result).map(function () {
                    return(_this.dataFormat(this))
                  }).get();
                } else if (_this.indexValue == 'outdate') {
                  _this.outdateList = $(data.result).map(function () {
                    return(_this.dataFormat(this))
                  }).get()
                }
              } else {
                _this.hasCoupon = false;
                _this.isPullAD = true;
              }
            }
          }, {
            userid:loginInfo.userid,
            couponStatus: _this.indexValue,
            platform: 'web'
          })
        },
        getAd: function () {
          var _this = this;
          var interFace = _api.getADlistPc;
          if(this.isMobile) {
            interFace = _api.getADlistH5;
          }
          fetch(interFace, function (data) {
            if(data.code == 0) {
              _this.adList = data.data.list
            }
          })
        },
        useCoupons:function(url, item) {
        
          setTimeout(function () {
            //20180306 非体验券则无需传couponid
            location.href = url + (item.coupon_type=='EXPERIENCE_COUPON'?'&couponid=' + item.pid:'');
          }, 400)
           
          var data = {
            "功能分类" : "优惠券使用",
            "事件功能": "使用优惠券",
            "所属平台": "财道社区",
            "事件类别": "体验",
            "体验类型": "付费",
            "PLATFORM": "WEB",
            "优惠类型": item.type,
            "优惠计划名称": item.name,
            "优惠计划ID": item.pid,
            "页面名称": "个人中心-优惠券",
            "页面类型": "列表页"
          }
        
          if(this.isMobile) {
            data["PLATFORM"] = "H5"
          }

          console.log(data);

          dplus_Click("点击事件", data);
        }
      },
      created: function () {
        this.getCouponsList();
      }
    })

    new myCoupon().$mount('#js_myCoupon')
  })

  
})