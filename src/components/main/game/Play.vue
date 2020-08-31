<template>
  <div id="play-screen">
    <div id="head-scoreboard">
      <div id="head-score">Sameer Basnet I : 15 pts</div>
      <span>Round x</span>
    </div>
    <div id="card-table">
      <div class="player-top">Card</div>
      <div class="player-left">Card</div>
      <div class="on-table">Card Card Card</div>
      <div class="player-right">Card</div>
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
      <div class="scoreboard">Sameer Basnet I</div>
      <div class="scoreboard">Sameer Basnet II</div>
      <div class="scoreboard">Sameer Basnet III</div>
      <div class="scoreboard">Sameer Basnet IV</div>
    </div>
  </div>
</template>

<script>
import Card from "./Card";

export default {
  computed: {
    mycards() {
      return this.$store.getters.mycards;
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
  min-height: 500px;
}

#card-table {
  display: grid;
  justify-items: center;
  align-items: center;
  gap: 0.75em;
  grid-template-rows: 1fr 2fr 1fr;
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

@media only screen and (max-width: 600px) {
  #scoreboards {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr;
    border-bottom: 2px solid black;
    border-left: 2px solid black;
    margin: 25px 5px;
  }
}

#scoreboards > div {
  border-top: 2px solid black;
  border-right: 2px solid black;
  min-width: 250px;
}

.scoreboard {
  padding: 0.25em;
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
  justify-content: space-between;
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
  border: 2px solid;
}
</style>