<template>
  <header class="header">
    <nav class="nav">
      <div class="navbar-block">
        <router-link to="/" tag="h1">
          <a class="home-link active">CallBreak</a>
        </router-link>
        <ul class="nav-links">
          <li>
            <router-link
              to="/login"
              class="nav-link"
              v-if="!loggedInUser"
              active-class="active"
            >Login</router-link>
          </li>
          <li>
            <router-link
              to="/register"
              class="nav-link"
              v-if="!loggedInUser"
              active-class="active"
            >Register</router-link>
          </li>
          <li v-if="loggedInUser">
            <a class="nav-link" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.user.name;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
a {
  cursor: pointer;
}
h1 {
  font-size: 25px;
  padding: 10px;
}
.home-link {
  text-decoration: none;
}
</style>