<template>
  <div id="home">
    <div v-if="gameStatus === 'inactive'" id="welcome" class="center-child-component">
      <h1>Welcome to Callbreak</h1>

      <p v-if="! isLoggedIn">
        You can only play with bots when you are not logged in.
        Please be aware that you might loose all game progress
        if you close your page during the game, please log-in
        for better experience.
      </p>
      <p v-if="isLoggedIn">
        This is a four-player game, if you do not have enough
        players who want to join your game, you can choose to
        add bots.
      </p>

      <ul>
        <li v-if="isLoggedIn">
          <button class="nav-link" @click="onCreateGame()">Create Game</button>
        </li>
        <li v-if="isLoggedIn">
          <button class="nav-link" @click="onJoinGame()">Join Game</button>
        </li>
        <li>
          <button class="nav-link" @click="onPlayWithBots()">Play With Bots</button>
        </li>
      </ul>
    </div>

    <app-join-game v-if="gameStatus === 'joining'"></app-join-game>

    <app-waiting-room v-if="gameStatus === 'waiting'"></app-waiting-room>

    <app-play-game v-if="gameStatus === 'active'"></app-play-game>
  </div>
</template>

<script>
import WaitingRoom from "../main/game/WaitingRoom.vue";
import Join from "../main/game/Join.vue";
import Play from "../main/game/Play";

export default {
  components: {
    "app-waiting-room": WaitingRoom,
    "app-join-game": Join,
    "app-play-game": Play,
  },
  methods: {
    onCreateGame() {
      this.$store.dispatch("createGameInstance");
    },
    onJoinGame() {
      this.$store.commit("showGameJoinOptions");
    },
    onPlayWithBots() {
      this.$store.dispatch("playWithBots"); // need to fix this
    },
  },
  computed: {
    gameStatus() {
      return this.$store.getters.gameData.status;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
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
  /* border: 2px solid; */
  padding: 5px;
}
</style>