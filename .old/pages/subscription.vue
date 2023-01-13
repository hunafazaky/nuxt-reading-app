<template>
  <v-row>
    <v-col cols="12" v-for="subscription in subscriptions" :key="subscription.id">
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <NuxtLink 
            :to="`/user/${subscription.account.username}`"
            class="mt-5 text-decoration-none d-flex"
          >
            <div>
              <v-img
                class="rounded-circle mr-2"
                cover
                aspect-ratio="1"
                width="30px"
                :src="subscription.profile.image_src"
              ></v-img>
            </div>
            <h4 class="white--text" v-text="subscription.profile.name"></h4>
          </NuxtLink>
          <v-btn
            v-if="subscribe == true" 
            class="mt-5 secondary--text" 
            color="transparent" 
            depressed
            @click="subscribe = false"
          >
            <v-icon left>mdi-account-check</v-icon>
            Diikuti
          </v-btn>
          <v-btn
            v-if="subscribe == false"
            class="mt-5" 
            plain
            @click="subscribe = true"
          >
            <v-icon left>mdi-account-plus</v-icon>
            Ikuti
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div v-if="subscription.activities.works.length > 0">
            <v-carousel
              height="100%"
              cycle
              hide-delimiters
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="index in (Math.ceil(subscription.activities.works.length / cardLimit))"
                :key="index"
              >
                <v-row class="pa-2">
                  <template v-for="(work, i) in works(subscription.id)">
                    <v-col 
                      class="pa-1"
                      :cols="(12 / cardLimit)"
                      :key="work.id" 
                      v-if="i >= ((index - 1) * cardLimit) && i < (index * cardLimit)"
                    >
                      <ArticleCard
                        :work="work"
                        :limit="{'text':60, 'hashtag':(Math.ceil(2 / cardLimit))}"
                      />
                    </v-col>
                  </template>
                </v-row>
              </v-carousel-item>
            </v-carousel>
          </div>
          <div v-if="subscription.activities.works.length == 0">
            <h2 class="text-center" style="padding-top: 100px; padding-bottom: 100px;">Belum Ada Karya yang Dibuat</h2>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ArticleCard from "~/components/ArticleCard.vue";
export default {
  components: { ArticleCard },
  name: "SubscriptionPage",
  layout: 'default',
  data: () => ({
    me: {},
    subscribe: true,
  }),
  created() {
    this.me = this.$store.state.users.list.filter(user => user.id == 3)[0];
  },
  methods: {
  },
  computed: {
    works () {
      return key => this.$store.state.works.list.filter(work => work.writer.user_id == key );
    },
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
    subscriptions () {
      const data = [];
      this.me.activities.subscriptions.forEach(element => {
        this.$store.state.users.list.forEach(user => {
          if (user.id == element) data.push(user);
        });
      });
      return data;
    },
  },
}
</script>