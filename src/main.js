import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// VueAxios 与 axios 的位置不能交换，否则报错
import axios from 'axios'
import VueAxios from 'vue-axios';
import * as echarts from 'echarts'

import GoEasy from 'goeasy';
const goEasy = GoEasy.getInstance({
  host:'hangzhou.goeasy.io', //新加坡host：singapore.goeasy.io
  appkey: "BC-5ea09c0a18b741eebaae0c7386b18fa7", //替换为您的应用appkey
  modules: ['pubsub']
});
// 建议在main.js里初始化全局的GoEasy对象
Vue.prototype.goEasy = goEasy;


Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(VueAxios,axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
