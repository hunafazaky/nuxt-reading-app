<template>
  <v-app dark>
    <v-navigation-drawer      
      v-if="display == 'md' || display == 'lg'  || display == 'xl'"
      v-model="drawer"
      :mini-variant="miniVariant"
      clipped
      fixed
      app
    >
      <v-list> 
        <v-list-item
          v-for="(menu, i) in menus"
          :key="i"
          :to="menu.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="menu.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-subheader inset v-show="!miniVariant">Diikuti</v-subheader>
      <v-list v-show="!miniVariant"> 
        <v-list-item
          v-for="subscription in subscriptions"
          :key="subscription.id"
          :to="`/user/${subscription.account.username}`"
          router
          exact
        >
          <v-list-item-action>
            <v-img
              class="rounded-circle"
              cover
              aspect-ratio="1"
              width="20px"
              :src="subscription.profile.image_src"
              v-bind="attrs"
              v-on="on"
            ></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="subscription.profile.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon 
        v-if="display == 'lg' || display == 'xl'"
        @click.stop="drawer = true, miniVariant = !miniVariant" />
      <v-app-bar-nav-icon 
        v-if="display == 'md'"
        @click.stop="miniVariant = false, drawer = !drawer" />
      <NuxtLink to="/" class="text-decoration-none">
        <v-toolbar-title v-text="'Reading Platform'" />
      </NuxtLink>
      <v-spacer />
      <v-text-field
        v-if="display == 'md' || display == 'xl' || display == 'lg'"
        class="mt-6"
        append-icon="mdi-magnify"
        label="Search"
        solo
        dense
      ></v-text-field>
      <v-spacer />
      <v-btn 
        v-if="display == 'md' || display == 'lg' || display == 'xl'" 
        nuxt to="/work/write"
        icon
      >
        <v-icon>mdi-shape-square-plus</v-icon>
      </v-btn>
      <v-btn v-if="display == 'xs' || display == 'sm'" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn 
        @click="isSubsDialogVisible = true"
        icon
      >
        <v-icon>mdi-account-heart</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="pa-2">
            <v-img
              class="rounded-circle"
              cover
              aspect-ratio="1"
              :src="me.profile.image_src"
              v-bind="attrs"
              v-on="on"
            ></v-img>
          </v-btn>
        </template>
        <v-list>
          <v-list-item nuxt :to="`/user/${me.account.username}`">
            <v-list-item-title>Profil Pengguna</v-list-item-title>
          </v-list-item>
          <v-list-item @click="signOutDialog">
            <v-list-item-title class="red--text">Keluar</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-app-bar 
      v-if="display == 'xs' || display == 'sm'" 
      clipped-left fixed bottom app
    >
      <div style="width: 100%;" class="d-flex justify-space-between"> 
        <v-btn icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-table-search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-shape-square-plus</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-bookmark-box-multiple</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-book-clock</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <FormDialog 
          :formTitle="formTitle"
          :isFormDialogVisible="isFormDialogVisible"
          @close="isFormDialogVisible = false"
          @signOut="signOut"
        />
        <SubsDialog 
          :isSubsDialogVisible="isSubsDialogVisible"
          @close="isSubsDialogVisible = false"
        />
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'DefaultLayout',
    data: () => ({
      on: null,
      attrs: null,
      formTitle: '',
      isFormDialogVisible: false,
      isSubsDialogVisible: false,
      fixed: true,
      drawer: true,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      menus: [
        {
          icon: 'mdi-home',
          title: 'Beranda',
          to: '/home',
        },
        {
          icon: 'mdi-table-search',
          title: 'Eksplorasi',
          to: '/explore',
        },
        {
          icon: 'mdi-bookmark-box-multiple',
          title: 'Berlangganan',
          to: '/subscription',
        },
        {
          icon: 'mdi-book-clock',
          title: 'Daftar Bacaan',
          to: '/reading-list',
        },
      ],
    }),
    created() {
      this.me = this.$store.state.users.list.filter(user => user.id == 1)[0];
    },
    computed: {
      subscriptions() {
        const data = [];
        this.me.activities.subscriptions.forEach(element => {
          this.$store.state.users.list.forEach(user => {
            if (user.id == element) data.push(user);
          });
        });
        return data;
      },
      users () {
        return this.$store.state.users.list
      },
      display() {
        return this.$vuetify.breakpoint.name;
      },
    },
    methods: {
      signOutDialog() {
        this.formTitle = 'Keluar';
        this.isFormDialogVisible = true;
      },
      signOut() {
        this.isFormDialogVisible = false;
        this.signed = false;
        this.$router.push(`/`);
      },
    },


    // computed: {
    //     fields () {
    //       if (!this.model) return []
    //       return Object.keys(this.model).map(key => {
    //         return {
    //           key,
    //           value: this.model[key] || 'n/a',
    //         }
    //       })
    //     },
    //     items () {
    //       return this.entries.map(entry => {
    //         const Description = entry.Description.length > this.descriptionLimit
    //           ? entry.Description.slice(0, this.descriptionLimit) + '...'
    //           : entry.Description
    //         return Object.assign({}, entry, { Description })
    //       })
    //     },
    //   },
    //   watch: {
    //     search (val) {
    //       // Items have already been loaded
    //       if (this.items.length > 0) return
    //       // Items have already been requested
    //       if (this.isLoading) return
    //       this.isLoading = true
    //       // Lazily load input items
    //       fetch('https://api.publicapis.org/entries')
    //         .then(res => res.json())
    //         .then(res => {
    //           const { count, entries } = res
    //           this.count = count
    //           this.entries = entries
    //         })
    //         .catch(err => {
    //           console.log(err)
    //         })
    //         .finally(() => (this.isLoading = false))
    //     },
    //   },
  }
</script>
