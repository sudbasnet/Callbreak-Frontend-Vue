<template>
  <div class="main-home">
    <app-welcome
      v-if="game.status === 'inactive'"
      :isLoggedIn="isLoggedIn"
    ></app-welcome>

    <app-join-game v-if="game.status === 'joining'"></app-join-game>

    <app-waiting-room v-if="game.status === 'waiting'"></app-waiting-room>

    <app-play-game v-if="game.status === 'active' && !newRound"></app-play-game>

    <app-scores v-if="newRound" :gameId="game._id"></app-scores>
  </div>
</template>

<script>
import WaitingRoom from "../main/game/WaitingRoom.vue";
import Join from "../main/game/Join.vue";
import PlayRoom from "../main/game/PlayRoom";
import Scores from "../main/game/Scores";
import Welcome from "../main/Welcome";

export default {
  components: {
    "app-waiting-room": WaitingRoom,
    "app-join-game": Join,
    "app-play-game": PlayRoom,
    "app-scores": Scores,
    "app-welcome": Welcome,
  },
  methods: {},
  computed: {
    game() {
      return this.$store.getters.gameData;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    newRound() {
      return this.game.handNumber === 0 && this.game.roundNumber > 1;
    },
  },
  props: ["gameId"],
};
</script>

<style scoped>
</style>