<template>
  <v-main>

    <v-content class="first_content hidden-md-and-down">

      <v-container justify="center" fluid>
        <v-row justify="center">
          <v-tooltip open-delay="500" open-on-focus bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="text--black font-weight-bold" style="border-width: thin; border-color: black" outlined text v-bind="attrs" v-on="on">
                <router-link class="ghidul" to="#ghid">
                  <span class="ma-4 font-weight-bold" style="color: black;">Ghidul utilizatorului</span>
                </router-link>
              </v-btn>

            </template>
            <span>catre ghidul utilizatorului</span>
          </v-tooltip>
        </v-row>
      </v-container>

      <v-container class="home-container">
        <v-row>
          <v-col>
            <p class="content-text">Doresti si tu sa lasi un review unui produs? Creeaza-ti un cont chiar acum</p>
            <br />
            <v-tooltip open-delay="500" open-on-focus bottom>
              <template v-slot:activator="{ on, attrs }">
            <v-btn v-if="userIsAuthenticated" disabled large class="homebutton text--black font-weight-bold" plain >Înscrie-te</v-btn>
            <v-btn v-bind="attrs" v-on="on" v-else large class="homebutton text--black font-weight-bold" plain @click="toSignUp" >Înscrie-te</v-btn>
              </template>
              <span>Înscrie-te</span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="margin-left: 50%; margin-right: 0; padding-right: 0;">
            <img src="../assets/rating.png" style="height: 100%; width: 100%;" />
          </v-col>
        </v-row>
      </v-container>

      <v-container class="second-home-container">
        <v-row>
          <v-col>
            <p class="content-text">Ai deja un cont? Conecteaza-te la el aici</p>
            <br />
            <v-tooltip open-delay="500" open-on-focus bottom>
              <template v-slot:activator="{ on, attrs }">
            <v-btn v-if="userIsAuthenticated" disabled large class="homebutton text--black font-weight-bold" plain >Autentifică-te</v-btn>
            <v-btn v-bind="attrs" v-on="on" v-else large class="homebutton text--black font-weight-bold" plain @click="toLogIn" >Autentifică-te</v-btn>
              </template>
              <span>Autentifică-te</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
      <br />
    </v-content>

    <div style="padding:20px" class="separator hidden-xs-only"><v-icon>mdi-chevron-triple-left</v-icon></div>

    <v-container style="margin-top: 5rem;" justify-content="center" class="hidden-lg-and-up" fluid>
      <v-row justify="center">
        <a href="#ghid" class="ghidul">
          <span class="ma-4 font-weight-bold" style="color: black;">Ghidul utilizatorului</span>
        </a>
      </v-row>
    </v-container>

    <v-container class="hidden-lg-and-up containers">
      <v-row style="flex-basis: 31%;">
        <v-col align-self="center" cols="12" sm="6">
          <p class="content-text">Doresti si tu sa lasi un review unui produs? Creeaza-ti un cont chiar acum</p>
          <br />
          <v-btn v-if="userIsAuthenticated" disabled large class="homebutton text--black font-weight-bold" plain >Înscrie-te</v-btn>
          <v-btn v-else large class="homebutton text--black font-weight-bold" plain @click="toSignUp" >Înscrie-te</v-btn>
        </v-col>
        <v-col align-self="center">
          <img src="../assets/rating.png" style="height: 100%; width: 100%;" />
        </v-col>
      </v-row>
    </v-container>

    <v-container class="hidden-lg-and-up containers">
      <v-row style="flex-basis: 31%;">
        <v-col align-self="center" justify-self="center" cols="12" sm="6">
          <p class="content-text">Ai deja un cont? Conecteaza-te la el aici</p>
          <br />
          <v-btn v-if="userIsAuthenticated" disabled large class="homebutton text--black font-weight-bold" plain >Autentifică-te</v-btn>
          <v-btn v-else large class="homebutton text--black font-weight-bold" plain @click="toLogIn" >Autentifică-te</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <div style="padding:20px" class="separator hidden-md-and-up"><v-icon>mdi-chevron-triple-left</v-icon></div>

    <section class="sidebar-link header-anchor" id="ce-e-hr">
      <v-container class="containers">
        <v-row style="flex-basis: 31%;">
          <v-col align-self="center" cols="12" sm="6">
            <h1 style="font-family: 'Archivo Black', sans-serif;">Ce este HonestReviews?</h1><br />
            <p style="font-family: 'Lato', sans-serif; font-weight: bold;">
              HonestReviews este un website prin intermediul caruia utilizatorii pot lasa review-uri, adica pareri, oricarui produs pe care l-au achizitionat.
              Un asa-zis "review" consta in exprimarea propriei opinii in legatura cu produsul ales.
              De asemenea, sunt mentionate sursa de unde a fost achizitionat produsul, numele intreg al acestuia, pretul si alte informatii utile.
            </p>
          </v-col>
          <v-col align-self="center">
            <img style="height: 100%; width: 100%;" src="../assets/social-media-3846597_640.png" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <div style="padding:20px" class="separator"><v-icon>mdi-chevron-triple-right</v-icon></div>

    <section class="sidebar-link header-anchor" id="de-ce-hr">
      <v-container class="containers">
        <v-row style="flex-basis: 31%;">
          <v-col align-self="center">
            <img style="height: 100%; width: 100%;" src="../assets/bizbiz.png" />
          </v-col>
          <v-col align-self="center" cols="12" sm="6">
            <h1 style="font-family: 'Archivo Black', sans-serif;">De ce HonestReviews?</h1><br />
            <p style="font-family: 'Lato', sans-serif; font-weight: bold;">
              Site-ul nostru va ofera o modalitate usoara de a scrie sau de a cauta impresii ale altor utilizatori despre orice fel ce produs.
              De la frigidere la computere, de la masini la biciclete, de la resorturi turistice la restaurante, aici puteti gasi un review pentru orice categorie imaginabila.
              Datorita interfatei construita sa fie usor de folosit, oricine poate beneficia de acest site.
              In plus, autentificarea se poate realiza prin intermediul E-Mailului, al contului de Google sau al contului de Facebook, asigurand, astfel, un proces rapid de logare.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <div style="padding:20px" class="separator"><v-icon>mdi-chevron-triple-left</v-icon></div>

    <section class="sidebar-link header-anchor" id="ghid">
      <v-container class="containers">
        <v-row style="flex-basis: 31%;">
          <v-col align-self="center" cols="12" sm="6">
            <h1 style="font-family: 'Archivo Black', sans-serif;">Ghidul utilizatorului</h1><br />
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
          </v-col>
          <v-col align-self="center">
            <img src="../assets/calculator.jpg" style="width: 110%; height: 110%;" />
          </v-col>
        </v-row>
      </v-container>
    </section>

  </v-main>
