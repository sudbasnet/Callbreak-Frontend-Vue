import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: { _id: null, email: null, name: null, token: null },
        game: { _id: null, status: 'off', gameType: null }
        // game status can be 'on', 'off', 'created-now-waiting', 'not-created-waiting'
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
                    const authData = { _id: res.data._id, name: res.data.name, email: res.data.email, token: res.data.token };
                    commit('authUser', authData);
                    localStorage.setItem('callbreak-app-user', JSON.stringify(authData));
                })
                .catch((err) => {
                    console.log("Error has occured");
                    console.log(err.message);
                });
        },
        autoLogin({ commit }) {
            commit('authUser', JSON.parse(localStorage.getItem('callbreak-app-user')));
        },
        createGameInstance({ commit }, selectedGame) {
            if (selectedGame === 'Callbreak') {
                axios.get("game/callbreak/new", {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('callbreak-app-user')).token}`
                    }
                })
                    .then(res => {
                        console.log(res.data);
                        commit('instantiateNewGame', res.data);
                    })
                    .catch((err) => {
                        console.log("Error has occured");
                        console.log(err.message);
                    });
            }
        },
        cancelGameCreation({ commit }) {
            axios.delete('game/callbreak/new', {
                data: {
                    gameId: JSON.parse(localStorage.getItem('callbreak-app-game'))._id
                },
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('callbreak-app-user')).token}`
                }
            })
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log('An error has occured');
                    console.log(err.message);
                });
            commit("hideGameCreationOptions");
        }
    },
    // getters and mutations do not run async code
    // async tasks should be done by Actions first 
    getters: {
        userData(state) {
            return state.user;
        },
        gameData(state) {
            return state.game;
        }
    },
    mutations: {
        authUser(state, authData) {
            state.user = authData;
            if (!authData) {
                state.user = { _id: null, email: null, name: null, token: null }
            }
        },
        logoutUser(state) {
            localStorage.removeItem('callbreak-app-user');
            state.user = { _id: null, email: null, name: null, token: null };
        },
        instantiateNewGame(state, gameCreationData) {
            state.game.gameType = gameCreationData.gameType;
            state.game._id = gameCreationData.gameId;
            state.game.status = 'created-now-waiting';
            localStorage.setItem('callbreak-app-game', JSON.stringify(state.game));
        },
        showGameCreationOptions(state) {
            state.game.status = 'not-created-waiting';
            console.log('Showing Game Creation Options!!');
            localStorage.setItem('callbreak-app-game', JSON.stringify(state.game));
        },
        hideGameCreationOptions(state) {
            state.game.status = 'off';
            console.log('Hiding Game Creation Options!!');
            localStorage.removeItem('callbreak-app-game');
        }
    }
});
