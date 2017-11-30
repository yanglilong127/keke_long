import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import routerConfig from './router.config.js'
import Loading from './components/loading/'
import store from './store/'


Vue.use(VueRouter);
Vue.use(Loading);
Vue.prototype.$http = axios;
//const router=new VueRouter(routerConfig);

new Vue({
  store,
  //router,
  el: '#app',
  render: h => h(App)
});
