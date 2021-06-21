<template>

  <v-dialog v-model="EditAcc" width="600">
    <template v-slot:activator="{ on }">
      <v-button class="buton-edit" v-on="on">
        <v-icon>
          mdi-lead-pencil
        </v-icon>
      </v-button>
    </template>

    <v-card class="main-content">
      <div >
        <v-form>
          <div @click="EditAcc = !EditAcc"><v-icon class="closeIcon">mdi-close</v-icon></div>

          <h1>Editeaza contul</h1>
          <br />
          <br />

          <div align="center">

            <v-textarea
                prepend-inner-icon="mdi-lead-pencil"
                v-model="user"
                label="noul username"
                auto-grow
                no-resize
                required
                clearable
            ></v-textarea>

            <v-textarea
                prepend-inner-icon="mdi-lead-pencil"
                v-model="biogr"
                label="noua biografie"
                auto-grow
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
            <v-row>
              <v-col cols="12" md="6">
                <v-btn cols="12" md="6" class="mr-4 " depressed style="background-color: hsl(47, 95%, 49%);font-family: 'Lato', sans-serif; font-weight: bold;" type="submit" :loading="loading">salveaza</v-btn>
                <v-btn cols="12" md="6" @click="clear" depressed style="background-color: hsl(47, 95%, 49%);font-family: 'Lato', sans-serif; font-weight: bold;">goleste</v-btn>
              </v-col>

            </v-row>

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
    user: '',
    biogr: '',
    picture: null,
    loading: false,
    EditAcc: false,
  }),

  methods: {
    submitForm () {
      this.loading=true
      const det = {
        user: this.titluReview,
        biogr: this.biogr,
        picture: this.picture,
        userName: this.user.userName,
        userKey: this.user.key,
      }
    },
    clear () {
      this.$v.$reset()
      this.user = ''
      this.biogr = ''
      this.loading = false
      this.imageUrl = null
      this.picture = null
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

</style>
