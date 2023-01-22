<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="290"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        class="ma-2 px-4" 
        color="success"
        v-bind="attrs"
        v-on="on"
      >
        Unggah
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="overline">
        Unggah tulisan ini?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          text
          @click="dialog = false"
        >
          Ya
        </v-btn>
        <v-btn
          color="error"
          text
          @click="dialog = false"
        >
          Tidak
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>