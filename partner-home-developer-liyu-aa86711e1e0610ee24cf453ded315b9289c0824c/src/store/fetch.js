import Vue from 'vue'
import api from './create-api'

function getErrorMsg(status) {
  switch (status) {
    case 500:
      return '当服务器无法识别请求的方法，并且无法支持其对任何资源的请求';
    default :
      return '发生未知错误，请稍后重试！'
  }
}


Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

Promise.prototype.done = function (onFulfilled, onRejected) {
  this.then(onFulfilled, onRejected)
    .catch(function (reason) {
      // 抛出一个全局错误
      setTimeout(() => { throw reason }, 0);
    });
};

const fetch = {
  checkoutUser() {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.checkUser).then(res => {
        // success
        const body = res.body;
        if(body.islogin === 'True') {
          resolve(body)
        } else {
          reject()
        }
        resolve(body)
      }, errMsg => {
        // fail
        reject(getErrorMsg(errMsg.status))
      })
    })
  },
  // 获取合作者信息
  getPartnerInfo(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.partnerShowInfo, {params}).then(res => {
        // success
        if(res.body.resultKey === 'ok') {
          resolve(res.body.data.data)
        } else {
          reject(res.body.errorMessage)
        }

      }, errMsg => {
        // fail
        reject(getErrorMsg(errMsg.status))
      })
    })
  },
  // 获取老师助手信息
  getTeacherAssistant(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.teacherAssistant, {params}).then(res => {
        // success
        if(res.body.resultKey === 'ok') {
          resolve(res.body.data)
        } else {
          reject(res.body.errorMessage)
        }

      }, errMsg => {
        // fail
        reject(getErrorMsg(errMsg.status))
      })
    })
  },
  // 根据助手返回的ID获取老师信息
  getDetailInfo(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getDetailInfo, {params}).then(res => {
          if(res.body.resultKey === 'ok') {
            resolve(res.body.data)
          } else {
            reject(res.body.errorMessage)
          }
      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      }
      )
    })
  },
  /**
   * 获取老师标的
   */
   getTags() {
    return new Promise((resolve, reject) => {
      
      Vue.http.jsonp(api.getTages).then(res => {
          if(res.body.resultKey === 'ok') {
            resolve(res.body.data)
          } else {
            reject(res.body.errorMessage)
          }
      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      }
      )
    })
  },
  exitLogin() {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.exitLogin).then(res => {
        resolve()
      }, errMsg => {
        resolve()
      }).finally(() => {
        resolve()
        // reject(errMsg(errMsg.status))
      });
    })
  },
  getNotice() {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.notice).then(res => {
        if(res.body.resultKey === 'ok') {
          resolve(res.body.data.count)
        } else {
          reject(res.body.errorMessage)
        }
      })
    }, errMsg => {
      reject(getErrorMsg(errMsg.status))
    })
  },
  // 获取消息列表
  getNewsLists(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.newsLists,{params}).then(res => {
        if(res.body.resultKey === 'ok') {
          resolve(res.body.data)
        } else {
          reject(res.body.errorMessage)
        }

      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      })
    })

  },
  // 获取老师直播室
  getTeacherRooms(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.teacherRooms,{params}).then(res => {
        if(res.body.resultKey === 'ok') {
          resolve(res.body.data)
        }

      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      })
    })
  },
  // 获取黑名单列表
  getBlackList(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.blackList, {params}).then(res => {
        if(res.body.resultKey === 'ok') {
          resolve(res.body.data)
        } else {
          reject(res.body.errorMessage)
        }
      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      })
    })
  },
  // 获取工作室导航排序
  getStudioNav(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getNavigation, {params}).then(res => {
        if(res.body.resultKey === 'ok') {
          resolve(res.body.data.result)
        } else {
          reject(res.body.errorMessage)
        }
      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      })
    })
  },
  // 设置工作室导航
  setStudioNav(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.setNavigation, {params}).then(res => {
        if(res.body.resultKey === 'ok') {
          resolve(res.body)
        } else {
          reject(res.body.errorMessage)
        }
      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      })
    })
  },
  // 获取我的用户 整体数据统计
  getAllData(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.allData, {params}).then(res => {
        if(res.body.resultKey === 'ok') {
          resolve(res.body.data.result.result)
        } else {
          reject(res.body.errorMessage)
        }
      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      })
    })
  },
  // 获取我的用户 在期用户
  getUserPeriod(params) {
    return new Promise((relsove, reject) => {
      Vue.http.jsonp(api.userPeriod, {params}).then(res => {
        if(res.body.resultKey === 'ok') {
          relsove(res.body.data.result.result.list)
        } else {
          reject(res.body.errorMessage)
        }
      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      })
    })
  },
  /**
   * 获取到期用户
   * @param params {}
   * @returns {Promise}
   */
  getExpireUser(params) {
    return new Promise((relsove, reject) => {
      Vue.http.jsonp(api.userExpired, {params}).then(res => {
        if(res.body.resultKey === 'ok') {
          relsove(res.body.data.result.result.list)
        } else {
          reject(res.body.errorMessage)
        }
      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      })
    })
  },
  /**
   * 获取续费用户
   * @param params {}
   * @returns {Promise}
   */
  getWillDueUser(params) {
    return new Promise((relsove, reject) => {
      Vue.http.jsonp(api.willDue, {params}).then(res => {
        if(res.body.resultKey === 'ok') {
          relsove(res.body.data.result.result.list)
        } else {
          reject(res.body.errorMessage)
        }
      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      })
    })
  },
  /**
   * 获取续费用户
   * @param params {}
   * @returns {Promise}
   */
  getNewUser(params) {
    return new Promise((relsove, reject) => {
      Vue.http.jsonp(api.newUser, {params}).then(res => {
        if(res.body.resultKey === 'ok') {
          relsove(res.body.data.result.result.list)
        } else {
          reject(res.body.errorMessage)
        }
      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      })
    })
  },
  /**
   * 获取直播室列表
   * @returns {Promise}
   */
  getLiveRooms(params) {
    
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.liveRooms, {params}).then(res => {
        if(res.body.resultKey === 'ok') {
          resolve(res.body.data.list);
        } else {
          reject(res.body.errorMessage)
        }
      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      })
    })
  },
 //
  getCourseRooms(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.courseRooms, {params}).then(res => {
        if(res.body.resultKey === 'ok') {
          resolve(res.body.data.result);
        } else {
          reject(res.body.errorMessage)
        }
      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      })
    })
  },

