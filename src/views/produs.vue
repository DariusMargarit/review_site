<template>
  <v-main>
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet">
    <div style="height:350px;width:2000px;position: absolute;top: 0px;z-index: 1;" class="grey lighten-3"></div>
<!--    <navbar />-->
    <br><br><br><br>
    <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            v-if="loading"
    ></v-progress-circular>
    <div v-if="!loading" style="z-index:999;position: relative;margin:auto;width:70%">
      <div>
        <v-container>
          <v-row>
            <v-col>
              <div>
                <div class="stangaDivProd">
                  <img class="imagDesc" :src="theProd.img" alt="alt text" />
                  <div class="rat">
                    ({{ (isNaN(theProd.rating/theProd.reviews)) ? 0 : (theProd.rating/theProd.reviews) | toFixed }})
                  </div>
                  <v-rating class="ste"
                            background-color="warning lighten-1"
                            color="warning"
                            half-increments
                            length="5"
                            readonly
                            size="25"
                            :value=(theProd.rating/theProd.reviews)
                  ></v-rating>
                  <v-card-title class="titlu">{{theProd.name}}</v-card-title>
                  <v-card-subtitle class="tex">Rewiews: {{theProd.reviews}}</v-card-subtitle>
                  <v-card-text class="tex">{{ theProd.descriere}}</v-card-text>
                  <div>
                    <v-btn :href="theProd.link" class="button text--black font-weight-bold" plain>
                      Link
                    </v-btn>
                    <add-review-popup :Ids="Ids" v-if="userIsAuthenticated" />
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <br />
      <div style="margin:auto;width:60%">
        <v-container>
          <v-row>
            <v-col>
              <v-card class="pa-7 mb-4" style="overflow:hidden" v-for="review in reviews" :key="review.id">
                <div>
                  <div style="float: right">
                    <div class="rat">
                      ({{review.rating}})</div>
                      <v-rating class="ste"
                                background-color="warning lighten-1"
                                color="warning"
                                half-increments
                                length="5"
                                readonly
                                size="25"
                                :value=review.rating
                      ></v-rating>

                  </div>

                  <v-avatar style="float: left; cursor: pointer" @click="goToUserProfile(review.userKey)">
                    <img :src="review.userImg" class="avatarr">
                  </v-avatar>

                  <v-card-title class="titlu">{{review.name}}</v-card-title>
                  <div v-if="review.img" style="float: right;"><v-img class="imag" :src="review.img" /></div>
                  <v-card-title class="texti">{{review.title}}</v-card-title>
                  <v-card-text class="tex">{{review.text | quotes}}</v-card-text>

                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-main>
</template>

<script>
// import Navbar from "../components/Navbar";
import AddReviewPopup from "../components/AddReviewPopup";
export default {
  name: "categorie",
  props: ['catId','prodId'],
  components: {
    // 'navbar': Navbar,
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
  },
  methods: {
    goToUserProfile (id) {
      this.$router.push('/user/' + id)
    }
  }
}
</script>
<style scoped>
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
  float:right;
  margin: 20px;
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
}
.ste{
  color: #ff9454;
  float: right;
  margin-top: 17px;
}
.rat{
  float: right;
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
</style>
