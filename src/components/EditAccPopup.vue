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
                v-model="newName"
                no-resize
                required
                clearable
                :error-messages="nameErrors"
            ></v-textarea>
            <v-textarea
                prepend-inner-icon="mdi-format-title"
                label="Biografie noua..."
                rows="1"
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
                  v-model="newPic"
                  show-size
                  prepend-icon=""
              ></v-file-input>
              <v-btn icon style="margin: 0; padding:0;">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-row>
          </div>

          <v-row style="justify-content: center; display: flex;margin-top: 4rem" no-gutters align="center">
            <v-col cols="6" md="3">
              <v-btn depressed style="background-color:#f4c006; font-family: 'Lato', sans-serif; font-weight: bolder;" class="mr-4 buton-golit" @click="clear()">RENUNTA</v-btn>
            </v-col>
            <v-col cols="6" md="3">
              <v-btn depressed style="background-color:#ff665a; font-family: 'Lato', sans-serif; font-weight: bolder;" class="buton-send">TRIMITE</v-btn>
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

export default {
  mixins: [validationMixin],
  validations: {
    name: { required, minLength: minLength(3) },
    bio: {required, maxLength: maxLength(100)},
  },

  data: () => ({
    newName: '',
    newBio: '',
    newPic: null,
    EditAcc: false,
  }),

  methods: {
    submitForm () {
      this.loading=true

    },
    clear () {
      this.newBio = ''
      this.newName = ''
      this.newPic = null
      this.EditAcc = false
    },
    closeCard () {
      this.EditAcc = false
    }
  },

  computed: {
    nameErrors () {
      const errors = []
      if(!this.$v.title) return errors
      !this.$v.title.required && errors.push('Numele este obligatoriu')
      !this.$v.title.minLength && errors.push('Numele trebuie sa contina cel putin 3 litere')
      return errors
    },
    bioErrors () {
      const errors = []
      if(!this.$v.title) return errors
      !this.$v.title.required && errors.push('Biografia este obligatorie')
      !this.$v.title.minLength && errors.push('Biografia trebuie sa contina cel putin 3 litere')
      !this.$v.title.maxlength && errors.push('Biografia poate contine cel mult 100 de caractere')
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
