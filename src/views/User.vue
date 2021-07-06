<template>
  <div>
    <v-main class="main">
      <br><br>
      <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
              v-if="loading"
      ></v-progress-circular>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="11" md="10" lg="9" xl="8">
            <v-card>
              <v-tabs grow color="#000000" background-color="grey lighten-2" slider-color="hsl(47, 95%, 49%)">
                <v-tab><v-icon>mdi-account-circle</v-icon></v-tab>
                <v-tab><v-icon>mdi-card-bulleted</v-icon></v-tab>
                <v-tab><v-icon>mdi-bell-ring</v-icon></v-tab>
                <v-tab-item class="profileColor">
                  <br>
                  <v-container fluid>
                    <v-row no gutters style="padding-right: 2rem; padding-bottom: 2rem;"
                    v-if="authUser">
                      <v-spacer />
                        <EditAccPopup :userDet="user" />
                    </v-row>
                    <v-row no-gutters justify="center" align="center">
                      <v-col>
                        <img :src="user.profileImg" class="profilePic">
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-container>
                    <v-row>
                      <v-col>
                        <p>Nume: {{ user.userName }}</p>
                        <p v-if="authUser">E-mail: {{ authUser.email }}</p>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-container>
                    <v-row>
                      <v-col>
                        <hr class="tableLine" />
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-container>
                    <v-row>
                      <v-col>
                        <H4>Biografie:</H4><br>
                        <p v-if="user.biografie">{{ user.biografie }}</p>
                        <p v-else>(nu exista)</p>
                      </v-col>
                    </v-row>
                  </v-container>
                  <hr class="tableLine" />
                  <v-container>
                    <v-row >
                      <v-col>
                        <p v-if="reviews">Numar de review-uri: {{ reviews.length }}</p>
                        <p v-else>Numar de review-uri: 0</p>
                        <p>Numar de produse adaugate: 0</p>
                        <p>Numar total de aprecieri la review-uri: 0</p>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-tab-item>
                <v-tab-item class="profileColor">
                  <br>
                  <p v-if="reviews.length !== 0 && authUser">Acestea sunt recenziile tale!</p>
                  <p v-else-if="reviews.length === 0 && authUser">Momentan nu ai nicio recenzie!</p>
                  <p v-else-if="reviews.length !== 0 && !authUser">
                    Acestea sunt recenziile lui {{ user.userName }}!</p>
                  <p v-else>Momentan {{ user.userName }} nu are nicio recenzie!</p>
                  <br v-if="reviews.length !== 0">
                  <v-container>
                    <v-row justify="center">
                      <v-col sm="12" md="10" lg="9" xl="8">
                        <v-card class="pa-7 mb-4" style="overflow:hidden;" v-for="review in reviews" :key="review.id">
                          <v-container>
                            <div>
                              <v-row no-gutters>
                                <v-col md="1" sm="2" class="hidden-sm-and-up">
                                  <v-avatar size="42">
                                    <img :src="review.userImg">
                                  </v-avatar>
                                </v-col>
                                <v-spacer/>
                                <v-btn icon :href="review.link">
                                  <v-icon>mdi-arrow-right</v-icon>
                                </v-btn>
                              </v-row>

                              <v-row style="max-height:12rem; margin-top: 0.2rem;">
                                <v-col md="1" sm="2" class="hidden-xs-only">
                                  <v-avatar size="42">
                                    <img :src="review.userImg">
                                  </v-avatar>
                                </v-col>
                                <v-col md="6" class="hidden-sm-and-down">
                                  <v-card-title class="titlu-review">
                                    {{review.name}}
                                  </v-card-title>
                                </v-col>
                                <v-col cols="12" sm="6" md="5">
                                  <v-row>
                                    <v-spacer></v-spacer>
                                    <v-col cols="8" align="right">
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
                                    <v-col cols="4" align="left">
                                      <div class="rat">
                                        ({{review.rating}})</div>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                  </v-row>
                                </v-col>
                                <v-col class="hidden-md-and-up" cols="12">
                                  <v-card-title class="titlu-review">{{review.name}}</v-card-title>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col>
                                  <v-card-title class="titlu-review">{{review.title}}</v-card-title>
                                  <v-card-text class="text-review">{{review.text | quotes}}</v-card-text>
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
                </v-tab-item>
              </v-tabs>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <br />
  </div>
</template>


<script>
import EditAccPopup from "../components/EditAccPopup";

export default {
  components: {
    'EditAccPopup' : EditAccPopup
  },
  props: ['id'],
  data: () => ({
  }),
  created() {
    this.$store.dispatch('loadUserReviews', this.id)
  },
  computed: {
    user () {
      return this.$store.getters.someUser(this.id)
    },
    authUser () {
      if(this.$store.getters.user) {
        if(this.$store.getters.user.key === this.$store.getters.someUser(this.id).id)
          return this.$store.getters.user
      }
    },
    loading () {
      return this.$store.getters.loading
    },
    reviews () {
      return this.$store.getters.userReviews
    }
  }
}
</script>

<style scoped>
@media screen and (max-width:1264px) {
  .nume-review {
    font-size: 1rem !important;
  }
  .avatar {
    font-size: 1rem !important;
    height: 2.5rem !important;
    width: 2.5rem !important;
  }
  .rat{
    font-size: 1rem !important;
  }
}
.v-card__title{
  word-break: break-word;
}
.main {
  background-color: #ffffff;
  font-family: 'Lato', sans-serif;
  margin-top: 5rem;
  min-height: 85vh;
}
.profileColor {
  background-color: #f5f5f5;
}
.profilePic{
  border-radius: 10px;
  max-width:25vh;
  min-width:15vh;
  height:25vh;
  width:auto;
}
th, td {
  padding-left: 150px;
  padding-right: 150px;
}
table{
  position:center;
  margin:auto;
}
.tableLine{
  min-width:10vh;
  max-width:10vh;
  width: available;
  margin:auto;
}
.imag{
  max-width:220px;
  max-height: 220px;
  padding: 5px;
}
.titlu-review{
  padding:10px;
  font-family: 'Archivo Black', sans-serif;
  font-size: 20px;
}
.text-review{
  font-size:18px;
  font-family: 'Lato', sans-serif;
  font-weight: bolder;
  text-align: left;
}

</style>