<template>
  <div>
    <h1 class="text-center ma-4">Reading Apps</h1>
    <v-row justify="center" align="center">
      <v-col md="6" lg="5" v-if="height >= 500">
        <v-img src="/login-image.png" width="100%"></v-img>
      </v-col>
      <v-col cols="12" sm="8" md="4" lg="4">
        <v-card class="card" shaped outlined elevation="5">
          <v-card-title>Registration</v-card-title>
          <v-card-text>
            <form>
              <v-text-field
                dense
                v-model="username"
                :error-messages="usernameErrors"
                :counter="12"
                label="Username"
                required
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
              ></v-text-field>
              <v-text-field
                dense
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-text-field
                dense
                v-model="password"
                :error-messages="passwordErrors"
                label="Password"
                type="password"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field>
              <!-- <v-select
                v-model="select"
                :items="items"
                :error-messages="selectErrors"
                label="Item"
                required
                @change="$v.select.$touch()"
                @blur="$v.select.$touch()"
              ></v-select> -->
              <v-checkbox
                v-model="checkbox"
                :error-messages="checkboxErrors"
                label="Do you agree?"
                required
                @change="$v.checkbox.$touch()"
                @blur="$v.checkbox.$touch()"
              ></v-checkbox>
              <NuxtLink to="/home">
                <v-btn
                  class="mr-4"
                  @click="submit"
                >
                  submit
                </v-btn>
              </NuxtLink>
              <v-btn @click="clear">
                clear
              </v-btn>
            </form>
          </v-card-text>
        </v-card>
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
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
  import WorkPreview from '../components/WorkPreview.vue'

  export default {
    layout: 'login',
    mixins: [validationMixin],
    validations: {
      username: { required, maxLength: maxLength(12) },
      password: { required, minLength: minLength(8) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      username: '',
      password: '',
      email: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      usernameErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.maxLength && errors.push('Username must be at most 12 characters long')
        !this.$v.username.required && errors.push('Username is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Password must be at least 8 characters long')
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
      height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 220
          case 'sm': return 400
          case 'md': return 500
          case 'lg': return 600
          case 'xl': return 800
        }
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.username = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
    },
  }
</script>