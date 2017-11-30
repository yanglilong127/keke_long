<template>
	<div class="content">
	    <button @click='change'>点我</button>
	    {{msg}}
		<img src="../assets/images/head.png" alt="">
	</div>
</template>
<script>
	export default {
		data(){
			return {
				msg:'my name is burt.'
			}
		},
		components:{
			
		},
		mounted(){
			//获取数据
			//console.log(this.$el)
			this.fetchData();
			//require('../assets/js/index.js');
		},
		methods:{
			change(){
				if(this.msg=='my name is burt.')
					this.msg='my name is keke.';
				else this.msg='my name is burt.'
			},
			fetchData(){
				console.log('我是来请求数据的');
				console.log('2222')
			}
		}
	}

</script>
<style scoped>

</style>