<template>
  <div id="waiting-room">
    <div id="waiting-info" class="center-child-component">
      <p>Your Game-ID is:</p>

      <p style="display: flex; align-items: center">
        <span id="gameid">{{ this.$store.getters.gameData._id }}</span>
        <button
          style="
            font-size: 1em;
            margin-left: 10px;
            border: 2px solid;
            padding: 0.25em;
          "
          type="button"
          @click="copyGameId"
        >
          COPY
        </button>
      </p>

      <p>share your game-Id with friends</p>
      <p>OR</p>
      <p>PRESS START, all empty slots will be filled by bots</p>
      <!-- <div class="user-action-div">
        <button class="nav-link" @click="onPlayWithBots()">Play With Bots</button>
      </div>-->
    </div>

    <div class="playerboxes">
      <span
        class="playerbox"
        v-for="player in playersLookup"
        :key="player.id"
        :class="{ 'light-text': !player.name }"
        >{{ player.name ? player.name : "Waiting ..." }}</span
      >
    </div>
    <div class="user-action-div start-cancel">
      <button
        class="user-action-btn"
        type="button"
        @click="onCancelGameCreation"
      >
        Cancel
      </button>
      <button
        class="user-action-btn"
        type="button"
        v-if="myCreation"
        @click="onStartGame"
      >
        Start
      </button>
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
      this.$store.dispatch("cancelGame");
    },
    onPlayWithBots() {
      this.$store.commit("showGameJoinOptions");
    },
    copyGameId() {
      navigator.clipboard
        .writeText(this.$store.getters.gameData._id)
        .then(() => {
          console.log("gameId copied to clipboard");
        })
        .catch((err) => {
          console.log("could not copy gameId, reason: " + err);
        });
    },
    onStartGame() {
      this.$store.dispatch("start", this.$store.getters.gameData._id);
    },
  },
  computed: {
    playersLookup() {
      return this.$store.getters.playersLookup;
    },
    myCreation() {
      return this.$store.getters.createdBy === this.$store.getters.userData._id;
    },
  },
};
</script>

<style scoped>
.start-cancel {
  grid-template-columns: 1fr 1fr;
}

#gameid {
  font-size: 1.5em;
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

#waiting-info > p {
  padding: 0.5em;
}

.playerboxes {
  height: 135px;
}
</style>