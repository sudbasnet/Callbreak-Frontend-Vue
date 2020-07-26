<template>
  <div>
    <h1 v-if="loggedInUser" style="font-size: 25px; padding: 10px;">Welcome {{ loggedInUser }}</h1>
    <button type="button">Start Game</button>
  </div>
</template>

<script>
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.user.name;
    },
  },
};
</script>

<style scoped>
</style>