<template>
  <v-main class="main">

    <v-container>
      <v-row>
        <v-col cols="12" v-for="motiv in motive" :key="motiv.text">
          <v-row style="margin: 2rem; justify-content: center; display: flex;">
            <h1>{{ motiv.text }}</h1>
          </v-row>
          <v-row>
            <v-sheet class="mx-auto sheet" elevation="8" max-width="800" color="grey lighten-4">
              <v-slide-group style="min-height: 30vh" center-active show-arrows class="pa-4" v-model="model">
                <v-slide-item class="slide-item"> <!--aici vine inca un v-for pentru carduri-->
                  <v-card class="cards" min-height="100" min-width="100" @click="toggle">
                    <v-scale-transition>
                      <v-container>
                        <v-row no-gutters>
                          <v-spacer/>
                          <v-col cols="2">
                            <v-btn icon>
                              <v-icon>mdi-arrow-right</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                        <!--                    v-if daca e poza, atunci se afiseaza poza-->
                        <v-container>
                          <img src="../assets/aplicatii.jpg">
                        </v-container>
                        <!--                    else se afiseaza container-->
                        <v-container>
                          <v-row style="margin:0.5rem">
                            <h2>titlu</h2>
                          </v-row>
                          <v-row style="margin:0.5rem">
                            <h3>descriere</h3>
                          </v-row>
                        </v-container>
                      </v-container>
                    </v-scale-transition>
                  </v-card>
                </v-slide-item>

              </v-slide-group>
            </v-sheet>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

  </v-main>
</template>

<script>

export default {
  data () {
    return {
      model: null,
      motive : [
        {text: 'Review-ul contine limbaj licentios:'},
        {text: 'Review-ul contine o fotografie indecenta:'},
        {text: 'Review-ul este irelevant:'},
        {text: 'Alte motive:'},
      ]
    }
  },
  created() {
    window.scrollTo(0,0)
  }
}

</script>

<style>

@media screen and (max-width: 1264px) {
  .main {
    min-height: 90rem !important;
    max-width: 100% !important;
  }
  .sheet{
    max-width:20rem !important;
  }
}

.main {
  min-height: 100%;
  margin-top: 6rem;
  align-items: center;
  justify-content: center;
  display: flex;
}

.cards {
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  word-break:break-word;
  padding: 1rem;
}

.coloana :hover {
  cursor: pointer;
}

.slide-item {
  margin: 2rem;
}

</style>