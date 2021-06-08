<template>
  <v-footer fixed height="50%" color="#f4c006" style=" position: relative; bottom:0; float: bottom; ">
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
