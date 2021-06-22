<template>
  <v-dialog v-model="editReview" width="600">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
          <v-icon>
            mdi-lead-pencil
          </v-icon>
      </v-btn>
    </template>

    <v-card class="main-content">
      <div>
          <div @click="this.editReview = !this.editReview"><v-icon class="closeIcon">mdi-close</v-icon></div>

          <h1>Editeaza review-ul pentru</h1>
          <br />
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
        <v-form @submit.prevent="submitForm">
          <div align="center">
            <p>Modifica nota:</p>
            <v-rating class="ste"
                      background-color="warning lighten-1"
                      color="warning"
                      half-increments
                      hover
                      v-model="rating"
                      length="5"
                      size="40"
                      required
                      clearable
            ></v-rating>
            <br />
            <v-textarea
                prepend-inner-icon="mdi-lead-pencil"
                label="Review nou"
                auto-grow
                v-model="text"
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
                v-model="title"
                clearable
            ></v-textarea>
            <v-row no-gutters>
              <v-file-input
                  prepend-inner-icon="mdi-image"
                  :label="this.imgUrl ? 'Schimba imaginea' : 'Adauga o imagine'"
                  dense
                  @change="hideImg()"
                  v-model="picture"
                  show-size
                  prepend-icon=""
              ></v-file-input>
              <v-btn @click="clearImg()" icon style="margin: 0; padding:0;" v-if="this.imgUrl">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-row>

              <img v-if="this.imgUrl" :src="this.imgUrl" class="imagePreview" id="firstImgPrev">
              <img v-if="this.picture" :src="this.newImg" class="imagePreview">

          </div>

          <div align="center">
            <br />
            <v-btn class="mr-4 " depressed style="background-color: hsl(47, 95%, 49%);font-family: 'Lato', sans-serif; font-weight: bold;" type="submit" :loading="loading">salveaza</v-btn>
            <v-btn @click="clear()" depressed style="background-color: hsl(47, 95%, 49%);font-family: 'Lato', sans-serif; font-weight: bold;">goleste</v-btn>
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

  props: ['reviewDet'],

  data: () => ({
    rating: 0,
    loading: false,
    editReview: false,
    text: '',
    title: '',
    imgUrl: '',
    newImg: '',
    picture: null,
    cleared: false,
    datamod: false,
    id: null,
    IdCat: null,
    IdProd: null
  }),

  beforeUpdate() {
    if(!this.datamod) {
      if(!this.editReview && this.cleared) {
        this.cleared = false
      }

      if(!this.cleared) {
        this.rating = this.reviewDet.rating
        this.text = this.reviewDet.text
        this.title = this.reviewDet.title
        this.imgUrl = this.reviewDet.img
        this.id = this.reviewDet.id
        this.IdCat = this.reviewDet.IdCat
        this.IdProd = this.reviewDet.IdProd
      }
    }
  },

  watch : {
    picture (value) {
      if(value != null && value != undefined)
      {
        const reader = new FileReader();
        const vm = this
        reader.addEventListener("load", function () {
          vm.newImg = this.result
          vm.imgUrl = ''
        })
        reader.readAsDataURL(value)
      }
    },
    rating (value) {
      if(value != this.reviewDet.rating && !this.cleared) {
        this.datamod = true
      }
    },
    text (value) {
      if(value != this.reviewDet.text && !this.cleared) {
        this.datamod = true
      }
    },
    title (value) {
      if(value != this.reviewDet.title && !this.cleared) {
        this.datamod = true
      }
    },
    newImg (value) {
      if(value != '' && !this.cleared) {
        this.datamod = true
      }
    }
  },

  computed: {
    theProd () {
      return this.$store.getters.theProd
    }
  },

  methods: {
    clear () {
      this.$v.$reset()
      this.text = ''
      this.loading = false
      this.imgUrl = ''
      this.title = null
      this.rating = 0
      this.picture = null
      this.cleared = true
      this.datamod = false
    },
    hideImg() {
      document.getElementById('firstImgPrev').style.display="none"
    },
    submitForm () {
      this.cleared = false
      this.loading = true
      const det = {
        rating: this.rating,
        text: this.text,
        title: this.title,
        picture: this.picture,
        id: this.id,
        IdCat: this.IdCat,
        IdProd: this.IdProd,
        oldRating: this.reviewDet.rating,
        bigRating: this.theProd.rating,
        imgUrl: this.imgUrl
      }
      this.$store.dispatch('updateReview', det)
      this.loading = false
      this.editReview = false
    },
    clearImg () {
      this.imgUrl = ''
      document.getElementById('firstImgPrev').style.display="none"
    }
  }
}

</script>

<style>


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
