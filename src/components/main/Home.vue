<template>
  <div id="home" class="center-child-component">
    <div
      v-if="game.status === 'inactive'"
      id="welcome"
      class="center-child-component"
    >
      <h1>Welcome to Callbreak</h1>

      <p v-if="!isLoggedIn">
        You can only play with bots when you are not logged in. Please be aware
        that you might loose all game progress if you close your page during the
        game, please log-in for better experience.
      </p>
      <p v-if="isLoggedIn">
        This is a four-player game, if you do not have enough players who want
        to join your game, you can choose to add bots.
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

    <app-join-game v-if="game.status === 'joining'"></app-join-game>

    <app-waiting-room v-if="game.status === 'waiting'"></app-waiting-room>

    <app-play-game v-if="game.status === 'active' && !newRound"></app-play-game>

    <app-scores
      class="totalscores"
      v-if="newRound"
      :gameId="game._id"
    ></app-scores>
  </div>
</template>

<script>
import WaitingRoom from "../main/game/WaitingRoom.vue";
import Join from "../main/game/Join.vue";
import PlayRoom from "../main/game/PlayRoom";
import Scores from "../main/game/Scores";

export default {
  data() {
    return {
      playingAsGuest: false,
      guestName: "",
    };
  },
  components: {
    "app-waiting-room": WaitingRoom,
    "app-join-game": Join,
    "app-play-game": PlayRoom,
    "app-scores": Scores,
  },
  methods: {
    onCreateGame() {
      this.$store.dispatch("createGameInstance");
    },
    onJoinGame() {
      this.$store.commit("showGameJoinOptions");
    },
    registerGuest() {
      this.playingAsGuest = false;
      this.$store.dispatch("registerGuest", this.guestName); // need to fix this
      this.playingAsGuest = false;
    },
  },
  computed: {
    game() {
      return this.$store.getters.gameData;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    newRound() {
      return this.game.handNumber === 0 && this.game.roundNumber > 1;
    },
  },
  props: ["gameId"],
};
</script>

<style scoped>
button {
  border: none;
  font-family: inherit;
  background-color: transparent;
  font-size: 2em;
  cursor: pointer;
}

ul {
  list-style: none;
  display: grid;
  justify-items: center;
  align-items: center;
  padding-top: 2em;
}

h1 {
  padding-bottom: 20px;
}

#welcome {
  display: grid;
  justify-items: center;
  align-items: center;
  max-width: 620px;
}

#home {
  margin: 0px 5px;
  min-width: 350px;
  padding: 5px;
  justify-items: center;
  align-items: center;
}

input {
  border: 2px solid #4b4a4a;
  width: 300px;
  font-size: 1.25em;
  font-family: inherit;
  height: 1.5em;
  padding: 0px 5px;
}

input:focus {
  border: 2px solid #000000;
}
</style>