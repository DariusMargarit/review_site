<template>
  <v-dialog v-model="EditAcc" width="600">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>
          mdi-lead-pencil
        </v-icon>
      </v-btn>
    </template>

    <v-card class="main-content">
      <v-container class="form">
        <div @click="closeCard()"><v-icon class="closeIcon">mdi-close</v-icon></div>

        <h1>Modifica-ti contul!</h1>

        <v-form @submit.prevent="submitForm">
          <div align="center">

            <v-textarea
                prepend-inner-icon="mdi-lead-pencil"
                label="Nume nou..."
                auto-grow
                rows="1"
                v-model="newName"
                no-resize
                required
                clearable
                :error-messages="nameErrors"
            ></v-textarea>
            <v-textarea
                prepend-inner-icon="mdi-format-title"
                label="Biografie noua..."
                no-resize
                required
                v-model="newBio"
                clearable
                :error-messages="bioErrors"
            ></v-textarea>
            <v-row no-gutters>
              <v-file-input
                  prepend-inner-icon="mdi-image"
                  dense
                  label="Alege o imagine..."
                  show-size
                  @change="hideImg()"
                  v-model="picture"
                  prepend-icon=""
              ></v-file-input>
              <v-btn icon style="margin: 0; padding:0;" @click="hideImg" v-if="this.oldPic">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-row>

            <img v-if="this.oldPic" :src="this.oldPic" class="imagePreview" id="firstImgPrev">
            <img v-if="this.picture" :src="this.newImg" class="imagePreview">

          </div>

          <v-row style="justify-content: center; display: flex;margin-top: 4rem" no-gutters align="center">
            <v-col cols="6" md="3">
              <v-btn depressed style="background-color:#f4c006; font-family: 'Lato', sans-serif; font-weight: bolder;" class="mr-4 buton-golit" @click="closeCard()">RENUNTA</v-btn>
            </v-col>
            <v-col cols="6" md="3">
              <v-btn depressed style="background-color:#5acbff; font-family: 'Lato', sans-serif; font-weight: bolder;" type="submit" :loading="loading" class="buton-send">SALVEAZA</v-btn>
            </v-col>
          </v-row>

        </v-form>
      </v-container>
    </v-card>

  </v-dialog>

</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'
import alpha from "vuelidate/lib/validators/alpha";

// const speciale = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '( ͡° ͜ʖ ͡°)']

// const caractere = (value) => value.indexOf('!') <= 0



// const caractere = (value) => {
//   Array.from(speciale).forEach(element => value.indexOf(element) <= 0);
//   return value
// }

export default {
  mixins: [validationMixin],
  validations: {
    newName: { required, minLength: minLength(3), alpha: alpha},
    newBio: {required, maxLength: maxLength(100), minLength: minLength(3)},
  },
  props: ['userDet'],

  beforeUpdate() {
    if(!this.datamod) {
      this.newName = this.userDet.userName
      this.newBio = this.userDet.biografie
      this.oldPic = this.userDet.profileImg
    }
  },

  watch: {
    newName(value) {
      if(value !== this.userDet.userName) {
        this.datamod = true
      }
    },
    newBio(value) {
      if(value !== this.userDet.biografie) {
        this.datamod = true
      }
    },
    oldPic(value) {
      if(value !== this.userDet.profileImg) {
        this.datamod = true
      }
    },
    picture (value) {
      if (value != null && value != undefined) {
        const reader = new FileReader();
        const vm = this
        reader.addEventListener("load", function () {
          vm.newImg = this.result
          vm.oldPic = ''
        })
        reader.readAsDataURL(value)
      }
    }
  },

  data: () => ({

    newName: '',
    newBio: '',
    oldPic: '',
    EditAcc: false,
    datamod: false,
    picture: null,
    newImg: '',
    loading: false
  }),

  methods: {
    submitForm () {
      this.loading = true
      const det = {
        name: this.newName,
        bio: this.newBio,
        picture: this.picture,
        key: this.userDet.id,
        uid: this.$store.getters.user.uid
      }
      this.$store.dispatch('updateUserInfo', det)
      this.loading = false
      this.EditAcc = false
    },
    closeCard () {
      this.EditAcc = false
      this.datamod = false
      this.newImg = ''
      this.picture = null
      document.getElementById('firstImgPrev').style.display="block"
    },
    hideImg() {
      document.getElementById('firstImgPrev').style.display="none"
    },
    clearImg () {
      this.oldPic = ''
      document.getElementById('firstImgPrev').style.display="none"
    },
  },

  computed: {
    nameErrors () {
      const errors = []
      if(!this.$v.newName) return errors
      !this.$v.newName.required && errors.push('Numele este obligatoriu')
      !this.$v.newName.minLength && errors.push('Numele trebuie sa contina cel putin 3 litere')
      !this.$v.newName.alpha && errors.push('Numele trebuie sa contina doar litere/cifre')
      return errors
    },
    bioErrors () {
      const errors = []
      if(!this.$v.newBio) return errors
      !this.$v.newBio.minLength && errors.push('Biografia trebuie sa contina cel putin 3 litere')
      !this.$v.newBio.maxLength && errors.push('Biografia poate contine cel mult 100 de caractere')
      return errors
    }
  }
}
</script>

<style>
.form {
  min-height: 55vh;
  min-width: 35vh;
}

.main-content {
  background-color: white;
  min-height: 60vh;
  min-width: 40vh;
  text-align: center;
  justify-content: center;
  align-content: center;
  display: flex;
  padding: 2rem;
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
