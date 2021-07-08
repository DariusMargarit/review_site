<template>
  <v-dialog v-model="reportReview" width="600">

    <template v-slot:activator="{ on }">
    <v-btn icon v-on="on">
      <v-icon>
        mdi-alert-octagon
      </v-icon>
    </v-btn>
    </template>

    <v-card class="main-content">
      <v-container class="form">
        <div @click="closeCard()"><v-icon class="closeIcon">mdi-close</v-icon></div>

        <h1 style="margin-bottom: 2rem">Semnaleaza o neregula pentru review-ul selectat</h1>

        <h2 style="margin-bottom: 4rem">Care este problema?</h2>

        <v-row align="center">
          <v-checkbox
          color="#f4c006"
          label="Review-ul este irelevant"
          v-model="irelevant"
            ></v-checkbox>
        </v-row>

        <v-row align="center">
          <v-checkbox
          color="#f4c006"
          label="Review-ul contine limbaj licentios"
          v-model="limbaj"
            ></v-checkbox>
        </v-row>

        <v-row align="center">
          <v-checkbox
          color="#f4c006"
          label="Review-ul contine o fotografie indecenta"
          v-model="pozaindecenta"
            ></v-checkbox>
        </v-row>

        <v-row align="center">
          <v-checkbox
              hide-details
              color="#f4c006"
              class="shrink mr-2 mt-0"
              v-model="altceva"
          ></v-checkbox>
          <v-text-field
              v-model="alttext"
              clearable
              :disabled="!altceva"
              label="Alta optiune..."
          ></v-text-field>
        </v-row>

        <v-row style="justify-content: center; display: flex;margin-top: 4rem" no-gutters align="center">
          <v-col cols="6" md="3">
            <v-btn depressed style="background-color:#f4c006; font-family: 'Lato', sans-serif; font-weight: bolder;" class="mr-4 buton-golit" @click="renunta()">RENUNTA</v-btn>
          </v-col>
          <v-col cols="6" md="3">
            <v-btn depressed style="background-color:#ff665a; font-family: 'Lato', sans-serif; font-weight: bolder;" class="buton-send" :loading="loading">TRIMITE</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

  </v-dialog>
</template>

<script>

export default {

  data: () => ({
    reportReview: false,
    includeFiles: true,
    altceva: false,
    irelevant: false,
    limbaj: false,
    pozaindecenta: false,
    alttext: '',
    loading: false
  }),

  methods: {
    closeCard() {
      this.reportReview = false
    },
    renunta ()
    {
      this.altceva = false
      this.irelevant = false
      this.limbaj = false
      this.pozaindecenta = false
      this.alttext = ''
      this.reportReview = false
    }
  }

}

</script>

<style>
.form {
  min-height: 55vh;
  min-width: 35vh;
}

.main-content {
  background-color: white;
  min-height: 60vh;
  min-width: 40vh;
  text-align: center;
  justify-content: center;
  align-content: center;
  display: flex;
  padding: 2rem;
  font-family: 'Lato', sans-serif;
  font-weight: bold;
}
.closeIcon {
  align:right;
  float: right;
  padding: 0;
  margin: 0;
}
.closeIcon:hover {
  cursor:pointer;
  background-color: hsl(47, 95%, 49%);
}

</style>
