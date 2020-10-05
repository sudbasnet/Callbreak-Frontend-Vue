export const DEFAULT_GAME_DATA = {
    // unique identifier sent by the backend
    _id: null,
    // is the game 'active' or 'inactive'
    status: 'inactive',
    // host
    createdBy: null,

    // which hand? (1 ... 13)
    handNumber: null,
    // which round? (1 ... 5)
    roundNumber: null,

    cardsOnTable: [],

    myTurn: false,
    myBetPlaced: false,
    myBet: 1,
    myScore: 0,
    myOts: 0,
    myTotalScore: 0,
    myCards: [],
    myValidMoves: [],

    // which playerId's turn
    turn: null,

    // cards played so far in this game
    playedHands: [[]],

    // all the scores in all the 5 games
    scores: [
        { playerId: null, gameNumber: null, score: null }
    ],

    // list of all players info for the current game
    playerList: [
        {
            id: null,
            name: null,
            bot: null,
            bet: null,
            score: null,
            totalScore: null,
            betPlaced: false
        }
    ]
}

export const DEFAULT_USER_DATA = {
    _id: null,
    email: null,
    name: null,
    userType: null,
    token: null
}
