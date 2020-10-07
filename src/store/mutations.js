import clonedeep from 'lodash.clonedeep';
import { DEFAULT_USER_DATA, DEFAULT_GAME_DATA } from './defaults';


const mutations = {
    SOCKET_CONNECT(state) {
        state.socketsConnected = true
        console.log('Websockets connected - Client side')
    },
    authUser(state, authData) {
        state.user = authData
        if (!authData) {
            state.user = clonedeep(DEFAULT_USER_DATA)
        }
    },
    resetGame(state) {
        state.game = clonedeep(DEFAULT_GAME_DATA)
        localStorage.removeItem('callbreak-app-game')
    },
    logoutUser(state) {
        state.user = clonedeep(DEFAULT_USER_DATA)
        state.game = clonedeep(DEFAULT_GAME_DATA)
        localStorage.removeItem('callbreak-app-user')
        localStorage.removeItem('callbreak-app-game')
    },
    instantiateGame(state, game) {
        const userId = JSON.parse(localStorage.getItem('callbreak-app-user'))._id
        const global = game.global
        const player = game.player
        const myindex = global.playerList.findIndex(p => p.id === userId)
        const myData = global.playerList[myindex]

        state.game.status = game.status
        state.game._id = game._id
        state.game.createdBy = game.createdBy

        state.game.handNumber = global.handNumber
        state.game.roundNumber = global.roundNumber

        state.game.cardsOnTable = global.cardsOnTable

        state.game.myTurn = global.currentTurn === userId ? true : false
        state.game.myBetPlaced = myData.betPlaced
        state.game.myBet = myData.bet
        state.game.myScore = myData.score
        state.game.myOts = myData.ots
        state.game.myTotalScore = myData.totalScore
        state.game.myCards = player.cards
        state.game.myValidMoves = player.possibleMoves

        state.game.turn = global.currentTurn

        state.game.playedHands = global.playedHands

        state.game.scores = global.scores

        state.game.playerList = global.playerList

        localStorage.setItem('callbreak-app-game', JSON.stringify(state.game))

        if (game.status == 'active') {
            const i = state.game.playerList.findIndex(x => x.id === state.game.turn)
            const currentTurnPlayer = state.game.playerList[i]
            const userIsHost = state.user._id === state.game.createdBy
            if (userIsHost && currentTurnPlayer.bot) {
                if (!currentTurnPlayer.betPlaced) {
                    this.dispatch('requestBetForBot', state.game.turn)
                } else {
                    this.dispatch('requestMoveForBot', state.game.turn)
                }
            }
        }
    },
    refreshGame(state, gameData) {
        if (gameData && state.user._id && gameData.playerList.map(p => p.id).includes(state.user._id)) {
            state.game = gameData
        } else {
            state.game = clonedeep(DEFAULT_GAME_DATA)
        }
    },
    showGameJoinOptions(state) {
        state.game.status = 'joining'
    },
    hideGamejoinOptions(state) {
        state.game.status = 'inactive'
    },
    hideGameCreationOptions(state) {
        state.game.status = 'inactive'
        console.log('Hiding Game Creation Options!!')
        localStorage.removeItem('callbreak-app-game')
    },
    dummyMutation(state, responseData) {
        console.log('dummy mutation called.')
        console.log(responseData.message)
    },
    increaseBet(state) {
        const i = state.game.playerList.findIndex(p => p.id === state.user._id)
        if (state.game.playerList[i].bet < 8) {
            state.game.playerList[i].bet += 1
        }
    },
    decreaseBet(state) {
        const i = state.game.playerList.findIndex(p => p.id === state.user._id)
        if (state.game.playerList[i].bet > 1) {
            state.game.playerList[i].bet -= 1
        }
    }

};

export default mutations;