<template>
  <v-row justify="center">
    <v-col cols="12" md="5">
      <v-sheet
        outlined
        rounded="lg"
        width="100%"
        class="overflow-hidden"
        :style="{
          'padding-top': 100 * (19 / 13) + '%',
          position: 'relative',
        }"
      >
        <v-img
          style="inset: 0; position: absolute"
          v-if="file"
          height="100%"
          cover
          :src="file"
        ></v-img>
      </v-sheet>
    </v-col>
    <v-col cols="12" md="7">
      <h1 class="mb-4" v-text="title"></h1>
      <v-divider></v-divider>
      <v-chip-group column class="mb-4">
        <v-chip
          label
          small
          :color="type === 'fiksi' ? 'purple' : 'error'"
          class="font-weight-bold"
        >
          <v-icon small left>mdi-pound</v-icon>
          <span class="text-capitalize" v-text="type"></span>
        </v-chip>
        <v-chip
          label
          small
          color="grey darken-4"
          class="font-weight-bold white--text"
          v-for="hashtag in hashtags"
          :key="hashtag"
        >
          <v-icon small left>mdi-pound</v-icon>
          <span class="text-capitalize" v-text="hashtag"></span>
        </v-chip>
      </v-chip-group>
    </v-col>
    <v-col cols="12">
      <p v-text="text"></p>
    </v-col>
  </v-row>
</template>

<script>
import Dialog from '../components/Dialog.vue'

export default {
  layout: 'default',
  data: () => ({
    title: 'Ano hi mita hana no namae wo bokutachi wa mada shiranai',
    text: `Jenis huruf serbaguna akan berisi sejumlah bobot dan gaya font yang berbeda seperti tebal, tebal miring, semi-tebal, Reguler, Reguler-miring, Ringan, Ringan-miring, dll. Font yang bervariasi dalam berat dan gaya akan berguna saat Anda membutuhkan caption, pull-quotes, atau sub-head yang memerlukan bobot atau penekanan berbeda agar menonjol dari teks sekitarnya. Ini lebih baik daripada menggunakan sejumlah bentuk dengan tipe berbeda yang akan menyebabkan inkonsistensi. 
    
    Sebaiknya gunakan  satu atau dua jenis font, tetapi variasikan bobot dan gaya font jika diperlukan. Font serbaguna juga akan mendukung True Small Caps (Huruf kapital yang biasanya mendekati tinggi huruf kecil, dan untuk beberapa font, bisa lebih tinggi) yang dirancang untuk mempertahankan bobot yang sama dengan huruf lainnya dan memiliki rasio aspek yang lebih luas untuk lebih mudah dibaca. `,
    type: 'non-fiksi',
    select: null,
    file: '/cover.jpg',
    imagePreview: null,
    hashtags: [
      'Teknologi',
      'Sains',
      'Sejarah',
      'Ekonomi',
      'Sosial',
      'Budaya',
      'Agama',
      'Politik',
      'Olahraga',
      'Aksi',
      'Romansa',
      'Fiksi Ilmiah',
      'Fantasi',
      'Horor',
      'Drama',
    ],
  }),
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 220
        case 'sm':
          return 400
        case 'md':
          return 500
        case 'lg':
          return 600
        case 'xl':
          return 800
      }
    },
  },
  methods: {
    upload() {
      this.$v.$touch()
      // this.$router.push('/home')
    },
    clear() {
      this.$v.$reset()
      this.username = ''
      this.title = ''
      this.select = null
      this.checkbox = false
    },
    fileToImage() {
      if (this.file) {
        this.imagePreview = URL.createObjectURL(this.file)
      }
    },
  },
  components: { Dialog },
}
</script>
