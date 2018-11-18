// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
//引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
//导入名片组件
import usercard from './components/usercard/index.js'
Vue.use(usercard);


//将 axios 改写为 Vue 的原型属性
Vue.prototype.$ajax = axios
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
axios.defaults.baseURL="http://localhost:8081/";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
