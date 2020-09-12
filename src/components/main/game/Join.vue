<template>
  <div id="join-window">
    <span>Game-ID:</span>
    <input id="gameId" type="text" v-model="gameId" />
    <div id="join-buttons">
      <button
        class="user-action-btn"
        v-if="this.$store.getters.gameData.status !== 'created-now-waiting'"
        type="button"
        @click="onJoinGame()"
      >Join</button>
      <button class="user-action-btn" type="button" @click="onCancelGameCreation()">Cancel</button>
    </div>
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
      this.$store.commit("hideGamejoinOptions");
    },
    onJoinGame() {
      this.$store.dispatch("joinGame", this.gameId);
    },
  },
};
</script>

<style scoped>
#join-window {
  display: grid;
  grid-row: auto;
  justify-items: center;
}

#join-buttons {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

#gameId {
  width: 100%;
  margin: 1em;
  padding: 0.25em;
  font-size: 1.5em;
  font-family: inherit;
  border: 2px solid;
}
</style>