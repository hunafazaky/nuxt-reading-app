<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="4">
        <v-sheet
          width="100%"
          class="overflow-hidden"
          style="padding-top: 100%; position: relative"
        >
          <v-avatar
            color="secondary"
            size="100%"
            class="pa-1"
            style="inset: 0; position: absolute"
          >
            <v-img src="/temp-profile.webp"></v-img>
          </v-avatar>
        </v-sheet>
      </v-col>
      <v-col cols="8">
        <v-card>
          <v-card-title>
            <h1 class="font-weight-light text-capitalize">hunafa Zaky</h1>
          </v-card-title>
          <v-card-text>
            <v-simple-table>
              <tbody>
                <tr>
                  <th class="text-left">Penulis Favorit</th>
                  <th class="text-left">20</th>
                </tr>
                <tr>
                  <th class="text-left">Pembaca Setia</th>
                  <th class="text-left">21</th>
                </tr>
                <tr>
                  <th class="text-left">Jumlah Karya Tulis</th>
                  <th class="text-left">2</th>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card width="100%">
          <v-card-title class="ma-2">Karya Tulis Saya</v-card-title>
          <v-card-text>
            <v-row justify="start" class="px-4 py-1">
              <v-col
                v-for="paper in papers"
                :key="paper.id"
                class="px-1 py-0"
                cols="4"
                sm="4"
                md="3"
                xl="2"
              >
                <PaperPreview
                  :paper="paper"
                  :wordLimit="{ title: 100, text: 0 }"
                  :miniVariant="true"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PaperPreview from '../components/PaperPreview.vue'
import Hashtags from '../components/Hashtags.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'Explore',
  data: () => ({}),
  computed: {
    papers() {
      return this.$store.state.papers.data
    },
  },
  methods: {
    addTodo(e) {
      console.log(e.target.value)
      console.log(this.todos)
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle',
    }),
  },
}
</script>
<!-- v-if="i < 5"
  :key="i"
  :style="`left: ${i * 25}px;`"
  :to="'/user/' + userByID(reader.user_id).account.username" -->
