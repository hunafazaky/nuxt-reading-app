<template>
  <v-row justify="center">
    <v-col cols="10" sm="6" md="5">
      <LoadingComponent v-if="loading.works" :loading="loading.works" />
      <template v-if="!loading.works">
        <template v-if="works.length > 0">
          <WorkCard
            v-for="work in works"
            :key="work.id"
            class="mx-auto"
            :work="work"
            :wordLimit="{ title: 150, text: 400 }"
            :miniVariant="false"
          />
        </template>
        <template v-else>
          <p class="overline text-center text-secondary ma-4">Kosong</p>
        </template>
      </template>
    </v-col>
    <v-col cols="10" sm="6" md="5">
      <LoadingComponent v-if="loading.me" :loading="loading.me" />
      <template v-if="!loading.me">
        <v-card rounded="lg" fixed outlined>
          <v-card-text>
            <nuxt-link
              :to="`/user/${me.username}`"
              class="text-decoration-none black--text text-truncate"
            >
              <v-avatar class="mr-1" size="36">
                <v-img :src="me.photo"></v-img>
              </v-avatar>
              <span
                class="title text-capitalize font-weight-bold"
                v-text="me.pen_name"
              ></span>
            </nuxt-link>
          </v-card-text>
          <v-card-title>Karya Ditulis</v-card-title>
          <v-card-text>
            <nuxt-link
              v-for="(work, i) in me.work_list"
              v-if="i < 10"
              :key="work._id"
              :to="`/${work._id}/read`"
              class="text-decoration-none"
            >
            <p v-text="work.title" class="text-truncate ma-0 mb-1"></p>
            </nuxt-link>
          </v-card-text>
          <v-divider />
          <v-card-title>Karya Dibaca</v-card-title>
          <v-card-text>
            <nuxt-link
              v-for="(read, i) in me.read_list"
              v-if="i < 10"
              :key="read._id"
              :to="`/${read._id}/read`"
              class="text-decoration-none"
            >
            <p v-text="read.title" class="text-truncate ma-0 mb-1"></p>
            </nuxt-link>
          </v-card-text>
          <v-divider />
        </v-card>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import WorkCard from '../components/WorkCard.vue'
import LoadingComponent from '../components/LoadingComponent.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    me: {},
    works: {},
    loading: {
      me: true,
      works: true,
    },
  }),
  computed: {},
  methods: {
    getMe() {
      this.me = this.$store.state.users.me
      if (!this.me.id) this.$router.push('/')
      else this.loading.me = false
    },
    getWorks() {
      this.$axios.get(`/works`).then((works) => {
        this.works = works.data
        this.loading.works = false
      })
    },
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
  components: {
    WorkCard,
    LoadingComponent,
  },
  mounted() {
    this.getMe()
    this.getWorks()
  },
}
</script>
