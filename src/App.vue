<template>
  <div id="app">
    <app-header></app-header>
    <app-main></app-main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Main from "./components/main/Main";

export default {
  name: "App",
  components: {
    "app-header": Header,
    "app-main": Main,
    "app-footer": Footer,
  },
  created() {
    this.$store.dispatch("autoLogin");
    this.$store.dispatch("refreshGame");
  },
  sockets: {
    GAME_UPDATED() {
      console.log("UPDATE_GAME message received");
      this.$store.dispatch("refreshGame");
    },
    GAME_EXITED() {
      console.log("You have exited the game");
      this.$store.dispatch("refreshGame");
    },
  },
};
</script>

<style>
</style>
