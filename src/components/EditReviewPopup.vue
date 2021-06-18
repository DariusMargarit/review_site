<template>
  <v-dialog v-model="editReview" width="600">
    <template v-slot:activator="{ on }">
      <v-button class="buton-edit" v-on="on">
<!--        <v-btn-->
<!--            fab-->
<!--            dark-->
<!--            small-->
<!--            color=rgba(64,64,64,1)-->
<!--        >-->
          <v-icon>
            mdi-lead-pencil
          </v-icon>
<!--        </v-btn>-->
      </v-button>
    </template>

    <v-card class="main-content">
      <div>
        <v-form>
          <div @click="editReview = !editReview"><v-icon class="closeIcon">mdi-close</v-icon></div>

          <h1>Editeaza review-ul pentru</h1>
          <br />
          <br />
<!--          <div>-->
<!--            <v-row>-->
<!--              <v-col>-->
<!--                <div><h2 style="float: left; justify-content: center; align-content: center; display: flex;">{{ theProd.name }}</h2></div>-->
<!--              </v-col>-->
<!--              <v-col>-->
<!--                <div><img class="imagine" :src="theProd.img"/></div>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </div>-->
          <br />
          <br />
          <div align="center">
            <p>Acorda o nota:</p>
            <v-rating class="ste"
                      background-color="warning lighten-1"
                      color="warning"
                      half-increments
                      hover
                      length="5"
                      size="40"
                      v-model="rating"
                      required
                      clearable
            ></v-rating>
            <br />
            <v-textarea
                prepend-inner-icon="mdi-lead-pencil"
                v-model="review"
                label="Review nou"
                auto-grow
                no-resize
                required
                clearable
            ></v-textarea>
            <v-textarea
                prepend-inner-icon="mdi-format-title"
                v-model="titluReview"
                label="Descriere noua cu un cuvant"
                rows="1"
                no-resize
                required
                clearable
            ></v-textarea>
            <div>
              <v-file-input
                  prepend-inner-icon="mdi-image"
                  label="Schimba imaginea"
                  dense
                  show-size
                  prepend-icon=""
                  v-model="picture"
              ></v-file-input>
              <img :src="this.imageUrl" class="imagePreview" v-if="this.picture">
            </div>
          </div>

          <div align="center">
            <br />
            <v-btn class="mr-4 " text outlined style="font-family: 'Lato', sans-serif; font-weight: bold;" type="submit" :loading="loading">salveaza</v-btn>
            <v-btn @click="clear" text outlined style="font-family: 'Lato', sans-serif; font-weight: bold;">goleste</v-btn>
          </div>

        </v-form>
      </div>
    </v-card>

  </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(15), minLength: minLength(3) },
    description: {required, maxLength: maxLength(100)},
  },

  data: () => ({
    rating: 0,
    review: '',
    titlureview: '',
    picture: null,
    loading: false,
    editReview: false,
  }),

  methods: {
    submitForm () {
      this.loading=true
      const det = {
        rating: this.rating,
        review: this.review,
        titluReview: this.titluReview,
        picture: this.picture,
        userName: this.user.userName,
        userKey: this.user.key,
      }
    },
    clear () {
      this.$v.$reset()
      this.review = ''
      this.loading = false
      this.imageUrl = null
      this.picture = null
      this.rating = 0
      this.titluReview = ''
    }
  }
}

</script>

<style>
.main-content {
  background: rgb(255,255,255);
  background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(0,204,255,0.05) 23%, rgba(0,204,255,0.1) 100%);
  min-height: 60vh;
  min-width: 40vh;
  text-align: center;
  justify-content: center;
  align-content: center;
  display: flex;
  padding: 60px;
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
  background-color: lightskyblue;
}

.imagePreview {
  width: 300px;
  min-height: 100px;
  padding: 5px;
  margin: 15px;
  align-items: center;
  justify-items: center;
  display: flex;
  color: #cccccc;
}

.buton-edit :hover {
  cursor: pointer;
  background-color: #e9e9e9;
  border-radius: 2rem;
}


</style>
