<template>
  <v-app dark class="main-style">
    <GlobalSnackbar />
    <Nuxt />
  </v-app>
</template>

<script>
import GlobalSnackbar from "../components/GlobalSnackbar.vue";

export default {
  components: {
    GlobalSnackbar,
  },
  mounted() {
    if (localStorage.getItem("auth_token")) {
      this.$router.push("/home");
    }
  },
};
</script>

<style scoped>
.main-style {
  background-image: url("/auth-bg.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom left;
}
</style>
