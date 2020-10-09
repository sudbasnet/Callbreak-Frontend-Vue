<template>
  <div class="center-child-component">
    <p class="large-text">Welcome</p>

    <p class="info-text" v-if="!isLoggedIn">
      You can either register and log-in or play as guest. You can directly
      invite friends from your friend-list when you are logged in.
    </p>

    <p class="info-text" v-if="!isLoggedIn">
      If you are not logged in, you might loose all game progress if you stay
      inactive for a few days, please log-in for better experience.
    </p>

    <p class="info-text" v-if="isLoggedIn">
      This is a four-player game, if you do not have enough players who want to
      join your game, you can choose to add bots.
    </p>

    <ul class="center-child-component" style="list-style: none">
      <li v-if="isLoggedIn">
        <button class="user-action-btn" @click="onCreateGame()">
          Create Game
        </button>
      </li>
      <li v-if="isLoggedIn">
        <button class="user-action-btn" @click="onJoinGame()">Join Game</button>
      </li>
      <li v-if="playingAsGuest != true && !isLoggedIn">
        <button class="user-action-btn" @click="playingAsGuest = true">
          Play As Guest
        </button>
      </li>
      <li v-if="playingAsGuest != true && !isLoggedIn">
        <router-link to="/login" tag="button" class="user-action-btn"
          >Login</router-link
        >
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

<style scoped>
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

p {
  padding: 0.5em;
}
</style>