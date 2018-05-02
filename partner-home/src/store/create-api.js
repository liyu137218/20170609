/**
 * Created by wuxingjiang on 2017/5/8.
 */
import {config} from '../config'

let api;

api = {
  // 检测用户是否登录 以及用户Id等其他信息
  checkUser: 'http://reg.tool.hexun.com/wapreg/checklogin.aspx?format=json&encode=no',
  // 退出登录
  exitLogin: `http://utility.tool.hexun.com/Quit.aspx?gourl=${config.web}`,
  // 获取未读消息
  notice: `${config.cmp}api/partner/get_unread_notice_count`,
  // 获取消息中心列表
  newsLists: `${config.cmp}api/partner/get_notice_list`,
  // 获取老师直播室房间号
  // teacherRooms: `${config.live}api/user/get_teacher_rooms?`,
  // 获取VIP文字直播室价格
  getVipRoomPrice: `${config.live}api/room/get_room_prices`,
  // 获取直播房间黑名单列表
  blackList: `${config.live}api/room/management/get_room_black_list`,
  // 获取合作者基本信息
  partnerShowInfo: `${config.cmp}api/partner/get_partnershow_info`,
  // 获取合作者信息
  // partnerInfo: `${config.cmp}/api/partner/get_partner_info`,
  // 获取合作者助手信息
  teacherAssistant: `${config.live}api/user/get_teacher_id_by_assistant`,
  // 根据助手获取合作者信息
  getDetailInfo:  `${config.cmp}api/partner/get_detail_info`,
  fillDetailInfo: `${config.cmp}api/partner/fill_detail_info`,
  // 获取工作室导航排序
  getNavigation: `${config.cmp}api/partner/get_navigation`,
  // SET工作室导航排序
  setNavigation: `${config.cmp}api/partner/set_navigation`,
  // 获取整体数据
  allData: `${config.cmp}api/partner/business/get_user_whole_data`,
  // 在期用户
  userPeriod: `${config.cmp}api/partner/business/get_user_in_period_data`,
  // 新增用户
  newUser: `${config.cmp}api/partner/business/get_user_new_buy_data`,
  // 即将到期
  willDue: `${config.cmp}api/partner/business/get_user_renewal`,
  // 到期用户
  userExpired: `${config.cmp}api/partner/business/get_user_expire`,
  // 直播室列表
  liveRooms: `${config.live}api/user/get_teacher_rooms`,
  // 课程信息列表
  courseRooms: `${config.cmp}api/partner/get_cultivate`,
  // 获取老师管理后台首页，统计接口
  indexData: `${config.cmp}api/partner/get_index_data`,
  // 获取标的
  getTages: `${config.cmp}api/partner/get_tags`,
  // 查询input
  getSearch:  `${config.live}api/search/typeahead`,
  // 获取我的账务
  getBusiness: `${config.cmp}api/partner/business/finance_data`,
  // 获取短信验证码
  getPhoneCode: `${config.cmp}api/partner/business/sendcode`,
  // 老师关闭、打开直播室
  closeLiveRoom: `${config.live}api/room/management/close_room`,
  // 解锁黑名单
  remBlackRoom: `${config.live}api/room/management/del_room_black`,
  // 获取微吼地址
  getWeiHouUrl: `${config.apiopencd}rest/webinar/openAssistant`,
  getCourseWeiHouUrl: `${config.apilesson}vhall/assistant/`,
  // 获取老师权责产品数据
  getFinanceData: `${config.cmp}api/partner/business/finance_product`,
  // 开通微信工作室
  openWechatStudio: `${config.cmp}api/partner/open_wechat_platform`,
  // 获取量化选股list
  getStockList: `${config.lhjx}/lhjx/choice/getStockListUrl/`,
  getStockList2: `${config.lhjx}/${config.env!=3?'lhjx_V2.20':'lhjx2.2'}/teacher/getStockListUrl/`,

  // 获取文章列表
  getArticleList: `${config.caidao}/partner/article`,
  // 栏目管理栏目列表
  getColumList: `${config.caidao}/partner/column`,
  // 栏目管理栏目删除
  delColum: `${config.caidao}/partner/column/delete/`,
  // 创建栏目
  createColum: `${config.caidao}/partner/column/save`,
  // 查看栏目信息
  getColumInfo: `${config.caidao}/partner/column/get/`,
  // 创建文章
  createArticle: `${config.caidao}/partner/article/save`,
  // 删除文章
  delArticle: `${config.caidao}/partner/article/delete/`,
  // 文章管理获取栏目列表
  getColumListArt: `${config.caidao}/partner/article/listcolumn`,
  // 获取价格策略
  getPriceStrate: `${config.caidao}/partner/column/pricestrate`,
  // 获取文章评论全局设置
  getCommentSetting: `${config.caidao}/commentSetting/get`,
  // 设置评论
  setComment: `${config.caidao}/commentSetting/set/`,
  // 获取昨日统计粉丝数
  getFansYesterday: `${config.fans}/attention/yesterday`,
  // 获取某个时间段内指定类型的老师粉丝统计信息 echart
  getFansStatistics: `${config.fans}/attention/statistics`,
  // 获取某个时间段内老师粉丝统计信息 table
  getFansReport: `${config.fans}/attention/report`,
  // 获取委托账户的老师产品列表接口
  getAccountList: `${config.tg}/entrust/GetAccountListByUserId.ashx`,

};

export default api
