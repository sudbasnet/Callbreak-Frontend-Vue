<template>
  <div class="play-screen-scores">
    <div class="playerboxes">
      <div class="playerbox" v-for="player in players" :key="player.id">
        <span>{{ player.name }}</span>
        <span>
          <span
            v-for="i in player.bet"
            :key="i"
            :class="{ 'text-light': i > player.score }"
            >{{ " " }} █</span
          >
          <span
            v-if="!myBetPlaced && player.id === userId"
            style="margin-left: 0.25em"
          >
            <button class="bet-control" @click="decreaseBet">-</button>
            <button class="bet-control" @click="increaseBet">+</button>
          </span>
          <span v-if="myBetPlaced" class="ot text-light">{{
            ` .0${player.ots}`
          }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["players", "userId", "myBetPlaced"],
  methods: {
    decreaseBet() {
      this.$store.commit("decreaseBet");
    },
    increaseBet() {
      this.$store.commit("increaseBet");
    },
  },
};
</script>

<style scoped>
/* .bettingboard-container {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  margin: 25px 5px;
}

.bet {
  padding: 0.25em 1em;
  min-width: 250px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid black;
  border-right: 2px solid black;
}

.ot {
  align-self: flex-end;
  justify-self: end;
}

@media only screen and (max-width: 600px) {
  .bettingboard-container {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr;
    border-bottom: 2px solid black;
    border-left: 2px solid black;
    margin: 25px 5px;
  }
} */
.bet-control {
  border: none;
  background-color: none;
  width: 25px;
  height: 25px;
  /* padding: ; */
  font-family: inherit;
  margin: 0px 2px;
}
</style>