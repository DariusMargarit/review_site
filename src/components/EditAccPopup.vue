<template>

  <v-dialog v-model="EditAcc" width="600">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on"><v-icon>mdi-pencil</v-icon></v-btn>
    </template>

    <v-card>
      <div class="main">
        <v-form>
          <div @click="EditAcc = !EditAcc"><v-icon class="closeIcon">mdi-close</v-icon></div>

          <h1>Editeaza review-ul pentru</h1>
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
.main {
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

.imagine {
  float: right;
  align-content: flex-end;
  justify-content: center;
  display: flex;
  width:100%;
  height: 100%;
}
</style>
