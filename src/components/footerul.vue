<template>
  <v-footer fixed height="50%" absolute color="#f4c006">
    <v-row align="center" justify="center">
      <v-col text-align="center" cols="12" sm="6" class="text-center black--text">
        {{ new Date().getFullYear() }} — <strong> © HonestReviews</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "footerul"
}
</script>

<style scoped>
</style>
