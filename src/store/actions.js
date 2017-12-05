
var actions={
	show_qidong({commit,state}){
		commit('show_qidong');
	},
	hide_qidong({commit,state}){
		commit('hide_qidong');
	},
	showLoading({commit,state}){
		commit('showLoading');
	},
	hideLoading({commit,state}){
		commit('hideLoading');
	}
};


export default actions;