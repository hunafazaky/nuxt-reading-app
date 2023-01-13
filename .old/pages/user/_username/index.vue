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
            <v-btn 
              v-if="user.id == me.id" 
              class="my-5"
              color="warning" 
              small block outlined
              nuxt :to="`/user/${me.account.username}/update`"
            >
              <v-icon left>mdi-account-cog</v-icon>
              Edit Data Pengguna
            </v-btn>
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
      <v-row class="pa-2">
        <template v-for="(work, i) in works">
          <v-col 
            class="pa-1"
            :cols="(12 / cardLimit)"
            :key="work.id" 
            v-if="i < loadLimit"
          >
            <ArticleCard
              :work="work"
              :limit="{'text':60, 'hashtag':(Math.ceil(2 / cardLimit))}"
            />
          </v-col>
        </template>
      </v-row>
      <v-btn 
        class="my-2 accent"
        v-if="works.length > loadLimit" 
        @click="loadLimit = loadLimit + 12"
        block 
      >
        Muat Lebih Banyak
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'UserIndexPage',
  data: () => ({
    me: {},
    user: {},
    loadLimit: 12
  }),
  created() {
    this.me = this.$store.state.users.list.filter(user => user.id == 1)[0];
    const user_username = this.$route.params.username;
    this.user = this.$store.state.users.list.filter(user => user.account.username == user_username)[0];
  },
  computed: {
    display() {
      return this.$vuetify.breakpoint.name;
    },
    cardLimit() {
      switch (this.display) {
        case 'xs': return 1;
        case 'sm': return 2;
        case 'md': return 2;
        case 'lg': return 3;
        case 'xl': return 3;          
        default: return 1;
      }
    },
    region () {
      return this.$store.state.regions.list.filter(region => region.id == this.user.profile.region_id)[0];
    },
    works () {
      return this.$store.state.works.list.filter(work => work.writer.user_id == this.user.id);
    }
  },
}
</script>