<template>
  <div id="app">
    <app-header></app-header>
    <main class="main">
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
    "app-header": Header,
    "app-login-form": Login,
    "app-footer": Footer
  }
};
</script>

<style>
</style>
