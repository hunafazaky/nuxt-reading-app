<template>
  <div>
    <LoadingPage :loading="loading.page" />
    <v-row :justify="works?.length > 0 ? 'start' : 'center'">
      <v-col cols="8">
        <p class="overline text-center text-secondary ma-4">
          Paling Baru
        </p>
        <v-row class="mt-0">
          <LoadingComponent v-if="loading.work" :loading="loading.work" />
          <template v-if="!loading.work">
            <template v-if="works?.length > 0">
              <v-col
                v-for="work in works"
                :key="work.id"
                class="px-1 py-0"
                cols="4"
              >
                <WorkCard
                  :work="{ ...work, id: work._id }"
                  :wordLimit="{ title: 100, text: 0 }"
                  :miniVariant="false"
                  :mutation="false"
                  @remove-work="deleteWork"
                />
              </v-col>
            </template>
            <template v-else>
              <p class="overline text-center text-secondary ma-4 w-100">
                Memuat atau belum ada karya tulis...
              </p>
            </template>
            <v-row justify="center" class="mt-4 w-100" v-if="pageCount > 1">
              <v-btn
                v-for="pageNumber in pageNumbers"
                :key="pageNumber"
                :color="pageNumber === page ? 'primary' : 'grey lighten-2'"
                :outlined="pageNumber !== page"
                class="ma-1"
                small
                @click="setPage(pageNumber)"
              >
                {{ pageNumber }}
              </v-btn>
            </v-row>
          </template>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row class="mt-0">
          <template v-if="me">
            <v-card rounded="lg" fixed outlined class="w-100">
              <v-card-text>
                <nuxt-link
                  :to="`/user/${me.username}`"
                  class="text-decoration-none black--text text-truncate d-flex align-center"
                >
                  <v-avatar class="mr-2" size="36">
                    <v-img :src="me.photo || 'https://via.placeholder.com/150'"></v-img>
                  </v-avatar>
                  <span class="title text-capitalize font-weight-bold">
                    {{ me.pen_name || me.username }}
                  </span>
                </nuxt-link>
              </v-card-text>
              <v-divider />
              <v-card-title class="overline py-2 font-weight-bold"
                >Terakhir ditulis</v-card-title
              >
              <v-card-text>
                <template v-if="me.work_list && me.work_list.length > 0">
                  <nuxt-link
                    v-for="work in me.work_list.slice(0, 5)"
                    :key="work._id"
                    :to="`/work/${work._id}/read`"
                    class="text-decoration-none text--secondary d-block mb-1 text-truncate"
                  >
                    {{ work.title }}
                  </nuxt-link>
                </template>
                <template v-else>
                  <p class="text--disabled mb-0">Belum menulis apa pun</p>
                </template>
              </v-card-text>
              <v-divider />
              <v-card-title class="overline py-2 font-weight-bold"
                >Terakhir dibaca</v-card-title
              >
              <v-card-text>
                <template v-if="me.read_list && me.read_list.length > 0">
                  <nuxt-link
                    v-for="read in me.read_list.slice(0, 5)"
                    :key="read._id"
                    :to="`/work/${read._id}/read`"
                    class="text-decoration-none text--secondary d-block mb-1 text-truncate"
                  >
                    {{ read.title }}
                  </nuxt-link>
                </template>
                <template v-else>
                  <p class="text--disabled mb-0">Belum membaca apa pun</p>
                </template>
              </v-card-text>
              <v-divider />
            </v-card>
          </template>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import WorkCard from "../components/WorkCard.vue";
import LoadingComponent from "../components/LoadingComponent.vue";
import LoadingPage from "../components/LoadingPage.vue";

export default {
  name: "Home",
  components: {
    WorkCard,
    LoadingComponent,
    LoadingPage,
  },
  data: () => ({
    loading: {
      work: true,
      page: false,
    },
    works: [],
    page: 1,
    limit: 12,
    total: 0,
  }),
  computed: {
    me() {
      return this.$store.getters["users/me"];
    },
    pageCount() {
      return this.total > 0 ? Math.ceil(this.total / this.limit) : 0;
    },
    pageNumbers() {
      return Array.from({ length: this.pageCount }, (_, i) => i + 1);
    },
  },
  methods: {
    async deleteWork(id) {
      if (window.confirm("Apakah anda ingin menghapus karya tulis ini??")) {
        try {
          await this.$store.dispatch("works/deleteWork", id);
          await this.fetchWorks();
        } catch (error) {
          console.error(error);
        }
      }
    },
    async setPage(pageNumber) {
      if (pageNumber === this.page) return;
      this.page = pageNumber;
      await this.fetchWorks();
    },
    async fetchWorks() {
      this.loading.work = true;
      try {
        const res = await this.$store.dispatch("works/getWorks", {
          page: this.page,
          limit: this.limit,
        });
        if (res && Array.isArray(res.works)) {
          this.works = res.works;
          this.total = res.total || 0;
        } else {
          this.works = [];
          this.total = 0;
        }
      } catch (error) {
        console.error("Gagal memuat works:", error);
      } finally {
        this.loading.work = false;
      }
    },
  },
  async mounted() {
    this.loading.page = true;
    await this.fetchWorks();
    this.loading.page = false;
  },
};
</script>
