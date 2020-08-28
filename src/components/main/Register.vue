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
      <div class="user-action-div">
        <button class="user-action-btn" @click.prevent="register">Register</button>
      </div>
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
      this.$store.dispatch("register", this.registrationInfo);
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
</style>