<template>
  <v-card>
    <v-card-title v-text="work.title"></v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="12" md="10" lg="8" xl="6">
          <span class="secondary--text">Ditulis Oleh</span>
          {{user.profile.name}}
          <span class="secondary--text">|</span>
          {{work.created_at}}
          <span 
            v-if="work.created_at != work.updated_at"
            class="font-italic text--disabled"
          >
            (Edited : {{work.updated_at}})
          </span>
        </v-col>
        <v-col cols="12" sm="12" md="2" lg="4" xl="6" class="text-right rounded">
          <h3>
            <v-icon :color="category.color" left>mdi-tag</v-icon>
            {{category.name}}
          </h3>
        </v-col>
        <v-col cols="12">
          <span>
            <v-img
              class="rounded float-left"
              :class="imgWidth == '100%' ? 'mb-2':'mr-2'"
              cover
              :width="imgWidth"
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            ></v-img>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quas veniam hic laudantium praesentium itaque, esse, tempore fugit voluptatem quis ab sed blanditiis maiores. Minus assumenda dolorum dolorem quod eos nemo et expedita quae, eum optio culpa eaque. Molestiae commodi odit tempora sit nemo. Architecto ab, neque unde iusto veritatis iure ex mollitia temporibus id reprehenderit aspernatur consectetur soluta quisquam asperiores ducimus cum in, impedit rerum facilis. Earum fugit eos eaque, iusto deserunt quos quaerat, accusamus natus odit, in aut repellat a iste cupiditate provident iure alias non dicta consequatur unde sunt porro nesciunt! Rem atque corrupti sunt, aut laudantium ad, voluptates velit odit id, corporis mollitia dignissimos ab sint facere expedita tempora quidem reprehenderit. Consequuntur ea, aliquam nisi adipisci commodi iure consequatur reprehenderit, ex quod accusantium doloremque sapiente nobis. Sed aliquid accusantium earum error ex molestiae, fugiat, illo dolorum nesciunt, iure molestias! Ipsam magni atque obcaecati doloremque? Quo incidunt expedita corporis eveniet mollitia, aliquid rerum perspiciatis adipisci natus earum. Voluptatibus eum nobis, quis sequi, rem exercitationem rerum quo tenetur sit adipisci in facilis nesciunt nisi porro. Temporibus quidem commodi iure eius molestiae quae aut aspernatur ut, obcaecati vero unde ipsam labore quaerat perspiciatis sapiente consectetur magnam excepturi? Dolor, ipsum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iusto officia soluta rerum eos omnis sed id, vero recusandae placeat atque in porro. Consequuntur quas ea distinctio consectetur libero at similique odit neque, commodi exercitationem. Explicabo quisquam, assumenda laboriosam ea maiores, asperiores doloribus fugiat corporis odit, beatae eum iusto voluptas fugit blanditiis vel molestias voluptates alias. Optio ad, sed fugit repellendus nisi modi. Qui cumque voluptatum adipisci ipsum quae at excepturi totam sequi velit sapiente quis ut, error nemo architecto eveniet iure minus vel eligendi laborum atque, perferendis iste tempora repellendus. Praesentium rem, cupiditate quo voluptas facere explicabo. Explicabo, a?
          </span>
        </v-col>
        <v-col cols="12">
          <h3>Hashtag</h3>
          <v-chip-group column>
            <v-chip
              v-for="hashtag in hashtags" :key="hashtag.id"
              class="mr-1 font-weight-bold accent--text" 
              color="grey lighten-4" 
              label
              small
            >
              <v-icon x-small left>mdi-pound</v-icon>
              {{hashtag.name}}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col cols="12">
          <h3 class="mb-2">Pembaca</h3>
          <div style="position:relative; height:50px;">
            <template v-for="(reader, i) in work.reader">
              <v-btn 
                v-if="i < 5"
                :key="i"
                :style="`left: ${i * 25}px;`"
                :to="'/user/' + userByID(reader.user_id).account.username"
                nuxt absolute fab
              >
                <v-img
                  class="rounded-circle"
                  cover
                  aspect-ratio="1"
                  :src="userByID(reader.user_id).profile.image_src"
                ></v-img>
              </v-btn>
              <v-btn 
                v-if="i >= 5"
                :key="i"
                :style="`left: ${i * 25}px;`"
                to="/users"
                nuxt absolute fab light
              >
                <v-icon small>mdi-plus</v-icon>
                {{work.reader.length - 5}}
              </v-btn>
            </template>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "WorkReadingPage",
  layout: 'default',
  data: () => ({
    work: {},
  }),
  created() {
    const work_id = this.$route.params.id;
    this.work = this.$store.state.works.list.filter(work => work.id == work_id)[0];
  },
  computed: {
    display() {
      return this.$vuetify.breakpoint.name;
    },
    imgWidth() {
      switch (this.display) {
        case 'xs': return '100%';
        case 'sm': return '100%';
        case 'md': return '50%';
        case 'lg': return '40%';
        case 'xl': return '40%';          
        default: return '100%';
      }
    },
    user() {
      return this.$store.state.users.list.filter(user => user.id == this.work.writer.user_id)[0];
    },
    userByID() {
      return key => this.$store.state.users.list.filter(user => user.id == key)[0];
    },
    category() {
      return this.$store.state.categories.list.filter(category => category.id == this.work.type.category)[0];
    },
    hashtags () {
      const data = [];
      this.work.type.hashtags.forEach(element => {
        this.$store.state.hashtags.list.forEach(tag => {
          if(tag.id == element) data.push(tag);
        });
      });
      return data;
    },
  },
}
</script>