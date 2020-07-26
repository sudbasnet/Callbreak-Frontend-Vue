<template>
  <div id="forgot-password">
    <span>Please enter your email address, we will send you a link to change your current password</span>
    <form>
      <label for="email">E-mail:</label>
      <input v-model="email" type="text" />
      <button type="submit" @click.prevent="requestResetPassword">Reset Password</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
    };
  },
  methods: {
    requestResetPassword() {
      this.$store.dispatch("requestResetPassword", this.email);
    },
  },
};
</script>

<style scoped>
</style>