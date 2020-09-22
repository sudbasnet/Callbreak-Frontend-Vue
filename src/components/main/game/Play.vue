<template>
  <div id="play-screen">
    <div id="head-scoreboard">
      <div id="head-score">{{ playerMe.name }} : {{playerMe.totalScore }} pts</div>
      <span>Round {{ roundNumber }}/5</span>
    </div>

    <div id="card-table">
      <!-- player 2 -->
      <app-player class="player-top" :players="playerList" :indexDelta="2"></app-player>
      <!-- player 3 -->
      <app-player class="player-left" :players="playerList" :indexDelta="3"></app-player>
      <div class="on-table">
        <app-card
          v-for="card in cardsOnTable"
          :key="card._id"
          :cardvalue="card.value"
          :cardsuit="card.suit"
        ></app-card>
      </div>
      <!-- player 1 -->
      <app-player class="player-right" :players="playerList" :indexDelta="1"></app-player>
      <!-- player 0 -->
      <div class="player-me">
        <button
          v-for="mycard in mycards"
          :key="mycard._id"
          @click="playHand({suit: mycard.suit, value: mycard.value})"
          :disabled="!game.myBetPlaced || !game.myTurn"
          class="card-button"
        >
          <app-card :cardvalue="mycard.value" :cardsuit="mycard.suit"></app-card>
        </button>
      </div>
    </div>

    <div id="bettingboard">
      <div class="bet" v-for="player in playerList" :key="player.id">
        <span>{{player.name}}</span>
        <div>
          <span v-for="i in player.bet" :key="i">{{" "}} █ {{" "}}</span>

          <span v-if="isBetting && myTurn">
            <button
              v-if="player.id === playerMe.id"
              class="bet-control"
              @click="$store.commit('decreaseBet')"
            >-</button>
            <button
              v-if="player.id === playerMe.id"
              class="bet-control"
              @click="$store.commit('increaseBet')"
            >+</button>
          </span>
        </div>
      </div>
    </div>
    <div class="user-action-div" v-if="isBetting && myTurn">
      <button class="user-action-btn" type="button" @click="placeBet">Confirm Claim</button>
    </div>
    <div class="user-action-div">
      <button class="user-action-btn" type="button" @click="onCancelGameCreation">Cancel</button>
    </div>
  </div>
</template>

<script>
import Card from "./Card";
import Player from "./Player";

export default {
  methods: {
    limitNames(name, limit) {
      return name.substring(0, limit) ? name.length > limit : name;
    },
    placeBet() {
      this.$store.dispatch("placeBet", this.$store.getters.playerMe.bet);
    },
    onCancelGameCreation() {
      this.$store.dispatch("cancelGame");
    },
    playHand(card) {
      this.$store.dispatch("playHand", card);
    },
  },
  computed: {
    user() {
      return this.$store.getters.userData;
    },
    game() {
      return this.$store.getters.gameData;
    },
    mycards() {
      // need to sort this by suits and then values
      return this.$store.getters.mycards;
    },
    playerList() {
      return this.$store.getters.playerList;
    },
    myIndexInPlayerList() {
      return this.$store.getters.playerList.findIndex(
        (p) => p.id === this.$store.getters.userData._id
      );
    },
    playerNames() {
      return this.$store.getters.playerList.map((p) => p.name);
    },
    roundNumber() {
      return this.$store.getters.roundNumber;
    },
    totalPoints() {
      // array of everyone's points
      return this.$store.getters.totalPoints;
    },
    currentScores() {
      // returns score out of bet
      return this.$store.getters.scores;
    },
    currentTurn() {
      return this.$store.getters.currentTurn;
    },
    myTurn() {
      return (
        this.$store.getters.currentTurn === this.$store.getters.userData._id
      );
    },
    cardsOnTable() {
      return this.$store.getters.cardsOnTable;
    },
    playedRounds() {
      // drop down on the Round Number
      // shows all hands played this game
      return this.$store.getters.playedRounds;
    },
    playerMe() {
      return this.$store.getters.playerMe;
    },
    isBetting() {
      return this.$store.getters.isBetting;
    },
  },
  components: {
    "app-card": Card,
    "app-player": Player,
  },
  props: ["cardvalue", "cardsuit", "players", "indexDelta"],
};
</script>

<style scoped>
#play-screen {
  min-height: 400px;
}

#card-table {
  display: grid;
  justify-items: center;
  align-items: center;
  gap: 0.75em;
  grid-template-rows: 1fr 1.5fr 1fr;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas:
    ".            player-top           ."
    "player-left  on-table  player-right"
    "player-me    player-me   player-me ";
}

#scoreboards,
#bettingboard {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  margin: 25px 5px;
}

#scoreboards > div,
#bettingboard > div {
  border-top: 2px solid black;
  border-right: 2px solid black;
  min-width: 250px;
}

.scores,
.bet {
  padding: 0.25em 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.scoreboard {
  /* padding: 0.25em; */
  font-size: 1.25em;
}

.player-top {
  grid-area: player-top;
}

.player-left {
  grid-area: player-left;
}

.player-right {
  grid-area: player-right;
}

.player-me {
  grid-area: player-me;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.on-table {
  grid-area: on-table;
  display: flex;
  align-content: space-between;
}

.card-button {
  border: none;
}

#head-scoreboard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2em;
  font-size: 1.25em;
}

#head-score {
  padding: 0.25em;
  /* border: 2px solid; */
}

@media only screen and (max-width: 600px) {
  .scoreboard {
    font-size: 1em;
  }

  #head-scoreboard {
    padding-bottom: 1em;
    font-size: 1em;
  }

  #scoreboards,
  #bettingboard {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr;
    border-bottom: 2px solid black;
    border-left: 2px solid black;
    margin: 25px 5px;
  }
}

.bet-control {
  border: none;
  background-color: none;
  padding: 0.5em;
  font-family: inherit;
  margin: 2px;
}
</style>