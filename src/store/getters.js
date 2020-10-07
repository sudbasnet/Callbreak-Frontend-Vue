import clonedeep from 'lodash.clonedeep';

const getters = {
    userData(state) {
        return state.user
    },
    gameData(state) {
        return state.game
    },
    isLoggedIn(state) {
        if (state.user._id) {
            return true
        }
        return false
    },
    playersLookup(state) {
        let playerList = []
        if (state.game.playerList) {
            playerList = clonedeep(state.game.playerList)
        }
        while (playerList.length < 4) {
            playerList.push({ name: null })
        }
        return playerList
    },
    mycards(state) {
        return { cards: state.game.myCards, validMoves: state.game.myValidMoves };
    },
    cardsOnTable(state) {
        return state.game.cardsOnTable // will fix later
    },
    roundNumber(state) {
        return state.game.roundNumber
    },
    currentTurn(state) {
        return state.game.turn
    },
    playedRounds(state) {
        return state.game.playedRounds
    },
    playerList(state) {
        return state.game.playerList
    },
    playerMe(state) {
        const i = state.game.playerList.findIndex(p => p.id === state.user._id)
        return state.game.playerList[i]
    },
    myBet(state) {
        return state.game.myBet
    },
    isBetting(state) {
        return !state.game.myBetPlaced
    },
    createdBy(state) {
        return state.game.createdBy
    }

};


export default getters;