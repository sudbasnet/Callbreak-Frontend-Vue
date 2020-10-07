<template>
  <div class="center-child-component">
    <h1>Welcome to Callbreak</h1>

    <p v-if="!isLoggedIn">
      You can only play with bots when you are not logged in. Please be aware
      that you might loose all game progress if you close your page during the
      game, please log-in for better experience.
    </p>
    <p v-if="isLoggedIn">
      This is a four-player game, if you do not have enough players who want to
      join your game, you can choose to add bots.
    </p>

    <ul>
      <li v-if="isLoggedIn">
        <button class="nav-link" @click="onCreateGame()">Create Game</button>
      </li>
      <li v-if="isLoggedIn">
        <button class="nav-link" @click="onJoinGame()">Join Game</button>
      </li>
      <li v-if="playingAsGuest != true && !isLoggedIn">
        <button class="nav-link" @click="playingAsGuest = true">
          Play As Guest
        </button>
      </li>
    </ul>
    <div v-if="playingAsGuest && !isLoggedIn">
      <form class="center-child-component">
        <label for="guestName">And what do we call you?</label>
        <input type="text" name="guestName" v-model="guestName" />
        <button
          type="submit"
          class="user-action-btn nav-link"
          @click.prevent="registerGuest"
        >
          Submit
        </button>
      </form>
      <div class="user-action-div"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playingAsGuest: false,
      guestName: "",
    };
  },
  props: ["isLoggedIn"],

  methods: {
    registerGuest() {
      this.playingAsGuest = false;
      this.$store.dispatch("registerGuest", this.guestName); // need to fix this
      this.playingAsGuest = false;
    },
    onCreateGame() {
      this.$store.dispatch("createGameInstance");
    },
    onJoinGame() {
      this.$store.commit("showGameJoinOptions");
    },
  },
};
</script>