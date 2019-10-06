<template>
  <v-app>
    <h1 class="text-center mt-12">Room condition</h1>
    <v-btn
      v-if="this.$store.state.user.loggedIn"
      class="mt-10 mx-auto d-block"
      color="primary"
      @click="logout"
      >Logout</v-btn
    >
    <router-view></router-view>
    <footer class="text-center mt-10">©2019 Ken</footer>
  </v-app>
</template>

<script>
import firebase from "@/utils/firebase.js";

export default {
  components: {},
  data: () => ({}),
  methods: {
    logout() {
      firebase.logout();
      this.$router.push("/");
    }
  }
};
</script>
