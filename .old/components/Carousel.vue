<template>
  <v-carousel v-model="model">
    <v-carousel-item
      v-for="(color, i) in colors"
      :key="color"
    >
      <!-- <v-sheet
        :color="color"
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="text-h2">
            Slide {{ i + 1 }}
          </div>
        </v-row>
      </v-sheet> -->
      <v-row>
        <v-col cols="12">
          <ArticleCard 
            :works="works" 
            cols="6"
            :limit="{'category':i, 'card':5, 'text':100, 'hashtag':4}"
          />
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    name: 'Carousel',
    data: () => ({
      model: 1,
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
    }),
    computed: {
      works () {
        return this.$store.state.works.list
      }
    },
  }
</script>

<style>

</style>