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
                    <v-card-subtitle class="tex">Rewiews: {{theProd.reviews}}</v-card-subtitle>
                  </v-col>
                  <v-spacer class="hidden-sm-and-down"></v-spacer>
                  <v-col lg="3">
                    <v-rating class="ste"
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
                    <div class="rat">
                      ({{ (isNaN(theProd.rating/theProd.reviews)) ? 0 : (theProd.rating/theProd.reviews) | toFixed }})
                    </div>
                  </v-col>
                  <v-spacer class="hidden-lg-and-up"></v-spacer>
                </v-row>
                <v-row>
                  <v-card-text class="tex">{{ theProd.descriere}}</v-card-text>
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
              <add-review-popup :Ids="Ids" v-if="userIsAuthenticated" />
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-container>
    <br><br>
    <v-container  style="min-height: 65vh">
      <v-row justify="center">
        <v-col xl="5" lg="8" md="10" sm="11" justify="center">
          <v-card class="pa-7 mb-4" style="overflow:hidden;" v-for="review in reviews" :key="review.id">
            <v-container>
              <div>
                <v-row no-gutters>
                  <v-col md="1" sm="2" class="hidden-sm-and-up">
                    <v-avatar @click="goToUserProfile(review.userKey)" size="42">
                      <img :src="review.userImg" class="avatarr">
                    </v-avatar>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="4" sm="2" md="2" align="right" align-self="center" v-if="review.edited === true">
                    (editat)
                  </v-col>
                  <v-col class="centru" cols="2" sm="1" v-if="userKey !== review.userKey">
                    <ReportReviewPopup />
                  </v-col>
                  <v-col cols="2" sm="1" v-if="userKey === review.userKey">
                    <div @mouseover="transfData(review)">
                      <EditReviewPopup :reviewDet="reviewDet" />
                    </div>
                  </v-col>
                </v-row>
                <v-row style="max-height:12rem; margin-top: 0.2rem;">
                  <v-col md="1" sm="2" class="hidden-xs-only">
                    <v-avatar @click="goToUserProfile(review.userKey)" size="42">
                      <img :src="review.userImg" class="avatarr">
                    </v-avatar>
                  </v-col>
                  <v-col md="6" class="hidden-sm-and-down">
                    <v-card-title @click="goToUserProfile(review.userKey)" style="cursor: pointer" class="titlu">
                      {{review.name}}
                    </v-card-title>
                  </v-col>
                  <v-col cols="12" sm="6" md="5">
                    <v-row>
                      <v-spacer></v-spacer>
                      <v-col cols="8" sm="7" align="right">
                        <v-rating class="ste"
                                  background-color="warning lighten-1"
                                  color="warning"
                                  half-increments
                                  length="5"
                                  readonly
                                  size="1.5rem"
                                  :value=review.rating
                        ></v-rating>
                      </v-col>
                      <v-col cols="4" sm="5" align="left">
                        <div class="rat">
                          ({{review.rating}})</div>
                      </v-col>
                      <v-spacer></v-spacer>
                    </v-row>
                  </v-col>
                  <v-col class="hidden-md-and-up" cols="12">
                    <v-card-title class="titlu">{{review.name}}</v-card-title>
                  </v-col>
                </v-row>
                <v-row style="margin-bottom: 0.5rem;">
                  <v-col>
                    <v-card-title class="texti">{{review.title}}</v-card-title>
                    <v-card-text class="tex">{{review.text | quotes}}</v-card-text>
                  </v-col>
                  <v-col cols="12"sm="6" v-if="review.img" align="center">
                    <div><v-img class="imag" :src="review.img" /></div>
                  </v-col>
                </v-row>
                <v-row no-gutters class="font">
                  <v-col cols="2" sm="1">
                    <v-btn icon v-if="review.liked" @click="unlike(review)">
                      <v-icon style="color: red">
                        mdi-heart
                      </v-icon>
                    </v-btn>
                    <v-btn class="heart-btn-click" icon v-else @click="like(review)">
                      <v-icon>
                        mdi-heart-outline
                      </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="4" align-self="center" align="left">
                    {{ review.likes }}
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="6" sm="2" align-self="center" align="right">
                    {{ review.date }}
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import EditReviewPopup from "@/components/EditReviewPopup";
import AddReviewPopup from "../components/AddReviewPopup";
import ReportReviewPopup from "../components/ReportReviewPopup";
import firebase from "firebase";
export default {
  name: "categorie",
  props: ['catId','prodId'],
  components: {
    'EditReviewPopup': EditReviewPopup,
    'add-review-popup': AddReviewPopup,
    'ReportReviewPopup' : ReportReviewPopup
  },
  created() {
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
      reviewDet: {
        id: null,
        img: null,
        name: '',
        rating: 0,
        text: '',
        title: '',
        userImg: null,
        userKey: null,
        IdCat: this.catId,
        IdProd: this.prodId
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
  },
  methods: {
    goToUserProfile (id) {
      this.$router.push('/user/' + id)
    },
    transfData (value) {
      this.reviewDet.id = value.idFromCat
      this.reviewDet.img = value.img
      this.reviewDet.name = value.name
      this.reviewDet.rating = value.rating
      this.reviewDet.text = value.text
      this.reviewDet.title = value.title
      this.reviewDet.userImg = value.userImg
      this.reviewDet.userKey = value.userKey
    },
    like (value) {
      if(this.userIsAuthenticated) {
        this.$store.dispatch('like', {
          reviewKey: value.id,
          userKey: this.userKey
        })
        window.location.reload()
      }
       else {
         this.$router.push('/Login')
      }
    },
    unlike (value) {
      this.$store.dispatch('unlike', {
        reviewKey: value.id,
        likeKey: value.likeKey
      })
      setTimeout(window.location.reload(), 200)
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
.imag{
  max-width:220px;
  max-height: 220px;
  padding: 5px;
}
.texti{
  padding:10px;
  font-family: 'Archivo Black', sans-serif;
  font-size: 20px;
}
.tex{
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
.ste{
  color: #ff9454;
  margin-top: 17px;
}
.rat{
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
.avatarr{
  font-size:32px;
}
.avatarr:hover {
  cursor: pointer;
}
.centru {
  align-content: center;
  justify-content: center;
  display: flex;
}

.font {
  font-family: 'Lato', sans-serif;
  font-weight: bold;
}

.heart-btn-click :hover {
  color: red;
}



</style>
