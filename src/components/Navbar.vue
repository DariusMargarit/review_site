<template>
  <div>
    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list>
        <v-list-item>
          <v-btn @click="sideNav=false" class="button" depressed><v-icon>mdi-arrow-left-bold</v-icon></v-btn>
        </v-list-item>
        <v-list-item>
          <router-link to="/" style="text-decoration: none; padding:15px" class="black--text font">ACASA</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/categorii" style="text-decoration: none; padding:15px" class="black--text font">CATEGORII </router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/despreNoi" style="text-decoration: none; padding:15px" class="black--text font">DESPRE NOI</router-link>
        </v-list-item>
        <v-list-item v-if="!userIsAuthenticated">
          <router-link to="/Login" style="text-decoration: none; padding:15px" class="black--text font">AUTENTIFICA-TE</router-link>
        </v-list-item>
        <v-list-item v-if="!userIsAuthenticated">
          <router-link to="/Signup" style="text-decoration: none; padding:15px" class="black--text font">INSCRIE-TE</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar flat align="center" fixed v-if="userIsAuthenticated" color=rgba(64,64,64,1) class="marimeNav" height="75%">
      <v-app-bar-nav-icon @click.native.stop="sideNav=!sideNav" class="hidden-lg-and-up" ></v-app-bar-nav-icon>
      <v-app-bar-title class="hidden-sm-and-down">
        <img src="../assets/logoo.png" style="cursor: pointer;height:120%" @click="goToHome" class="logo">
      </v-app-bar-title>
      <div class="search-input">
        <table class="search-container">
          <tr>
            <td>
              <v-icon class="icon">mdi-magnify</v-icon>
            </td>
            <td>
              <input v-model="search" type="text" class="font font-weight-bold" placeholder="Type to search..."  />
            </td>
            <td>
              <v-icon class="icon mr-4" style="">mdi-close</v-icon>
            </td>
          </tr>
        </table>
      </div>
      <v-spacer></v-spacer>
      <div class="hidden-md-and-down">
        <router-link to="/" style="text-decoration: none; padding:15px" class="white--text font">ACASA</router-link>
        <router-link to="/categorii" style="text-decoration: none; padding:15px" class="white--text font">CATEGORII </router-link>
        <router-link to="/despreNoi" style="text-decoration: none; padding:15px" class="white--text font">DESPRE NOI</router-link>
      </div>
      <div class="text-center ml-10">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-avatar v-on="on">
              <img :src="user.profileImg" class="avatarr">
            </v-avatar>
          </template>
          <v-list class="list">
            <v-list-item-group>
              <v-list-item @click="goToMyAcc" class="haha">
                <v-list-item-icon>
                  <v-icon class="ava">
                    mdi-account-circle
                  </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title style="font-family: 'Lato', sans-serif;font-weight: bold;">Profil</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="font-family: 'Lato', sans-serif;font-weight: bold;" @click="logout" class="haha">
                <v-list-item-icon>
                  <v-icon class="ava">
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
    <v-app-bar flat align="center" fixed v-else color=rgba(64,64,64,1) height="75%">
      <v-app-bar-nav-icon @click.native.stop="sideNav=!sideNav" class="hidden-lg-and-up"></v-app-bar-nav-icon>
      <v-app-bar-title class="hidden-md-and-down">
        <img src="../assets/logoo.png" style="cursor: pointer;height:120%" @click="goToHome" class="logo">
      </v-app-bar-title>
      <v-spacer class="hidden-lg-and-up" />
      <div algin="center" justify="center" class="search-input">
        <table class="search-container">
          <tr>
            <td>
              <v-icon class="icon">mdi-magnify</v-icon>
            </td>
            <td>
              <input v-model="search" type="text" class="font font-weight-bold" placeholder="Type to search..."  />
            </td>
            <td>
              <v-icon class="icon mr-4" style="">mdi-close</v-icon>
            </td>
          </tr>
        </table>
      </div>
      <v-spacer></v-spacer>
      <div class="hidden-md-and-down">
        <router-link to="/" style="text-decoration: none; padding:15px" class="white--text font">ACASA</router-link>
        <router-link to="/categorii" style="text-decoration: none; padding:15px" class="white--text font">CATEGORII </router-link>
        <router-link to="/despreNoi" style="text-decoration: none; padding:15px" class="white--text font">DESPRE NOI</router-link>
        <router-link to="/Login" style="text-decoration: none; padding:15px" class="white--text font">AUTENTIFICA-TE</router-link>
        <router-link to="/Signup" style="text-decoration: none; padding:15px" class="white--text font">INSCRIE-TE</router-link>
      </div>
    </v-app-bar>
  </div>
</template>

<script>


export default {
  name: 'nav-bar',
  data () {
    return {
      search: '',
      sideNav:false
    }
  },
  computed: {
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    user () {
      return this.$store.getters.user
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
    toSignUp () {
      this.$router.push('/Signup')
    },
    toLogIn () {
      this.$router.push('/Login')
    },
    goToHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
@media screen and (max-width:1264px) {
  .marimeNav {
    height: 10% !important;
  }
}
.font {
  font-family: 'Lato', sans-serif;
  font-weight: bold;
  /*font-family: 'Archivo Black', sans-serif;*/
}
.v-toolbar__items{
  height:auto;
}
.navbar {
  /*position: fixed;*/
  /*display:flex;*/
  /*align-items: center;*/
  /*justify-content: space-between;*/
  /*top: 0;
  left: 0;
  width: 100%;*/
  /*padding: 9px;*/
  background-color: hsl(135, 0%, 25%);
  z-index: 100000;
}
.theme--light.v-btn.v-btn--icon{
  color:whitesmoke;
}
.theme--light.v-navigation-drawer {
  background: #f1f1f1;
}
.theme--light.v-btn.v-btn--has-bg {
  background-color: hsl(47, 95%, 49%);
}
.logo {
  padding: 0;
  margin: 0;
  height:55%;
  width: 55%;
  float: left;
}
.avatarr{
  cursor: pointer;
  font-size:32px;
  height: 42px;
  width: 42px;
}
.list{
  width:230px;
}
.ava{
  font-size:30px;
}
.haha:hover{
  background-color: rgba(0,204,255,0.1);
}
.search-input{
  background: white;
  border-radius: 30px;
  /*position: relative;*/
}
.marimeNav{
  height:50%;
}
input{
  height: 35px;
  width: 100%;
  border: none;
  border-radius: 50px;
  padding: 0 5px 0 5px;
  font-size: 20px;
}

input:focus {
  outline: none;
}
.button {
  margin-bottom: 30px;
  text-align: center;
  background-color: hsl(47, 95%, 49%);
}
.icon{
  width: 30px;
  text-align: center;
  font-size: 20px;
  color: black;
  cursor: pointer;
  margin-left: 10px;
}
</style>
