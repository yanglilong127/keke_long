# simulate_mobile_news

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

vue仿手机新闻站
	1.拿到静态页面，直接用vue边布局，边写
	2.假数据

	没有用任何的UI组件

做项目基本流程：
	1.规划组件结构
		Nav.vue
		Header.vue
		Home.vue
		...
	2.编写对应路由
		vue-router
	3.集体写每个组件功能


建议：一些公共的文件jquery,jquery插件，一般在index.html文件里面引入
	或者main.js  require()/import


项目需要用到的模块：
vuex
vue-router 
axios

//关于axios配置
Vue.prototype.$http=axios;
//设置post头部信息
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
axios.interceptors.request.use(function(config){
	//配置发送请求的信息
	store.dispatch('showLoading')
	return config;
},function(err){
	return Promise.reject(err);
});
axios.interceptors.response.use(function(response){
	//配置请求回来的信息
	store.dispatch('hideLoading')
	return response;
},function(err){
	return Promise.reject(err);
});

this.$http.get('src/data/index.data').then(function(res){
	console.log( res.data);
	_this.arrList=res.data;
	
}).catch(function(err){
	console.log(err);
});

//get请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
 
// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
 //post请求
 axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

 API

 axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});


webpack打包完很大   build.js
	1).webpack代码拆分：code-spliting
	2).提取公共(css,js)
	3).预渲染：prerender-spa-plugin
	4).后台---开启压缩，gzip
	5).异步加载组件
		require.ensure