<template>
  <div id="app">
    <app-header></app-header>
    <main class="main">
      <router-view></router-view>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./components/shared/Header.vue";
import Footer from "./components/shared/Footer.vue";

export default {
  name: "App",
  components: {
    "app-header": Header,
    "app-footer": Footer,
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
};
</script>

<style>
</style>
