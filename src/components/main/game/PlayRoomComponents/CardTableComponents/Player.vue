<template>
  <div v-if="position != 'bottom'" :class="`p-${position}`">
    <span :class="{ 'active-player': turn === player.id }">{{
      player.name
    }}</span>

    <img
      :src="
        '/img/players/' +
        (position === 'right'
          ? 'p1.png'
          : position === 'top'
          ? 'p2.png'
          : 'p3.png')
      "
    />
  </div>
</template>

<script>
export default {
  props: ["player", "position", "turn"],
  computed: {
    playerPosition() {
      const x = this.$store.getters.getPlayerPosition(this.player.id);
      console.log(x);
      return x;
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
}

div > img {
  min-width: 50px;
  image-rendering: optimizeSpeed;
}

.empty-card {
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