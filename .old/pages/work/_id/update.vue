<template>
  <v-card>
    <v-card-title class="font-weight-bold py-10">Form Penulisan Karya</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="work.title"
            solo outlined dense shaped
            clearable
            counter="120"
            label="Judul"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-combobox
            v-model="selectedCategory"
            :items="categories"
            item-value="id"
            item-text="name"
            item-color="color"
            solo outlined dense shaped
            :search-input.sync="searchCategory"
            hide-selected
            hint="Tag Utama"
            label="Pilih Kategori"
            persistent-hint auto-select-first
          >
            <template v-slot:selection="{ attrs, item, selected }">
              <h4
                v-if="item === Object(item)"
                v-bind="attrs"
                class="font-weight-bold"
                :input-value="selected"
              >
                <v-icon :class="`${item.color}--text text--lighten-1`" left>mdi-tag</v-icon>
                {{ item.name }}
              </h4>
            </template>
            <template v-slot:item="{ item }">
              <h4
                class="font-weight-bold"
                dark
              >
                <v-icon :class="`${item.color}--text text--lighten-1`" left>mdi-tag</v-icon>
                {{ item.name }}
              </h4>
            </template>
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Tidak ada kecocokan.
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-file-input
            accept="image/*"
            @change="importImage"
            label="Pilih Gambar"
            solo outlined dense shaped
            v-model="selectedImage"
          >
          </v-file-input>
          <!-- <v-file-input
            @change="onFileChange"
            prepend-icon="mdi-image"
            solo outlined dense shaped
            truncate-length="20"
          ></v-file-input> -->
          <v-sheet 
            class="d-flex flex-column"
            width="100%"
            min-height="250px"
            outlined rounded
          >
            <h4 class="ma-2">Preview</h4>
            <v-img
              class="ma-2 rounded float-left"
              cover
              :src="work.image_src"
            ></v-img>
          </v-sheet>
        </v-col>
        <v-col cols="12">
          <v-combobox
            v-model="hashtagList"
            :items="hashtags"
            item-value="id"
            item-text="name"
            solo outlined dense shaped
            :search-input.sync="searchHashtag"
            hide-selected
            hint="Maksimal 10 hashtag"
            label="Tambah Hashtag"
            multiple
            persistent-hint
            small-chips
          >
            <template v-slot:selection="{ attrs, item, selected }">
              <v-chip
                v-if="item === Object(item)"
                v-bind="attrs"
                :input-value="selected"
                class="ma-1"
                label
                small
              >
                <v-icon x-small left>mdi-pound</v-icon>
                {{ item.name }}
              </v-chip>
            </template>
            <template v-slot:item="{ item }">
              <v-chip
                dark
                class="ma-1"
                label
                small
              >
                <v-icon x-small left>mdi-pound</v-icon>
                {{ item.name }}
              </v-chip>
            </template>
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Tidak ada kecocokan. Tekan <kbd class="red--text">[ENTER]</kbd> untuk membuat yang baru
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="work.content"
            solo outlined shaped
            label="Konten"
            height="500"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "WorkUpdatingPage",
  layout: 'default',
  data: () => ({
    work: {
      type: {}
    },
    selectedCategory: {},
    selectedImage: null,
    image: null,
    hashtagList: [],
    searchHashtag: null,
    searchCategory: null,
  }),
  created() {
    const work_id = this.$route.params.id;
    this.work = this.$store.state.works.list.filter(work => work.id == work_id)[0];
    
    this.selectedCategory = this.$store.state.categories.list.filter(category => category.id == this.work.type.category)[0];
    
    this.work.type.hashtags.forEach(element => {
      this.$store.state.hashtags.list.forEach(tag => {
        if(element == tag.id) this.hashtagList.push(tag);
      });
    });
  },
  methods: {
    importImage() { 
      if (this.selectedImage) {
        let reader = new FileReader();
        
        // Use the javascript reader object to load the contents
        // of the file in the v-model prop
        reader.readAsDataURL(this.selectedImage);
        reader.onload = () => {
          this.work.image_src = reader.result;
        }
      };
    }
  },
  computed: {
    user() {
      return this.$store.state.users.list.filter(user => user.id == this.work.writer.user_id)[0];
    },
    userByID() {
      return key => this.$store.state.users.list.filter(user => user.id == key)[0];
    },
    categories() {
      return this.$store.state.categories.list;
    },
    hashtags () {
      return this.$store.state.hashtags.list;
    },
  },
  watch: {
    hashtagList (val) {
      if (val.length > 10) {
        this.$nextTick(() => this.hashtagList.pop())
      }
    },
  },
}
</script>