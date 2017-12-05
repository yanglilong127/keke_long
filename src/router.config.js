//路由配置
import Music from './components/Music.vue';
import Play_btn from './components/Play_btn.vue';


const routes = [
	{
		path:'/music',
		component:Music
	},
	{
		path:'/',
		component:Play_btn
	},{
		path:'*',
		redirect:'/'
	}];


export default routes