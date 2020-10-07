<template>
  <div class="play-screen-game">
    <app-player
      v-for="player in players"
      :key="player.id"
      :player="player"
      :turn="turn"
      :position="cardTablePosition(player.id)"
    ></app-player>

    <div class="cards-on-table" v-if="myBetPlaced">
      <app-card
        v-for="c in cardsOnTable"
        :key="c._id"
        :card="c"
        :position="cardTablePosition(c.playedBy)"
      ></app-card>
    </div>

    <div class="my-cards">
      <button
        class="card-button"
        v-for="mycard in cards"
        :key="mycard._id"
        :disabled="!myBetPlaced || !myTurn"
        @click="playHand(mycard)"
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
    cardTablePosition(playerId) {
      const pList = this.$store.getters.playerList;
      const myId = this.$store.getters.userData._id;
      const myIndex = pList.findIndex((p) => p.id === myId);
      if (playerId === pList[(myIndex + 1) % 4].id) {
        return "right";
      } else if (playerId === pList[(myIndex + 2) % 4].id) {
        return "top";
      } else if (playerId === pList[(myIndex + 3) % 4].id) {
        return "left";
      } else {
        return "bottom";
      }
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
    "position",
  ],
};
</script>

<style scoped>
/* .card-table-container {
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

.card-top {
  grid-area: card-top;
}

.card-right {
  grid-area: card-right;
}

.card-left {
  grid-area: card-left;
}

.card-bottom {
  grid-area: card-bottom;
}
*/
.card-button {
  border: none;
  margin: 0.1em;
}
</style>