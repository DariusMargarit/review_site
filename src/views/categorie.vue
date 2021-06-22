<template>
  <v-main style="margin:auto;width:65%; min-height:93vh">
    <br><br><br><br><br>
    <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
        v-if="loading"
    ></v-progress-circular>
    <v-col md='6' class="hidden-lg-and-up">
      <v-col align="center" class="font cattitle mb-7">
        {{ numeCat }} ({{ produse.length }})
      </v-col>
      <v-col class="button1" v-if="userIsAuthenticated">
        <add-product :catKey="catKey" />
      </v-col>
      <v-col>
        <v-dialog v-model="dialogadd" width="400">
          <template v-slot:activator="{ on }">
            <v-row style="display: flex;align-content: center">
              <v-col class="button1">
                <v-btn class="homebutton text--black font-weight-bold" plain v-on="on">FILTRE DE CAUTARE</v-btn>
              </v-col>
            </v-row>
          </template>
          <v-container class="d-flex flex-no-wrap main"  v-if="!loading">
            <v-col>
              <v-col class="Filtre" style="padding:15px;">
                <H3 style="margin-bottom:2%">Cauta dupa nr. de stele</H3>
                <div style="margin-top: 0" v-for="(filtru, index) in stele">
                  <v-checkbox  class="stele" v-model="selected.stele" :value="index + 1" :label="filtru"></v-checkbox>
                </div>
                <v-btn @click="golesteStele" class="text--black font-weight-bold" outlined text style="margin-top: 1em;" >Goleste</v-btn>
              </v-col>
              <v-col class="Filtre" style="padding:15px;">
                <H3 style="margin-bottom:8px;">Cauta dupa nr. de review-uri</H3>
                <div style="margin-top: 0" v-for="(filtru, index) in nrrev">
                  <v-checkbox class="stele" v-model="selected.nrrev" :value="index + 1" :label="filtru"></v-checkbox>
                </div>
                <v-btn @click="golesteRev" class="text--black font-weight-bold" outlined text style="margin-top: 1em;">Goleste</v-btn>
              </v-col>
              <v-btn @click="clear" class="text--black font-weight-bold" outlined text style="margin-top: 1em;">Goleste tot</v-btn>
            </v-col>
          </v-container>
        </v-dialog>
      </v-col>

      <v-container>
        <v-row>
          <v-col>
            <v-card class="pa-7 mb-4"  v-for="produs in produse" :key="produs.id">
              <v-row><img @click="goToProduct(produs.id)" class="imagini" :src="produs.img" alt="alt text" />
                <v-col><v-card-title @click="goToProduct(produs.id)" class="titlu-prod">{{ produs.name }}</v-card-title>
                  <v-card-subtitle class="descriere">Reviews: {{ produs.reviews}}</v-card-subtitle></v-col>
                <v-col><v-row><v-rating class="stea"
                                        background-color="warning lighten-1"
                                        color="warning"
                                        half-increments
                                        length="5"
                                        readonly
                                        size="25"
                                        :value=(produs.rating/produs.reviews)
                ></v-rating>
                  <p class="rating" style="margin-top: 2px; font-family: 'Lato', sans-serif;">
