<template>
  <div class="play-room-container center-child-component">
    <div class="play-screen">
      <app-headboard
        id="head-scoreboard"
        :player="playerMe"
        :round="game.roundNumber"
        :hand="game.handNumber"
      ></app-headboard>

      <app-cardtable
        :players="game.playerList"
        :myBetPlaced="game.myBetPlaced"
        :myTurn="game.myTurn"
        :cardsOnTable="game.cardsOnTable"
        :cards="game.myCards"
        :turn="game.turn"
        :myIndexInPlayerList="index"
      ></app-cardtable>

      <app-bettingboard
        id="bettingboard"
        :players="game.playerList"
        :userId="user._id"
        :myBetPlaced="game.myBetPlaced"
      >
      </app-bettingboard>

      <app-buttons
        id="buttons"
        :myTurn="game.myTurn"
        :myBetPlaced="game.myBetPlaced"
      ></app-buttons>
    </div>
  </div>
</template>

<script>
// import Card from "./Card";
// import Player from "./Player";
import HeadBoard from "./PlayRoomComponents/HeadBoard";
import BettingBoard from "./PlayRoomComponents/BettingBoard";
import GameButtons from "./PlayRoomComponents/GameButtons";
import CardTable from "./PlayRoomComponents/CardTable";

export default {
  methods: {
    limitNames(name, limit) {
      return name.substring(0, limit) ? name.length > limit : name;
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
      return this.$store.getters.mycards;
    },
    index() {
      return this.$store.getters.playerList.findIndex(
        (p) => p.id === this.$store.getters.userData._id
      );
    },
    totalPoints() {
      // array of everyone's points
      return this.$store.getters.totalPoints;
    },
    currentScores() {
      // returns score out of bet
      return this.$store.getters.scores;
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
    "app-headboard": HeadBoard,
    "app-bettingboard": BettingBoard,
    "app-buttons": GameButtons,
    "app-cardtable": CardTable,
  },
  props: [
    "players",
    "userId",
    "myBetPlaced",
    "round",
    "hand",
    "cardsOnTable",
    "cards",
    "turn",
    "myIndexInPlayerList",
  ],
};
</script>

<style scoped>
.play-screen {
  min-height: 400px;
  display: grid;
  grid-template-rows: 50px minmax(245px, 400px) minmax(176px, 200px) minmax(
      40,
      100px
    );
  grid-template-areas:
    "head-scoreboard"
    "card-table"
    "bettingboard"
    "buttons";
}

#head-scoreboard {
  grid-area: head-scoreboard;
}
#card-table {
  grid-area: card-table;
}

#bettingboard {
  grid-area: bettingboard;
}

#buttons {
  grid-area: buttons;
}

/* #scoreboards {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  margin: 25px 5px;
} */

/* #scoreboards > div {
  border-top: 2px solid black;
  border-right: 2px solid black;
  min-width: 250px;
} */

/* .scores {
  padding: 0.25em 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
} */

/* .scoreboard {
  font-size: 1.25em;
} */
</style>