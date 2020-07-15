<template>
  <div>
    <form>
      <label for="email">E-mail</label>
      <input type="text" name="email" v-model="email" />
      <label for="password">Password</label>
      <input type="password" name="password" v-model="password" />
      <button type="submit" @click.prevent="login">Login</button>
      <button type="button">Forgot Password</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      console.log(this.email);
      console.log(this.password);
    }
  }
};
</script>

<style scoped>
</style>