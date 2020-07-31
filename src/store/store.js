import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: { _id: null, email: null, name: null, token: null },
        game: { status: 'off', gameType: null }
        // game status can be 'on', 'off', 'waiting'
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
                    commit('authUser', { _id: res.data._id, name: res.data.name, email: res.data.email, token: res.data.token });
                    localStorage.setItem('callbreak-app-user', JSON.stringify({ _id: res.data._id, name: res.data.name, email: res.data.email, token: res.data.token }));
                })
                .catch((err) => {
                    console.log("error");
                    console.log(err);
                });
        },
        logout({ commit }) {
            console.log('Logging Out');
            localStorage.removeItem('callbreak-app-user');
            commit('logoutUser');
        },
        autoLogin({ commit }) {
            commit('authUser', JSON.parse(localStorage.getItem('callbreak-app-user')));
        },
        // requestResetPassword({ commit }, email) {
        //     axios.get('/request-password-reset', { email: email })
        //         .then(res => console.log(res.data))
        //         .catch(err => console.log(err));
        // }
        createGameInstance({ commit }, selectedGame) {
            if (selectedGame === 'Callbreak') {
                axios.get("game/callbreak/new", {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('callbreak-app-user')).token}`
                    }
                })
                    .then(res => {
                        console.log(res);
                        commit('newGame', selectedGame);
                    })
            }
        }
    },
    // getters and mutations do not run async code
    // async tasks should be done by Actions first 
    getters: {
        user(state) {
            return state.user;
        },
        status(state) {
            return state.game.status;
        }
    },
    mutations: {
        authUser(state, authData) {
            state.user = authData;
            if (!authData) {
                state.user = { _id: null, email: null, name: null, token: null }
            }
        },
        // not async, dont really need to add logout to mutations
        // but might need to, in the future
        logoutUser(state) {
            state.user = { _id: null, email: null, name: null, token: null };
        },
        newGame(state, selectedGame) {
            state.game = selectedGame;
        },
        showGameCreationOptions(state) {
            state.game.status = 'waiting';
            console.log('Showing Game Creation Options!!');
        },
        hideGameCreationOptions(state) {
            state.game.status = 'off';
            console.log('Hiding Game Creation Options!!');
        }
    }
});
