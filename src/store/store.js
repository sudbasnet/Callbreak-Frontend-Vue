import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {
            _id: "",
            email: "",
            name: "",
            token: null
        }
    },
    actions: {
        // its coming out of context.commit
        register(userSignUpData) {
            axios
                .put("/user/register", userSignUpData)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log("error");
                    console.log(err);
                });
        },
        login({ commit }, authData) {
            axios
                .post("/user/login", authData)
                .then((res) => {
                    // console.log(res.data);
                    commit('authUser', res.data);
                })
                .catch((err) => {
                    console.log("error");
                    console.log(err);
                });
        },
        logout({ commit }) {
            commit('logoutUser', false);
        }
    },
    // getters and mutations do not run async code
    // async tasks should be done by Actions first 
    getters: {

    },
    mutations: {
        authUser(state, authData) {
            state.user = authData;
            axios.defaults.headers.common['Authentication'] = 'Bearer ' + state.user.token;
        },
        logoutUser(state) {
            state.user = {
                _id: "",
                email: "",
                name: "",
                token: null
            };
            axios.defaults.headers.common['Authentication'] = 'Bearer ';
        }
    }
});