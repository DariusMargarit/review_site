<template>
  <div>
    <v-navigation-drawer v-model="sideNav" temporary absolute>
      <v-list-item>
        <v-list-item-action>
          <v-btn @click="sideNav=false" class="button" depressed><v-icon>mdi-arrow-left-bold</v-icon></v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-list dense nav>
        <v-list-item link>
          <v-list-item-content>
            <router-link to="/" style="text-decoration: none; padding:15px; margin-top:0;" class="black--text font">ACASA</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <router-link to="/categorii" style="text-decoration: none; padding:15px; margin-top:0;" class="black--text font">CATEGORII</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <router-link to="/despreNoi" style="text-decoration: none; padding:15px; margin-top:0;" class="black--text font">DESPRE NOI</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <router-link to="/reports" style="text-decoration: none; padding:15px; margin-top:0;" class="black--text font">PANOU - ADMINI</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <router-link v-if="!userIsAuthenticated" to="/Login" style="text-decoration: none; padding:15px; margin-top:0;" class="black--text font">AUTENTIFICA-TE</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <router-link v-if="!userIsAuthenticated" to="/Signup" style="text-decoration: none; padding:15px; margin-top:0;" class="black--text font">INSCRIE-TE</router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="sideSearch" temporary absolute>
      <v-list-item>
        <v-list-item-action>
          <v-btn @click="sideSearch=false" class="button" depressed><v-icon>mdi-arrow-left-bold</v-icon></v-btn>
        </v-list-item-action>
        <v-list-item-content style="text-decoration: none; padding:15px; margin-top:0;" class="black--text font">
          Cautare
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
      <br>
      <v-list>
        <v-list-item-content>

          <v-autocomplete
              class="searchBar"
              style="margin-top: 1vh; font-family: 'Lato', sans-serif; margin-right: 0.5rem; margin-left: 0.5rem;"
              filled
              auto-select-first
              outlined
              clearable
              hide-no-data
              no-data-text="Nu sunt rezultate"
              v-model="select"
              :loading="loading"
              :search-input.sync="searchResponsive"
              :items="items"
              label="Cautare..."
              prepend-inner-icon="mdi-magnify"
              append-icon=""
          >
          </v-autocomplete>

        </v-list-item-content>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat align="center" fixed color=rgba(64,64,64,1) style="height: 4.75rem; padding: 0.5rem;" class="bigdiv">
      <v-app-bar-nav-icon dark @click.native.stop="sideNavBtn" class="hidden-lg-and-up"></v-app-bar-nav-icon>
      <v-app-bar-nav-icon dark @click.native.stop="sideSearchBtn" class="hidden-md-and-up"><v-icon>mdi-magnify</v-icon></v-app-bar-nav-icon>
      <v-app-bar-title class="hidden-md-and-down">
        <v-tooltip open-delay="500" open-on-focus bottom>
          <template v-slot:activator="{ on, attrs }">
            <img v-bind="attrs" v-on="on" src="../assets/logoo.png" style="cursor: pointer;height:120%" @click="goToHome" class="logo">
          </template>
          <span>Acasa</span>
        </v-tooltip>
      </v-app-bar-title>

      <div class="hidden-md-and-down">
        <router-link to="/" style="text-decoration: none; padding:15px" class="white--text font">ACASA</router-link>
        <router-link to="/categorii" style="text-decoration: none; padding:15px" class="white--text font">CATEGORII </router-link>
        <router-link to="/despreNoi" style="text-decoration: none; padding:15px" class="white--text font">DESPRE NOI</router-link>
        <router-link to="/reports" style="text-decoration: none; padding: 15px;" class="white--text font">PANOU - ADMINI</router-link>
        <router-link to="/Login" v-if="!userIsAuthenticated" style="text-decoration: none; padding:15px" class="white--text font">AUTENTIFICA-TE</router-link>
        <router-link to="/Signup" v-if="!userIsAuthenticated" style="text-decoration: none; padding:15px" class="white--text font">INSCRIE-TE</router-link>
      </div>

      <v-spacer />

      <div class="wrapper hidden-sm-and-down">
        <v-autocomplete
            class="searchBar"
            style="margin-top: 1.5rem; font-family: 'Lato', sans-serif;"
            filled
            auto-select-first
            dark
            outlined
            clearable
            hide-no-data
            v-model="select"
            :loading="loading"
            :search-input.sync="search"
            :items="items"
            label="Cautare..."
            prepend-inner-icon="mdi-magnify"
            append-icon=""
            no-data-text="Nu sunt rezultate"
        >

        </v-autocomplete>
      </div>

      <div v-if="userIsAuthenticated" style="margin-left: 1rem; margin-right: 0.4rem;">
        <v-badge
            color="#ff665a"
            :content="Notificari.length"
            :value="Notificari.length"
            overlap
            v-if="Notificari !== []"
        >
          <v-menu offset-y class="notif-menu">
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-tooltip open-delay="500" open-on-focus bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on"><v-icon class="imgProfil" style="color: white">mdi-bell-ring</v-icon></div>
                  </template>
                  <span>Notificari</span>
                </v-tooltip>
              </div>
            </template>

            <v-list class="notif-menu">
              <v-list-item-group style="justify-content: center; display: flex; align-items: center">
                <v-list-item class="cursor-list">
                  <v-list-item-content class="nr_notif" style="font-weight: bold;">
                    {{ Notificari.length }} notificari
                  </v-list-item-content>
                  <v-spacer ></v-spacer>
                  <v-list-item-content style="margin-right: 0;" v-if="this.Notificari.length">
                    <v-btn style="margin-right: 0; float: right; cursor: pointer;" color="black" plain right icon @click="markAsRead">
                      <v-icon>mdi-playlist-check</v-icon>
                    </v-btn>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>

            <v-list class="notif-menu" v-for="notificare in Notificari" :key="notificare.id">
              <v-list-item-group  v-if="!notificare.seen">
                <v-list-item @click="goToReview(notificare.link)" class="item_list">
                  <v-list-item-icon>
                    <v-icon class="avatar" :style="notificare.color">
                      {{ notificare.icon }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content style="font-family: 'Lato', sans-serif;font-weight: bold; ">
                    {{ notificare.userName }} {{ notificare.text}} {{ notificare.prodName }}.
                    <v-row style="margin-top: 1vh; color: grey; font-weight: lighter; overflow: hidden;">
                      <v-col>
                        {{ notificare.time }}
                      </v-col>
                      <v-spacer />
                      <v-col>
                        {{ notificare.date }}
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>

            <v-list class="notif-menu" v-if="Notificari.length === 0">
              <v-list-item-content style="justify-content: center; display: flex;">
                <v-container style="min-height: 10vh; font-weight: bolder; margin: 1rem;">
                  <v-row><v-col style="align-items: center; justify-content: center; display: flex">Nicio notificare</v-col></v-row>
                  <v-row><v-col style="align-items: center; justify-content: center; display: flex"><v-icon>mdi-bell</v-icon></v-col></v-row>
                </v-container>
              </v-list-item-content>
            </v-list>

            <v-list class="notif-menu">
              <v-list-item-group>
                <v-list-item @click="goToMyAccNotif" class="item_list">
                  <v-list-item-icon>
                    <v-icon class="avatar" style="color: hsl(47, 95%, 49%)">
                      mdi-arrow-right
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title style="font-family: 'Lato', sans-serif;font-weight: bold;">Toate notificarile</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-badge>

      </div>

      <div v-if="userIsAuthenticated" style="margin-left: 1rem">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <div v-on="on">
            <v-tooltip open-delay="500" open-on-focus bottom>
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on"><v-avatar v-on="on" class="imgProfil"><img :src="user.profileImg"></v-avatar></div>
              </template>
              <span>Setari profil</span>
            </v-tooltip>
            </div>
          </template>
          <v-list class="list">
            <v-list-item-group>
              <v-list-item @click="goToMyAcc" class="item_list">
                <v-list-item-icon>
                  <v-icon class="avatar" style="color: #1fc7ff">
                    mdi-account-circle
                  </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title style="font-family: 'Lato', sans-serif;font-weight: bold;">Profil</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="font-family: 'Lato', sans-serif;font-weight: bold;" @click="logout" class="item_list">
                <v-list-item-icon>
                  <v-icon class="avatar" style="color: #1fc7ff">
                    mdi-logout
                  </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>

    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'nav-bar',
  data () {
    return {
      sideNav:false,
      sideSearch:false,
      loading: false,
      items: [],
      search: '',
      searchResponsive: '',
      select: null,
      chestii: [],
      Notificari: []
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('loadNotificari', user)
      }
    })
  },
  computed: {
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    user () {
      return this.$store.getters.user
    },
    notificari () {
      return this.$store.getters.notificari
    },
    searchArray () {
      return this.$store.getters.searchArray
    }
  },

  watch: {
    search (valoare) {
      valoare && valoare !== this.select && this.selectari(valoare)
      if((valoare === null || valoare === '') && this.select === null) this.items = []
    },
    searchResponsive (valoare) {
      valoare && valoare !== this.select && this.selectari(valoare)
      if((valoare === null || valoare === '') && this.select === null) this.items = []
    },
    searchArray (value) {
      if(value !== []) {
        for(let i in value) {
          this.chestii.push(value[i].searchObj)
        }
      }
    },
    select (value) {
      if(value !== null && value !== undefined) {
        for(let i in this.searchArray) {
          if(this.searchArray[i].searchObj === value) {
            this.$router.push(this.searchArray[i].link)
            window.location.reload()
          }
        }
      }
    },
    notificari (value) {
      for(let i in value) {
        if(!value[i].seen && (i > this.Notificari.length - 1 || i === 0)) {
          this.Notificari.push(value[i])
        }
      }
    }
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
    goToMyAcc () {
      const id = this.$store.getters.user.key
      this.$router.push('/user/' + id)
    },
    goToMyAccNotif () {
      const id = this.$store.getters.user.key
      this.$router.push('/user/' + id + '?tab=3')
    },
    toSignUp () {
      this.$router.push('/Signup')
    },
    toLogIn () {
      this.$router.push('/Login')
    },
    goToHome () {
      this.$router.push('/')
    },
    sideNavBtn () {
      window.scrollTo(0,0);
      this.sideNav=true;
    },
    sideSearchBtn () {
      window.scrollTo(0,0);
      this.sideSearch=true;
    },
    goToReview (value) {
      this.$router.push(value)
      window.location.reload()
    },

    selectari (v) {
      this.loading = true
      setTimeout(() => {
        this.items = this.chestii.filter(cautare => {
          return cautare.toLowerCase().match(v.toLowerCase())
        })
        this.loading = false
      }, 500)
    },
    markAsRead () {
      this.Notificari = []
      this.$store.dispatch('markAsRead', this.user.key)
    }
  }
}
</script>

