<template>
  <header class="header">
    <h2 class="header__text">{{ title }}</h2>
    <li v-if="isLoggedIn">
      <base-button @click="logout">Logout</base-button>
    </li>
  </header>
</template>

<script>
export default {
  data() {
    return {
      title: "Note App",
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/userAuth");
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gold;
  padding: 2rem 0;
}

.header__text {
  font-size: 2rem;
  font-weight: 500;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: black;
  text-transform: uppercase;
  text-decoration: wavy;
  text-overflow: ellipsis;
}
</style>
