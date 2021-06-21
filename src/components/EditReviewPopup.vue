<template>
  <v-dialog v-model="editReview" width="600">
    <template v-slot:activator="{ on }">
      <button class="buton-edit" v-on="on">
          <v-icon>
            mdi-lead-pencil
          </v-icon>
      </button>
    </template>

    <v-card class="main-content">
      <div>
        <v-form>
          <div @click="editReview = !editReview"><v-icon class="closeIcon">mdi-close</v-icon></div>

          <h1>Editeaza review-ul pentru</h1>
          <br />
          <br />
          <div>
            <v-row>
              <v-col>
                <div><h2 style="float: left; justify-content: center; align-content: center; display: flex;">{{ theProd.name }}</h2></div>
              </v-col>
              <v-col>
                <div><img class="imagine" :src="theProd.img"/></div>
              </v-col>
            </v-row>
          </div>
          <br />
          <br />
          <div align="center">
            <p>Modifica nota:</p>
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
                label="Descriere noua cu un cuvant"
                rows="1"
                no-resize
                required
                clearable
            ></v-textarea>
            <v-row no-gutters>
              <v-file-input
                  prepend-inner-icon="mdi-image"
                  label="Schimba imaginea"
                  dense
                  show-size
                  prepend-icon=""
                  v-model="picture"
              ></v-file-input>
              <img :src="this.imageUrl" class="imagePreview" v-if="this.picture">
              <v-btn plain text style="margin-right: 0; padding:0;">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-row>
          </div>

          <div align="center">
            <br />
            <v-btn class="mr-4 " depressed style="background-color: hsl(47, 95%, 49%);font-family: 'Lato', sans-serif; font-weight: bold;" type="submit" :loading="loading">trimite</v-btn>
            <v-btn @click="clear" depressed style="background-color: hsl(47, 95%, 49%);font-family: 'Lato', sans-serif; font-weight: bold;">goleste</v-btn>
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
    picture: null,
    loading: false,
    editReview: false,
  }),

  computed: {
    theProd () {
      return this.$store.getters.theProd
    }
  },

  methods: {
    submitForm () {
      this.loading=true
      const det = {
        rating: this.rating,
        review: this.review,
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
    }
  }
}

</script>

<style>

/*@media screen and (max-width: 1264px) {*/
/*  .top-button {*/
/*    margin-bottom: 0.1rem;*/
/*  }*/
/*}*/

.main-content {
  background-color: white;
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
  background-color: hsl(47, 95%, 49%);
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
.imagine {
  float: right;
  align-content: flex-end;
  justify-content: center;
  display: flex;
  width:100%;
  height: 100%;
}

</style>
