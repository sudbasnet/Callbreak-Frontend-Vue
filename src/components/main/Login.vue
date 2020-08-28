<template>
  <div>
    <form class="login-form">
      <div class="login-form-group">
        <label for="email">E-mail:</label>
        <input type="text" name="email" v-model="loginInfo.email" />
      </div>
      <div class="login-form-group">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="loginInfo.password" />
      </div>
      <div>
        <router-link class="non-nav-link" to="/forgot-password">Forgot Password</router-link>
      </div>
      <div class="user-action-div">
        <button class="user-action-btn" type="submit" @click.prevent="login">Login</button>
      </div>
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
input {
  border: 2px solid #4b4a4a;
  width: 300px;
  font-size: 1.25em;
  font-family: inherit;
  height: 1.5em;
}

input:focus {
  border: 2px solid #000000;
  color: #676c72;
}

button {
  border: none;
  font-family: inherit;
  background-color: transparent;
  font-size: 2em;
}

label {
  padding-bottom: 0.5em;
}

.non-nav-link {
  text-decoration: none;
  color: #676c72;
}

.non-nav-link:hover {
  color: #292b2c;
}
</style>