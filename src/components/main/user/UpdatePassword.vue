<template>
  <div>
    <form class="register-form">
      <div class="register-form-group">
        <label for="currentPassword">Password</label>
        <input type="password" name="currentPassword" v-model="updatePwInfo.currentPassword" />
      </div>
      <div class="register-form-group">
        <label for="newPassword">Password</label>
        <input type="password" name="newPassword" v-model="updatePwInfo.newPassword" />
      </div>
      <div class="register-form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" v-model="updatePwInfo.confirmPassword" />
      </div>
      <button @click.prevent="register">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updatePwInfo: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    register() {
      this.$store.dispatch("updatePassword", this.updatePwInfo);
    },
  },
};
</script>

<style scoped>
</style>