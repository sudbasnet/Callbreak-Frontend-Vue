<template>
  <div class="play-screen-buttons">
    <span id="cancel" class="user-action-div">
      <button class="user-action-btn" type="button" @click="cancelGameCreation">
        Cancel
      </button>
    </span>
    <span id="confirm" class="user-action-div" v-if="myTurn && !myBetPlaced">
      <button class="user-action-btn" type="button" @click="placeBet">
        Confirm
      </button>
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    cancelGameCreation() {
      this.$store.dispatch("cancelGame");
    },
    placeBet() {
      this.$store.dispatch("placeBet", this.$store.getters.playerMe.bet);
    },
  },
  props: ["myBetPlaced", "myTurn"],
};
</script>

<style scoped>
/* .buttons-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-around;
} */
</style>