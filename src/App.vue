<template>
  <div id="app">
    <app-header></app-header>
    <main class="main">
      <img alt="Vue logo" src="./assets/logo.png" />
      <app-login-form></app-login-form>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Login from "./components/main/Login.vue";
import Header from "./components/shared/Header.vue";
import Footer from "./components/shared/Footer.vue";

export default {
  name: "App",
  components: {
    "app-login-form": Login,
    "app-header": Header,
    "app-footer": Footer
  }
};
</script>

<style>
</style>
