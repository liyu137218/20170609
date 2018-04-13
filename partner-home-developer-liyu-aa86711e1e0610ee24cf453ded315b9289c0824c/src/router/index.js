import Vue from 'vue'
import Router from 'vue-router'
// import ServerDoc from '@/views/ServerDoc'
import Index from '@/views/Index'
// import ChoseMethods from '@/views/ChoseMethods'
// import WeChatCotch from '@/views/WeChatCotch'

// lazy load

const ServerDoc = resolve => {
  require.ensure(['@/views/ServerDoc'], ()=> {
    resolve(require('@/views/ServerDoc'))
  })
}


const ChoseMethods = resolve => {
  require.ensure(['@/views/ChoseMethods'], ()=> {
    resolve(require('@/views/ChoseMethods'))
  })
}


const WeChatCotch = resolve => {
  require.ensure(['@/views/WeChatCotch'], ()=> {
    resolve(require('@/views/WeChatCotch'))
  })
}

const CreateCloum = resolve => {
  require.ensure(['@/views/CreateCloum'], ()=> {
    resolve(require('@/views/CreateCloum'))
  })
}

// WriteBlog
const WriteBlog = resolve => {
  require.ensure(['@/views/WriteBlog'], ()=> {
    resolve(require('@/views/WriteBlog'))
  })
}

Vue.use(Router);

// const createListView = (name, children) => () =>
//   System.import('../views/CreateListView').then(m => m.createListView(name, children));
// const ItemView = () => System.import('../views/ItemView.vue');
// const UserView = () => System.import('../views/UserView.vue');

import {createListView} from '@/views/CreateListView'

import {routerMap} from './routerMap'

function createRoutes() {
  const routes = [];
  for (let i in routerMap) {
    let rou = {};
    rou.path = `/Index${routerMap[i].path}`;
    rou.name = routerMap[i].name;
    rou.component = createListView(routerMap[i].name, routerMap[i].components);

    routes.push(rou)
  }

  return routes;
}

const routes = [];

routes.push(
  {
    path: '/',
    redirect: '/Index/Index',
    component: Index,
    children: createRoutes()
  },
  {
    path: '/ServerDoc',
    component: ServerDoc
  },
  {
    path: '/ChoseMethods',
    component: ChoseMethods
  },
  {
    path: '',
    redirect: '/Index/Index',
  },
  {
    path: '/WeChatCotch',
    component: WeChatCotch
  },
  {
    path: '/CreateCloum',
    component: CreateCloum
  },
  {
    path: '/WriteBlog',
    component: WriteBlog
  }
);

const router = new Router({
  // mode: 'history',
  base: '/partner/home/',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes,
});

// router.beforeEach((to, from, next) => {
//   console.log(to);
//   dplus_Click("页面浏览", { "页面名称": "xxx", "产品分类": "合作者后台", "所属平台": "基础平台", "合作者ID": "xxx", "合作者名称": "xxx" })
//   next();
// })

export default router;

