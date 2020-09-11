import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import clonedeep from 'lodash.clonedeep';

Vue.use(Vuex);

const defaultGameData = {
    // unique identifier sent by the backend
    _id: null,
    // is the game 'active' or 'inactive'
    status: 'inactive',
    // host
    createdBy: null,

    // which game? (1 ... 5)
    gameNumber: null,
    // which round? (1 ... 13)
    roundNumber: null,

    cardsOnTable: [],

    myTurn: false,
    myBetPlaced: false,
    myBet: 1,
    myScore: 0,
    myTotalScore: 0,
    myCards: [],
    myValidMoves: [],

    // which playerId's turn
    turn: null,

    // cards played so far in this game
    playedRounds: [[]],

    // all the scores in all the 5 games
    scores: [
        { playerId: null, gameNumber: null, score: null }
    ],

    // list of all players info for the current game
    playerList: [
        {
            id: null,
            name: null,
            bet: null,
            score: null,
            totalScore: null,
            betPlaced: false
        }
    ]
};

const defaultUserData = {
    _id: null,
    email: null,
    name: null,
    token: null
};

export const store = new Vuex.Store({
    state: {
        user: clonedeep(defaultUserData),
        game: clonedeep(defaultGameData)
    },
    /* 
    STATUS
    ======
    inactive
    joining = Clicked on Join, havent joined yet
    waiting
    active
    */
    actions: {
        register({ commit }, userSignUpData) {
            axios
                .put("/user/register", userSignUpData)
                .then((res) => {
                    commit('dummyMutation', res.data);
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
        updatePassword({ commit }, updatedPwData) {
            axios.put("/user/update-password", updatedPwData)
                .then(res => {
                    commit('dummyMutation', res.data);
                })
                .catch(err => {
                    console.log("Error has occured");
                    console.log(err.message);
                });
        },
        createGameInstance({ commit }) {
            const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token;

            axios.get("game/callbreak/new", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    commit('instantiateGame', res.data);
                })
                .catch((err) => {
                    console.log("Error has occured");
                    console.log(err.message);
                });

        },
        cancelGameCreation({ commit }) {
            const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token;

            axios.delete('game/callbreak/new', {
                data: {
                    gameId: JSON.parse(localStorage.getItem('callbreak-app-game'))._id
                },
                headers: {
                    'Authorization': `Bearer ${token}`
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
        },
        start({ commit }, gameId) {
            const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token;

            axios.get(`game/callbreak/${gameId}/start`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    commit('instantiateGame', res.data);
                })
                .catch(err => {
                    console.log('Error has occured');
                    console.log(err.message);
                });
        },
        requestResetPassword({ commit }, userEmail) {
            axios.get('user/request-reset-password/' + userEmail)
                .then(res => {
                    commit('dummyMutation', res.data);
                })
                .catch(err => {
                    console.log('Error has occured');
                    console.log(err);
                });
        },
        joinGame({ commit }, gameId) {
            const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token;

            axios.get("game/callbreak/" + gameId + "/join", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res.data);
                    commit('instantiateGame', res.data);
                })
                .catch((err) => {
                    console.log("Error has occured");
                    console.log(err.message);
                });
        },
        refreshGame({ commit }) {
            const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token;

            if (localStorage.getItem('callbreak-app-user')) {
                axios.get("game/callbreak/game-data",
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then(res => {
                        console.log(res.data);
                        commit('instantiateGame', res.data);
                    })
                    .catch((err) => {
                        console.log("Error has occured");
                        console.log(err.message);
                    });
            }
        },
        playWithBots({ commit }) {
            const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token;

            axios.get("game/callbreak/new", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(createRes => {
                    axios.get(`game/callbreak/${createRes.data._id}/start`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(res => {
                            commit('instantiateGame', res.data);
                        })
                        .catch(err => {
                            console.log('Error has occured during game start!');
                            console.log(err.message);
                        });
                })
                .catch((err) => {
                    console.log("Error has occured during game creation!");
                    console.log(err.message);
                });
        },
        placeBet({ commit }, bet) {
            const gameId = JSON.parse(localStorage.getItem('callbreak-app-game'))._id;
            const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token;

            axios.post(`game/callbreak/${gameId}/bet`, { bet: bet }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    commit('instantiateGame', res.data);
                })
                .catch((err) => {
                    console.log("Error has occured");
                    console.log(err.message);
                });
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
        },
        isLoggedIn(state) {
            if (state.user._id) {
                return true;
            }
            return false;
        },
        playersLookup(state) {
            let playerList = [];
            if (state.game.playerList) {
                playerList = clonedeep(state.game.playerList);
            }
            while (playerList.length < 4) {
                playerList.push({ name: null });
            }
            return playerList;
        },
        mycards(state) {
            return state.game.myCards;
        },
        cardsOnTable(state) {
            return state.game.cardsOnTable; // will fix later
        },
        gameNumber(state) {
            return state.game.gameNumber;
        },
        currentTurn(state) {
            return state.game.turn;
        },
        playedRounds(state) {
            return state.game.playedRounds;
        },
        playerList(state) {
            return state.game.playerList;
        },
        playerMe(state) {
            const i = state.game.playerList.findIndex(p => p.id === state.user._id);
            return state.game.playerList[i];
        },
        myBet(state) {
            return state.game.myBet;
        },
        isBetting(state) {
            return !state.game.myBetPlaced
        }
    },
    mutations: {
        authUser(state, authData) {
            state.user = authData;
            if (!authData) {
                state.user = clonedeep(defaultUserData)
            }
        },
        logoutUser(state) {
            state.user = clonedeep(defaultUserData);
            state.game = clonedeep(defaultGameData);
            localStorage.removeItem('callbreak-app-user');
            localStorage.removeItem('callbreak-app-game');
        },
        instantiateGame(state, game) {
            const userId = JSON.parse(localStorage.getItem('callbreak-app-user'))._id;
            const global = game.global;
            const player = game.player;
            const myindex = global.playerList.findIndex(p => p.id === userId);
            const myData = global.playerList[myindex];

            state.game.status = game.status;
            state.game._id = game._id;
            state.game.createdBy = game.createdBy;

            state.game.gameNumber = global.gameNumber;
            state.game.roundNumber = global.roundNumber;

            state.game.cardsOnTable = global.cardsOnTable;

            state.game.myTurn = global.currentTurn === userId ? true : false;
            state.game.myBetPlaced = myData.betPlaced;
            state.game.myBet = myData.bet;
            state.game.myScore = myData.score;
            state.game.myTotalScore = myData.totalScore;
            state.game.myCards = player.cards;
            state.game.myValidMoves = player.possibleMoves;

            state.game.turn = global.currentTurn;

            state.game.playedRounds = global.playedRounds;

            state.game.scores = global.scores;

            state.game.playerList = global.playerList;

            localStorage.setItem('callbreak-app-game', JSON.stringify(state.game));
        },
        refreshGame(state, gameData) {
            if (gameData && state.user._id && gameData.playerList.map(p => p.id).includes(state.user._id)) {
                state.game = gameData;
            } else {
                state.game = clonedeep(defaultGameData);
            }
        },
        showGameJoinOptions(state) {
            state.game.status = 'joining';
        },
        hideGamejoinOptions(state) {
            state.game.status = 'inactive';
        },
        hideGameCreationOptions(state) {
            state.game.status = 'inactive';
            console.log('Hiding Game Creation Options!!');
            localStorage.removeItem('callbreak-app-game');
        },
        dummyMutation(state, responseData) {
            console.log('dummy mutation called.');
            console.log(responseData.message);
        },
        increaseBet(state) {
            const i = state.game.playerList.findIndex(p => p.id === state.user._id);
            if (state.game.playerList[i].bet < 8) {
                state.game.playerList[i].bet += 1;
            }
        },
        decreaseBet(state) {
            const i = state.game.playerList.findIndex(p => p.id === state.user._id);
            if (state.game.playerList[i].bet > 1) {
                state.game.playerList[i].bet -= 1;
            }
        }

    }
});
