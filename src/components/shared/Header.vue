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
          <li v-if="loggedInUser" class="dropdown">
            <a class="nav-link">{{loggedInUser}}▼</a>
            <ul>
              <li>
                <router-link class="nav-link" to="/profile">Profile</router-link>
              </li>
              <li>
                <router-link class="nav-link" to="/account-settings">Settings</router-link>
              </li>
              <li>
                <a class="nav-link" @click="logout">Logout</a>
              </li>
            </ul>
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
      return this.$store.getters.userData.name;
    },
  },
  methods: {
    logout() {
      this.$store.commit("logoutUser");
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

.dropdown {
  position: relative;
}

.dropdown button {
  background: none;
  cursor: pointer;
  border: none;
}

.dropdown ul {
  /* background: rgba(255, 255, 255, 0.5); */
  /* border-radius: 5px; */
  position: absolute;
  margin-top: 10px;
  /* width: 200px; */
  /* height: 100px; */
  min-width: 150px;
  height: 2em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  list-style: none;
  z-index: 1;
  display: none;
}

.dropdown:hover ul {
  display: block;
  border: none;
}

.dropdown li {
  width: 100%;
  height: 100%;
}
.dropdown li:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>