<style scoped>

@media screen and (min-width: 1264px) {
  .notif-menu {
    width: 23rem !important;
  }
}

.notif-menu {
  min-width: 14rem;
}

.bigdiv {
  position: sticky;
  float: top;
  top:0 ;
  width: 100%;
  z-index:100000000;
}

.font {
  font-family: 'Lato', sans-serif;
  font-weight: bold;
}
.logo {
  padding: 0;
  margin: 0;
  height:6.5rem;
  width: 6.5rem;
  float: left;
}
.imgProfil{
  cursor: pointer;
  font-size: 1.5rem;
  width: 2rem;
  height: 2rem;
}
.list{
  width:15rem;
}
.avatar{
  font-size:5rem;
}
.item_list:hover{
  background-color: rgba(0,204,255,0.1);
}
.button {
  text-align: center;
  background-color: hsl(47, 95%, 49%);
}
.wrapper{
  max-width: 450px;
  margin: 150px auto;
}
.wrapper .search-input{
  background: #fff;
  width: 100%;
  border-radius: 5px;
  position: relative;
  box-shadow: 0px 1px 5px 3px rgba(0,0,0,0.12);
}
.search-input input{
  height: 55px;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 0 60px 0 20px;
  font-size: 18px;
  box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
}
.search-input.active input{
  border-radius: 5px 5px 0 0;
}
.search-input .autocom-box{
  padding: 0;
  opacity: 0;
  pointer-events: none;
  max-height: 280px;
  overflow-y: auto;
}
.search-input.active .autocom-box{
  padding: 10px 8px;
  opacity: 1;
  pointer-events: auto;
}
.autocom-box li{
  list-style: none;
  padding: 8px 12px;
  display: none;
  width: 100%;
  cursor: default;
  border-radius: 3px;
}
.search-input.active .autocom-box li{
  display: block;
}
.autocom-box li:hover{
  background: #efefef;
}
.search-input .icon{
  position: absolute;
  right: 0px;
  top: 0px;
  height: 55px;
  width: 55px;
  text-align: center;
  line-height: 55px;
  font-size: 20px;
  color: #644bff;
  cursor: pointer;
}
.v-select.v-select--is-menu-active .v-input__icon--append .v-icon {
  transform: rotate(
      0deg
  );
}

.searchBar {
  display: block;
}

.nr_notif {
  cursor: auto;
}

.cursor-list {
  cursor: default !important;
}

</style>
