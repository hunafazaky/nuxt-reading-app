<template>
  <v-row>
    <v-col cols="12">
      <v-chip-group>
        <v-chip
          v-for="hashtag in hashtags" :key="hashtag.id"
          :class="`font-weight-bold accent--text`" 
          color="grey lighten-4" 
          label
          small
        >
          <v-icon x-small left>mdi-pound</v-icon>
          {{hashtag.name}}
        </v-chip>
      </v-chip-group>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HashtagButton',
  computed: {
    categories () {
      return this.$store.state.categories.list;
    },
    hashtags () {
      return this.$store.state.hashtags.list;
    }
  },
}
</script>

<style>

</style>