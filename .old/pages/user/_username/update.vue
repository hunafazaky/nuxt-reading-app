<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="3" class="pa-5">
          <v-card elevation="5" rounded="circle">
            <v-img
              class="rounded-circle"
              cover
              aspect-ratio="1"
              :src="user.profile.image_src"
            ></v-img>
          </v-card>
        </v-col>
        <v-col cols="9" class="pa-5">
          <small class="info--text">Nama Pengguna</small>
          <h2 class="mb-4" v-text="user.account.username"></h2>
          <small class="info--text">Nama</small>
          <h2 class="mb-4" v-text="user.profile.name"></h2>
          <v-row>
            <v-col>
              <small class="info--text" >Tanggal Lahir</small>
              <h2 class="mb-4" v-text="user.profile.birthdate"></h2>
            </v-col>
            <v-col>
              <small class="info--text" >Region</small>
              <h2 class="mb-4" v-text="region.name"></h2>
            </v-col>
          </v-row>
          <small class="info--text">BIO</small>
          <p class="mb-4" v-text="user.profile.bio"></p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'UserUpdatePage',
  data: () => ({
    user: {},
  }),
  created() {
    const user_username = this.$route.params.username;
    this.user = this.$store.state.users.list.filter(user => user.account.username == user_username)[0];
  },
  computed: {
  },
}
</script>