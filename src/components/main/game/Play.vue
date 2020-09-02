<template>
  <div id="play-screen">
    <div id="head-scoreboard">
      <div id="head-score">{{ playerMe.playerName }} : {{playerMe.currentScore }} pts</div>
      <span>Game {{ gameNumber }}/5</span>
    </div>
    <div id="card-table">
      <div class="player-top empty-card">Card</div>
      <div class="player-left empty-card">Card</div>
      <div class="on-table">Card Card Card</div>
      <div class="player-right empty-card">Card</div>
      <div class="player-me">
        <app-card
          v-for="mycard in mycards"
          :key="mycard._id"
          :cardvalue="mycard.value"
          :cardsuit="mycard.suit"
        ></app-card>
      </div>
    </div>
    <div id="scoreboards">
      <div class="scores" v-for="playerName in playerNames" :key="playerName">
        <span class="scoreboard">{{playerName}}</span>
        <span class="scorebar">█</span>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card";

export default {
  methods: {
    limitNames(name, limit) {
      return name.substring(0, limit) ? name.length > limit : name;
    },
  },
  computed: {
    mycards() {
      // need to sort this by suits and then values
      return this.$store.getters.mycards;
    },
    playerNames() {
      console.log(this.$store.getters.playerNames);
      return this.$store.getters.playerNames;
    },
    gameNumber() {
      return this.$store.getters.gameNumber;
    },
    totalPoints() {
      // array of everyone's points
      return this.$store.getters.totalPoints;
    },
    currentScores() {
      // returns score out of bet
      return this.$store.getters.currentScores;
    },
    currentTurn() {
      return this.$store.getters.currentTurn;
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
  },
  components: {
    "app-card": Card,
  },
  props: ["cardvalue", "cardsuit"],
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

#scoreboards {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  margin: 25px 5px;
}

#scoreboards > div {
  border-top: 2px solid black;
  border-right: 2px solid black;
  min-width: 250px;
}

.scores {
  padding: 0.25em 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* .scorebars {
    padding: 0.25em; 
} */

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

.empty-card {
  height: 4em;
  width: 2.75em;
  border: 3px solid;
  display: grid;
  justify-content: center;
  align-content: center;
  color: #868e96;
}

.active-player {
  color: #000000;
}

@media only screen and (max-width: 600px) {
  .scoreboard {
    font-size: 1em;
  }

  #head-scoreboard {
    padding-bottom: 1em;
    font-size: 1em;
  }

  #scoreboards {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr;
    border-bottom: 2px solid black;
    border-left: 2px solid black;
    margin: 25px 5px;
  }
}
</style>