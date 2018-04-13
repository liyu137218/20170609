/**
 * Created by wuxingjiang on 2017/4/24.
 */

import IndexStatistics from '@/components/IndexStatistics'
import IndexDirectRoomEntrance from '@/components/IndexDirectRoomEntrance'
import IndexShare from '@/components/IndexShare'
import ListTitle from '@/components/ListTitle'


// lazy load
const NotFound = resolve => {
  require.ensure(['@/components/NotFound'], ()=> {
    resolve(require('@/components/NotFound')),
    'NotFound'
  })
}

// import NotFound from '@/components/NotFound'

// const NotFoundFoo = r => require.ensure([], () => r(require('@/components/NotFound')), 'NotFound')

const StudioList = resolve => {
  require.ensure(['@/components/StudioList'], ()=> {
    resolve(require('@/components/StudioList')),
    'StudioList'
  })
}

// import StudioList from '@/components/StudioList'

// const StudioList = r => require.ensure([], () => r(require('@/components/StudioList')), 'StudioList')

const Labels = resolve => {
  require.ensure(['@/components/Labels'], ()=> {
    resolve(require('@/components/Labels')),
    'Labels'
  })
}

// import Labels from '@/components/Labels'

// const StudioList = r => require.ensure([], () => r(require('@/components/StudioList')), 'StudioList')

const MyAccount = resolve => {
  require.ensure(['@/components/MyAccount'], ()=> {
    resolve(require('@/components/MyAccount')),
    'MyAccount'
  })
}



const MyFans = resolve => {
  require.ensure(['@/components/MyFans'], ()=> {
    resolve(require('@/components/MyFans')),
      'MyFans'
  })
}

// import MyAccount from '@/components/MyAccount'


const BaseInfo = resolve => {
  require.ensure(['@/components/BaseInfo'], ()=> {
    resolve(require('@/components/BaseInfo')),
    'BaseInfo'
  })
}

// import BaseInfo from '@/components/BaseInfo'

const NewsList = resolve => {
  require.ensure(['@/components/NewsList'], ()=> {
    resolve(require('@/components/NewsList')),
    'NewsList'
  })
}

// import NewsList from '@/components/NewsList'


const BlackList = resolve => {
  require.ensure(['@/components/BlackList'], ()=> {
    resolve(require('@/components/BlackList')),
    'BlackList'
  })
}

// import BlackList from '@/components/BlackList'


const CustomerInfo = resolve => {
  require.ensure(['@/components/CustomerInfo'], ()=> {
    resolve(require('@/components/CustomerInfo')),
    'CustomerInfo'
  })
}

// import CustomerInfo from '@/components/CustomerInfo'

const IndicatorCloud = resolve => {
  require.ensure(['@/components/IndicatorCloud'], ()=> {
    resolve(require('@/components/IndicatorCloud')),
    'IndicatorCloud'
  })
}

// import IndicatorCloud from '@/components/IndicatorCloud'

const WeChatStudio = resolve => {
  require.ensure(['@/components/WeChatStudio'], ()=> {
    resolve(require('@/components/WeChatStudio'))
  })
}


const MoreStock = resolve => {
   require.ensure(['@/components/MoreStock'], ()=> {
    resolve(require('@/components/MoreStock'))
  })
}

const MoreStockmenu = resolve => {
   require.ensure(['@/components/MoreStockmenu'], ()=> {
    resolve(require('@/components/MoreStockmenu'))
  })
}

const ArticleManagement = resolve => {
  require.ensure(['@/components/ArticleManagement'], ()=> {
    resolve(require('@/components/ArticleManagement'))
  })
}

