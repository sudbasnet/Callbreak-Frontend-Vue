<template>
  <div>
    <span>Welcome</span>
    <button type="button">Start Game</button>
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