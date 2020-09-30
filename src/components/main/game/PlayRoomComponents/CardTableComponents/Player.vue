<template>
  <div class="player-container">
    <span :class="{ 'active-player': turn === player.id }">{{
      player.name
    }}</span>
    <div class="empty-card" :class="{ 'active-player': turn === player.id }">
      Cards
    </div>
  </div>
</template>

<script>
export default {
  props: ["players", "indexDelta", "turn", "myIndexInPlayerList"],
  computed: {
    player() {
      return this.players[(this.myIndexInPlayerList + this.indexDelta) % 4];
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

.player-container {
  color: #868e96;
}

.active-player {
  color: #000000;
}
</style>