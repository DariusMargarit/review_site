<template>

  <v-main class="main">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<!--    <navbar />-->
    <snackbar />

    <v-container style="margin-top: 4%; justify-content: center; display: flex;" >
      <section class="formdesign">
        <v-form class="form">
          <v-container fluid>
            <h1 style="font-family: 'Lato', sans-serif">Inscrie-te!</h1>
          </v-container>

          <hr />

          <v-container fluid>
            <span class="text">Inscrie-te cu</span>
          </v-container>

          <v-container >
            <v-row no-gutters align-content="center">
              <v-col>
                <div class="wrapper">
                  <div class="button" @click="facebookSignUp">
                    <div class="icon-facebook">
                      <i><v-icon class="pb-1" size="40">mdi-facebook</v-icon></i>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col>
                <div class="wrapper">
                  <div class="button" @click="googleSignUp">
                    <div class="icon-google">
                      <i><v-icon class="pb-1" size="35">mdi-google</v-icon></i>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>

          <div class="separator text">sau prin E-Mail</div>

          <v-container>
            <v-text-field
                class="text"
                clearable
                prepend-inner-icon="mdi-account-circle"
                v-model="name"
                :error-messages="nameErrors"
                :counter="15"
                label="Nume"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()">
            </v-text-field>
          </v-container>

          <v-container>
            <v-text-field
                class="text"
                prepend-inner-icon="mdi-email"
                clearable
                v-model="email"
                :error-messages="emailErrors"
                label="E-Mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()">
            </v-text-field>
          </v-container>

          <v-container>
            <v-text-field
                class="text"
                prepend-inner-icon="mdi-key"
                clearable
                label="Parola"
                type="password"
                v-model="password"
                :error-messages="passwordErrors"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()">
            </v-text-field>
          </v-container>

          <v-container class="containers">
            <v-row style="flex-basis: 31%">
              <v-col align-self="center" cols="12" sm="6">
                <v-btn style="font-family: 'Lato', sans-serif; font-weight: bold;" type="submit" :loading="loading">trimite</v-btn>
              </v-col>
              <v-col align-self="center">
                <v-btn class="bttn"  style="font-family: 'Lato', sans-serif; font-weight: bold;" @click="clear">goleste</v-btn>
              </v-col>
            </v-row>
          </v-container>

          <hr />

          <v-container class="containers">
            <v-row style="flex-basis: 31%">
              <v-col align-self="center" cols="12" sm="6">
                <span class="text" >Ai deja un cont?</span>
              </v-col>
              <v-col align-self="center">
                <v-btn text class="ml-3 text"  style="font-family: 'Lato', sans-serif; font-weight: bold;" float="right" @click="toLogIn">Autentifica-te</v-btn>
              </v-col>
            </v-row>
          </v-container>

        </v-form>
      </section>
    </v-container>

    <div class="circle1 hidden-md-and-down"></div>
    <div class="circle2 hidden-md-and-down"></div>
    <div class="circle3 hidden-md-and-down"></div>
    <div class="circle4 hidden-md-and-down"></div>

  </v-main>

</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, minLength } from 'vuelidate/lib/validators'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
// import Navbar from "../components/Navbar";
import snackbar from "../components/snackbar";

export default {
  name: "signup",
  components: {
    // 'navbar': Navbar,
    'snackbar': snackbar
  },
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(15), minLength: minLength(3) },
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },
  data: () => ({
    name: '',
    email: '',
    password: '',
    loading: false,
  }),
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Numele nu poate avea mai mult de 15 caractere')
      !this.$v.name.required && errors.push('Numele este obligatoriu')
      !this.$v.name.minLength && errors.push('Numele trebuie să conțină cel puțin 3 caractere')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('E-Mailul trebuie să fie valid')
      !this.$v.email.required && errors.push('E-mailul este obligatoriu')
      return errors
    },
    passwordErrors () {
      const errors = []
      if(!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Parola este obligatorie')
      !this.$v.password.minLength && errors.push('Parola trebuie să conțină cel puțin 6 caractere')
      return errors
    },
    user () {
      return this.$store.getters.user
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    user (value) {
      if(value !== null && value !== undefined) {
        this.$router.push('/')
        this.loading = false
      }
    },
    error (value) {
      if(value !== null && value !== undefined) {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.password = ''
        this.loading = false
      }
    }
  },
  methods: {
    submitForm () {
      this.loading = true;
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password, username:this.name})
    },
    googleSignUp () {
      var provider = new firebase.auth.GoogleAuthProvider();
      this.$store.dispatch('signUserUpWithGoogle', provider)
    },
    facebookSignUp () {
      var provider = new firebase.auth.FacebookAuthProvider();
      this.$store.dispatch('signUserUpWithFacebook', provider)
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.password = ''
      this.loading = false
    },
    toLogIn () {
      this.$router.push('/Login')
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text&display=swap');

@media screen and (max-width: 1264px) {
  .formdesign {
    background: rgba(0,204,255, 0) !important;
    height: 80% !important;
    width: 80% !important;
  }

  .form {
    min-height: 80% !important;
    width: 100% !important;
  }
}

.main {
  background: rgb(0,204,255);
  background: linear-gradient(180deg, rgba(0,204,255,0.1) 0%, rgba(0,204,255,0.2) 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.formdesign {
  text-align: center;
  justify-content: center;
  align-content: center;
  padding: 8%;
  font-family: 'Lato', sans-serif;
  background: white;
  height: 60%;
  width: 50%;
  background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3)
  );
  border-radius: 2rem;
  z-index: 2;
  backdrop-filter: blur(2rem);
  display: flex;
}

.containers {
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
}

.form {
  min-height: 75vh;
  width: 60vh;
}

.bttn {
  margin-left: 6px;
}

.text {
  color: gray;
  font-family: 'Lato', sans-serif;
}
.separator {
  display: flex;
  align-items: center;
  text-align: center;
  font-family: 'Lato', sans-serif;
}
.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid gray;
}
.separator:not(:empty)::before {
  margin-right: .25em;
}
.separator:not(:empty)::after {
  margin-left: .25em;
}
.wrapper .button {
  display: inline-block;
  height: 60px;
  width: 60px;
  align-content: center;
  margin: 0 5px;
  overflow: hidden;
  background: #fff;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0px 10px 10px rgba(0,0,0,0.1);
}
.wrapper .button {
  font-size: 20px;
  font-weight: 500;
  line-height: 60px;
  margin-left: 10px;
}
.wrapper .button {
  font-size: 25px;
  line-height: 60px;
}
.wrapper .button:hover .icon-facebook{
  background: rgb(54, 79, 243);
}
.wrapper .button:hover .icon-google{
  background: rgb(253, 59, 31);
}
.wrapper .button:hover .icon-facebook i{
  color: #fff;
}
.wrapper .button:hover .icon-google i {
  color: #fff;
}

.circle1,
.circle2,
.circle3,
.circle4 {
  background: white;
  background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.3)
  );
  position: absolute;
  border-radius: 50%;
}

.circle1 {
  top: 7%;
  right: 20%;
  height: 7rem;
  width: 7rem;
}
.circle2 {
  bottom: 5%;
  left: 20%;
  height: 20rem;
  width: 20rem;
}

.circle3 {
  top: 17%;
  right:12%;
  height: 10rem;
  width: 10rem;
}

.circle4{
  top: 35%;
  left: 8%;
  height:11rem;
  width:11rem;
}

</style>
