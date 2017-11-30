import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'



Vue.use(Vuex);

const state={


};

const store=new Vuex.Store({
	state,
	mutations,
	actions,
	getters
});

export default store;