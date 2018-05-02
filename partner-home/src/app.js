require('core-js/fn/object/assign');
require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
require('core-js/es6/array');
require('core-js/fn/array/from')

import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import VueResource from 'vue-resource';
import { sync } from 'vuex-router-sync';
import * as filters from './filters';
import * as pagination from "vuejs-uib-pagination";
import VTooltip from 'v-tooltip';
import VueClipboard from 'vue-clipboard2'
import MyPlugin from "./plugins/tool";
import ConfirmPlugin from './plugins/confirm'
import PromptPlugin from './plugins/prompt'

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 注册全局组件
import TableNav from '@/components/TableNav'
import Echart from '@/components/Echart'
import myDatepicker from '@/components/datePicker'
import DateSelectGroup from '@/components/DateSelectGroup'
import CycleLabel from '@/components/CycleLabel'

Vue.component('table-nav', TableNav); // 表格导航 用在我的用户 和我的账户
Vue.component('e-chart', Echart); // echart组件 用户绘制图表
Vue.component('date-picker', myDatepicker); // 时间选择组件
Vue.component('date-select-group', DateSelectGroup); // 时间选择组件
Vue.component('cycle-label', CycleLabel); // 时间周期选择组件

Vue.use(PromptPlugin); // prompt
Vue.use(ConfirmPlugin); // confirm
Vue.use(VueClipboard); // 复制
Vue.use(VTooltip); // 提示
Vue.use(pagination); // 分页插件
Vue.use(VueResource); // http
Vue.use(MyPlugin); // DIY
// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
const app = new Vue({
  router,
  store,
  render: h => h(App)
})

// expose the app, the router and the store.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.
export { app, router, store }
