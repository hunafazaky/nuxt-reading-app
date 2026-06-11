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
                  v-if="fileOfCover"
                  height="100%"
                  cover
                  :src="work.cover || '/temp-cover.webp'"
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
                label="Judul"
                hint="Pilih judul yang sesuai dan menarik pembaca"
                persistent-hint
                required
                v-model="work.title"
              ></v-text-field>
              <v-autocomplete
                outlined
                dense
                multiple
                hide-selected
                small-chips
                deletable-chips
                clearable
                label="Tagar"
                hint="Pilih (max. 5) tagar yang paling sesuai"
                persistent-hint
                :counter="5"
                :items="hashtags"
                v-model="work.category"
              ></v-autocomplete>
              <v-file-input
                outlined
                dense
                clearable
                prepend-icon=""
                append-outer-icon="mdi-file-image-plus"
                show-size
                truncate-length="25"
                label="Cover"
                hint="Direkomendasikan cover dengan ratio 13:19"
                persistent-hint
                v-model="fileOfCover"
                @change="fileToImage"
              ></v-file-input>
              <v-btn-toggle v-model="attachment_type" class="mb-2">
                <v-btn>
                  <v-icon>mdi-link-box</v-icon>
                </v-btn>
                <v-btn>
                  <v-icon>mdi-file-pdf-box</v-icon>
                </v-btn>
              </v-btn-toggle>
              <v-row v-if="attachment_type === 0">
                <v-col cols="12" sm="5">
                  <v-text-field
                    outlined
                    dense
                    label="Judul"
                    v-model="work.attachment.title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="7">
                  <v-text-field
                    outlined
                    dense
                    label="Link"
                    hint="Lampirkan tautan (Optional)"
                    persistent-hint
                    required
                    v-model="work.attachment.link"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-file-input
                v-if="attachment_type === 1"
                outlined
                dense
                clearable
                prepend-icon=""
                append-outer-icon="mdi-file-document-plus"
                show-size
                truncate-length="25"
                label="File PDF"
                hint="Lampirkan file PDF (Optional)"
                persistent-hint
                v-model="fileOfAttachment"
              ></v-file-input>
              <!-- @change="fileToLink" -->
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div>Tulis karyamu di kotak ini</div>
              <client-only>
                <tiptap-editor v-model="work.text" />
              </client-only>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :loading="loading"
            class="ma-2 px-4"
            color="success"
            :disabled="!work.title || !work.text"
            @click="postWork"
          >
            Unggah
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-col>
  </v-row>
</template>

<script>
import TiptapEditor from "~/components/TiptapEditor.vue";

export default {
  name: "Write",
  components: { TiptapEditor },
  data: () => ({
    loading: false,
    fileOfCover: null,
    fileOfAttachment: null,
    work: {
      title: null,
      cover: null,
      attachment: {},
      writer: null,
      category: [],
      text: null,
    },
    attachment_type: null,
  }),
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs": return 220;
        case "sm": return 400;
        case "md": return 500;
        case "lg": return 600;
        case "xl": return 800;
        default: return 500;
      }
    },
    hashtags() {
      return this.$store.state.hashtags.data.map((h) => h.name);
    },
  },
  methods: {
    async uploadFileToStorage(file) {
      const storageRef = this.$fireModule.storage().ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      return fileRef.getDownloadURL();
    },
    async postWork() {
      this.loading = true;
      try {
        const me = this.$store.getters["users/me"];
        if (me) {
          this.work.writer = me.id || me._id;
        }

        if (this.fileOfCover) {
          this.work.cover = await this.uploadFileToStorage(this.fileOfCover);
        } else {
          delete this.work.cover;
        }

        if (this.fileOfAttachment) {
          const attachmentLink = await this.uploadFileToStorage(this.fileOfAttachment);
          this.work.attachment = {
            title: this.fileOfAttachment.name,
            link: attachmentLink,
          };
        } else if (this.work.attachment.link) {
          if (!this.work.attachment.title) {
            this.work.attachment.title = "Lampiran";
          }
        } else {
          delete this.work.attachment;
        }

        await this.$store.dispatch("works/postWork", this.work);
        
        this.$store.commit("snackbar/showMessage", {
          message: "Karya Berhasil Diunggah!",
          color: "success",
        });

        setTimeout(() => {
          this.$router.push("/home");
        }, 1000);
      } catch (error) {
        console.error("Error uploading work:", error);
      } finally {
        this.loading = false;
      }
    },
    async fileToImage() {
      if (this.fileOfCover) {
        this.work.cover = URL.createObjectURL(this.fileOfCover);
      }
    },
  },
};
</script>
