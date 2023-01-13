<template>
  <v-row justify="center">
    <v-dialog
      v-model="isDialogVisible"
      persistent
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{formTitle}}
          <v-spacer/>
          <v-btn 
            icon
            @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div v-if="formTitle == 'Masuk'">
            <v-text-field
              label="Nama Pengguna"
              hide-details="auto"
              v-model="signin.username"
              :rules="rules.username"
            ></v-text-field>
            <v-text-field 
              label="Kata Kunci"
              hide-details="auto"
              v-model="signin.password"
              :type="isPasswordVisible ? 'text':'password'"
              :rules="rules.password"
              :append-icon="isPasswordVisible ? 'mdi-eye-off':'mdi-eye'"
              @click:append="isPasswordVisibleToggle"
            ></v-text-field>
          </div>
          <div v-if="formTitle == 'Keluar'">
            <p>Apakah And yakin ingin Keluar?</p>
          </div>
          <div v-if="formTitle == 'Daftar'">
            <v-row>
              <v-col>
                <v-text-field
                  label="Nama Depan"
                  hide-details="auto"
                  v-model="signup.name.first"
                  :rules="rules.name"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Nama Belakang"
                  hide-details="auto"
                  v-model="signup.name.last"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Nama Pengguna"
                  hide-details="auto"
                  v-model="signup.username"
                  :rules="rules.username"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  label="Tgl Lahir"
                  type="date"
                  hide-details="auto"
                  v-model="signup.birthdate"
                  :rules="rules.birthdate"
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-select
                  label="Asal Kota"
                  hide-details="auto"
                  v-model="signup.region"
                  :rules="rules.region"
                  :items="regions"
                  item-value="id"
                  item-text="name"
                  return-object
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field 
                  label="Kata Kunci"
                  hide-details="auto"
                  v-model="signup.password"
                  :type="isPasswordVisible ? 'text':'password'"
                  :rules="rules.password"
                  :append-icon="isPasswordVisible ? 'mdi-eye-off':'mdi-eye'"
                  @click:append="isPasswordVisibleToggle"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field 
                  label="Ulangi Kata Kunci"
                  hide-details="auto"
                  v-model="password2nd"
                  :type="isPasswordVisible ? 'text':'password'"
                  :rules="rules.password2nd"
                  :append-icon="isPasswordVisible ? 'mdi-eye-off':'mdi-eye'"
                  @click:append="isPasswordVisibleToggle"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="grey lighten-1"
            text
            @click="close"
          >
            Batal
          </v-btn>
          <v-btn
            v-if="formTitle == 'Masuk'"
            color="green lighten-1"
            text
            @click="signIn"
          >
            Masuk
          </v-btn>
          <v-btn
            v-if="formTitle == 'Keluar'"
            color="red lighten-1"
            text
            @click="signOut"
          >
            Keluar
          </v-btn>
          <v-btn
            v-if="formTitle == 'Daftar'"
            color="blue lighten-1"
            text
            @click="close"
          >
            Daftar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'FormDialog',
  props: ['formTitle', 'isDialogVisible', 'isPasswordVisible'],
  data: () => ({
    password2nd: '',
    signin: {},
    signup: {
      name: {}
    },
    rules: {
      name: [
        value => !!value || 'Required.',
      ],
      username: [
        value => !!value || 'Required.',
        value => (value && value.length >= 6) || 'Min. 6 karakter',
      ],
      birthdate: [
        value => !!value || 'Required.',
      ],
      password: [
        value => !!value || 'Required.',
        value => (value && value.length >= 6) || 'Min. 6 karakter',
      ],
      password2nd: [
        value => !!value || 'Required.',
      ],
    },
    regions: [
      {
        id: 1,
        name:'Kota Cilegon',
      },
      {
        id: 2,
        name:'Kota Bandung',
      },
      {
        id: 3,
        name:'Kota Jakarta',
      },
    ],
  }),
  methods: {
    isPasswordVisibleToggle() {
      this.$emit('isPasswordVisibleToggle');
    },
    close() {
      this.$emit('close');
    },
    signIn() {
      this.$emit('signIn');
    },
    signOut() {
      this.$emit('signOut');
    },
  },
  computed: {
    
  }
}
</script>

<style>

</style>