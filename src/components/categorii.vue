<template>
  <v-main>
    <br />
    <br />
    <br />

    <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
        v-if="loading"
    ></v-progress-circular>
    <v-container v-if="!loading" >
      <v-row style="">
        <v-col align="center" style="justify-content: center;display: flex;" v-for="categorie in categorii" :key="categorie.id">
          <v-card  class="cat"  @click="goToCat(categorie.id)">
            <img class="imagini" :src="categorie.img" alt="alt text" />
            <v-container class="center"><h4 class="text1">{{categorie.description}}</h4></v-container>
            <v-card-text>
              <h3 class="text">{{categorie.numeCategorie}}</h3>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>

export default {
  components: {

  },
  data () {
    return {

    }
  },
  created() {
    this.$store.dispatch('loadCategorii')
  },
  computed: {
    categorii () {
      return this.$store.getters.categorii
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    goToCat (key) {
      this.$router.push('/categorii/' + key)
    }
  }
}
</script>

<style>
.cat{
  margin-top: 0;
  margin-left: 1.5em;
  margin-right: 1.5em;
  margin-bottom: 1.5em;
  border: 1px solid #ccc;
  cursor: pointer;
  float: left;


}
@media screen and (max-width: 720px) {
  card{
    padding-left: 1em;}
}
.text{
  color: black;
  text-align: center;
  font-family:"Arial Black";
}
.text1{
  opacity: 1;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: medium;
  font-family: 'Lato', sans-serif;
  font-weight: bold;
}
.imagini{
  opacity: 1.0;
  display: block;
  height: auto;
  transition: 750ms ;
}
.center {
  transition: 500ms ease;
  opacity: 0;
  position: absolute;
  top: 42%;
  left: 50%;
  height: 83%;
  width: 100%;
  background-color: black;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%)
}
.cat:hover .imagini{
  opacity: 0.3;
  transform: rotateY(180deg);
}
.cat:hover .center{
  opacity:0.6;
}
</style>
