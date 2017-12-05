
//数据源
const state={
	showQidong:true,  //开机画面显示
	loading:false,
};

const mutations={
	show_qidong({state}){
		this.state.mutations.showQidong=true;
	},
	hide_qidong({state}){
		//console.log(this)
		this.state.mutations.showQidong=false;
	},
	showLoading({state}){
		this.state.mutations.loading=true;
	},
	hideLoading({state}){
		this.state.mutations.loading=false;
	}
};

import getters from './getters'

export default {
	state,
	mutations,
	getters
};