<template>
  <div>
    <h1 v-if="loggedInUser" style="font-size: 25px; padding: 10px;">Welcome {{ loggedInUser }}</h1>
    <button v-if="gameStatus === 'off'" type="button" @click="onCreateGame()">Create Game</button>

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
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.user.name;
    },
    gameStatus() {
      return this.$store.getters.status;
    },
  },
};
</script>

<style scoped>
</style>