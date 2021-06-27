<template>
  <div>
    <v-main class="main">
      <br><br>
      <v-container class="profileCard" style="justify-content: center; display: flex;">
        <div>
          <v-divider vertical dark inset/>
          <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
              v-if="loading"
          ></v-progress-circular>
          <v-container fluid>
            <v-row no-gutters justify="center" align="center">
              <v-col>
                <div class="wrapper">
                  <img :src="user.profileImg" width="300" height="300" class="profilePic">
                </div>
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
                <hr class="tableLine">
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
          <v-container>
            <v-row >
              <v-col>
                <p v-if="reviews">Nr de review-uri: {{ reviews.length }}</p>
                <p v-else>Nr de review-uri: 0</p>
              </v-col>
            </v-row>
          </v-container>
          <div style="margin:auto;width:75%">
            <v-container>
              <v-row>
                <v-col>
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
                            <v-avatar>
                              <img :src="review.userImg" class="avatar">
                            </v-avatar>
                          </v-col>
                          <v-col md="6" class="hidden-sm-and-down">
                            <v-card-title class="nume-review">{{review.name}}</v-card-title>
                          </v-col>
                          <v-col md="3" sm="9">
                            <v-rating class="stele"
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
                            <div class="rating">
                              ({{review.rating}})</div>
                          </v-col>
                          <v-col class="hidden-md-and-up" cols="12">
                            <v-card-title class="nume-review">{{review.name}}</v-card-title>
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
          </div>
        </div>
      </v-container>
    </v-main>
    <br />
  </div>
</template>


<script>
import EditReviewPopup from "@/components/EditReviewPopup";
export default {
  components: {EditReviewPopup},
  props: ['id'],
  data: () => ({
  }),
  created() {
    this.$store.dispatch('loadUsers')
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
  .v-card__title{
    word-break: break-word !important;
  }
  .rat{
    font-size: 1rem !important;
  }
}
.main {
  background-color: #ffffff;
  font-family: 'Lato', sans-serif;
  margin-top: 5rem;
}
.profileCard {
  top: 5px;
  left: 0;
  max-width: 100%;
  min-width:60%;
  width: fit-content;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.profilePic{
  border-radius: 10px;
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
  min-width:60%;
  max-width:100%;
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
.nume-review {
  font-family: 'Archivo Black', sans-serif;
  font-weight: bolder;
  font-size: 25px;
  text-align: justify;
  text-justify: inter-word;
}
.stele{
  color: #ff9454;
  float: right;
  margin-top: 17px;
}
.rating{
  font-size: 20px;
  margin-top: 16px;
  font-family: 'Lato', sans-serif;
  font-weight: bold;
}
.avatar{
  float:left;
  font-size:32px;
  height: 42px;
  width: 42px;
}
</style>
