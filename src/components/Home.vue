<template>
	<div class="home">
		<transition mode='out-in'
		enter-active-class="animated bounceInDown"
		leave-active-class="animated rotateOut"
		>	
			<div class="btn_group" v-show="mainPage">
				<router-link to='/music'>
					<button type="button" class="btn btn-warning btn-block btn-lg">
						音乐
					</button>
				</router-link>
				<router-link to='/picture'>
					<button type="button" class="btn btn-info btn-block btn-lg">
						图片
					</button>
				</router-link>
				<router-link to='/vedio'>
					<button type="button" class="btn btn-success btn-block btn-lg">
						视频
					</button>
				</router-link>
				<button type="button" class="btn btn-success btn-block btn-lg"
				@click='getMusic'>
					点击
				</button>
			</div>
		</transition>

		<!--路由-->
		<transition mode='out-in'
		enter-active-class="animated bounceInDown"
		leave-active-class="animated rotateOut">
			<router-view></router-view>
		</transition>

		<div id='mymusic' style="display:none">
			<audio src="" autoplay></audio>
		</div>
	</div>
</template>
<script>
import {mapGetters} from 'vuex';
import {myMusic} from '../config.js';  //音乐列表

var newEvent;  //一个实例

export default {
	data(){
		return {
			mainPage:true,
			time0:'',  //定时器0
			musicName:'',  //歌名
		}
	},
	watch:{
		$route(to,from){
			var path=this.$route.path;
			if(path!='/'){
				this.mainPage=false;  //隐藏
				$('#mymusic audio').get(0).pause();//移除音乐
			}else{
				this.mainPage=true;  //显示
				this.addMusic();//开启mp3
				this.changeMusic();
			}
		}
	},
	computed:{
		
	},
	mounted(){
		newEvent=require('../config.js').newEvent;
		this.addMusic();  //添加音乐
		this.changeMusic();
	},
	components:{
		
	},
	methods:{
		addMusic:function(){
			var myMusic_len=myMusic.length;
			var music_name=myMusic[parseInt(Math.random()*myMusic_len)];
			this.musicName=music_name;
			newEvent.$emit('mymusicName',music_name);  //传递歌名
			music_name='../assets/mp3/'+music_name;
			$('#mymusic audio').attr('src',music_name);
		},
		changeMusic:function(){
			clearInterval(this.time0);
			this.time0=setInterval(function(){
				if($('#mymusic audio').get(0).ended)
					this.addMusic();
			}.bind(this),50);
			
		},
		getMusic:function(){
			this.$http.get("/play",{
				params:{
					"r":"play/getdata",
					"hash":"3C3D93A5615FB42486CAB22024945264",
					"album_id":1645030,
					"_":1497972864535
				}
			})
			.then((res)=>{
				console.log(res);
			});
		}
	}
}


</script>

<style scoped lang='less'>
.home{
	width: 100%; height: 100%;
	background-image: url(../assets/images/background_home.jpg);
    background-position: 50% 50%;
    background-size:cover;
	background-repeat: no-repeat;
	.btn_group{
		width: 100%;
		position: absolute;
		top:50%;
		margin-top:-99px;
		button.btn{
			margin-top:20px;
		}
	}
}
</style>