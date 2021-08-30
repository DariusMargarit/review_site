<template>
  <v-main>
    <nav-bar />
    <snackbar />
    <router-view />
    <footerul />
  </v-main>
</template>

<script>
import Navbar from "@/components/Navbar";
import footerul from "@/components/footerul";
import snackbar from "./snackbar";

export default {
  components: {
    'nav-bar' : Navbar,
    'footerul' : footerul,
    'snackbar': snackbar
  }
};
</script>
