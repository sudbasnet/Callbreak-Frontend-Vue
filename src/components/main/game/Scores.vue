<template>
  <div class="main-scores">
    <div class="nameboxes">
      <span class="namebox" v-for="p in playerList" :key="p.id"
        >{{ `${p.name}: ${p.totalScore}` }}
      </span>
    </div>
    <span class="user-action-div">
      <button class="user-action-btn" v-if="!gameOver" @click="nextRound">
        Next Round
      </button>
    </span>
    <span class="user-action-div">
      <button class="user-action-btn" @click="end">End</button>
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    end() {
      console.log("end game!");
      this.$store.dispatch("cancelGame");
    },
    nextRound() {
      this.$store.dispatch("start", this.gameId);
    },
  },
  computed: {
    playerList() {
      return this.$store.getters.playerList;
    },
    gameOver() {
      return this.$store.getters.gameData.roundNumber === 0;
    },
  },
  props: ["gameId"],
};
</script>

<style scoped>
/* .score-display-all {
  background-color: ivory;
  min-height: 400px;
  min-width: 250px;
  position: absolute;
  z-index: 100;
  display: grid;
  align-items: center;
} */
</style>