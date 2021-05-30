import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newUser: null,
    userInfo: null,
    users: null,
    userPageLoading: false,
    categorii: null,
    produse: null,
    error: null,
    reviews: null,
    prod: null,
    userReviews: null,
    numeCat: null
  },
  mutations: {
    newUser (state, payload) {
      state.newUser = payload
    },
    userInfo (state, payload) {
      state.userInfo = payload
    },
    setAllUsers (state, payload) {
      state.users = payload
    },
    setLoading (state, payload) {
      state.userPageLoading = payload
    },
    setCategorii (state, payload) {
      state.categorii = payload
    },
    setProduse (state, payload) {
      state.produse = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setReviews (state, payload) {
      state.reviews = payload
    },
    setProd (state, payload) {
      state.prod = payload
    },
    setUserReviews (state, payload) {
      state.userReviews = payload
    },
    setNumeCat (state, payload) {
      state.numeCat = payload
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      const newUser = {
        userName: payload.username,
        profileImg: "https://firebasestorage.googleapis.com/v0/b/itec-8b9cf.appspot.com/o/FREE-PROFILE-AVATARS.png?alt=media&token=a6b17192-ac3a-44ca-928f-08856f438d15",
      }
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then((cred) => {
        const id = cred.user.uid

        firebase.database().ref('users').push(newUser).then((data) => {
          const newUserWithId = {
            userName: payload.username,
            profileImg: "https://firebasestorage.googleapis.com/v0/b/itec-8b9cf.appspot.com/o/FREE-PROFILE-AVATARS.png?alt=media&token=a6b17192-ac3a-44ca-928f-08856f438d15",
            key: data.key
          }
          firebase.firestore().collection('users').doc(id).set(newUserWithId).then((data) => {
            commit('newUser', newUserWithId)
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })

      }).catch(err => {
        commit('setError', err)
      })
    },
    logUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(() => {

      }).catch(err => {
        commit('setError', err)
      })
    },
    logUserInWithGoogle ({commit}, payload) {
      firebase.auth().signInWithPopup(payload).then(() => {

      }).catch(err => {
        commit('setError', err)
      })

    },
    logUserInWithFacebook ({commit}, payload) {
      firebase.auth().signInWithPopup(payload).then(() => {
      }).catch(err => {
        commit('setError', err)
      })
    },
    signUserUpWithGoogle ({commit}, payload) {
      firebase.auth().signInWithPopup(payload).then(cred => {
        const id = cred.user.uid

        const newUser = {
          userName: cred.additionalUserInfo.profile.name,
          profileImg: cred.additionalUserInfo.profile.picture
        }
        firebase.database().ref('users').push(newUser).then((data) => {
          const newUserWithId = {
            userName: cred.additionalUserInfo.profile.name,
            profileImg: cred.additionalUserInfo.profile.picture,
            key: data.key
          }
          firebase.firestore().collection('users').doc(id).set(newUserWithId).then((data) => {
            commit('newUser', newUserWithId)
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })

      }).then(err => {
        commit('setError', err)
      })
    },
    signUserUpWithFacebook ({commit}, payload) {
      firebase.auth().signInWithPopup(payload).then(cred => {
        const id = cred.user.uid

        const newUser = {
          userName: cred.additionalUserInfo.profile.name,
          profileImg: cred.additionalUserInfo.profile.picture.data.url
        }
        firebase.database().ref('users').push(newUser).then((data) => {
          const newUserWithId = {
            userName: cred.additionalUserInfo.profile.name,
            profileImg: cred.additionalUserInfo.profile.picture.data.url,
            key: data.key
          }
          firebase.firestore().collection('users').doc(id).set(newUserWithId).then((data) => {
            commit('newUser', newUserWithId)
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })

      }).then(err => {
        commit('setError', err)
      })
    },
    autoSignIn ({commit}, payload) {
      firebase.firestore().collection('users').doc(payload.uid).onSnapshot((doc) => {
        if (doc.exists) {
          const userInfo = {
            userName: doc.data().userName,
            email: payload.email,
            profileImg: doc.data().profileImg,
            key: doc.data().key
          }
          commit('userInfo', userInfo)
        } else commit('setError', 'Acest user nu exista sau a fost sters!')
      })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      router.push('/')
      commit('userInfo', null)
    },
    loadUsers ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('users').once('value').then((data) => {
        const users = []
        const obj = data.val()
        for(let key in obj) {
          users.push({
            id: key,
            userName: obj[key].userName,
            profileImg: obj[key].profileImg
          })
        }
        commit('setAllUsers', users)
        commit('setLoading', false)
      }).catch(err => {
            console.log(err)
            commit('setLoading', false)
          })
    },
    loadCategorii ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('categorii').once('value').then((data) => {
        const categorii = []
        const obj = data.val()
        for(let key in obj) {
          categorii.push({
            id: key,
            numeCategorie: obj[key].numeCategorie,
            img: obj[key].img,
            description: obj[key].description
          })
        }
          commit('setCategorii', categorii)
          commit('setLoading', false)

      }).catch(err => {
        commit('setLoading', false)
        console.log(err)
      })
    },
    loadProduse ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('/categorii/' + payload.id + '/produse').once('value').then((data) => {
        const produse = []
        const obj = data.val()
        for(let key in obj) {
          if(payload.stele.length == 0 && payload.nrrev.length == 0){
            produse.push({
              id: key,
              descriere: obj[key].descriere,
              img: obj[key].img,
              name: obj[key].name,
              rating: obj[key].rating,
              reviews: obj[key].reviews,
              link: obj[key].link
            })
          }
           else if(payload.stele.length != 0 && payload.nrrev.length == 0) {
            for (let i in payload.stele)
              if ((obj[key].rating / obj[key].reviews) <= payload.stele[i] && (obj[key].rating / obj[key].reviews) > payload.stele[i] - 1) {
                produse.push({
                  id: key,
                  descriere: obj[key].descriere,
                  img: obj[key].img,
                  name: obj[key].name,
                  rating: obj[key].rating,
                  reviews: obj[key].reviews,
                  link: obj[key].link
                })
                }
              }
                else if(payload.stele.length == 0 && payload.nrrev.length != 0) {
                     for(let j in payload.nrrev) {
                       if(payload.nrrev[j] == 1) {
                         if(obj[key].reviews >= 1 && obj[key].reviews <= 5) {
                           produse.push({
                             id: key,
                             descriere: obj[key].descriere,
                             img: obj[key].img,
                             name: obj[key].name,
                             rating: obj[key].rating,
                             reviews: obj[key].reviews,
                             link: obj[key].link
                           })
                         }
                       }
                       else if(payload.nrrev[j] == 2) {
                         if(obj[key].reviews >= 5 && obj[key].reviews <= 10) {
                           produse.push({
                             id: key,
                             descriere: obj[key].descriere,
                             img: obj[key].img,
                             name: obj[key].name,
                             rating: obj[key].rating,
                             reviews: obj[key].reviews,
                             link: obj[key].link
                           })
                         }
                       }
                       else if(payload.nrrev[j] == 3){
                         if(obj[key].reviews >= 10) {
                           produse.push({
                             id: key,
                             descriere: obj[key].descriere,
                             img: obj[key].img,
                             name: obj[key].name,
                             rating: obj[key].rating,
                             reviews: obj[key].reviews,
                             link: obj[key].link
                           })
                         }
                       }
                       else {
                         produse.push({
                           id: key,
                           descriere: obj[key].descriere,
                           img: obj[key].img,
                           name: obj[key].name,
                           rating: obj[key].rating,
                           reviews: obj[key].reviews,
                           link: obj[key].link
                         })
                       }
                     }
                 }
                 else {
                   for (let i in payload.stele)
                    if ((obj[key].rating / obj[key].reviews) <= payload.stele[i] && (obj[key].rating / obj[key].reviews) > payload.stele[i] - 1) {
                      for(let j in payload.nrrev) {
                        if(payload.nrrev[j] == 1) {
                          if(obj[key].reviews >= 1 && obj[key].reviews <= 5) {
                            produse.push({
                              id: key,
                              descriere: obj[key].descriere,
                              img: obj[key].img,
                              name: obj[key].name,
                              rating: obj[key].rating,
                              reviews: obj[key].reviews,
                              link: obj[key].link
                            })
                          }
                        }
                        else if(payload.nrrev[j] == 2) {
                          if(obj[key].reviews >= 5 && obj[key].reviews <= 10) {
                            produse.push({
                              id: key,
                              descriere: obj[key].descriere,
                              img: obj[key].img,
                              name: obj[key].name,
                              rating: obj[key].rating,
                              reviews: obj[key].reviews,
                              link: obj[key].link
                            })
                          }
                        }
                        else if(payload.nrrev[j] == 3){
                          if(obj[key].reviews >= 10) {
                            produse.push({
                              id: key,
                              descriere: obj[key].descriere,
                              img: obj[key].img,
                              name: obj[key].name,
                              rating: obj[key].rating,
                              reviews: obj[key].reviews,
                              link: obj[key].link
                            })
                          }
                        }
                        else {
                          produse.push({
                            id: key,
                            descriere: obj[key].descriere,
                            img: obj[key].img,
                            name: obj[key].name,
                            rating: obj[key].rating,
                            reviews: obj[key].reviews,
                            link: obj[key].link
                          })
                        }
                      }
                    }
                  }
               }
          commit('setProduse', produse)
          commit('setLoading', false)

      }).catch(err => {
        commit('setLoading', false)
        console.log(err)
      })
    },
    loadProd ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('/categorii/' + payload.catId + '/produse/' + payload.prodId)
          .once('value').then((data) => {

        const obj = data.val()
        const info = {
          id: payload.prodId,
          name: obj.name,
          descriere: obj.descriere,
          rating: obj.rating,
          reviews: obj.reviews,
          img: obj.img,
          link: obj.link
        }
        commit('setProd', info)
        commit('setLoading', false)

      }).catch(err => {
        commit('setLoading', false)
        console.log(err)
      })
    },
    loadProductReviews ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('/categorii/' + payload.catId + '/produse/' + payload.prodId + '/pareri')
          .once('value').then((data) => {
            const reviews = []
            const obj = data.val()
        for(let key in obj) {
          reviews.push({
            id: key,
            name: obj[key].name,
            title: obj[key].title,
            rating: obj[key].rating,
            text: obj[key].text,
            img: obj[key].img,
            userImg: obj[key].userImg,
            userKey: obj[key].userKey
          })
        }
          commit('setReviews', reviews)
          commit('setLoading', false)

      }).catch(err => {
        commit('setLoading', false)
        console.log(err)
      })
    },
    uploadProdus ({commit}, payload) {
      commit('setLoading', true)
      firebase.storage().ref('produse_img/' + payload.pictureName).put(payload.picture)
          .then((fileData) => {
             fileData.ref.getDownloadURL().then((url) => {
              firebase.database().ref('/categorii/' + payload.catKey + '/produse').push({
                descriere: payload.description,
                name: payload.nume,
                link: payload.link,
                rating: 0,
                reviews: 0,
                creatorKey: payload.userKey,
                img: url
              }).then((data) => {
                commit('setLoading', false)
              }).catch(err => {
                commit('setLoading', false)
                console.log(err)
              })
            })

            console.log("Upload complete")
          }).catch(err => {
        console.log(err)
      })
    },
    uploadReview ({commit}, payload) {
      commit('setLoading', true)
      if(payload.picture != null && payload.picture != undefined) {
        firebase.storage().ref('reviews_img/' + payload.picture.name).put(payload.picture)
            .then((fileData) => {
              fileData.ref.getDownloadURL().then((url) => {
                firebase.database().ref('/categorii/' + payload.catId + '/produse/' +
                payload.prodId + '/pareri').push({
                  rating: payload.rating,
                  text: payload.review,
                  title: payload.titluReview,
                  img: url,
                  name: payload.userName,
                  userImg: payload.userImg,
                  userKey: payload.userKey
                }).then(() => {
                  firebase.database().ref('/users/' + payload.userKey + '/reviews').push({
                    rating: payload.rating,
                    text: payload.review,
                    title: payload.titluReview,
                    img: url,
                    name: payload.userName,
                    userImg: payload.userImg,
                    userKey: payload.userKey
                  }).then(() => {
                    firebase.database().ref('/categorii/' + payload.catId + '/produse/' +
                    payload.prodId).update({
                      rating: payload.newRating,
                      reviews: payload.newReviews
                    }).catch(err => {
                      commit('setLoading', false)
                      console.log(err)
                    })
                    commit('setLoading', false)
                  }).catch(err => {
                    commit('setLoading', false)
                    console.log(err)
                  })
                }).catch(err => {
                  commit('setLoading', false)
                  console.log(err)
                })
              }).catch(err => {
                commit('setLoading', false)
                console.log(err)
              })
            }).catch(err => {
          commit('setLoading', false)
          console.log(err)
        })
      }
       else {
        firebase.database().ref('/categorii/' + payload.catId + '/produse/' +
            payload.prodId + '/pareri').push({
          rating: payload.rating,
          text: payload.review,
          title: payload.titluReview,
          img: '',
          name: payload.userName,
          userImg: payload.userImg,
          userKey: payload.userKey
        }).then(() => {
          firebase.database().ref('/users/' + payload.userKey + '/reviews').push({
            rating: payload.rating,
            text: payload.review,
            title: payload.titluReview,
            img: '',
            name: payload.userName,
            userImg: payload.userImg,
            userKey: payload.userKey
          }).then(() => {
            firebase.database().ref('/categorii/' + payload.catId + '/produse/' +
                payload.prodId).update({
              rating: payload.newRating,
              reviews: payload.newReviews
            }).catch(err => {
              commit('setLoading', false)
              console.log(err)
            })
          }).catch(err => {
            commit('setLoading', false)
            console.log(err)
          })
        }).catch(err => {
          commit('setLoading', false)
          console.log(err)
        })
      }
    },
    loadUserReviews ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + payload + '/reviews').once('value')
          .then((data) => {
            const reviews = []
            const obj = data.val()
            for(let key in obj) {
              reviews.push({
                id: key,
                img: obj[key].img,
                name: obj[key].name,
                rating: obj[key].rating,
                text: obj[key].text,
                title: obj[key].title,
                userImg: obj[key].userImg,
              })
              commit('setUserReviews', reviews)
              commit('setLoading', false)
            }
          }).catch(err => {
        commit('setLoading', true)
        console.log(err)
      })
    },
    loadCatName ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('/categorii/' + payload).once('value').then((data) =>{
        const numeCategorie = data.val().numeCategorie
        commit('setNumeCat', numeCategorie)
        commit('setLoading', false)
      }).catch(err => {
        commit('setLoading', false)
        console.log(err)
      })
    }
  },
  getters: {
    user (state) {
      return state.userInfo
    },
    someUser (state) {
      return (userId) => {
        return state.users.find((theUser) => {
          return theUser.id === userId
        })
      }
    },
    loading (state) {
      return state.userPageLoading
    },
    categorii (state) {
      return state.categorii
    },
    produse (state) {
      return state.produse
    },
    error (state) {
      return state.error
    },
    reviews (state) {
      return state.reviews
    },
    theProd (state) {
      return state.prod
    },
    userReviews (state) {
      return state.userReviews
    },
    numeCat (state) {
      return state.numeCat
    }
  },
  modules: {
  }
})
