import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import clonedeep from 'lodash.clonedeep';
import { DEFAULT_USER_DATA, DEFAULT_GAME_DATA } from './defaults';
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: clonedeep(DEFAULT_USER_DATA),
        game: clonedeep(DEFAULT_GAME_DATA)
    },

    actions: actions,
    // getters and mutations do not run async code
    // async tasks should be done by Actions first 
    getters: getters,
    mutations: mutations
})
