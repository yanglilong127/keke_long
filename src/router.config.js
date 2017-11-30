//路由配置

const router={
	mode:'history',  //切换路径模式，编程history模式
	//滚动条滚动行为，不加这个默认就会记忆原来滚动条的位置
	scrollBehavior:() => {{y:0}},
	routes:[
	{
		path:'/',
		redirect:'/home'
	}]
}

export default router