// 获取老师管理后台首页，统计接口
  getIndexData(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.indexData, {params}).then(res => {
        if(res.body.resultKey === 'ok') {
          resolve(res.body.data.result);
        } else {
          reject(res.body.errorMessage)
        }
      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      })
    })
  },
  /**
   * inoput搜索
   * @param {*} params 
   */
  getSearch(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getSearch, {params}).then(res => {
        if(res.body.resultKey === 'ok') {
          resolve(res.body.data.searchResult);
        } else{
          reject(res.body.errorMessage)
        }
      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      })
    })
  },

  /**
   * 获取我的账务
   * @param {*} params 
   */
  getBusiness(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getBusiness, {params}).then(res => {
        
        if(res.body.resultKey === 'ok') {
          resolve(res.body.data.expireData.result.list)
        } else if(res.body.resultKey === 'code_is_error') {
          reject({
            phone: res.body.data.phone
          })
        } else {
          reject (res.body.errorMessage)
        }
      }, errMsg => {
        reject(getErrorMsg(errMsg.status))
      })
    })
  },
  
  /**
   * 获取验证码
   */
  getPhoneCode() {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getPhoneCode).then(
        res => {
          if(res.body.resultKey === 'ok') {
            resolve();
          }else {
            reject (res.body.errorMessage)
          }
        },
        errMsg => {
          reject(getErrorMsg(errMsg.status))
        }
      )
    })
  },
  closeLiveRoom(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.closeLiveRoom,{params}).then(
        res => {
          if(res.body.resultKey === 'ok') {
            resolve()
          }else {
            reject (res.body.errorMessage)
          }

        },
        errMsg => {
          reject(getErrorMsg(errMsg.status))
        }
      )
    })
  },
  remBlackRoom(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.remBlackRoom,{params}).then(
        res => {
          if(res.body.resultKey === 'ok') {
            resolve()
          }else {
            reject (res.body.errorMessage)
          }

        },
        errMsg => {
          reject(getErrorMsg(errMsg.status))
        }
      )
    })
  },

  // 上传账户信息
  fillDetailInfo(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.fillDetailInfo,{params}).then(
        res => {
          if(res.body.resultKey === 'ok') {
            resolve()
          }else {
            reject (res.body.errorMessage)
          }
        },
        errMsg => {
          reject(getErrorMsg(errMsg.status))
        }
      )
    })
  },
  // 获取微吼接口地址
  getWeiHouUrl(params) {
    return new Promise((resolve, reject) => {
      if(params.type === 'course') {
        console.log(params)
        Vue.http.jsonp(api.getCourseWeiHouUrl + params.id).then(
          res => {
            if(res.body.code == 0) {
              resolve(res.body.data);
            } else {
              reject(res.body.msg)
            }
          },
          errMsg => {
            reject(getErrorMsg(errMsg.status))
          }
        )
      } else if(params.type === 'caibo') {
        Vue.http.jsonp(api.getWeiHouUrl, {params}).then(
          res => {
            if(res.body.message === 'OK') {
              resolve(res.body.result.data)
            } else {
              reject(res.body.message)
            }
          },
          errMsg => {
            reject(getErrorMsg(errMsg.status))
          }
        )
      }
    })
  },
  // 获取老师权责产品数据
  getFinanceData(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getFinanceData, {params}).then(
        res => {
          if(res.body.resultKey === 'ok') {
            resolve(res.body.data.productData.result.list)
          } else {
            reject (res.body.errorMessage)
          }

        },
        errMsg => {
          reject(getErrorMsg(errMsg.status))
        }
      )
    })
  },
  // 开通微信工作室
  openWechatStudio() {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.openWechatStudio).then(
        res => {
          if(res.body.resultKey === 'ok') {
            resolve()
          } else {
            reject (res.body.errorMessage)
          }
        },
        errMsg => {
          reject(getErrorMsg(errMsg.status))
        }
      )
    })
  },

  // 获取量化选股List
  getStockList(pid) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getStockList + pid).then(
        res => {
          if(res.body.result == '1') {
            resolve(res.body.data)
          }else {
            reject (res.body.errorMessage)
          }
        },
        errMsg => {
          reject(getErrorMsg(errMsg.status))
        }
      )
    }) 
  },

  // 获取量化选股List
  getStockList2(pid) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getStockList2 + pid).then(
        res => {
          if(res.body.result == '1') {
            resolve(res.body.data)
          }else {
            reject (res.body.errorMessage)
          }
        },
        errMsg => {
          reject(getErrorMsg(errMsg.status))
        }
      )
    }) 
  },

  // 获取文章列表
  getArticleList(params) {
    let url = `${api.getArticleList}/${params.pageNum}/${params.pageSize}`
    if(params.type != 'all') {
     url = url + '?columnId=' + params.type
    }
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(url,{}).then(
        res => {
          const data = res.body
          if(data.code == 0) {
            resolve(data.data)
          } else if (data.code == 10005) {
            resolve([])
          } else{
            Vue.$vuw.prompt.show(
              {
                content: res.body.msg
              }
            )
          }
        },
        errMsg => {
          Vue.$vuw.prompt.show(
            {
              content: getErrorMsg(errMsg.status)
            }
          )
        }
      )
    })
  },

  // 获取栏目列表
  getCloumList() {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getColumList,{}).then(
        res => {
          const data = res.body
          if(data.code == 0) {
            resolve(data.data)
          }else if (data.code == 10005) {
            resolve([])
          } else if(data.code != 10010 && data.code != 10009){
            Vue.$vuw.prompt.show(
              {
                content: res.body.msg
              }
            )
          }
        },
        errMsg => {
          reject(getErrorMsg(errMsg.status))
        }
      )
    })
  },

  // 创建栏目
  createCloum(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.createColum, {params}).then(
        res => {
          if(res.body.code === 0) {
            resolve()
          } else {
            Vue.$vuw.prompt.show(
              {
                content: res.body.msg
              }
            )
          }
        },
        errMsg => {
          Vue.$vuw.prompt.show(
            {
              content: getErrorMsg(errMsg.status)
            }
          )
        }
      )
    })
  },

  // 删除栏目
  delColum (params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.delColum + params, {}).then(
        res => {
          if(res.body.code === 0) {
            Vue.$vuw.prompt.show(
              {
                content: '删除成功'
              }
            )
            resolve()
          } else {
            Vue.$vuw.prompt.show(
              {
                content: res.body.msg
              }
            )
          }
        },
        errMsg => {
          Vue.$vuw.prompt.show(
            {
              content: getErrorMsg(errMsg.status)
            }
          )
        }
      )
    })
  },

  // 创建文章
  createArticle(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.createArticle, {params}).then(
        res => {
          console.log(res)
        },
        errMsg => {
          Vue.$vuw.prompt.show(
            {
              content: getErrorMsg(errMsg.status)
            }
          )
        }
      )
    })
  },

  // 删除文章
  delArticle (params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.delArticle + params, {}).then(
        res => {
          if(res.body.code === 0) {
            Vue.$vuw.prompt.show(
              {
                content: '删除成功'
              }
            )
            resolve()
          } else {
            Vue.$vuw.prompt.show(
              {
                content: res.body.msg
              }
            )
          }
        },
        errMsg => {
          Vue.$vuw.prompt.show(
            {
              content: getErrorMsg(errMsg.status)
            }
          )
        }
      )
    })
  },

  // 文章管理栏目列表
  getColumListArt() {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getColumListArt,{}).then(
        res => {
          const data = res.body
          if(data.code == 0) {
            resolve(data.data)
          } else if(res.body.code !== 10005){
            Vue.$vuw.prompt.show(
              {
                content: res.body.msg
              }
            )
          }
        },
        errMsg => {
          reject(getErrorMsg(errMsg.status))
        }
      )
    })
  },

  // 获取栏目详情
  getColumInfo(id) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getColumInfo + id, {}).then(
        res => {
          if(res.body.code === 0) {
            resolve(res.body.data)
          } else if(res.body.code !== 10005){
            Vue.$vuw.prompt.show(
              {
                content: res.body.msg
              }
            )
          }
        },
        errMsg => {
          Vue.$vuw.prompt.show(
            {
              content: getErrorMsg(errMsg.status)
            }
          )
        }
      )
    })
  },

  // 获取价格策略
  getPriceStrate() {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getPriceStrate, {}).then(
        res => {
          if(res.body.code === 0) {
            resolve(res.body.data)
          } else {
            Vue.$vuw.prompt.show(
              {
                content: res.body.msg
              }
            )
          }
        },
        errMsg => {
          Vue.$vuw.prompt.show(
            {
              content: getErrorMsg(errMsg.status)
            }
          )
        }
      )
    })
  },

  // 获取全局评论
  getCommentSetting() {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getCommentSetting, {}).then(
        res => {
          if(res.body.code === 0) {
            resolve(res.body.data)
          } else {
            Vue.$vuw.prompt.show(
              {
                content: res.body.msg
              }
            )
          }
        },
        errMsg => {
          Vue.$vuw.prompt.show(
            {
              content: getErrorMsg(errMsg.status)
            }
          )
        }
      )
    })
  },

  // 设置全局评论
  setComment(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.setComment + params, {}).then(
        res => {
          if(res.body.code === 0) {
            resolve()
          } else {
            Vue.$vuw.prompt.show(
              {
                content: res.body.msg
              }
            )
          }
        },
        errMsg => {
          Vue.$vuw.prompt.show(
            {
              content: getErrorMsg(errMsg.status)
            }
          )
        }
      )
    })
  },

  // 获取昨日粉丝
  getFansYesterday() {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getFansYesterday).then(
        res => {
          if(res.body.code == 200) {
            resolve(res.body.result)
          }
        },
        errMsg => {
          Vue.$vuw.prompt.show(
            {
              content: getErrorMsg(errMsg.status)
            }
          )
        }
      )
    })
  },
  getTableFans (params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getFansReport, {params}).then(
        res => {
          if(res.body.code == 200) {
            resolve(res.body.result)
          }
        },
        errMsg => {
          Vue.$vuw.prompt.show(
            {
              content: getErrorMsg(errMsg.status)
            }
          )
        }
      )
    })
  },

  getFansStatistics(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getFansStatistics, {params}).then(
        res => {
          if(res.body.code == 200) {
            resolve(res.body.result)
          }
        },
        errMsg => {
          Vue.$vuw.prompt.show(
            {
              content: getErrorMsg(errMsg.status)
            }
          )
        }
      )
    })
  },

  getAccountList(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getAccountList, {params}).then(
        res => {
          console.log(res)
          if(res.body.result == 100) {
            resolve(res.body.entrustlist)
          }
        },
        errMsg => {
          Vue.$vuw.prompt.show(
            {
              content: getErrorMsg(errMsg.status)
            }
          )
        }
      )
    })
  },

  getVipRoomPrice(params) {
    return new Promise((resolve, reject) => {
      Vue.http.jsonp(api.getVipRoomPrice, {params}).then(
        res => {
          if(res.body.resultKey == 'ok') {
            resolve(res.body.data.roomInfo.productInfo.pricOrderInfo)
          }
        },
        errMsg => {
          Vue.$vuw.prompt.show(
            {
              content: getErrorMsg(errMsg.status)
            }
          )
        }
      )
    })
  }

};

export {fetch}