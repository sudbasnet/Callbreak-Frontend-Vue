<template>
  <div>
    <div class="nameboxes">
      <span
        class="namebox"
        v-for="player in playersLookup"
        :key="player.id"
        :class="{ 'light-text': !player.name }"
        >{{ player.name ? player.name : "Waiting ..." }}
      </span>
    </div>
    <div class="user-action-div start-cancel">
      <button
        class="user-action-btn"
        type="button"
        v-if="myCreation"
        @click="onStartGame"
      >
        Start
      </button>
      <button
        class="user-action-btn"
        type="button"
        @click="onCancelGameCreation"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    game() {
      return this.$store.getters.gameData;
    },
  },
};
</script>

<style scoped>
</style>