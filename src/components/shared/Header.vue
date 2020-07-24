<template>
  <header class="header">
    <nav class="nav">
      <div class="navbar-block">
        <h1 style="font-size: 25px; padding: 10px;">Callbreak</h1>
        <ul class="nav-links">
          <router-link to="/login" tag="li" active-class="active">
            <a class="nav-link">Login</a>
          </router-link>
          <router-link to="/register" tag="li" active-class="active">
            <a class="nav-link">Register</a>
          </router-link>
          <router-link to="/" tag="li" active-class="active" exact>
            <a class="nav-link" href="#" @click="logout">Logout</a>
          </router-link>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      if (this.$router.currentRoute.path != "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
</style>