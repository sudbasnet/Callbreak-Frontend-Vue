import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import clonedeep from 'lodash.clonedeep';

Vue.use(Vuex);

const defaultGameData = {
    _id: null,
    status: 'inactive',
    playerList: [
        {
            playerId: null,
            playerName: null,
            currentBet: null,
            currentScore: null,
            ready: null
        }
    ],
    currentTurn: null,
    nextTurn: null,
    ready: false,
    cards: [{ suit: null, value: null }],
    possibleMoves: [{ suit: null, value: null }],
    playedRounds: [],
    createdBy: null,
    gameNumber: null,
    roundNumber: null,
    turnNumber: null,
    scores: [
        {
            playerId: null,
            gameNumber: null,
            score: null
        }
    ],
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
        createGameInstance({ commit }, isPlayerLoggedIn) {
            if (isPlayerLoggedIn) {
                axios.get("game/callbreak/new", {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('callbreak-app-user')).token}`
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
        },
        start({ commit }, gameId) {
            axios.get('game/callbreak/' + gameId + '/start', {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('callbreak-app-user')).token}`
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
            axios.get("game/callbreak/" + gameId + "/join", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('callbreak-app-user')).token}`
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
            if (localStorage.getItem('callbreak-app-user')) {
                axios.get("game/callbreak/game-data",
                    {
                        headers: {
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('callbreak-app-user')).token}`
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
                playerList = state.game.playerList;
            }
            while (playerList.length < 4) {
                playerList.push({ playerName: null, ready: false });
            }
            return playerList;
        },
        mycards(state) {
            return state.game.cards;
        },
        cardsOnTable(state) {
            return state.game.cards; // will fix later
        },
        gameNumber(state) {
            return state.game.gameNumber;
        },
        totalPoints(state) {
            // array of everyone's points
            return state.game.scores;
        },
        currentScores(state) {
            // returns score out of bet
            return state.game.scores;
        },
        currentTurn(state) {
            return state.game.currentTurn;
        },
        playedRounds(state) {
            return state.game.playedRounds;
        },
        playerNames(state) {
            return state.game.playerList.map(p => p.playerName);
        },
        playerMe(state) {
            return state.game.playerList.filter(p => p.playerId === state.user._id)[0];
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
            state.game.status = game.status;
            state.game._id = game._id;
            state.game.createdBy = game.createdBy;

            const global = game.global;
            const player = game.player;

            const currentBets = global.bets.filter(b => b.gameNumber === global.gameNumber);
            const currentScores = global.scores.filter(s => s.gameNumber === global.gameNumber);
            const readys = global.ready.filter(s => s.gameNumber === global.gameNumber);

            state.game.playerList = [];
            let bet = 0;
            let score = 0;
            let ready = false;

            global.playerList.forEach(playerDetail => {
                bet = currentBets.filter(s => s.playerId === playerDetail.playerId)[0];
                bet = bet ? bet.bet : 0;

                score = currentScores.filter(s => s.playerId === playerDetail.playerId)[0];
                score = score ? score.score : 0;

                ready = readys.filter(r => r.playerId === playerDetail.playerId)[0];
                ready = ready ? ready.ready : false;

                state.game.playerList.push({
                    playerId: playerDetail.playerId,
                    playerName: playerDetail.playerName,
                    currentBet: bet,
                    currentScore: score,
                    ready: ready
                });
            });

            state.game.currentTurn = global.currentTurn;
            state.game.nextTurn = global.nextTurn; // why??
            state.game.playedRounds = global.playedRounds;
            state.game.cardsOnTable = global.cardsOnTable;

            state.game.gameNumber = global.gameNumber;
            state.game.roundNumber = global.roundNumber;
            state.game.scores = global.scores;
            state.game.cards = player.cards;
            state.game.possibleMoves = player.possibleMoves;

            localStorage.setItem('callbreak-app-game', JSON.stringify(state.game));
        },
        // showGameCreationOptions(state) {
        //     state.game.status = 'not-created-waiting';
        //     console.log('Showing Game Creation Options!!');
        //     localStorage.setItem('callbreak-app-game', JSON.stringify(state.game));
        // },
        refreshGame(state, gameData) {
            if (gameData && state.user._id && gameData.playerList.map(p => p.playerId).includes(state.user._id)) {
                state.game = gameData;
            } else {
                state.game = clonedeep(defaultGameData);
            }
        },
        showGameJoinOptions(state) {
            state.game.status = 'joining';
            console.log('Showing Game Join Options!!');
        },
        hideGameCreationOptions(state) {
            state.game.status = 'inactive';
            console.log('Hiding Game Creation Options!!');
            localStorage.removeItem('callbreak-app-game');
        },
        dummyMutation(state, responseData) {
            console.log('dummy mutation called.');
            console.log(responseData.message);
        }
    }
});
