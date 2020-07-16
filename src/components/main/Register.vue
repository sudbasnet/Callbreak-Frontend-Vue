<template>
  <div>
    <form>
      <label for="name">E-mail</label>
      <input type="text" name="name" v-model="name" />
      <label for="email">E-mail</label>
      <input type="text" name="email" v-model="email" />
      <label for="password">Password</label>
      <input type="password" name="password" v-model="password" />
      <label for="confirmPassword">Password</label>
      <input type="password" name="confirmPassword" v-model="confirmPassword" />
      <button type="submit" @click.prevent="login">Register</button>
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