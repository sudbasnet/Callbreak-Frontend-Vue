<template>
  <div class="player" :class="{'active-player': currentTurn === player.id}">
    <span>{{ player.name }}</span>
    <div class="empty-card" :class="{'active-player': currentTurn === player.id}">Cards</div>
  </div>
</template>

<script>
export default {
  props: ["players", "indexDelta"],
  computed: {
    currentTurn() {
      return this.$store.getters.currentTurn;
    },
    player() {
      const i = this.$store.getters.playerList.findIndex(
        (p) => p.id === this.$store.getters.userData._id
      );
      return this.players[(i + this.indexDelta) % 4];
    },
  },
};
</script>

<style scoped>
.empty-card {
  height: 4em;
  width: 2.75em;
  border: 3px solid;
  display: grid;
  justify-content: center;
  align-content: center;
  color: #868e96;
}

.player {
  color: #868e96;
}

.active-player {
  color: #000000;
}
</style>