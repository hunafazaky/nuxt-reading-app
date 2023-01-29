<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card class="mb-2" rounded="lg" outlined>
        <v-card-text>
          <v-row>
            <v-col cols="4" md="3">
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
                  :src="paper.image_cover"
                ></v-img>
                <v-icon v-else style="inset: 0; position: absolute" x-large>
                  mdi-plus-box
                </v-icon>
              </v-sheet>
              <p class="caption text--secondary text-center">Preview</p>
            </v-col>
            <v-col cols="8" md="9">
              <v-text-field
                outlined
                dense
                v-model="paper.title"
                label="Judul"
                hint="Pilih judul yang sesuai dan menarik pembaca"
                persistent-hint
                required
              ></v-text-field>
              <v-radio-group class="my-0" v-model="paper.type" row mandatory>
                <v-radio
                  label="Non-Fiksi"
                  value="Non-Fiksi"
                  off-icon="mdi-pound-box"
                  on-icon="mdi-pound-box"
                  color="error"
                ></v-radio>
                <v-radio
                  label="Fiksi"
                  value="Fiksi"
                  off-icon="mdi-pound-box"
                  on-icon="mdi-pound-box"
                  color="purple"
                ></v-radio>
              </v-radio-group>
              <v-autocomplete
                outlined
                dense
                multiple
                hide-selected
                small-chips
                deletable-chips
                clearable
                hint="Pilih (max. 5) kategori yang paling sesuai"
                :counter="5"
                persistent-hint
                v-model="paper.hashtag_list"
                :items="items"
                label="Kategori"
              ></v-autocomplete>
              <v-file-input
                prepend-icon=""
                append-outer-icon="mdi-image-plus"
                outlined
                dense
                clearable
                show-size
                truncate-length="25"
                label="Cover"
                hint="Direkomendasikan cover dengan ratio 13:19"
                persistent-hint
                v-model="file"
                @change="fileToImage"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <client-only>
                <tiptap-editor v-model="paper.text" />
              </client-only>
              <div class="content">
                <h3>Content</h3>
                <pre><code>{{ paper.text }}</code></pre>
              </div>
              <div class="content">
                <h3>Content</h3>
                <p v-html="paper.text"></p>
              </div>
              <!-- <v-sheet outlined class="py-4" rounded="lg">
                <div id="codex-editor"/>
              </v-sheet>
              <v-btn type="button" name="button" @click="save()">save</v-btn>
              <div v-if="value">
                <template v-for="val in value.blocks">
                  <p v-if="val.data.text" v-html="val.data.text"></p>
                  <p v-if="val.data.items">
                    <ul v-for="item in val.data.items">
                      <li v-html="item"></li>
                    </ul>
                  </p>
                </template>
              </div> -->

              <!-- <TextBox
                ref="myQuillEditor"
                v-model="content"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
              /> -->
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="!paper.title || !paper.text" @click="addPaper">
            Kirim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Dialog from '../components/Dialog.vue'
import TiptapEditor from '~/components/TiptapEditor.vue'
// import { mapMutations } from 'vuex'

export default {
  layout: 'default',
  data: () => ({
    file: null,
    paper: {
      image_cover: null,
      title: null,
      text: null,
      type: null,
      hashtags: [],
      writer_id: 1,
      reader_id: [],
      favorite_count: null,
      bookshelf_count: null,
      created_at: '21 Desember 2012',
      updated_at: '21 Desember 2012',
    },
    items: [
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
    addPaper() {
      this.paper.id = Math.random();
      if (this.paper.image_cover === null) this.paper.image_cover = 'https://picsum.photos/400/640?random';
      console.log(this.paper);
      this.$store.commit('papers/add', this.paper)
      this.file = null;
      this.paper = {
        image_cover: null,
        title: null,
        text: null,
        type: null,
        hashtag_list: null,
        writer_id: 1,
        reader_list: [1, 2, 3, 4, 5],
        favorite: 20,
        bookshelf: 21,
        created_at: '21 Desember 2012',
        updated_at: '21 Desember 2012',
      };
    },
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
        this.paper.image_cover = URL.createObjectURL(this.file)
      }
    },
  },
  components: { Dialog, TiptapEditor },
}
</script>