const Weituo = resolve => {
  require.ensure(['@/components/Weituo'], ()=> {
    resolve(require('@/components/Weituo'))
  })
}
// showEnv 展示环境 1本地开发环境 2本地及测试 3本地、测试、生产
const menuLists = [
  {
    title: '首页',
    name: 'Index',
    components: [IndexStatistics, IndexShare, IndexDirectRoomEntrance],
    showEnv: 3,
  },
  {
    title: '微信工作室配置(Beta)',
    name: 'WXGZSPZ',
    components: [ListTitle, WeChatStudio],
    showEnv: 3,
  },
  {
    title: '全部产品',
    name: 'AllProduct',
    icon: require('../assets/icon_all.png'),
    showEnv: 3,
    children: [
      {
        title: '直播&培训',
        name: 'ZbAndPx',
        components: [ListTitle, Labels],
        showEnv: 3,
      },
      {
        title: '指标云',
        name: 'Zhibiaoyun',
        components: [ListTitle, IndicatorCloud, NotFound],
        showEnv: 3,
      },
      // {
      //   title: '量化管理(<font style="color:#ee5050;">Beta</font>)',
      //   name: 'Stock',
      //   components: [MoreStock],
      //   showEnv: 3,
      // },
      {
        title: '量化管理',
        name: 'Stockmemu',
        components: [MoreStockmenu],
        showEnv: 3,
      },
      {
        title: '文章管理',
        name: 'ArticleManagement',
        components: [ListTitle, ArticleManagement],
        showEnv: 3,
      },
      {
        title: '问答管理',
        name: 'Wendaguanli',
        components:[ListTitle, NotFound],
        showEnv: 3,
      },
      // {
      //   title: '博文',
      //   name: 'Bowen',
      //   components:[ListTitle, NotFound]
      // },
      // {
      //   title: '账户',
      //   name: 'Zhanghu',
      //   components:[ListTitle, NotFound]
      // },
      {
        title: '委托账户',
        name: 'Weituo',
        components:[ ListTitle, NotFound],
        showEnv: 3,
      },
      {
        title: '财圈',
        name: 'Caiquan',
        components:[ListTitle, NotFound],
        showEnv: 3,
      }
    ]
  },
  {
    title: '管理',
    name: 'Management',
    icon: require('../assets/icon_guanli.png'),
    children: [
      {
        title: '工作室管理',
        name: 'Studio',
        components:[ListTitle, StudioList],
        showEnv: 3,
      },
      {
        title: '黑名单管理',
        name: 'BlackList',
        components:[ListTitle, BlackList],
        showEnv: 3,
      },
    ]
  },
  {
    title: '统计',
    name: 'TG',
    icon: require('../assets/icon_tongji.png'),
    children: [
      {
        title: '我的用户',
        name: 'Myuser',
        components:[ListTitle, CustomerInfo],
        showEnv: 3,
      },
      {
        title: '我的账务',
        name: 'Myzhangwu',
        components:[ListTitle, MyAccount],
        showEnv: 3,
      },
      {
        title: '我的粉丝',
        name: 'MyFans',
        components:[ListTitle, MyFans],
        showEnv: 3,
      }
    ]
  },
  {
    title: '账户信息',
    name: 'ZhInfo',
    components: [ListTitle, BaseInfo],
    showEnv: 3,
  },
  {
    title: '消息中心',
    name: 'NewsCenter',
    components: [ListTitle, NewsList],
    showEnv: 3,
  },
];

function createRouterMap() {
  const data = menuLists;
  let routerMap = [];
  let menuMap = [];

  // 创建路由用的对象
  function createRouter(o) {
    function addProto(o, parentName = '') {
      let routerObj = Object.preventExtensions({ // 密封对象 防止属性扩展
        name: '',
        title: '',
        path: '', // 路径
        components: '' // 子组件
      });

      let children = o.children;
      for (let i in routerObj) {
        if(typeof o[i] !== "undefined") {
          routerObj[i] = o[i];
        }
      }


      if(typeof children !== 'undefined' && children.length !==0) {
        for(let i in children) {
          addProto(children[i], o.name);
        }
      } else {
        routerObj.path = `${parentName?`/${parentName}`:''}/${o.name}`;
        routerObj.name = `${parentName||''}${o.name}`;
        routerObj.title = o.title;
        routerMap.push(routerObj);
        return false;
      }

    }
    addProto(o);
  }
  // 创建菜单用的对象
  function createMenu(o) {
    const menuObj = Object.preventExtensions({
      title: '', // 面板展示的中文信息
      solo: '', // 是否没有子菜单
      path: '', // router-link 路径
      icon: '', // 图标
      children: [], // 子菜单
      name: '',
      showEnv: 1,
    });

    let children = o.children;

    function addProto(o) {
      for (let i in menuObj) {
        // 添加相同的属性
        if(typeof o[i] !== "undefined" && i !== 'children') {
          menuObj[i] = o[i];
        }
      }
      if(typeof children !== "undefined" && children.length !== 0) {
        menuObj.solo = false;
        for(let j in children) {
          menuObj.children.push(createMenu(children[j]));
        }

      } else {
        menuObj.solo = true;
      }

      menuObj.path = `${o.name}`;
    }

    addProto(o);
    return menuObj;
  }
  for(let i in data) {
    if(data.hasOwnProperty(i)) {
      createRouter(data[i]);

      menuMap.push(createMenu(data[i]));
    }
  }


  return {
    routerMap,
    menuMap
  };
}

const {routerMap, menuMap} = createRouterMap();
export {routerMap, menuMap}