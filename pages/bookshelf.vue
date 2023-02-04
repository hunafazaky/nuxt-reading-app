<template>
  <v-row
    :justify="me.activity?.bookshelf.length > 0 ? 'start' : 'center'"
    class="px-4 py-1"
  >
    <template v-if="me.activity?.bookshelf.length > 0">
      <v-col
        v-for="work_id in me.activity?.bookshelf"
        :key="work_id"
        class="px-1 py-0"
        cols="4"
        sm="4"
        md="3"
        xl="2"
      >
        <WorkCard
          :work="getWorkById(work_id)"
          :wordLimit="{ title: 100, text: 0 }"
          :miniVariant="true"
        />
      </v-col>
    </template>
    <template v-else>
      <p class="overline text-center text-secondary ma-4">Kosong</p>
    </template>
  </v-row>
</template>

<script>
import WorkCard from '../components/WorkCard.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'Bookshelf',
  data: () => ({
    me: {},
  }),
  computed: {},
  methods: {
    getMe() {
      this.me = this.$store.state.users.me
    },
    getWorkById(work_id) {
      this.$axios.get(`/works/${work_id}`).then((work) => {
        this.work = work.data
      })
      return this.work
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
  },
  mounted() {
    this.getMe()
  },
}
</script>
