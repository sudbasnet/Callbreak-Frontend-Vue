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

          <li v-if="loggedInUser" class="dropdown-container">
            <a class="nav-link" @click="toggleDropdown">{{loggedInUser}} ▼</a>

            <ul class="dropdown-items">
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
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
// import { NavigationFailureType, isNavigationFailure } from "vue-router";

export default {
  data() {
    return {
      dropdown: false,
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.userData.name;
    },
    isDropdown() {
      console.log(this.dropdown);
      return this.dropdown;
    },
  },
  methods: {
    logout() {
      this.$store.commit("logoutUser");
      this.$router.push("/").catch((failure) => {
        // if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
        // console.log("redirecting to home...");
        console.log(failure.message);
        // }
      });
    },
    toggleDropdown() {
      this.dropdown = !this.dropdown;
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

.dropdown-container {
  position: relative;
}

.dropdown-container .dropdown-items {
  visibility: hidden;
  position: absolute;
  margin-top: 10px;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  list-style: none;
  z-index: 1;
}

.dropdown-container:hover .dropdown-items {
  visibility: visible;
}

.dropdown-items li {
  width: 100%;
  height: 2em;
  background: rgba(255, 255, 255);
}

.dropdown li:hover {
  background: rgba(255, 255, 255);
}
</style>