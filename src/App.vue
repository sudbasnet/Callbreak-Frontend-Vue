<template>
  <div id="app">
    <app-header></app-header>
    <img alt="Vue logo" src="./assets/logo.png" />
    <app-login-form></app-login-form>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
