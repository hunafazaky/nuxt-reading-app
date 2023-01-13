<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <v-carousel
            cycle
            height="100%"
            hide-delimiters
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="category in categories"
              :key="category.id"
            >
              <v-card-title :class="`${category.color} mb-3`">
                <v-icon left>mdi-tag</v-icon>
                {{category.name}}
              </v-card-title>
              <v-row class="pa-2">
                <template v-for="(work, i) in worksByCategory(category.id)">
                  <v-col 
                    class="pa-1"
                    :cols="(12 / cardLimit)"
                    :key="work.id" 
                    v-if="i < 3"
                  >
                    <ArticleCard
                      :work="work"
                      :limit="{'text':60, 'hashtag':(Math.ceil(2 / cardLimit))}"
                    />
                  </v-col>
                </template>
              </v-row>
              <v-card-actions>
                <v-btn 
                  class="ml-auto mt-5"
                  :color="category.color"
                  fab
                > 
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </v-card-actions>
            </v-carousel-item>
          </v-carousel>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <HashtagButton />
          <v-row class="pa-2">
            <template>
              <v-col 
                class="pa-1"
                v-for="work in works"
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
  name: "HomePage",
  layout: 'default',
  data: () => ({
    outlined: true,
  }),
  computed: {
    works () {
      return this.$store.state.works.list;
    },
    worksByCategory () {
      return key => this.$store.state.works.list.filter(work => work.type.category == key );
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
    categories () {
      return this.$store.state.categories.list
    }
  },
}
</script>