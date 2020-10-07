<template>
  <div class="play-screen-totals">
    <span>{{ player.name }} : {{ player.totalScore }} pts</span>
    <span>Round: {{ round }}/5, Hand: {{ hand }}</span>
  </div>
</template>

<script>
export default {
  props: ["player", "round", "hand"],
};
</script>

<style scoped>
/* div {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 2em;
}

div > span {
  padding: 0.5em;
} */
</style>