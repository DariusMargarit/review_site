<template>
  <v-main>
    <nav-bar />
    <router-view />
    <footerul />
  </v-main>
</template>

<script>
import Navbar from "@/components/Navbar";
import footerul from "@/components/footerul";

export default {
  components: {
    'nav-bar' : Navbar,
    'footerul' : footerul,
  }
};
</script>
