import axios from 'axios';

const actions = {
    register({ commit }, userSignUpData) {
        axios
            .put("/user/register", userSignUpData)
            .then((res) => {
                commit('dummyMutation', res.data)
            })
            .catch((err) => {
                console.log("error")
                console.log(err)
            })
    },
    registerGuest({ commit }, guestName) {
        axios
            .put("/user/register-guest", { name: guestName })
            .then((res) => {
                const authData = { _id: res.data._id, name: res.data.name, email: res.data.email, userType: res.data.userType, token: res.data.token }
                commit('authUser', authData)
                localStorage.setItem('callbreak-app-user', JSON.stringify(authData))
            })
            .catch((err) => {
                console.log("Error has occured")
                console.log(err.message)
            })
    },
    // its coming out of context.commit
    login({ commit }, authData) {
        axios
            .post("/user/login", authData)
            .then((res) => {
                const authData = { _id: res.data._id, name: res.data.name, email: res.data.email, userType: res.data.userType, token: res.data.token }
                commit('authUser', authData)
                localStorage.setItem('callbreak-app-user', JSON.stringify(authData))
            })
            .catch((err) => {
                console.log("Error has occured")
                console.log(err.message)
            })
    },
    autoLogin({ commit }) {
        commit('authUser', JSON.parse(localStorage.getItem('callbreak-app-user')))
    },
    updatePassword({ commit }, updatedPwData) {
        axios.put("/user/update-password", updatedPwData)
            .then(res => {
                commit('dummyMutation', res.data)
            })
            .catch(err => {
                console.log("Error has occured")
                console.log(err.message)
            })
    },
    createGameInstance({ commit }) {
        const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token

        axios.get("game/callbreak/new", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this._vm.$socket.emit('JOIN_GAME', { room: String(res.data._id) })
                commit('instantiateGame', res.data)
            })
            .catch((err) => {
                console.log("Error has occured")
                console.log(err.message)
            })
    },
    cancelGame({ commit }) {
        const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token
        const gameId = JSON.parse(localStorage.getItem('callbreak-app-game'))._id

        axios.delete('game/callbreak/new', {
            data: {
                gameId: gameId
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this._vm.$socket.emit('EXIT_GAME', { room: String(gameId) })
                console.log(res.data)
            })
            .catch(err => {
                console.log('An error has occured')
                console.log(err.message)
            })
        commit("resetGame")
    },
    start({ commit }, gameId) {
        const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token

        axios.get(`game/callbreak/${gameId}/start`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this._vm.$socket.emit('UPDATE_GAME', { room: String(res.data._id) })
                commit('instantiateGame', res.data)
            })
            .catch(err => {
                console.log('Error has occured')
                console.log(err.message)
            })
    },
    requestResetPassword({ commit }, userEmail) {
        axios.get('user/request-reset-password/' + userEmail)
            .then(res => {
                commit('dummyMutation', res.data)
            })
            .catch(err => {
                console.log('Error has occured')
                console.log(err)
            })
    },
    joinGame({ commit }, gameId) {
        const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token

        axios.get("game/callbreak/" + gameId + "/join", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this._vm.$socket.emit('JOIN_GAME', { room: String(res.data._id) })
                commit('instantiateGame', res.data)
            })
            .catch((err) => {
                console.log("Error has occured")
                console.log(err.message)
            })
    },
    refreshGame({ commit }) {
        if (localStorage.getItem('callbreak-app-user')) {
            const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token
            axios.get("game/callbreak/game-data",
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    commit('instantiateGame', res.data)
                })
                .catch((err) => {
                    commit('resetGame')
                    console.log("Error has occured")
                    console.log(err.message)
                })
        }
    },
    playWithBots({ commit }) {
        const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token

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
                        commit('instantiateGame', res.data)
                    })
                    .catch(err => {
                        console.log('Error has occured during game start!')
                        console.log(err.message)
                    })
            })
            .catch((err) => {
                console.log("Error has occured during game creation!")
                console.log(err.message)
            })
    },
    placeBet({ commit }, bet) {
        const gameId = JSON.parse(localStorage.getItem('callbreak-app-game'))._id
        const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token

        axios.post(`game/callbreak/${gameId}/bet`, { bet: bet }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this._vm.$socket.emit('UPDATE_GAME', { room: String(res.data._id) })
                commit('instantiateGame', res.data)
            })
            .catch((err) => {
                console.log("Error has occured")
                console.log(err.message)
            })
    },
    requestBetForBot({ commit }, botId) {
        const gameId = JSON.parse(localStorage.getItem('callbreak-app-game'))._id
        const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token

        axios.get(`game/callbreak/${gameId}/bot-bet/${botId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this._vm.$socket.emit('UPDATE_GAME', { room: String(res.data._id) })
                commit('instantiateGame', res.data)
            })
            .catch((err) => {
                console.log("Error has occured")
                console.log(err.message)
            })
    },
    requestMoveForBot({ commit }, botId) {
        const gameId = JSON.parse(localStorage.getItem('callbreak-app-game'))._id
        const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token

        axios.get(`game/callbreak/${gameId}/bot-move/${botId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this._vm.$socket.emit('UPDATE_GAME', { room: String(res.data._id) })
                commit('instantiateGame', res.data)
            })
            .catch((err) => {
                console.log("Error has occured")
                console.log(err.message)
            })
    },
    playHand({ commit }, card) {
        const gameId = JSON.parse(localStorage.getItem('callbreak-app-game'))._id
        const token = JSON.parse(localStorage.getItem('callbreak-app-user')).token
        const userId = JSON.parse(localStorage.getItem('callbreak-app-user'))._id

        axios.post(`game/callbreak/${gameId}/play-hand`, {
            suit: card.suit,
            value: card.value,
            playedBy: userId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this._vm.$socket.emit('UPDATE_GAME', { room: String(res.data._id) })
                commit('instantiateGame', res.data)
            })
            .catch((err) => {
                console.log("Error has occured")
                console.log(err.message)
            })
    }
};

export default actions;