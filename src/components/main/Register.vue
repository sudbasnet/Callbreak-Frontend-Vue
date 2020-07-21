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
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    login() {
      console.log(this.name);
      console.log(this.email);
      console.log(this.password);
      console.log(this.confirmPassword);
    }
  }
};
</script>

<style scoped>
</style>