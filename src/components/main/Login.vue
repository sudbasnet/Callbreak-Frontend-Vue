<template>
  <div>
    <form>
      <label for="email">E-mail</label>
      <input type="text" name="email" v-model="loginInfo.email" />
      <label for="password">Password</label>
      <input type="password" name="password" v-model="loginInfo.password" />
      <button type="submit" @click.prevent="login">Login</button>
      <button type="button">Forgot Password</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginInfo: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$http.post('http://localhost:4000/login', this.loginInfo)
        .then(res => {
          console.log(res);
          }, err => {
            console.log('error');
            console.log(err);
          });
    }
  }
};
</script>

<style scoped>
</style>