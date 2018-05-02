import Vue from 'vue'
import Vuex from 'vuex'
import {fetch} from './fetch'
import {config} from '../config'
Vue.use(Vuex);

const store = new Vuex.Store({

  state: { // 驱动应用的数据源；
    isTest:config.env!=3,
    webUrl: escape(config.webUrl),
    web: config.web,
    webRetg: `${config.cmp}partner/retg.html`, // 增加我的资质链接
    oldHost: config.webOld,
    weChat: config.weChat,
    config: config,
    showCycle: 'year', // 数据展示的周期
    isLogin: false, // 是否登录
    isShowDialog: false, // 是否展示弹出框
    sysError: false, // 系统消息弹框
    sysInfo: { // 系统消息
      title: '系统提示',
      errorMsg: '发生未知错误',
    },
    showLoginOrRegistered: false,  // 展现登录或者注册框
    userInfo: {},
    teacherInfo: '',
    partnerId: '', // id
    notice: 0, // 未读消息
    isShowSysNotice: true, // 是否展示系统消息
    newsLists: [], // 消息列表
    blackInfo: {}, // 黑名单信息
    userLevel: -1, // 用户等级 0普通老师 1申请投顾审核未通过 2投顾 3被降级
    myUserAllData: '', // 我的用户统计 所有统计
    liveRooms: [], // 直播室
    indexOtherData: '', // 直播室下面的其他统计数据
    courseList: '', // 培训课程列表 视频 财播 精
    isBindPhone: false, // 用户是否绑定手机
  },

  getters: {
    // 标的
    selectTags: (state, geters) => {
      const selectTage = state.teacherInfo.selecttag;
      const biaode = [];
      const method = [];
      if (selectTage && Array.isArray(selectTage)) {
        selectTage.forEach((item) => {
          if (item.tagType == 1) {
            biaode.push(item.tag)
          } else {
            method.push(item.tag)
          }
        })
      }

      function getHtmlStr(arrStr) {
        let htmlStr = '';
        arrStr.forEach((item) => {
          htmlStr += `<span>${item}</span>`
        })
        return htmlStr;
      }

      return {
        biaode: {
          content: getHtmlStr(biaode),
          classes: 'menu-header-tips',
          trigger: 'hover'
        },
        method: {
          content: getHtmlStr(method),
          classes: 'menu-header-tips',
          trigger: 'hover'
        }
      }
    },
    isOpenWeChatStudio(state, geters) {
      if(typeof state.teacherInfo.Partner != "undefined") {
        return state.teacherInfo.Partner.openWeChatPlatform
      } else {
        return 0;
      }
    },
    courseList(state) {
      return state.courseList;
    },
    partnerLevel (state) { // 1投顾 2老师 3 名家
      return state.teacherInfo.partnerLevel
    }
  },

  mutations: {
    UPDATE_SHOWCYCLE(state, val) {
      state.showCycle = val;
    },
    /**
     * 调取登录框
     * @params {string} val LOGIN:登录 / REGISTER:注册
     */
    UPDATE_SLOR(state, val) {
      state.isShowDialog = true;
      state.showLoginOrRegistered = val;
    },
    CLOSE_SLOR(state, val) {
      state.isShowDialog = false;
      state.showLoginOrRegistered = val;
    },
    /**
     *
     * @param state
     * @constructor
     */
    CLOSE_NOTICE(state) {
      state.isShowSysNotice = false
    },
    /**
     * 设置黑名单信息
     * @param {Object} state
     * @param {Array} val 包含黑名单的数组
     * @constructor
     */
    SET_BLACK_LIST(state, val) {
      state.blackInfo = val;
      console.log('获取黑名单列表SUCCESS');
    },
    SET_ISLOGIN(state) {
      state.isLogin = true;
      console.log('设置登录为TRUE');
    },
    SET_USER_INFO(state, val) {
      state.userInfo = val;
      console.log('设置用户信息');
    },
    // 设置用户等级
    SET_USER_LEVEL(state, val) {
      state.userLevel = val;
      console.log('设置用户等级', val)
    },
    SET_MY_USER_ALL_DATA(state, val) {
      state.myUserAllData = val
    },
    /**
     * set notice
     * @param {*} state
     * @param {*} val
     */
    SET_NOTICE(state, val) {
      state.notice = val
    },
    SET_SYS_ERRORMSG(state, params) {
      // 设置消息
      if (params) {
        state.sysInfo = params
      }

    },
    SET_DIALOG(state, val) {
      // 设置弹出框属性
      state.isShowDialog = val;

    },
    // 设置系统弹框
    SET_SYS_ERROR(state, val) {
      // 设置系统弹窗
      state.sysError = val;

    },

    // 设置直播室
    SET_LIVE_ROOMS(state, res) {
      if (res && Array.isArray(res)) {
        let hasVip = false;
        let hasFree = false;
        let pro;
        res.map(({info, type, suspend, liveTab, roomName, roomId, productInfo, teacherSuspend,auditStatus}) => {
          pro = {
            name: roomName,
            isHas: true,
            // openR: !teacherSuspend, // 是谁关闭的  true是关闭
            isOpen: !teacherSuspend,
            isVip: type === 'non_free',
            price: productInfo.pricOrderInfo,
            label: liveTab,
            desc: info,
            roomId: roomId,
            auditStatus:auditStatus,
            link: `${state.oldHost}/${roomId}/default.html`
          };
          if (type === 'non_free') {
            hasVip = true;
          } else {
            hasFree = true;
          }
          state.liveRooms.push(pro)
        });

        if (!hasVip) {
          state.liveRooms.push({
            isHas: false,
            isVip: true,
            defalutValue: {
              desc: '您还没有开通VIP直播室哟',
              btnText: '开通VIP直播室',
              href: `${state.oldHost}/teacher/admin/vipLiverApply.html?pid=${state.partnerId}`
            }
          })
        }
        if (!hasFree) {
          state.liveRooms.push({
            isHas: false,
            isVip: false,
            defalutValue: {
              desc: '您还没有开通免费直播室哟',
              btnText: '开通免费直播室',
              href: `${state.oldHost}/teacher/admin/freeLiverApply.html?pid=${state.partnerId}`
            }
          })
        }
      }
    },

    // 设置indexOtherData数据
    SET_INDEX_OTHER_DATA(state, res) {
      state.indexOtherData = res
    },

    //
    SET_PARTNER_ID(state, val) {
      state.partnerId = val;
      console.log('设置老师ID')
    },

    SET_TEACHER_INFO(state, val) {
      state.teacherInfo = Object.assign({}, state.teacherInfo, val)
      console.log('设置老师信息');
    },
    SET_TAGS(state, val) {
      state.tags = val;
    },
    SET_COURSE_LIST(state, val) {
      state.courseList = val;
    },
    UBDATE_LIVE_ROOM(state, params) {
      const liveRooms = state.liveRooms;

      liveRooms.forEach((item) => {
        if (item.roomId === params.roomId) {
          item.isOpen = !params.suspend
        }
      })
    }
  },

  actions: {
    /**
     * 打开弹窗
     * @param commit
     * @param params {Object} {title: ''，errorMsg}
     * @constructor
     */
    OPEN_SYS_DIALOG ({commit, state}, params) {
      if (state.isLogin) {

        console.log(params)
        if(params.type) {
          commit('SET_SYS_ERRORMSG', params || '');
          commit('SET_SYS_ERROR', true);
          commit('SET_DIALOG', true);
        } else {
          Vue.$vuw.prompt.show(
            {
              content: params.errorMsg
            }
          )
        }

      }
    },
    // 关闭系统弹窗
    CLOSE_SYS_DIALOG ({commit}) {
      commit('SET_SYS_ERRORMSG');
      commit('SET_SYS_ERROR', false);
      commit('SET_DIALOG', false);
    },
    OPEN_DIALOG({commit}) {
      commit('SET_DIALOG', true);
    },
    /**
     * 提示升级顾问弹窗
     * @param {*} param0
     */
    UPGRADE({dispatch, state, getters}) {
      if(state.userLevel === 3) { // 如果是被降级
          dispatch('OPEN_SYS_DIALOG', {
            title: '系统提示',
            errorMsg: '您已被降级为直播人',
            type: 'warn',
            // linkHref: state.webRetg,
            linkText: '请联系客服：010-85697400'
          });

          return;
        }

      dispatch('OPEN_SYS_DIALOG', {
        title: '系统提示',
        errorMsg: '您还不是投顾',
        type: 'warn',
        linkHref: getters.partnerLevel === 3 ? `${state.config.cmp}partner/request.html` :state.webRetg,
        linkText: '马上成为投顾'
      });
    },
    // 检测用户是否登录
    CHECKOUT_USER({commit, state, dispatch}) {
      // const userToken = Vue.globalMethods.getCookie('userToken');
      // console.log(userToken)
      // if (userToken) { // 如果检测到登录cookie


        fetch.checkoutUser().then(
          (res) => {
            commit('SET_USER_INFO', res);
            commit('SET_ISLOGIN');
            dispatch('CHECKOUT_BINGPHONE', true);
            dispatch('GET_USER_LEVEL').then(
              () => {
                console.log('用户等级以判断')
                dispatch('GET_NOTICE'); // 获取未读消息
                dispatch('GET_MY_USER_ALL_DATA'); // 获取我的统计整体统计
                dispatch('GET_LIVE_ROOM'); // 获取组直播间
                dispatch('GET_INDEX_DATA'); // 获取…………
                dispatch('GET_TAGS') // 获取标的
                dispatch('GET_CUORSE_ROOM') // 获取视频房间信息
              },
              errMsg => {
                dispatch('OPEN_SYS_DIALOG', {
                  title: '系统提示',
                  errorMsg: errMsg
                });

                setTimeout(() => {
                  location.href = state.oldHost
                },3000)
              }
            )
          },
          errMsg => {
            console.log('没有检测到登录信息');
            commit('UPDATE_SLOR', 'LOGIN')
          })
      // } else { // 没有检测到登录 调取登录框
      //   commit('UPDATE_SLOR', 'LOGIN')
      // }
    },
    // 判断用户等级
    GET_USER_LEVEL({commit, state, dispatch}) {
      console.log('检测用户等级');
      return new Promise((resolve, reject) => {

        dispatch('GET_PARTNER_SHOW').then(
          res => {
            commit('SET_USER_LEVEL', res.Partner.adviserStatus); // 设置用户等级
            // commit('SET_USER_LEVEL', 1); // 设置用户等级为1
            commit('SET_PARTNER_ID', state.userInfo.userid); // 设置老师ID
            resolve();
          },
          errMsg => {
            reject(errMsg)
          }
        )

      })

    },
    GET_PARTNER_SHOW({commit, dispatch, state}) {
      console.log('获取老师信息')
      return new Promise((resolve, reject) => {
        fetch.getPartnerInfo({partnerId: state.partnerId || state.userInfo.userid}).then(
          res => {
            // commit('SET_USER_LEVEL', res.partnerLevel);
            // dispatch('GET_TEACHER_INFO')
            commit('SET_TEACHER_INFO', res)

            console.log('获取老师信息成功')
            resolve(res)
          },
          errMsg => {
            reject(errMsg);
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            });
          }
        )
      })
    },

    CHECKOUT_BINGPHONE({commit, state}, params) {
      // 验证登录
      if(!state.isLogin) {
        commit('UPDATE_SLOR', 'LOGIN');
      }
      if(state.isLogin && !state.isBindPhone) {
        checkPhone.init({isLogin: true}).then(
          () => {
            state.isBindPhone = true;
          }
        )
      }
    },
    // 获取老师信息 用于查看账户信息
    GET_TEACHER_INFO({commit, state, dispatch}) {
      fetch.getDetailInfo({partnerId: state.partnerId}).then(
        res => {
          commit('SET_TEACHER_INFO', res)
          // dispatch('OPEN_SYS_DIALOG', {
          //   title:'系统提示',
          //   errorMsg: '获取老师信息成功'
          // });
        },
        errMsg => {
          dispatch('OPEN_SYS_DIALOG', {
            title: '系统提示',
            errorMsg: errMsg
          });
        }
      )
    },
    /**
     * 获取标的
     * @param {*} param0
     */
    GET_TAGS({commit, dispatch, state}) {
      fetch.getTags().then(res => {
          commit('SET_TAGS', res);
        }, errMsg => {
          dispatch('OPEN_SYS_DIALOG', {
            title: '系统提示',
            errorMsg: errMsg
          });
        }
      )
    },
    /**
     * 退出登录
     * @param {*} param0
     */
    EXIT_LOGIN({state, dispatch}) {

      // state.isLogin = false;
      fetch.exitLogin().then(res => {
        state.isLogin = false;
        window.location.reload()
      }, errMsg => {
        dispatch('OPEN_SYS_DIALOG', {
          title: '系统提示',
          errorMsg: errMsg
        });
      })
    },
    GET_NOTICE({state,dispatch, commit}) { // 获取未读消息

      function getData() {
        fetch.getNotice().then(count => {
          state.notice = count;
          commit('SET_NOTICE', count)
          console.log('获取未读消息SUCCESS');
        }, errMsg => {
          console.log('获取未读消息FAIL');
          dispatch('OPEN_SYS_DIALOG', {
            title: '系统提示',
            errorMsg: errMsg
          });
        })
      }
      getData()
      setInterval(()=> {
        getData()
      }, 10*60*1000)

    },
    GET_NEWS_LISTS({state, dispatch, commit}, params) { // 获取消息列表
      fetch.getNewsLists(params).then(res => {
        state.newsLists = res;
        commit('SET_NOTICE', 0)
        console.log('获取消息列表SUCCESS');
      }, errMsg => {
        console.log('获取消息列表FAILE');
        dispatch('OPEN_SYS_DIALOG', {
          title: '系统提示',
          errorMsg: errMsg
        });
      })
    },
    // 获取黑名单列表
    GET_BLACK_LIST({commit, state, dispatch}, params) {
      fetch.getBlackList(params).then(
        res => {
          commit('SET_BLACK_LIST', res)
        },
        errMsg => {
          console.log(errMsg)
          dispatch('OPEN_SYS_DIALOG', {
            title: '系统提示',
            errorMsg: errMsg
          });
        }
      )
    },
    // 获取用户ID 在其他接口需要使用用户ID时 获取用户ID还在异步过程中
    // 此时调取此接口定时获取ID
    GET_PARTNER_ID({state}) {
      return new Promise((resolve, reject) => {
        let timer;

        function getUser() {
          timer = setTimeout(() => {
            if (state.partnerId) {
              resolve(state.partnerId)
            } else {
              getUser()
            }
          }, 500)
        }

        getUser()

      })
    },
    // 获取工作室导航
    GET_STUDIO_NAV({commit, state, dispatch}) {
      return new Promise((resolve, reject) => {
        fetch.getStudioNav({partnerId: state.partnerId}).then(
          res => {
            console.log('获取工作室导航SUCCSESS')
            resolve(res)
          },
          errMsg => {
            console.log('获取工作室导航FAIL');
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            });
          }
        )
      });
    },
    // 设置工作室导航
    SET_STUDIO_NAV({state, dispatch}, val) {
      return new Promise((resolve, reject) => {
        console.log(val)
        fetch.setStudioNav({
          partnerId: state.partnerId,
          navigation: val
        }).then(
          res => {
            console.log('设置工作室导航Success')
          },
          errMsg => {
            console.log('设置工作室导航fail')
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            });
          }
        )
      })
    },
    // 获取我的用户统计 整体数据
    GET_MY_USER_ALL_DATA({state, commit, dispatch}) {
      fetch.getAllData({partnerId: state.partnerId}).then(
        res => {
          console.log('获取我的用户 整体用户 SUCCESS')
          commit('SET_MY_USER_ALL_DATA', res)
        },
        errMsg => {
          console.log('获取我的用户 整体用户 fail');
          dispatch('OPEN_SYS_DIALOG', {
            title: '系统提示',
            errorMsg: errMsg
          });
        }
      )
    },
    /**
     * 获取我的用户统计 在期用户
     * @param state
     * @param commit
     * @param params
     * @returns {Promise}
     * @constructor
     */
    GET_MY_USER_PERIOD({state, commit, dispatch}, params) {
      return new Promise((resolve, reject) => {
        fetch.getUserPeriod(params).then(
          res => {
            console.log('获取我的用户 在期用户 SUCCESS')
            resolve(res)
          },
          errMsg => {
            console.log('获取我的用户 在期用户 fail');
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            });
          }
        )
      })
    },
    /**
     * 获取到期用户数据
     * @param state
     * @param commit
     * @param params
     * @returns {Promise}
     * @constructor
     */
    GET_MY_USER_EXPIRED({state, commit, dispatch}, params) {
      return new Promise((resolve, reject) => {
        fetch.getExpireUser(params).then(
          res => {
            console.log('获取我的用户 在期用户 SUCCESS')
            resolve(res)
          },
          errMsg => {
            console.log('获取我的用户 在期用户 fail');
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            });
          }
        )
      })
    },
    /**
     * 获取到期用户数据
     * @param params
     * @returns {Promise}
     * @constructor
     */
    GET_MY_USER_Due({dispatch}, params) {
      return new Promise((resolve, reject) => {
        fetch.getWillDueUser(params).then(
          res => {
            console.log('获取我的用户 在期用户 SUCCESS')
            resolve(res)
          },
          errMsg => {
            console.log('获取我的用户 在期用户 fail');
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            });
          }
        )
      })
    },
    /**
     * 获取新增用户
     * @param params
     * @returns {Promise}
     * @constructor
     */
    GET_MY_USER_NEW({dispatch}, params) {
      return new Promise((resolve, reject) => {
        fetch.getNewUser(params).then(
          res => {
            console.log('获取我的用户 在期用户 SUCCESS')
            resolve(res)
          },
          errMsg => {
            console.log('获取我的用户 在期用户 fail');
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            });
          }
        )
      })
    },
    GET_LIVE_ROOM({dispatch, commit, state}) {
      console.log('获取文字')
      dispatch('GET_PARTNER_ID').then(() => {
        fetch.getLiveRooms({partnerId: state.partnerId,displayAll:true}).then(
          res => {
            commit('SET_LIVE_ROOMS', res)
          },
          errMsg => {
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            });
          }
        );
      })

    },
    GET_CUORSE_ROOM({dispatch, commit, state}) {
        fetch.getCourseRooms({partnerId: state.partnerId}).then(
          res => {
            const dData = {
              course: {
              title: '视频课程',
                key: 'course',
                isOpen: true,
                defaultContent: {
                  imgSrc: require('../assets/shipinkecheng.png'),
                  textContext: [
                    '您还没有视频直播课程，请您联系和讯客服',
                    '和讯客服电话：010--85697400'
                  ],
                  buttonContext: ''
                },
                content: []
              },
              caibo: {
                title: '视频财播',
                isOpen: true,
                defaultContent: {
                  imgSrc: require('../assets/shipincaibo.png'),
                  textContext: [
                    '您还没有开通财播课程',
                  ],
                  buttonContext: [{
                    text: '立即开通财播',
                    href: 'http://bo.caidao.hexun.com/video/start.html'
                  }]
                },
                content: []
              },
              courseware: {
                title: '精品理论课件',
                isOpen: false,
                defaultContent: {
                  imgSrc: require('../assets/shimingkejianvip.png'),
                  textContext: [
                    '您还没有精品理论课程，请您联系和讯客服',
                    '和讯客服电话：010--85697400'
                  ],
                  buttonContext: ''
                },
                content: []
              }
            };



            function couresLink(item) {
              const obj = {
                text: '进入课程'
              };
              switch (item.classSource) {
                case 1:
                  // 微吼
                  obj.href = `/ChoseMethods?classId=${item.classId}`,
                  obj.router = true;
//                  `http://lesson.hexun.com/web/record.html?classId=${item.classId}`
                  return obj;
                case 2:
                  // 展视
                  /*20180302 新加修改
                   * 直播课 则进入课程 指向 ChoseMethods
                   * 否则
                   * 还是新开窗口
                   *
                   * 修改前代码:
                   * obj.href = `http://vip.hexun.com/viproom/video/transit.aspx?PriceID=${item.priceId}`;
                   * */
                  /* 20180308 恢复为20180302修改前
                  if(parseFloat(item.classType)==1){//直播
                    obj.href = `/ChoseMethods?classId=${item.classId}&PriceID=${item.priceId}&classSource=2`;
                    obj.router = true;
                  }else{
                    obj.href = `http://vip.hexun.com/viproom/video/transit.aspx?PriceID=${item.priceId}`;
                  }*/
                  //20180315 修改
                  obj.href = `http://${state.isTest?'test':''}lesson.hexun.com/web/record.html?classId=${item.classId}`;
                  return obj;
                case 3:
                  // 课件
                  obj.href = `http://px.hexun.com/Pack/${item.classId}.html`;
                  return obj;
                default:
                  return '#';
              }
            }

            for(let i in res) {
              if(res[i]) {
                if(i === 'caibo') {
                  dData[i].content.push({
                    imgSrc: res[i].imgUrl,
                    textContent: {
                      name: res[i].subject,
                      time: res[i].beginTime,
                      people: res[i].viewTimes
                    },
                    buttomContent: [
                      {
                        text: '发起财播',
                        href: `/ChoseMethods?webinarId=${res[i].webinarId}`,
                        router: true
                      },
                      {
                        text: '财播室设置',
                        href: 'http://bo.caidao.hexun.com/video/edit.html'
                      }
                    ]
                  })
                }
                if(i === 'course') {
                  dData[i].isOpen = true;
                  res[i].forEach((item) => {
                    dData[i].content.push({
                      imgSrc: item.classImageUrl,
                      textContent: {
                        name: item.className,
                        time: item.classDate,
                        people: item.count,
                        link: couresLink(item)
                      },
                      buttomContent: [
                        couresLink(item),
                      ],
                      h5Link: `http://lesson.hexun.com/wap/detail.html?classId=${item.classId}&utm_campaign=weixin_video`,
                    })
                  });
                }

                if(i === 'courseware') {
                  dData[i].isOpen = true;
                  res[i].forEach((item) => {
                    dData[i].content.push({
                      imgSrc: item.classImageUrl,
                      textContent: {
                        name: item.className,
                        time: item.classDate,
                        people: item.count,
                        link: `http://px.hexun.com/Pack/${item.classId}.html`

                      },
                      buttomContent: [
                        {
                          text: '进入课程',
                          href: `http://px.hexun.com/Pack/${item.classId}.html`
                        },
                      ],
                      h5Link: `http://lesson.hexun.com/wap/detail.html?classId=${item.classId}&utm_campaign=weixin_video`,

                    })
                  });
                }

                for(let i in dData) {
                    if(Array.isArray(dData[i].content)) {
                      let content = dData[i].content;
                      if(content.length > 5) {
                        // lists[i].content = lists[i].content.slice(0,5);
                        dData[i].more = true;
                        dData[i].show = false;
                      }
                    }
                  }

              } else {
                dData[i].isOpen = false
              }
              commit('SET_COURSE_LIST', dData)
            }
          },
          errMsg => {
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            });
          }
        )
    },
    GET_INDEX_DATA({dispatch, commit, state}) {
      dispatch('GET_PARTNER_ID').then(() => {
      })
      fetch.getIndexData({partnerId: state.partnerId}).then(
        res => {
          commit('SET_INDEX_OTHER_DATA', res)
        },
        errMsg => {
          dispatch('OPEN_SYS_DIALOG', {
            title: '系统提示',
            errorMsg: errMsg
          });
        }
      )
    },
    /**
     * 获取搜索内容
     * @param {*} param0
     * @param {String} val
     */
    GET_SEARCH({dispatch}, val) {
      return new Promise((resolve, reject) => {

        fetch.getSearch({keyWord: val, limit: 10}).then(
          res => {
            resolve(res)
          },
          errMsg => {
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            });
          }
        )
      })
    },

    GET_BUSINESS({dispatch, state}, params) {
      return new Promise((resolve, reject) => {
        fetch.getBusiness(params).then(
          res => {
            resolve(res)
          },
          errMsg => {
            console.log(typeof errMsg.phone)
            if (errMsg.phone) {
              reject(errMsg.phone)
            } else if(typeof errMsg.phone !== 'undefined'){
              dispatch('OPEN_SYS_DIALOG', {
                title: '系统提示',
                errorMsg: '您还没有设置手机号码'
              });
            } else {
              dispatch('OPEN_SYS_DIALOG', {
                title: '系统提示',
                errorMsg: errMsg
              });
            }
          }
        )
      })
    },
    /**
     * 获取验证码
     */
    GET_PHONE_CODE() {
      return new Promise((resolve, reject) => {
        fetch.getPhoneCode().then(
          res => {
            resolve()
          },
          errMsg => {
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            });
          }
        )
      })
    },

    CLOSE_LIVE_ROOM({dispatch, commit}, params) {
      fetch.closeLiveRoom(params).then(
        res => {
          dispatch('CLOSE_SYS_DIALOG');
          commit('UBDATE_LIVE_ROOM', params)

        },
        errMsg => {
          dispatch('OPEN_SYS_DIALOG', {
            title: '系统提示',
            errorMsg: errMsg
          });
        }
      )
    },

    REM_BLACK_LIST({dispatch, commit}, params) {
      return new Promise((resolve, reject) => {
        fetch.remBlackRoom(params).then(
          res => {
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: '解锁成功'
            });
            resolve();
          },
          errMsg => {
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            })
          }
        )
      })
    },

    FILL_DETAIL_INFO({dispatch}, params) {
      return new Promise((resolve, reject) => {
        fetch.fillDetailInfo(params).then(
          res => {
            resolve()
          },
          errMsg => {
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            })
          }
        )
      })
    },

    GET_WEIHOU_URL({dispatch}, params) {
      //console.log('params=',params)
      return new Promise((resolve, reject) => {
        fetch.getWeiHouUrl(params).then(
          res => {
            resolve(res)
          },
          errMsg => {
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            })
          }
        )
      })
    },

    GET_FINANCE_DATA({dispatch}, params) {
      return new Promise((resolve, reject) => {
        fetch.getFinanceData(params).then(
          res => {
            resolve(res)
          },
          errMsg => {
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            })
          }
        )
      })
    },

    // 开通微信工作室
    OPEN_WECHAT_STUDIO() {
      return fetch.openWechatStudio();
    },

    // 获取量化选股List getStockList
    GET_STOCKLIST({dispatch, state}) {
      return new Promise((resolve, reject) => {
        console.log(state.partnerId)
        fetch.getStockList(state.partnerId).then(
          res => {
            resolve(res)
          },
          errMsg => {
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            })
          }
        )
      })
    },

     // 获取量化选股List getStockList
    GET_STOCKLIST2({dispatch, state}) {
      return new Promise((resolve, reject) => {
        fetch.getStockList2(state.partnerId).then(
          res => {
            resolve(res)
          },
          errMsg => {
            dispatch('OPEN_SYS_DIALOG', {
              title: '系统提示',
              errorMsg: errMsg
            })
          }
        )
      })
    },

  },
});

export default store
