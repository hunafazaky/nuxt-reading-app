<template>
  <v-progress-circular
    v-if="loading"
    class="loading-style"
    :size="50"
    :width="5"
    color="indigo"
    indeterminate
  ></v-progress-circular>
</template>

<script>
export default {
  name: 'LoadingPage',
  props: ['loading'],
  data() {
    return {}
  },
}
</script>

<style scoped>
.loading-style {
  position: absolute;
  transform: translate(-50%, -50%);
  inset: 50%;
}
</style>
