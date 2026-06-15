<template>
  <v-sheet
    rounded="lg"
    :width="size.numbers * 1 + size.units"
    class="overflow-hidden mb-2"
    :style="{
      'padding-top': size.numbers * (19 / 13) + size.units,
      position: 'relative',
    }"
  >
    <v-card
      rounded="lg"
      style="inset: 0; position: absolute"
      class="card"
      elevation="2"
      height="100%"
      width="100%"
      dark
    >
      <v-img
        height="100%"
        :src="work.cover || '/temp-cover.webp'"
        gradient="to top, rgba(12.9, 12.9, 12.9, 0), rgba(12.9, 12.9, 12.9, 1)"
      >
        <v-card-actions
          v-if="miniVariant === false"
          class="d-flex align-center pa-4"
        >
          <nuxt-link
            :to="`/user/${work.writer?.username}`"
            class="text-decoration-none white--text text-truncate"
          >
            <v-avatar class="mr-1" color="white" size="28">
              <v-img :src="work.writer?.photo || '/temp-profile.webp'"></v-img>
            </v-avatar>
            <span
              class="font-weight-bold text-truncate text-capitalize"
              v-text="work.writer?.pen_name || work.writer?.username"
            ></span>
          </nuxt-link>
        </v-card-actions>
        <v-card-text
          class="title text-capitalize caption"
          v-text="
            work.title.length > wordLimit.title
              ? work.title.slice(0, wordLimit.title) + '...'
              : work.title
          "
        ></v-card-text>
        <v-card-actions>
          <div class="absolute bottom" v-if="miniVariant === true">
            <v-btn icon class="mb-1" color="primary">
              <v-icon> mdi-text-box-check </v-icon>
            </v-btn>
            <v-btn
              icon
              class="mb-1"
              color="success"
              nuxt
              :to="`/work/${work.id || work._id}/read`"
            >
              <v-icon> mdi-text-box-search </v-icon>
            </v-btn>
            <template
              v-if="mutation === true && me && work.writer?.username === me.username"
            >
              <v-btn
                icon
                class="mb-1"
                color="warning"
                nuxt
                :to="`/work/${work.id || work._id}/edit`"
              >
                <v-icon> mdi-text-box-edit </v-icon>
              </v-btn>
              <v-btn
                icon
                class="mb-1"
                color="error"
                @click="removeWork(work.id || work._id)"
              >
                <v-icon> mdi-text-box-remove </v-icon>
              </v-btn>
            </template>
          </div>
          <div class="mx-2 absolute bottom" v-else>
            <v-row>
              <v-col cols="12" class="ma-0 pa-0">
                <v-btn x-small plain> #{{ work.category[0] }} </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn
                  v-if="!liked"
                  x-small
                  :loading="loading"
                  color="primary"
                  @click="likeWork(work)"
                >
                  <v-icon small left> mdi-text-box-check </v-icon>
                  <span class="d-none d-sm-inline">simpan</span>
                </v-btn>
                <v-btn
                  v-if="liked"
                  x-small
                  color="secondary"
                  @click="dislikeWork(work)"
                >
                  <v-icon small left> mdi-text-box-minus </v-icon>
                  <span class="d-none d-sm-inline">buang</span>
                </v-btn>
                <v-btn
                  x-small
                  color="success"
                  nuxt
                  :to="`/work/${work.id || work._id}/read`"
                >
                  <v-icon small left> mdi-text-box-search </v-icon>
                  <span class="d-none d-sm-inline">baca</span>
                </v-btn>
                <v-btn
                  v-if="me && work.writer?.username === me.username"
                  x-small
                  color="warning"
                  nuxt
                  :to="`/work/${work.id || work._id}/edit`"
                >
                  <v-icon small left> mdi-text-box-edit </v-icon>
                  <span class="d-none d-sm-inline">edit</span>
                </v-btn>
                <v-btn
                  v-if="me && work.writer?.username === me.username"
                  x-small
                  color="error"
                  @click="removeWork(work.id || work._id)"
                >
                  <v-icon small left> mdi-text-box-remove </v-icon>
                  <span class="d-none d-sm-inline">hapus</span>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card-actions>
      </v-img>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  name: "WorkCard",
  props: {
    work: Object,
    wordLimit: Object,
    miniVariant: Boolean,
    mutation: Boolean,
    size: {
      type: Object,
      default() {
        return {
          numbers: 100,
          units: "%",
        };
      },
    },
  },
  data: () => ({
    liked: null,
    loading: false,
  }),
  computed: {
    me() {
      return this.$store.getters["users/me"];
    },
  },
  methods: {
    removeWork(id) {
      this.$emit("remove-work", id);
    },
    likeCheck() {
      if (!this.me) return;
      const result = this.work.like_by.filter(
        (item) => item._id === this.me.id || item._id === this.me._id
      );
      this.liked = result.length > 0;
    },
    async likeWork(work) {
      if (this.loading) return;
      try {
        this.loading = true;
        await this.$store.dispatch("users/updateLikeList", work.id || work._id);
        await this.$store.dispatch("works/updateLikeBy", work);
        this.liked = true;
      } catch (error) {
        console.error("Error updating like:", error);
      } finally {
        this.loading = false;
      }
    },
    async dislikeWork(work) {
      if (this.loading) return;
      try {
        this.loading = true;
        await this.$store.dispatch("users/removeLikeList", work.id || work._id);
        await this.$store.dispatch("works/removeLikeBy", work);
        this.liked = false;
      } catch (error) {
        console.error("Error removing like:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.likeCheck();
  },
};
</script>
