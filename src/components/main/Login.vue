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
      <a href="#">Forgot Password</a>
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
      this.$http.post("http://localhost:3000/user/login", this.loginInfo).then(
        (res) => {
          console.log(res.body);
        },
        (err) => {
          console.log("error");
          console.log(err);
        }
      );
    },
  },
};
</script>

<style scoped>
</style>