<template>
  <div>
    <form class="login-form">
      <div class="login-form-group">
        <label for="email">E-mail</label>
        <input type="text" name="email" v-model="loginInfo.email" />
      </div>
      <div class="login-form-group">
        <label for="password">Password</label>
        <input type="password" name="password" v-model="loginInfo.password" />
      </div>
      <button type="submit" @click.prevent="login">Login</button>
      <router-link class="nav-link" to="/forgot-password">Forgot Password</router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginInfo: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", this.loginInfo);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
</style>