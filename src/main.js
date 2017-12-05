import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import music_api from './apis/music/'
import VueRouter from 'vue-router'
import routes from './router.config.js'
import Mint from 'mint-ui'
import Loading from './components/loading/'
import Snow from './components/canvas/'
import store from './store/'
require('mint_ui_css');
require('./assets/css/bootstrap.css');
require('./assets/css/iconfont.css');
require('./assets/css/animate.css');
require('./assets/css/index.css');

Vue.use(Mint);
Vue.use(VueRouter);
Vue.use(Loading);  //全局使用loading组件
Vue.use(Snow);
//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
axios.interceptors.request.use(function (config) {  //配置发送请求的信息
  store.dispatch('showLoading')  
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
  store.dispatch('hideLoading')
  return response;
}, function (error) {

  return Promise.reject(error);
});
Vue.prototype.$http = axios;
Vue.prototype.music_api=music_api;  //获取音乐的api函数
const router=new VueRouter({
  //mode:'history',  //切换路径模式，编程history模式
	//滚动条滚动行为，不加这个默认就会记忆原来滚动条的位置
  scrollBehavior:() => {{y:0}},
  routes
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});