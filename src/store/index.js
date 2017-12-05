import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import actions from './actions.js'
import mutations from './mutations.js'

const store=new Vuex.Store({
	modules:{
		mutations
	},
	actions
});

export default store;