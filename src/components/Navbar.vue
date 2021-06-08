<template>
  <div>
    <v-navigation-drawer v-model="sideNav" temporary absolute class="sidenav">
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


    <v-app-bar flat align="center" fixed color=rgba(64,64,64,1)  class="bigdiv" style="height: 4.75rem; padding: 0.5rem;">
      <v-app-bar-nav-icon @click.native.stop="sideNav=!sideNav" class="hidden-lg-and-up"></v-app-bar-nav-icon>
      <v-app-bar-title class="hidden-md-and-down">
        <img src="../assets/logoo.png" style="cursor: pointer;height:120%" @click="goToHome" class="logo">
      </v-app-bar-title>

      <div class="hidden-md-and-down">
        <router-link to="/" style="text-decoration: none; padding:15px" class="white--text font">ACASA</router-link>
        <router-link to="/categorii" style="text-decoration: none; padding:15px" class="white--text font">CATEGORII </router-link>
        <router-link to="/despreNoi" style="text-decoration: none; padding:15px" class="white--text font">DESPRE NOI</router-link>
        <router-link to="/Login" v-if="!userIsAuthenticated" style="text-decoration: none; padding:15px" class="white--text font">AUTENTIFICA-TE</router-link>
        <router-link to="/Signup" v-if="!userIsAuthenticated" style="text-decoration: none; padding:15px" class="white--text font">INSCRIE-TE</router-link>
      </div>

      <v-spacer />

      <div class="wrapper">
        <div class="search-input">
          <a href="" target="_blank" hidden></a>
          <input type="text" placeholder="Type to search..">
          <div class="autocom-box">
            <!-- here list are inserted from javascript -->
          </div>
          <div class="icon"><v-icon>mdi-magnify</v-icon></div>
        </div>
      </div>

      <div v-if="userIsAuthenticated" style="margin-left: 1rem">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-avatar v-on="on" class="avatarr">
              <img :src="user.profileImg">
            </v-avatar>
          </template>
          <v-list class="list">
            <v-list-item-group>
              <v-list-item @click="goToMyAcc" class="item_list">
                <v-list-item-icon>
                  <v-icon class="ava">
                    mdi-account-circle
                  </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title style="font-family: 'Lato', sans-serif;font-weight: bold;">Profil</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="font-family: 'Lato', sans-serif;font-weight: bold;" @click="logout" class="item_list">
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

@media screen and (max-width: 1264px) {



}

.sidenav {
  /*z-index: 100000;*/
  /*position: absolute;*/
  /*float: bottom;*/
  /*top:0 ;*/
  /*width: 100%;*/
}

.bigdiv {
  position: sticky;
  float: top;
  top:0 ;
  width: 100%;
  z-index:10000;
}

.font {
  font-family: 'Lato', sans-serif;
  font-weight: bold;
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
  font-size: 1.5rem;
  width: 2rem;
  height: 2rem;
}
.list{
  width:15rem;
}
.ava{
  font-size:5rem;
}
.item_list:hover{
  background-color: rgba(0,204,255,0.1);
}
.button {
  margin-bottom: 30px;
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
.button {
  margin-bottom: 30px;
  text-align: center;
  background-color: hsl(47, 95%, 49%);
}
</style>
