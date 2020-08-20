<template>
  <div>
    <h1 v-if="userName" style="font-size: 25px; padding: 10px;">Welcome {{ userName }}</h1>
    <button v-if="gameStatus === 'off'" type="button" @click="onCreateGame()">Create Game</button>
    <button v-if="gameStatus === 'off'" type="button" @click="onJoinGame()">Join Game</button>

    <app-initialize-game v-if="gameStatus != 'off' && gameStatus != 'joining'"></app-initialize-game>
    <app-join-game v-if="gameStatus === 'joining'"></app-join-game>
  </div>
</template>

<script>
import InitializeGame from "../main/games/InitializeGame.vue";
import JoinGame from "../main/games/JoinGame.vue";

export default {
  components: {
    "app-initialize-game": InitializeGame,
    "app-join-game": JoinGame,
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