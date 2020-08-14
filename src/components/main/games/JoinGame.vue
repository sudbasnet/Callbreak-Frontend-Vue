<template>
  <div class="game-window">
    <form>
      <input type="text" />
    </form>
    <div v-if="this.$store.getters.gameData.status === 'created-now-waiting'">
      <p>Your Game-ID is {{ this.$store.getters.gameData.gameId }}, Please share it with friends to allow them to join.</p>
      <p>Or you can just play with bots.</p>
      <button>Play With Bots</button>
    </div>
    <button
      v-if="this.$store.getters.gameData.status !== 'created-now-waiting'"
      type="button"
      @click="onCreateGame()"
    >Create</button>
    <button type="button" @click="onCancelGameCreation()">Cancel</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      games: ["Callbreak", "Other Stupid Games"],
      selectedGame: "",
    };
  },
  methods: {
    onCancelGameCreation() {
      this.$store.dispatch("cancelGameCreation");
    },
    onCreateGame() {
      if (this.selectedGame) {
        this.$store.dispatch("createGameInstance", this.selectedGame);
      }
      return;
    },
  },
};
</script>

<style scoped>
</style>