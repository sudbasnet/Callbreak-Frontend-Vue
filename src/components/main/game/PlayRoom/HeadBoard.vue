<template>
  <div id="headboard-container">
    <span>{{ player.name }} : {{ player.totalScore }} pts</span>
    <span>Round: {{ round }}/5</span>
  </div>
</template>

<script>
export default {
  props: ["player", "round"],
};
</script>

<style scoped>
div {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 2em;
}

div > span {
  padding: 0.5em;
}
</style>