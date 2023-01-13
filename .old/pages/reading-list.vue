<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <HashtagButton />
          <v-row class="pa-2">
            <template>
              <v-col 
                class="pa-1"
                v-for="work in worksByReadingList"
                :cols="(12 / cardLimit)"
                :key="work.id" 
              >
                <ArticleCard
                  :work="work"
                  :limit="{'text':60, 'hashtag':(Math.ceil(2 / cardLimit))}"
                />
              </v-col>
            </template>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import HashtagButton from "~/components/HashtagButton.vue";
import ArticleCard from "~/components/ArticleCard.vue";
export default {
  components: { HashtagButton, ArticleCard },
  name: "ReadingListPage",
  layout: 'default',
  data: () => ({
    me: {},
  }),
  created() {
    this.me = this.$store.state.users.list.filter(user => user.id == 3)[0];
  },
  computed: {
    works () {
      return this.$store.state.works.list
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
    worksByReadingList () {
      const data = [];
      this.me.activities.reading_list.forEach(element => {
        this.$store.state.works.list.forEach(work => {
          if (work.id == element) data.push(work);
        });
      });
      return data;
    },
  },
}
</script>