<template>
  <v-snackbar v-model="show" :color="color" :timeout="3000" top right>
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="show = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    show: {
      get() {
        return this.$store.state.snackbar.show;
      },
      set(val) {
        if (!val) {
          this.$store.commit("snackbar/hideMessage");
        }
      },
    },
    message() {
      return this.$store.state.snackbar.message;
    },
    color() {
      return this.$store.state.snackbar.color;
    },
  },
};
</script>
