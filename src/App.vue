<template>
  <v-app>
    <nav-bar />
    <router-view />
    <footerul />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import footerul from "@/components/footerul";

export default {
  components: {
    'nav-bar' : Navbar,
    'footerul' : footerul
  }
};
</script>
