<template>
  <div>
    <v-btn class="mt-10 mx-auto d-block" color="primary" @click="googleLogin"
      >Google login</v-btn
    >
    <p v-if="this.error">{{ this.$store.state.user.error }}</p>
    <p class="text-center mt-2 caption">
      ※Googleログインを使用しますが個人情報は保存しておりません
    </p>
  </div>
</template>

<script>
import firebase from "@/utils/firebase.js";

export default {
  data: () => ({
    error: false
  }),
  methods: {
    async googleLogin() {
      const result = await firebase.login();
      if (result) {
        this.$router.push("/graph");
        this.error = false;
      } else {
        this.error = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
