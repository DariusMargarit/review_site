<template>
  <v-main>
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet">
    <v-container fluid class="grey lighten-3" style="text-align: justify; text-justify: inter-word;">
      <br><br><br>
      <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
          v-if="loading"
      ></v-progress-circular>
      <v-container style="min-width:70%;max-width:100%;width: fit-content">
        <div style="width:100%">
          <v-row >
            <v-col lg="8" md="6" sm="6" cols="12">
              <div>
                <v-row no-gutters>
                  <v-col lg="7" cols="12">
                    <v-card-title class="titlu">{{theProd.name}}</v-card-title>
                    <v-card-subtitle class="subtitlu">Rewiews: {{theProd.reviews}}</v-card-subtitle>
                  </v-col>
                  <v-spacer class="hidden-sm-and-down"></v-spacer>
                  <v-col lg="3">
                    <v-rating class="stele"
                              background-color="warning lighten-1"
                              color="warning"
                              half-increments
                              length="5"
                              readonly
                              size="25"
                              :value=(theProd.rating/theProd.reviews)
                    ></v-rating>
                  </v-col>
                  <v-col lg="1">
                    <div class="rating">
                      ({{ (isNaN(theProd.rating/theProd.reviews)) ? 0 : (theProd.rating/theProd.reviews) | toFixed }})
                    </div>
                  </v-col>
                  <v-spacer class="hidden-lg-and-up"></v-spacer>
                </v-row>
                <v-row>
                  <v-card-text class="subtitlu">{{ theProd.descriere}}</v-card-text>
                </v-row>
              </div>
            </v-col>
            <v-col lg="4" md="6" sm="6" cols="12" align="center">
              <img class="imagDesc" :src="theProd.img" alt="Imagine Produs" />
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <v-btn :href="theProd.link" class="button text--black font-weight-bold" plain>
                Link
              </v-btn>
              <add-review-popup :Ids="Ids" v-if="userIsAuthenticated && !this.newReviewTest" />
              <v-btn  class="homebutton text--black" disabled plain v-if="this.newReviewTest">
                Adauga un review nou</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-container>
    <br><br>

    <v-container  style="min-height: 65vh">
      <v-row justify="center">
        <v-col xl="5" lg="8" md="10" sm="11" justify="center">
          <v-card :class="review.userKey === userKey ? 'pa-7 mb-4 my-review' : 'pa-7 mb-4'"
                  style="overflow:hidden;" v-for="review in reviews" :key="review.id">
            <Review :review="review" :Ids="Ids"/>
          </v-card>

        </v-col>
      </v-row>
<!--      <v-alert style="width: 23rem;display: flex;float: right"-->
<!--               color="green"-->
<!--               elevation="3"-->
<!--               type="success"-->
<!--      >VALELEU MAICA </v-alert>-->
    </v-container>


  </v-main>
</template>

<script>
import AddReviewPopup from "../components/AddReviewPopup";
import firebase from "firebase/app";
import 'firebase/firestore'
import Review from "../components/Review";
export default {
  name: "categorie",
  props: ['catId','prodId'],
  components: {
    'add-review-popup': AddReviewPopup,
    'Review': Review
  },
  created() {
    window.scrollTo(0,0)

    this.$store.dispatch('loadProd', {
      catId: this.catId,
      prodId: this.prodId
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.firestore().collection('users').doc(user.uid).onSnapshot((doc) => {
          if (doc.exists) {
            this.$store.dispatch('loadProductReviews', {
              catId: this.catId,
              prodId: this.prodId,
              authUserKey: doc.data().key
            })
          }
        })
      }
      else {
        this.$store.dispatch('loadProductReviews', {
          catId: this.catId,
          prodId: this.prodId,
          authUserKey: ''
        })
      }
    })
  },
  data () {
    return {
      Ids: {
        IdCat: this.catId,
        IdProd: this.prodId
      },
      newReviewTest: false
    }
  },

  watch: {
    reviews (value) {
      for(let i in value) {
        if(value[i].userKey === this.userKey) {
          this.newReviewTest = true
          break;
        }
      }
    }
  },

  computed: {
    reviews () {
      return this.$store.getters.reviews
    },
    loading () {
      return this.$store.getters.loading
    },
    theProd () {
      return this.$store.getters.theProd
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userKey () {
      if(this.$store.getters.user !== null && this.$store.getters.user !== undefined) {
        return this.$store.getters.user.key
      }
    }
  }
}
</script>
<style scoped>
@media screen and (max-width:1264px) {
  .imagDesc{
    max-height: 100% !important;
    max-width: 100% !important;
  }
}
.imagDesc{
  width:300px;
  max-height: 220px;
  max-width: 300px;
}
.subtitlu{
  font-size:18px;
  padding-top:7px;
  padding-right: 10px;
  font-family: 'Lato', sans-serif;
  font-weight: bolder;
}
.titlu {
  font-family: 'Archivo Black', sans-serif;
  font-weight: bolder;
  font-size: 25px;
  word-break: break-word;
}
.stele{
  color: #ff9454;
  margin-top: 17px;
}
.rating{
  font-size: 20px;
  padding: 3px;
  margin-top: 13px;
  font-family: 'Lato', sans-serif;
  font-weight: bold;
}
.button {
  margin-bottom: 30px;
  text-align: center;
  background-color: hsl(47, 95%, 49%);
}

.heart-btn-click :hover {
  color: red;
}
.separator {
  display: flex;
  align-items: center;
  text-align: center;
  font-family: 'Arvo', serif;
}
.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e0eaf5;
}
.separator:not(:empty)::before {
  margin-right: .25em;
}
.separator:not(:empty)::after {
  margin-left: .25em;
}

.my-review {
  background-color: #f2f2f2;
}
.homebutton{
  background-color: hsl(47, 95%, 49%);
  margin-bottom: 30px;
  margin-left:15px;
}


</style>