</template>

<script>
import Signup from "./Signup";
import Login from "./Login";
import debounce from 'lodash.debounce'

export default {
  components: {
    'sign-up': Signup,
    'log-in': Login
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  created() {
    window.scrollTo(0,0)
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
    },
    onScroll: debounce(function () {
      this.setActiveHash()
    }, 300),

    setActiveHash () {
      const sidebarLinks = [].slice.call(document.querySelectorAll('.sidebar-link'))
      const anchors = [].slice.call(document.querySelectorAll('.header-anchor'))
              .filter(anchor => sidebarLinks.some(sidebarLink => sidebarLink.hash === anchor.hash))

      console.log(sidebarLinks)
      console.log(anchors)

      const scrollTop = Math.max(
              window.pageYOffset,
              document.documentElement.scrollTop,
              document.body.scrollTop
      )

      const scrollHeight = Math.max(
              document.documentElement.scrollHeight,
              document.body.scrollHeight
      )

      const bottomY = window.innerHeight + scrollTop

      for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i]
        const nextAnchor = anchors[i + 1]


        const isActive = i === 0 && scrollTop === 0
                || (scrollTop >= anchor.parentElement.offsetTop + 10
                        && (!nextAnchor || scrollTop < nextAnchor.parentElement.offsetTop - 10))

        const routeHash = decodeURIComponent(this.$route.hash)
        console.log(decodeURIComponent(anchor.hash))
        if (isActive && routeHash !== decodeURIComponent(anchor.hash)) {
          const activeAnchor = anchor
          // check if anchor is at the bottom of the page to keep $route.hash consistent
          if (bottomY === scrollHeight) {
            for (let j = i + 1; j < anchors.length; j++) {
              if (routeHash === decodeURIComponent(anchors[j].hash)) {
                return
              }
            }
          }
          this.$vuepress.$set('disableScrollBehavior', true)
          this.$router.replace(decodeURIComponent(activeAnchor.hash), () => {
            // execute after scrollBehavior handler.
            this.$nextTick(() => {
              this.$vuepress.$set('disableScrollBehavior', false)
            })
          })
          return
        }
      }
    }
  },
  computed: {
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
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
  margin-top: 5rem;
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
.ghidul {
  text-align: center;
  /*padding: 10px;*/
  /*border: 1px solid black;*/
  /*width: 300px;*/
  /*border-radius: 10px;*/
  transition-duration: 1s;
  transition: all;
  text-decoration: none;
  /*margin-top: 10px;*/
  /*color: black;*/
  font-family: 'Lato', sans-serif;
}
.containers {
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
}
</style>
