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



-------------style-------------------------------------------
"dev": "webpack-dev-server --inline --hot --port 8083"
--line --hot会热加载

当网速慢时，用户会看到花括弧标记：
	v-cloak   防止闪烁，比较大的段落  <span v-cloak>{{msg}}</span>
	v-text    <span v-text='msg'><span>


过滤器：
	capitalize:首字母大写   uppercase   lowercase  currency
	debounce  配合事件，延迟执行   @keyup='add | deboundce 2000'
	数据配合使用过滤器：这几个在列表都不支持了，需要用计算属性
		limitBy(取几个，从哪开始)
		v-for='item in arr | limitBy 5'
		v-for='item in arr | limitBy 5 1'

		filterBy 过滤数据
			v-for="item in arr | filterBy 'aa'"

		orderBy 排序  (谁 1/-1)
			v-for="item in arr | orderBy 1"正序
			v-for="item in arr | orderBy -1"倒序

		Vue.filter('filterHtml',{
			read:function(input){
				alter(11);
				return input.replace(/[^<]+>/g,'');
			},
			write:
		});

深度监视：vm.$watch('someObject', callback, {
			  deep: true
			})
		vm.someObject.nestedValue = 123

class绑定
1.对象语法
:class="{red:true,size:true}"
或者直接绑定一个对象
2.数组语法
<div v-bind:class="[activeClass, errorClass]"></div>
style绑定
:style
1.对象语法
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
2.数组语法
<div v-bind:style="[baseStyles, overridingStyles]"></div>
根据浏览器Vue会自动添加css前缀
你可以为每个 style 属性提供一个含有多个（前缀）值的数组，
<div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
最终，这只会从数组中找出「最后一个浏览器所支持的值」进行渲染。



vue->过渡(动画)   transition
	<div id="demo">
	  <button v-on:click="show = !show">
	    Toggle
	  </button>
	  <transition name="fade">
	    <p v-if="show">hello</p>
	  </transition>
	</div>

	new Vue({
	  el: '#demo',
	  data: {
	    show: true
	  }
	})

	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
	  opacity: 0
	}


	<!--结合animate.css运动-->
	  <transition name='fade'
	  	enter-active-class="animated bounceOutDown"
	  	leave-active-class="animated bounceOutLeft">
	  	<div id="box2" class="box" v-show='show'></div>
	  </transition>


# 组件
	定义一个全局组件：
		1.Vue.extend({
			template:xxx
		});
		2.Vue.component('aaa',{
			data(){
				return {

				}
			},
			props:['msg'],  //用于传递父组件数据
			template:'<h3>我是标题{{msg}}</h3>'
		});
		***组件里面放数据
		1.data必须是函数的形式，函数必须返回一个对象
		2.里面的方法也是直接放在组件里面定义的
	定义局部组件：
	components:{
		aaa:aaa
	}
	----------------------------
	配合模版使用：
		template:'<h2>{{msg}}</h2>'


	动态组件：
	<component :is='组件名称'></component>

	vue默认情况下，子组件不能访问父组件数据
	组件数据传递：
	1.子组件就想获取父组件data
		在调用子组件:	<bbb :m="数据" my-msg='数据'></bbb>
		在子组件之内：props:['m','myMsg']
						props:{
							'm':String,
							'myMsg':Number
						}
	2.父级获取子组件数据
		**子组件把自己的数据发送到父级
		方法1) 推荐
		vm.$emit(数据/事件名称,数据);
		父级v-on接收数据事件，简写@child-msg='get'

		eg:
		子组件：template:`<div>
							<span>我是子子组件->{{a}}</span>
							<button @click="send">send</button>
						 </div>`,
				methods:{
					send:function(){
						this.$emit('child-msg',this.a);
					}
				}
		父组件：template:`<div>
							<h1>我是父组件->{{msg1}}</h1>
							<bbb @child-msg='get'></bbb>
						  </div>`,
				methods:{
					get:function(msg){
						this.msg1=msg;
					}
				},
		方法2) 
		--------------------------------------------
		vm.$dispatch(事件名,数据)   自己向父级发送数据
		vm.$broadcase(事件名,数据)  父级向自己广播数据
		配合：events:{},
		但是在vue2.x里面已经去掉了

		子组件想更改：
		方法1)***父组件每次传一个对象给组件，对象之间是引用的
		方法2)给组件data的新数据赋值
		props:['msg'],
		mounted:function(){
			this.a=this.msg
		}


		----------------------------
		单一事件管理组件通信：vuex
		组件间通信，
		1.之间创建一个空实例
		var Event=new Vue();
		子组件A，传递出数据用Event.$emit('a-msg',this.msg);
		在要接收的组件里写：
			mounted(){
				Event.$on('a-msg',function(msg){
					this.msg=msg;
				}.bind(this));
			}

		创建Store.js
		var Event=new Vue();
		export default Event;

			
	
-----------------------------------------------------
slot
	位置、槽口
	作用：占位置
	具名slot:<slot> 元素有一个特殊的 name 属性，可以用于深度定制如何分发内容。可以给多个 slot 分配不同的名字。一个具有名称的 slot，会匹配内容片段中有对应 slot 属性的元素。
	还是可以有一个没有名称的 slot 作为默认 slot，这个插口用于将那些未匹配到的内容全部接收进来。如果没有默认的 slot，这些未匹配到的内容将直接丢弃。

	子组件：
	<div class="container">
	  <header>
	    <slot name="header"></slot>
	  </header>
	  <main>
	    <slot></slot>
	  </main>
	  <footer>
	    <slot name="footer"></slot>
	  </footer>
	</div>
	父组件：
	<app-layout>
	  <h1 slot="header">这里可能是一个页面标题</h1>
	  <p>主要内容的一个段落。</p>
	  <p>另一个主要段落。</p>
	  <p slot="footer">这里是一些联系信息</p>
	</app-layout>
	渲染结果：
	<div class="container">
	  <header>
	    <h1>这里可能是一个页面标题</h1>
	  </header>
	  <main>
	    <p>主要内容的一个段落。</p>
	    <p>另一个主要段落。</p>
	  </main>
	  <footer>
	    <p>这里是一些联系信息</p>
	  </footer>
	</div>

# 子组件索引  ref： 为子组件指定一个索引 ID
<user-profile ref="profile"></user-profile>
vm.$refs.profile就可以访问到




vue-cli构建项目使用 less的方法

第一步：安装
npm install less less-loader --save-dev 

第二步：在单组件.vue中使用
	在style中声明lang="less"。 注意： scoped的作用仅仅是限定css的作用域，防止变量污染。
<style scoped lang="less">
 
</style> 




