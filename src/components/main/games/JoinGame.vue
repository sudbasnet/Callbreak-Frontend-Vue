<template>
  <div class="game-window">
    <form>
      <div class="join-game-form-group">
        <label for="gameId">Game-ID:</label>
        <input type="text" name="gameId" v-model="gameId" />
      </div>
    </form>

    <button
      v-if="this.$store.getters.gameData.status !== 'created-now-waiting'"
      type="button"
      @click="onJoinGame()"
    >Join</button>
    <button type="button" @click="onCancelGameCreation()">Cancel</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameId: null,
    };
  },
  methods: {
    onCancelGameCreation() {
      this.$store.dispatch("cancelGameCreation");
    },
    onJoinGame() {
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