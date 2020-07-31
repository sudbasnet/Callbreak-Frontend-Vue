<template>
  <div class="game-window">
    <form>
      <select v-model="selectedGame">
        <option v-for="game in games" :key="game">{{ game }}</option>
      </select>
    </form>
    <button type="button" @click="onCreateGame()">Create</button>
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
      this.$store.commit("hideGameCreationOptions");
    },
    onCreateGame() {
      if (this.selectedGame) {
        const res = this.$store.dispatch(
          "createGameInstance",
          this.selectedGame
        );
        console.log(res);
      }
      return;
    },
  },
};
</script>

<style scoped>
</style>