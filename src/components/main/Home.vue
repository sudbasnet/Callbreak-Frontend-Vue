<template>
  <div>
    <div v-if="gameStatus === 'off'" id="welcome">
      <h1>Welcome to Callbreak</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
        software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>

      <ul>
        <li>
          <button class="nav-link" @click="onCreateGame()">Create Game</button>
        </li>
        <li>
          <button class="nav-link" @click="onJoinGame()">Join Game</button>
        </li>
        <li>
          <button
            class="nav-link"
            v-if="gameStatus === 'off'"
            @click="onPlayWithBots()"
          >Play With Bots</button>
        </li>
      </ul>
    </div>

    <app-waiting-room v-if="gameStatus != 'off' && gameStatus != 'joining'"></app-waiting-room>

    <app-join-game v-if="gameStatus === 'joining'"></app-join-game>
  </div>
</template>

<script>
import WaitingRoom from "../main/game/WaitingRoom.vue";
import Join from "../main/game/Join.vue";

export default {
  components: {
    "app-waiting-room": WaitingRoom,
    "app-join-game": Join,
  },
  methods: {
    onCreateGame() {
      this.$store.dispatch("createGameInstance", "callbreak");
    },
    onJoinGame() {
      this.$store.commit("showGameJoinOptions");
    },
    onPlayWithBots() {
      this.$store.commit("showGameJoinOptions");
    },
  },
  computed: {
    userName() {
      return this.$store.getters.userData.name;
    },
    gameStatus() {
      return this.$store.getters.gameData.status;
    },
    gameData() {
      return this.$store.getters.gameData;
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
</style>