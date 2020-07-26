import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: { _id: null, email: null, name: null, token: null }
    },
    actions: {
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
        // its coming out of context.commit
        login({ commit }, authData) {
            axios
                .post("/user/login", authData)
                .then((res) => {
                    commit('authUser', { id: res.data._id, name: res.data.name, email: res.data.email, token: res.data.token });
                    localStorage.setItem('userId', res.data._id);
                    localStorage.setItem('jwtToken', res.data.token);
                    localStorage.setItem('userEmail', res.data.email);
                    localStorage.setItem('userName', res.data.name)
                })
                .catch((err) => {
                    console.log("error");
                    console.log(err);
                });
        },
        logout({ commit }) {
            console.log('Logging Out');
            localStorage.removeItem('userId');
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            commit('logoutUser');
        },
        autoLogin({ commit }) {
            commit('authUser', {
                id: localStorage.getItem('userId'),
                name: localStorage.getItem('userName'),
                email: localStorage.getItem('userEmail'),
                token: localStorage.getItem('jwtToken')
            });
        },
        requestResetPassword({ commit }, email) {
            axios.get('/request-password-reset', { email: email })
                .then(res => console.log(res.data))
                .catch(err => console.log(err));
        }
    },
    // getters and mutations do not run async code
    // async tasks should be done by Actions first 
    getters: {
        user(state) {
            return state.user;
        }
    },
    mutations: {
        authUser(state, authData) {
            state.user = authData;
            // axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.user.token;
        },
        // not async, dont really need to add logout to mutations
        // but might need to, in the future
        logoutUser(state) {
            state.user = { _id: null, email: null, name: null, token: null };
        }
    }
});
