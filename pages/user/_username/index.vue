<template>
  <v-row justify="center" align="center">
    <PopZoom
      maxWidth="500px"
      :image="user.profile?.img_profile"
      :showPopZoom="showPopZoom"
      @hidePopZoom="showPopZoom = false"
    />
    <PopZoom
      :image="user.profile?.img_profile"
      :showPopConfirm="showPopConfirm"
      @hidePopConfirm="showPopConfirm = false"
    />
    <v-col cols="4">
      <v-sheet
        width="100%"
        class="overflow-hidden"
        style="padding-top: 100%; position: relative"
      >
        <v-avatar
          color="secondary"
          size="100%"
          class="pa-1 zoom-in-pointer"
          style="inset: 0; position: absolute"
          @click="showPopZoom = true"
        >
          <v-img :src="user.profile?.img_profile"></v-img>
        </v-avatar>
      </v-sheet>
    </v-col>
    <v-col cols="8">
      <v-card rounded="lg" outlined>
        <v-card-title>
          <p class="my-1 text-capitalize" v-text="user.profile?.pen_name"></p>
          <v-divider></v-divider>
          <p class="my-1 font-weight-light text-capitalize">Username</p>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div class="d-flex">
            <p class="my-1 font-weight-light text-capitalize">Username</p>
            <v-spacer></v-spacer>
            <p
              class="my-1 font-weight-bold"
              v-text="user.account?.username"
            ></p>
          </div>
          <div class="d-flex">
            <p class="my-1 font-weight-light text-capitalize">
              Penulis Favorit
            </p>
            <v-spacer></v-spacer>
            <p
              class="my-1 font-weight-bold"
              v-text="user.activity?.sub_writers.length"
            ></p>
          </div>
          <div class="d-flex">
            <p class="my-1 font-weight-light text-capitalize">Pembaca Setia</p>
            <v-spacer></v-spacer>
            <p
              class="my-1 font-weight-bold"
              v-text="user.activity?.sub_readers.length"
            ></p>
          </div>
          <div class="d-flex">
            <p class="my-1 font-weight-light text-capitalize">
              Jumlah Karya Tulis
            </p>
            <v-spacer></v-spacer>
            <p
              class="my-1 font-weight-bold"
              v-text="user.activity?.writings.length"
            ></p>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card rounded="lg" outlined width="100%">
        <v-card-title class="ma-2">Karya Tulis Saya</v-card-title>
        <v-card-text>
          <v-row
            justify="start"
            class="px-4 py-1"
            v-if="user.activity?.writings.length > 0"
          >
            <v-col
              v-for="work_id in user.activity?.writings"
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
          </v-row>
          <template v-else>
            <p class="overline text-center text-secondary ma-4">Kosong</p>
          </template>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import WorkCard from '../../../components/WorkCard.vue'
import PopZoom from '../../../components/PopZoom.vue'
import PopConfirm from '../../../components/PopConfirm.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'User',
  data: () => ({
    showPopZoom: false,
    showPopConfirm: false,
    user: {},
    work: {},
  }),
  computed: {
    // user() {
    //   return this.$store.state.users.data.find(
    //     (user) => user.account?.username === this.$route.params.username
    //   )
    // },
    // works() {
    //   return this.$store.state.works.data
    // },
  },
  methods: {
    getMe() {
      this.me = this.$store.state.users.me
    },
    getUserByUsername() {
      this.$axios
        .get(`/users?username=${this.$route.params.username}`)
        .then((user) => {
          this.user = user.data[0]
        })
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
  mounted() {
    this.getUserByUsername()
    this.getMe()
    if (!this.me.account) this.$router.push('/')
  },
  component: { PopZoom, PopConfirm },
}
</script>
