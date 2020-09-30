<template>
  <div class="card-table-container">
    <!-- player 2 -->
    <app-player
      id="p-top"
      v-if="myBetPlaced"
      :turn="turn"
      :myIndexInPlayerList="myIndexInPlayerList"
      :players="players"
      :indexDelta="2"
    ></app-player>

    <!-- player 3 -->
    <app-player
      id="p-left"
      v-if="myBetPlaced"
      :turn="turn"
      :myIndexInPlayerList="myIndexInPlayerList"
      :players="players"
      :indexDelta="3"
    ></app-player>

    <div class="cards-on-table" v-if="myBetPlaced">
      <app-card v-for="c in cardsOnTable" :key="c._id" :card="c"></app-card>
    </div>

    <!-- player 1 -->
    <app-player
      id="p-right"
      v-if="myBetPlaced"
      :turn="turn"
      :myIndexInPlayerList="myIndexInPlayerList"
      :players="players"
      :indexDelta="1"
    ></app-player>

    <!-- player 0 -->
    <div id="p-me">
      <button
        class="card-button"
        v-for="mycard in cards"
        :key="mycard._id"
        @click="playHand(mycard)"
        :disabled="!myBetPlaced || !myTurn"
      >
        <app-card :card="mycard"></app-card>
      </button>
    </div>
  </div>
</template>

<script>
import Player from "./CardTableComponents/Player";
import Card from "./CardTableComponents/Card";

export default {
  methods: {
    playHand(card) {
      this.$store.dispatch("playHand", card);
    },
  },
  components: {
    "app-card": Card,
    "app-player": Player,
  },
  props: [
    "players",
    "myBetPlaced",
    "myTurn",
    "cards",
    "cardsOnTable",
    "card",
    "indexDelta",
    "turn",
    "myIndexInPlayerList",
  ],
};
</script>

<style scoped>
.card-table-container {
  grid-area: card-table;
  display: grid;
  justify-items: center;
  align-items: center;
  gap: 0.75em;
  grid-template-rows: minmax(90px) minmax(100px) 50px;
  grid-template-columns: minmax(50px, 30%) minmax(65px, 60%) minmax(50px, 30%);
  grid-template-areas:
    ".            player-top           ."
    "player-left  cards-on-table  player-right"
    "player-me    player-me   player-me";
}

#p-top {
  grid-area: player-top;
}

#p-left {
  grid-area: player-left;
}

#p-right {
  grid-area: player-right;
}

#p-me {
  grid-area: player-me;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.cards-on-table {
  grid-area: cards-on-table;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    ".           card-top            ."
    "card-left   card-top   card-right"
    "card-left  card-bottom card-right"
    ".          card-bottom          .";
}

.card-button {
  border: none;
  margin: 0.1em;
}
</style>