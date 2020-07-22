import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        userIsLoggedIn: false,
        user: {
            id: '',
            name: '',
            email: ''
        }
    },
    // getters and mutations do not run async code
    // async tasks should be done by Actions first 
    getters: {
        dummyGetterFunction: state => {
            return;
        }
    },
    mutations: {
        dummyMutationFunction: state => {
            return;
        }
    },
    actions: {
        dummyActionFunction: context => {
            context.commit('');
        }
    }
});