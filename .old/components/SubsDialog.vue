<template>
  <v-row justify="center">
    <v-dialog
      v-model="isSubsDialogVisible"
      :fullscreen="display == 'sm' || display == 'xs'"
      scrollable persistent
      max-width="800px"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>
          Akun yang {{menu}}
          <v-spacer></v-spacer>
          <v-btn
            dark
            icon
            @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 400px;">
          <v-list-item
            v-for="user in users(menu)"
            :key="user.id"
            nuxt :to="`/user/${user.account.username}`"
            active-class="white--text"
          >
            <v-list-item-action>
              <v-img
                class="rounded-circle"
                cover
                aspect-ratio="1"
                width="20px"
                :src="user.profile.image_src"
              ></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="user.profile.name" />
            </v-list-item-content>
            <v-list-item-action v-if="menu == 'Diikuti'">
              <v-btn
                text
                v-if="subscribe == true" 
                class="secondary--text" 
                color="transparent" 
                depressed
                @click="subscribe = false"
              >
                <v-icon left>mdi-account-check</v-icon>
                Diikuti
              </v-btn>
              <v-btn
                text
                v-if="subscribe == false"
                plain
                @click="subscribe = true"
              >
                <v-icon left>mdi-account-plus</v-icon>
                Ikuti
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card-text>
        <v-card-actions>
          <v-btn 
            :class="menu == 'Diikuti' ? 'blue--text text--lighten-1':'text--secondary'"
            text
            @click="menu = 'Diikuti'" 
          >
            Diikuti
          </v-btn>
          <v-btn 
            :class="menu == 'Mengikuti' ? 'blue--text text--lighten-1':'text--secondary'"
            text
            @click="menu = 'Mengikuti'" 
          >
            Mengikuti
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    name: 'SubsDialog',
    props: ['isSubsDialogVisible'],
    data: () => ({
      me: {},
      menu: 'Diikuti',
      subscribe: true
    }),
    created() {
      this.me = this.$store.state.users.list.filter(user => user.id == 1)[0];
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
    computed: {
      users() {
        return key => {
          const data = [];
          if (key == 'Diikuti') {
            this.me.activities.subscriptions.forEach(element => {
              this.$store.state.users.list.forEach(user => {
                if (user.id == element) data.push(user);
              });
            });
          } 
          if (key == 'Mengikuti') {
            this.me.activities.subscriber.forEach(element => {
              this.$store.state.users.list.forEach(user => {
                if (user.id == element) data.push(user);
              });
            });
          } return data;
        }
      },
      display() {
        return this.$vuetify.breakpoint.name;
      },
    },
  }
</script>

<style>

</style>