<!--                    ({{ (isNaN(produs.rating/produs.reviews)) ? 0 : (produs.rating/produs.reviews) | toFixed }})-->
                  </p></v-row></v-col></v-row>
              <v-col>
                <v-card-text class="descriere">{{ produs.descriere }}</v-card-text>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>

    <v-col md='12' class="hidden-md-and-down">
      <v-col align="center" class="font cattitle mb-7">
        {{ numeCat }} ({{ produse.length }})
      </v-col>
      <v-container style="min-height: 65vh" class="d-flex flex-no-wrap"   v-if="!loading">
        <v-col>
          <v-col class="button" v-if="userIsAuthenticated">
            <add-product :catKey="catKey" />
          </v-col>
          <v-col class="zonaFiltre">
            <v-col class="Filtre" style="padding:15px;">
              <H3 style="margin-bottom:8px">Cauta dupa nr. de stele</H3>
              <div style="margin-top: 0" v-for="(filtru, index) in stele">
                <v-checkbox  class="stele" v-model="selected.stele" :value="index + 1" :label="filtru"></v-checkbox>
              </div>
              <v-btn @click="golesteStele" class="text--black font-weight-bold" outlined text style="margin-top: 1em;" >Goleste</v-btn>
            </v-col>
            <v-col class="Filtre" style="padding:15px;">
              <H3 style="margin-bottom:8px;">Cauta dupa nr. de review-uri</H3>
              <div style="margin-top: 0" v-for="(filtru, index) in nrrev">
                <v-checkbox class="stele" v-model="selected.nrrev" :value="index + 1" :label="filtru"></v-checkbox>
              </div>
              <v-btn @click="golesteRev" class="text--black font-weight-bold" outlined text style="margin-top: 1em;">Goleste</v-btn>
            </v-col>
            <v-btn @click="clear" class="text--black font-weight-bold" outlined text style="margin-top: 1em;">Goleste tot</v-btn>
          </v-col>
        </v-col>
        <v-row>
          <v-col>
            <v-card class="pa-7 mb-4"  v-for="produs in produse" :key="produs.id">
              <v-row><img @click="goToProduct(produs.id)" class="imagini" :src="produs.img" alt="alt text" />
                <v-col><v-card-title @click="goToProduct(produs.id)" class="titlu-prod">{{ produs.name }}</v-card-title>
                  <v-card-subtitle class="descriere">Reviews: {{ produs.reviews}}</v-card-subtitle></v-col>
                <v-spacer />
                <v-col><v-row><v-rating class="stea"
                                        background-color="warning lighten-1"
                                        color="warning"
                                        half-increments
                                        length="5"
                                        readonly
                                        size="25"
                                        :value=(produs.rating/produs.reviews)
                ></v-rating>
                  <p class="rating" style="margin-top: 2px; font-family: 'Lato', sans-serif;">
                    ({{ (isNaN(produs.rating/produs.reviews)) ? 0 : (produs.rating/produs.reviews) | toFixed }})
                  </p></v-row></v-col></v-row>
              <v-col>

                <v-card-text class="descriere">{{ produs.descriere }}</v-card-text>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

    </v-col>
  </v-main>
</template>

<script>
    import AddProdusPopup from "../components/AddProdusPopup";
    export default {
        name: "categorie",
        props: ['id'],
        components: {
            'add-product': AddProdusPopup
        },
        created () {
            this.$store.dispatch('loadProduse', {
                id: this.id,
                stele: [],
                nrrev: []
            })
            this.$store.dispatch('loadCatName', this.id)
        },
        data () {
            return {
                catKey: this.id,
                stele: ["1 stea", "2 stele", "3 stele", "4 stele", "5 stele"],
                nrrev: ["1-5", "5-10", "10+"],
                selected: {
                    stele: [],
                    nrrev: []
                }
            }
        },
        watch: {
            selected: {
                handler: function () {
                    this.$store.dispatch('loadProduse', {
                        id: this.id,
                        stele: this.selected.stele,
                        nrrev: this.selected.nrrev
                    })
                },
                deep: true
            },
        },
        computed: {
            produse () {
                return this.$store.getters.produse
            },
            loading () {
                return this.$store.getters.loading
            },
            userIsAuthenticated () {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
            numeCat () {
                return this.$store.getters.numeCat
            }
        },
        methods: {
            goToProduct (id) {
                this.$router.push('/categorii/' + this.id + '/produs/' + id)
            },
          golesteStele () {
            this.selected.stele = []
          },
          golesteRev () {
            this.selected.nrrev = []
          },
          clear () {
            this.selected.stele = [],
            this.selected.nrrev = []
          }
        }
    }
</script>

<style scoped>
.Filtre{
  border: 1px solid #ccc;
  margin: 0.2em;

}
.zonaFiltre{
  border: 2px solid #ccc;
  margin-right: 3em;
  width: 15em;
}
.stele{
  margin-top: 0;
  font-family: 'Lato', sans-serif;
  font-weight: bold;
}
.imagini{
  width: 10em;
  height: auto;
  float: left;
  cursor: pointer;
  margin: 0.5em;
}
.titlu-prod{
  font-family: 'Arial Black', sans-serif;
  padding-left:0.5em;
  cursor: pointer;
  word-break: break-word;
}
.descriere{
  font-size: 1em;
  text-align: left;
  padding-top: 0.2em;
  font-family: 'Lato', sans-serif;
  font-weight: bold;
}
.stea{
  color: #ff9454;
  padding-top: 1.3rem;
  padding-bottom: 1.3rem;
}
.rating{
  font-size: 0.85em;
  padding-top: 1.8em;
}
.button {
  margin-bottom: 1.5em;
}
button1{
  margin-bottom: 1.5em;
  display: flex;
  justify-content: center;
}
.cattitle{
  font-size: 2em;
}

.font {
  font-family: 'Archivo Black', sans-serif;
}

</style>
