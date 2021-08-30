import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DespreNoi from '../views/DespreNoi.vue'
import User from '../views/User.vue'
import store from "../store";
import categorii from "../components/categorii";
import categorie from "../views/categorie";
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import produs from "../views/produs";
import reports from "../views/reports"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/despreNoi',
    name: 'DespreNoi',
    component: DespreNoi
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters.user) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: (to, from, next) => {
      if (store.getters.user) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/user/:id',
    name: 'User',
    props: true,
    component: User,
    // beforeEnter: (to, from, next) => {
    //   if (store.getters.user) {
    //     next()
    //   } else {
    //     next('/Login')
    //   }
    // }
  },
  {
    path: '/categorii',
    name: 'categorii',
    component: categorii
  },
  {
    path: '/categorii/:id',
    name: 'categorie',
    props: true,
    component: categorie
  },
  {
    path: '/categorii/:catId/produs/:prodId',
    name: 'Produs',
    props: true,
    component: produs
  },
  {
    path: '/reports',
    name: 'reports',
    component: reports
  },
  {
    path: '*',
    redirect: '/'
  },

]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to) {
    if (to.hash) {
      return {
        selector: to.hash,
        offset: { x: 0, y: 140 }
      }
    }
    return { x: 0, y: 0 }
  }
})

export default router
