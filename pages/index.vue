<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="5">
      <PostPreview/>
      <PostPreview/>
      <PostPreview/>
    </v-col>
    <v-col cols="12" sm="8" md="5">
      <v-card>
        <v-card-title>Profile Page</v-card-title>
        <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda illo, adipisci maxime incidunt perspiciatis voluptate esse! Sed, adipisci maiores quidem ut magni cumque praesentium sint et, sit nostrum quibusdam.</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<!-- <v-card>
  <v-card-title class="headline">
    Welcome to the Vuetify + Nuxt.js template
  </v-card-title>
  <v-card-text>
    <p>
      Vuetify is a progressive Material Design component framework for
      Vue.js. It was designed to empower developers to create amazing
      applications.
    </p>
    <p>
      For more information on Vuetify, check out the
      <a
        href="https://vuetifyjs.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        documentation </a
      >.
    </p>
    <p>
      If you have questions, please join the official
      <a
        href="https://chat.vuetifyjs.com/"
        target="_blank"
        rel="noopener noreferrer"
        title="chat"
      >
        discord </a
      >.
    </p>
    <p>
      Find a bug? Report it on the github
      <a
        href="https://github.com/vuetifyjs/vuetify/issues"
        target="_blank"
        rel="noopener noreferrer"
        title="contribute"
      >
        issue board </a
      >.
    </p>
    <p>
      Thank you for developing with Vuetify and I look forward to bringing
      more exciting features in the future.
    </p>
    <div class="text-xs-right">
      <em><small>&mdash; John Leider</small></em>
    </div>
    <hr class="my-3" />
    <a
      href="https://nuxtjs.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Nuxt Documentation
    </a>
    <br />
    <a
      href="https://github.com/nuxt/nuxt.js"
      target="_blank"
      rel="noopener noreferrer"
    >
      Nuxt GitHub
    </a>
  </v-card-text>
  <v-card-actions>
    <v-spacer />
    <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
  </v-card-actions>
</v-card> -->

<script>
import PostPreview from '../components/PostPreview.vue'

export default {
    name: "IndexPage",
    data: () => ({
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi laudantium nisi tempora iure rerum, facilis saepe pariatur fugiat quas explicabo autem id eveniet distinctio porro quos eius, natus aspernatur dolore, repellendus laboriosam molestiae ipsum aut accusamus. Pariatur, necessitatibus et. Sequi ullam neque facere maiores? Nemo, corrupti ipsum sapiente ad reprehenderit placeat nobis similique modi, eaque distinctio repudiandae! Dolorem maxime neque vero iste suscipit animi deleniti, deserunt facilis hic, architecto assumenda nulla aut ipsam, qui perferendis ut praesentium amet? Porro, cupiditate voluptate deserunt aut assumenda quo aliquam quasi reprehenderit eius est beatae excepturi eum corporis odio dignissimos modi id vitae veritatis.'
    })
}
</script>
