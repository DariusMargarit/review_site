<template>
  <v-main>

      <nav-bar />

    <v-content class="first_content">

      <v-container fluid>
        <a href="#ghid" class="ghidul">
          <span class="ma-4 font-weight-bold" style="color: black;">Ghidul utilizatorului</span>
        </a>
      </v-container>

      <v-container class="home-container">
        <v-layout>
          <v-flex>
            <p class="content-text">Doresti si tu sa lasi un review unui produs? Creeaza-ti un cont chiar acum</p>
            <br />
            <v-btn v-if="userIsAuthenticated" disabled large class="homebutton text--black font-weight-bold" plain >Înscrie-te</v-btn>
            <v-btn v-else large class="homebutton text--black font-weight-bold" plain @click="toSignUp" >Înscrie-te</v-btn>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex style="margin-left: 50%; margin-right: 0; padding-right: 0;">
            <img class="img" src="../assets/rating.png" />
          </v-flex>
        </v-layout>
      </v-container>

      <v-container class="second-home-container">
        <v-layout>
          <v-flex>
            <p class="content-text">Ai deja un cont? Conecteaza-te la el aici</p>
            <br />
            <v-btn v-if="userIsAuthenticated" disabled large class="homebutton text--black font-weight-bold" plain >Autentifică-te</v-btn>
            <v-btn v-else large class="homebutton text--black font-weight-bold" plain @click="toLogIn" >Autentifică-te</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <br />
    </v-content>

    <div style="padding:20px" class="separator"><v-icon>mdi-chevron-triple-left</v-icon></div>

    <v-container style="display: flex; align-content: center; justify-content: center; text-align: center;">
        <v-layout >
          <v-flex align-self-center>
              <h1>Ce este HonestReviews?</h1>
              <p style="font-family: 'Lato', sans-serif; font-weight: bold;">
                HonestReviews este un website prin intermediul caruia utilizatorii pot lasa review-uri, adica pareri, oricarui produs pe care l-au achizitionat.
                Un asa-zis "review" consta in exprimarea propriei opinii in legatura cu produsul ales.
                De asemenea, sunt mentionate sursa de unde a fost achizitionat produsul, numele intreg al acestuia, pretul si alte informatii utile.
              </p>
            </v-flex>
          <v-flex align-self-center>
            <img src="../assets/social-media-3846597_640.png" style="margin-left: 20%;" />
          </v-flex>
        </v-layout>
    </v-container>

    <div style="padding:20px" class="separator"><v-icon>mdi-chevron-triple-right</v-icon></div>

    <v-container style="display: flex; align-content: center; justify-content: center; text-align: center;">
      <v-layout>
        <v-flex align-self-center style="display: flex; align-content: center; justify-content: center; justify-self: center;">
          <img style="height: 100%; width: 100%;" src="../assets/bizbiz.png" />
        </v-flex>
        <v-flex align-self-center style="margin-left: 20%; justify-self: center;">
          <h1>De ce HonestReviews?</h1>
          <p style="font-family: 'Lato', sans-serif; font-weight: bold;">
            Site-ul nostru va ofera o modalitate usoara de a scrie sau de a cauta impresii ale altor utilizatori despre orice fel ce produs.
            De la frigidere la computere, de la masini la biciclete, de la resorturi turistice la restaurante, aici puteti gasi un review pentru orice categorie imaginabila.
            Datorita interfatei construita sa fie usor de folosit, oricine poate beneficia de acest site.
            In plus, autentificarea se poate realiza prin intermediul E-Mailului, al contului de Google sau al contului de Facebook, asigurand, astfel, un proces rapid de logare.
          </p>
        </v-flex>
      </v-layout>
    </v-container>

    <div style="padding:20px" class="separator"><v-icon>mdi-chevron-triple-left</v-icon></div>

    <v-container style="display: flex; align-content: center; justify-content: center; text-align: center;">
      <v-layout>
        <v-flex align-self-center>
          <h1 id="ghid">Ghidul utilizatorului</h1>
          <p style="font-family: 'Lato', sans-serif; font-weight: bold;">
            Este usor sa folosesti HonestReviews. Daca nu ai un cont sau nu esti autentificat, vei putea doar sa vezi produsele si review-urile, nu si sa adaugi altele.
            Altfel, daca nu ai un cont, il poti creea apasand butonul "Inscrie-te", pe pagina de acasa sau un partea de sus a ecranului.
            Daca ai deja un cont, te poti autentifica, apasand butonul "Autentifica-te".
            Mai departe, pentru a adauga un produs, trebuie sa apesi pe butonul "Categorii" si sa selectezi categoria in care se incadreaza acesta.
            Pentru a-l adauga, trebuie doar sa completezi formularul ("Adauga un produs").
            Dupa ce produsul a fost agaugat, in cazul in care nu exista deja, facand click pe el, ajungi la pagina unde vezi review-urile existente, si unde poti accesa formularul pentru review.
          </p>
          <br />
          <v-btn @click="goToCat" large class="homebutton text--black font-weight-bold" plain>
            Categorii
          </v-btn>
        </v-flex>
        <v-flex align-self-center style="display: flex; align-content: center; justify-content: center; margin-left: 20%;">
          <img src="../assets/calculator.jpg" />
        </v-flex>
      </v-layout>
    </v-container>

  </v-main>
</template>

<script>
import Signup from "./Signup";
import Login from "./Login";
import Navbar from "../components/Navbar";
export default {
  components: {
    'sign-up': Signup,
    'log-in': Login,
    'nav-bar': Navbar
  },
  methods: {
    toSignUp () {
      this.$router.push('/Signup')
    },
    toLogIn () {
      this.$router.push('/Login')
    },
    goToCat () {
      this.$router.push('/categorii/')
    }
  },
  computed: {
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  }
}
</script>

<style>
.homebutton{
  background-color: hsl(47, 95%, 49%);
}
.first_content{
  background-image: linear-gradient(180deg, rgba(0,204,255,0.05) 0%, rgba(0,204,255,0.1) 100%),
  url("../assets/tori-1976609_1920.jpg");
  background-position: center;
  background-size: cover;
  margin-top: 3%;
}

.home-container {
  width: 100%;
  align-content: center;
  justify-content: center;
  display: flex;
  text-align: center;
  margin-left: 5%;
}

.second-home-container {
  width: 30%;
  align-content: center;
  justify-content: center;
  display: flex;
  text-align: center;
  margin-left: 5%;
}
.content-text{
  font-size: 34px;
  font-weight: 800;
  padding: 25px 15px;
  font-family: 'Archivo Black', sans-serif;
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  font-family: 'Arvo', serif;
}
.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e0eaf5;
}
.separator:not(:empty)::before {
  margin-right: .25em;
}
.separator:not(:empty)::after {
  margin-left: .25em;
}

.img {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.ghidul {
  text-align: center;
  padding: 10px;
  border: 1px solid black;
  width: 300px;
  border-radius: 10px;
  transition-duration: 1s;
  transition: all;
  text-decoration: none;
  margin-top: 10px;
  color: black;
}
</style>