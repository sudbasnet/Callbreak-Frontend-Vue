<template>
  <div>
    <h1 v-if="userName" style="font-size: 25px; padding: 10px;">Welcome {{ userName }}</h1>
    <button v-if="gameStatus === 'off'" type="button" @click="onCreateGame()">Create Game</button>
    <button v-if="gameStatus === 'off'" type="button" @click="onGameJoin()">Join Game</button>

    <app-initialize-game v-if="gameStatus != 'off'"></app-initialize-game>
  </div>
</template>

<script>
import InitializeGame from "../main/games/InitializeGame.vue";

export default {
  components: {
    "app-initialize-game": InitializeGame,
  },
  methods: {
    onCreateGame() {
      this.$store.commit("showGameCreationOptions");
    },
    onJoinGame() {
      this.$store.commit("showGameJoinOptions");
    },
  },
  computed: {
    userName() {
      return this.$store.getters.userData.name;
    },
    gameStatus() {
      return this.$store.getters.gameData.status;
    },
    gameData() {
      return this.$store.getters.gameData;
    },
  },
};
</script>

<style scoped>
</style>