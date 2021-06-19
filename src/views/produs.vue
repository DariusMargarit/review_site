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
<!--          <v-card align="center" class="pa-7 mb-4" style="overflow:hidden;" v-for="review in reviews" :key="review.id">-->
<!--            <v-container>-->
<!--              <div>-->
<!--                <v-row no-gutters>-->
<!--                  <v-spacer></v-spacer>-->
<!--                  <v-col cols="1">-->
<!--                    <EditReviewPopup />-->
<!--                  </v-col>-->
<!--                </v-row>-->
<!--                <v-row no-gutters style="max-height:10rem">-->
<!--                  <v-col md="1" sm="1">-->
<!--                    <v-avatar @click="goToUserProfile(review.userKey)">-->
<!--                      <img :src="review.userImg" class="avatarr" style="cursor: pointer">-->
<!--                    </v-avatar>-->
<!--                  </v-col>-->
<!--                  <v-col md="6" class="hidden-sm-and-down">-->
<!--                    <v-card-title @click="goToUserProfile(review.userKey)" class="titlu" style="cursor: pointer">-->
<!--                      {{review.name}}-->
<!--                    </v-card-title>-->
<!--                  </v-col>-->
<!--                  <v-col md="3" sm="4">-->
<!--                    <v-rating class="ste"-->
<!--                              background-color="warning lighten-1"-->
<!--                              color="warning"-->
<!--                              half-increments-->
<!--                              length="5"-->
<!--                              readonly-->
<!--                              size="1.5rem"-->
<!--                              :value=review.rating-->
<!--                    ></v-rating>-->
<!--                  </v-col>-->
<!--                  <v-col cols="2" class="hidden-sm-and-down">-->
<!--                    <div class="rat">-->
<!--                      ({{review.rating}})</div>-->
<!--                  </v-col>-->
<!--                  <v-col class="hidden-md-and-up" cols="12">-->
<!--                    <v-card-title class="titlu">{{review.name}}</v-card-title>-->
<!--                  </v-col>-->
<!--                </v-row>-->
<!--                <v-row>-->
<!--                  <v-col>-->
<!--                    <v-card-text class="texti">{{review.title}}</v-card-text>-->
<!--                    <v-card-text class="tex">{{review.text | quotes}}</v-card-text>-->
<!--                  </v-col>-->
<!--                  <v-col v-if="review.img">-->
<!--                    <v-img class="imag" :src="review.img" />-->
<!--                  </v-col>-->
<!--                </v-row>-->
<!--              </div>-->
<!--            </v-container>-->
<!--          </v-card>-->


          <v-card class="pa-7 mb-4" style="overflow:hidden;" v-for="review in reviews" :key="review.id">
            <v-container>
              <div>
                <v-row no-gutters>
                  <v-spacer></v-spacer>
                  <v-col cols="1">
                    <EditReviewPopup />
                  </v-col>
                </v-row>
                <v-row no-gutters style="max-height:10rem">
                  <v-col md="1" sm="1">
                    <v-avatar @click="goToUserProfile(review.userKey)">
                      <img :src="review.userImg" class="avatarr">
                    </v-avatar>
                  </v-col>
                  <v-col md="6" class="hidden-sm-and-down">
                    <v-card-title @click="goToUserProfile(review.userKey)" style="cursor: pointer" class="titlu">
                      {{review.name}}
                    </v-card-title>
                  </v-col>
                  <v-col md="3" sm="9">
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
                  <v-col cols="2" class="hidden-md-and-down">
                    <div class="rat">
                      ({{review.rating}})</div>
                  </v-col>
                  <v-col class="hidden-md-and-up" cols="12">
                    <v-card-title class="titlu">{{review.name}}</v-card-title>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-card-title class="texti">{{review.title}}</v-card-title>
                    <v-card-text class="tex">{{review.text | quotes}}</v-card-text>
                  </v-col>
                  <v-col v-if="review.img">
                    <div><v-img class="imag" :src="review.img" /></div>
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
export default {
  name: "categorie",
  props: ['catId','prodId'],
  components: {
    'EditReviewPopup': EditReviewPopup,
    'add-review-popup': AddReviewPopup
  },
  created() {
    this.$store.dispatch('loadProd', {
      catId: this.catId,
      prodId: this.prodId
    })
    this.$store.dispatch('loadProductReviews', {
      catId: this.catId,
      prodId: this.prodId
    })
  },
  data () {
    return {
      Ids: {
        IdCat: this.catId,
        IdProd: this.prodId
      },
      revId: null
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
  },
  methods: {
    goToUserProfile (id) {
      this.$router.push('/user/' + id)
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
.divProd{
  z-index: 999;
}
.review{
  margin-bottom:15px;
}
.imagDesc{
  width:300px;
  max-height: 220px;
  max-width: 300px;
  /*float:right;
  margin: 20px;*/
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
.stangaDivProd{
  margin-right:7%;
}
.button {
  margin-bottom: 30px;
  text-align: center;
  background-color: hsl(47, 95%, 49%);
}
.avatarr{
  float:left;
  font-size:32px;
  height: 42px;
  width: 42px;
}

.avatarr:hover {
  cursor: pointer;
}

</style>
