<template>
  <div id="waiting-room">
    <div class="center-child-component">
      <p>Your Game-ID is:</p>
      <p>
        <span id="gameid">{{ this.$store.getters.gameData._id }}</span>
      </p>
      <p>Please share it with friends to allow them to join your game.</p>
      <p>OR</p>
      <div class="user-action-div">
        <button class="nav-link" @click="onPlayWithBots()">Play With Bots</button>
      </div>
    </div>

    <div class="nameboxes">
      <span
        class="namebox"
        v-for="player in playersLookup"
        :key="player.playerId"
        :class="{ 'light-text': !player.playerName }"
      >{{ player.playerName ? player.playerName : 'Waiting ...' }}</span>
    </div>
    <div class="user-action-div start-cancel">
      <button class="user-action-btn" type="button" @click="onStartGame()">Start</button>
      <button class="user-action-btn" type="button" @click="onCancelGameCreation()">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onCancelGameCreation() {
      this.$store.dispatch("cancelGameCreation");
    },
    onPlayWithBots() {
      this.$store.commit("showGameJoinOptions");
    },
  },
  computed: {
    playersLookup() {
      return this.$store.getters.playersLookup;
    },
  },
};
</script>

<style scoped>
.nameboxes {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  margin: 25px 5px;
}

.nameboxes > span {
  border-top: 2px solid black;
  border-right: 2px solid black;
  min-width: 300px;
}

.namebox {
  padding: 1em;
  font-size: 1.5em;
}

.start-cancel {
  grid-template-columns: 1fr 1fr;
}
#gameid {
  font-size: 2em;
}

.light-text {
  color: #868e96;
}

button {
  border: none;
  font-family: inherit;
  background-color: transparent;
  font-size: 2em;
  cursor: pointer;
}
</style>