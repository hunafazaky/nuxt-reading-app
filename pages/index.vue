<template>
  <div>
    <h1 class="text-center ma-4">Reading App</h1>
    <v-row justify="center" align="center">
      <v-col md="6" lg="5" v-if="height >= 500">
        <v-img src="/login-image.png" width="100%"></v-img>
      </v-col>
      <v-col cols="12" sm="8" md="4" lg="4">
        <v-card class="card mb-2" shaped outlined elevation="5">
          <v-card-title v-text="form_title"></v-card-title>
          <v-card-text>
            <v-text-field
              dense
              v-model="user.account.username"
              label="Username"
              type="text"
              required
            ></v-text-field>
            <v-text-field
              dense
              v-model="user.account.password"
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="mx-2">
            <v-btn
              v-if="form_title == 'Registrasi'"
              small
              color="success"
              @click="regis"
            >
              registrasi
            </v-btn>
            <v-btn
              v-if="form_title == 'Login'"
              small
              color="primary"
              @click="login"
            >
              login
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-alert
          class="mb-0"
          type="error"
          transition="slide-y-transition"
          :value="errorMessage"
        >
          {{ message }}
        </v-alert>
        <span v-if="form_title == 'Registrasi'" class="caption text--secondary"
          >Sudah punya akun?
          <span class="text-decoration-none" @click.prevent="openLoginForm"
            >Login</span
          >
        </span>
        <span v-if="form_title == 'Login'" class="caption text--secondary"
          >Belum punya akun?
          <span
            class="text-decoration-none success--text"
            @click.prevent="openRegisForm"
            >Registrasi</span
          >
        </span>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.card {
  opacity: 90% !important;
}
</style>

<script>
export default {
  layout: 'login',
  data: () => ({
    user: {
      account: {
        username: '',
        password: '',
      },
    },
    form_title: 'Registrasi',
    errorMessage: false,
    message: '',
  }),

  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 220
        case 'sm':
          return 400
        case 'md':
          return 500
        case 'lg':
          return 600
        case 'xl':
          return 800
      }
    },
  },

  methods: {
    openLoginForm() {
      this.form_title = 'Login'
    },
    openRegisForm() {
      this.form_title = 'Registrasi'
    },
    login() {
      this.$axios
        .get(`/users?username=${this.user.account.username}`)
        .then((user) => {
          this.$store.commit('users/login', user.data[0])
          this.$router.push('/home')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    regis() {
      this.$axios
        .post(`/users`, this.user)
        .then((user) => {
          if (user.data.message) {
            this.errorMessage = true
            this.message = user.data.message
          } else {
            this.$store.commit('users/login', user.data[0])
            this.$router.push('/home')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
