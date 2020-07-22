<template>
  <div>
    <form class="register-form">
      <div class="register-form-group">
        <label for="name">Player Name</label>
        <input type="text" name="name" v-model="registrationInfo.name" />
      </div>
      <div class="register-form-group">
        <label for="email">E-mail</label>
        <input type="text" name="email" v-model="registrationInfo.email" />
      </div>
      <div class="register-form-group">
        <label for="password">Password</label>
        <input type="password" name="password" v-model="registrationInfo.password" />
      </div>
      <div class="register-form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" v-model="registrationInfo.confirmPassword" />
      </div>
      <button type="submit" @click.prevent="register">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registrationInfo: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    register() {
      console.log(this.registrationInfo);
      this.$http
        .put("http://localhost:3000/user/register", this.registrationInfo)
        .then(
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