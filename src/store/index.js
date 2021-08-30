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
    yourReview: [],
    reviews: [],
    prod: null,
    userReviews: null,
    numeCat: null,
    notificari: null,
    searchArray: []
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
    setYourReview (state, payload) {
      state.yourReview = payload
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
    },
    setNotificari (state, payload) {
      state.notificari = payload
    },
    setSearchArray (state, payload) {
      state.searchArray = payload
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      const newUser = {
        userName: payload.username,
        biografie: "Salut! Folosesc HonestReviews!",
        profileImg: "https://firebasestorage.googleapis.com/v0/b/itec-8b9cf.appspot.com/o/FREE-PROFILE-AVATARS.png?alt=media&token=a6b17192-ac3a-44ca-928f-08856f438d15",
      }
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then((cred) => {
        const id = cred.user.uid

        firebase.database().ref('users').push(newUser).then((data) => {
          const newUserWithId = {
            userName: payload.username,
            profileImg: "https://firebasestorage.googleapis.com/v0/b/itec-8b9cf.appspot.com/o/FREE-PROFILE-AVATARS.png?alt=media&token=a6b17192-ac3a-44ca-928f-08856f438d15",
            key: data.key
          }
          firebase.firestore().collection('users').doc(id).set(newUserWithId).then((data) => {
            commit('newUser', newUserWithId)
            commit('setError', {
              text: 'Cont inregistrat cu succes!',
              color: '#24ba22',
              icon: 'mdi-check-circle'
            })
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })

      }).catch(err => {
        commit('setError', {
          text: 'A aparut o eroare. Va rugam incercati din nou!',
          color: '#e32929',
          icon: 'mdi-alert-circle'
        })
      })
    },
    logUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then((data) => {
        commit('setError', {
          text: 'Te-ai conectat cu succes cu E-Mail-ul: ' + data.user.email,
          color: '#24ba22',
          icon: 'mdi-check-circle'
        })

      }).catch(err => {
        commit('setError', {
          text: 'E-Mail-ul sau parola sunt incorecte. Va rugam incercati din nou!',
          color: '#e32929',
          icon: 'mdi-alert-circle'
        })
      })
    },
    logUserInWithGoogle ({commit}, payload) {
      firebase.auth().signInWithPopup(payload).then((data) => {
        commit('setError', {
          text: 'Te-ai conectat cu succes la contul: ' + data.additionalUserInfo.profile.name,
          color: '#24ba22',
          icon: 'mdi-check-circle'
        })
      }).catch(err => {
        commit('setError', {
          text: 'A aparut o eroare. Va rugam incercati din nou!',
          color: '#e32929',
          icon: 'mdi-alert-circle'
        })
      })

    },
    logUserInWithFacebook ({commit}, payload) {
      firebase.auth().signInWithPopup(payload).then((data) => {
        commit('setError', {
          text: 'Te-ai conectat cu succes la contul: ' + data.additionalUserInfo.profile.name,
          color: '#24ba22',
          icon: 'mdi-check-circle'
        })
      }).catch(err => {
        commit('setError', {
          text: 'A aparut o eroare. Va rugam incercati din nou!',
          color: '#e32929',
          icon: 'mdi-alert-circle'
        })
      })
    },
    signUserUpWithGoogle ({commit}, payload) {
      firebase.auth().signInWithPopup(payload).then(cred => {
        const id = cred.user.uid

        const newUser = {
          userName: cred.additionalUserInfo.profile.name,
          profileImg: cred.additionalUserInfo.profile.picture,
          biografie: "Salut! Folosesc HonestReviews!"
        }
        firebase.database().ref('users').push(newUser).then((data) => {
          const newUserWithId = {
            userName: cred.additionalUserInfo.profile.name,
            profileImg: cred.additionalUserInfo.profile.picture,
            key: data.key,
          }
          firebase.firestore().collection('users').doc(id).set(newUserWithId).then((data) => {
            commit('newUser', newUserWithId)
            commit('setError', {
              text: 'Cont inregistrat cu succes!',
              color: '#24ba22',
              icon: 'mdi-check-circle'
            })
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })

      }).then(err => {
        commit('setError', {
          text: 'A aparut o eroare. Va rugam incercati din nou!',
          color: '#e32929',
          icon: 'mdi-alert-circle'
        })
      })
    },
    signUserUpWithFacebook ({commit}, payload) {
      firebase.auth().signInWithPopup(payload).then(cred => {
        const id = cred.user.uid

        const newUser = {
          userName: cred.additionalUserInfo.profile.name,
          profileImg: cred.additionalUserInfo.profile.picture.data.url,
          biografie: "Salut! Folosesc HonestReviews!"
        }
        firebase.database().ref('users').push(newUser).then((data) => {
          const newUserWithId = {
            userName: cred.additionalUserInfo.profile.name,
            profileImg: cred.additionalUserInfo.profile.picture.data.url,
            key: data.key
          }
          firebase.firestore().collection('users').doc(id).set(newUserWithId).then((data) => {
            commit('newUser', newUserWithId)
            commit('setError', {
              text: 'Cont inregistrat cu succes!',
              color: '#24ba22',
              icon: 'mdi-check-circle'
            })
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })

      }).catch(err => {
        commit('setError', {
          text: 'A aparut o eroare. Va rugam incercati din nou!',
          color: '#e32929',
          icon: 'mdi-alert-circle'
        })
      })
    },
    autoSignIn ({commit}, payload) {
      firebase.firestore().collection('users').doc(payload.uid).onSnapshot((doc) => {
        if (doc.exists) {
          const userInfo = {
            userName: doc.data().userName,
            email: payload.email,
            profileImg: doc.data().profileImg,
            key: doc.data().key,
            biografie: doc.data().biografie,
            uid: payload.uid
          }
          commit('userInfo', userInfo)
        }
      })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      router.push('/')
      commit('userInfo', null)
      commit('setError', {
        text: 'Te-ai deconectat cu succes!',
        color: '#387aff',
        icon: 'mdi-information-outline'
      })
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
            profileImg: obj[key].profileImg,
            biografie: obj[key].biografie
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
    loadProductYourReview ({commit}, payload) {
      const reviews = []
      firebase.database().ref('/categorii/' + payload.catId + '/produse/' + payload.prodId + '/pareri')
          .once('value').then((data) => {
        const obj = data.val()

        for(let key in obj) {
          const reviewKey = obj[key].reviewKey
          firebase.database().ref('/reviews/' + reviewKey).once('value')
              .then((val) => {
                const obj = val.val()

                if(obj.userKey === payload.authUserKey){

                  reviews.push({
                    id: reviewKey,
                    idFromCat: key,
                    title: obj.title,
                    rating: obj.rating,
                    text: obj.text,
                    img: obj.img,
                    userKey: obj.userKey,
                    date: obj.date,
                    edited: obj.edited,
                    likes: 0,
                    likeKey: '',
                    liked: false,
                    name: '',
                    userImg: ''
                  })

                  const i = reviews.length - 1

                  if(obj.likes !== undefined && obj.likes !== null) {
                    var x = 0
                    for(let j in obj.likes) {
                      x++;
                      if(obj.likes[j].userKey === payload.authUserKey) {
                        reviews[i].liked = true
                        reviews[i].likeKey = j
                      }
                    }
                    reviews[i].likes = x
                  }


                  firebase.database().ref('/users/' + reviews[i].userKey).once('value')
                      .then((val) => {
                        const obj = val.val()
                        reviews[i].name = obj.userName
                        reviews[i].userImg = obj.profileImg
                      }).catch(err => {
                    commit('setLoading', false)
                    console.log(err)
                  })

                }

              }).catch(err => {
            commit('setLoading', false)
            console.log(err)
          })

        }

        console.log(reviews)
        commit('setLoading', false)

      }).catch(err => {
        commit('setLoading', false)
        console.log(err)
      })
      commit('setYourReview', reviews)
    },


    loadProductReviews ({commit}, payload) {
      commit('setLoading', true)
      const reviews = []
      firebase.database().ref('/categorii/' + payload.catId + '/produse/' + payload.prodId + '/pareri')
          .once('value').then((data) => {
        const obj = data.val()

        for(let key in obj) {
          const reviewKey = obj[key].reviewKey
          firebase.database().ref('/reviews/' + reviewKey).once('value')
              .then((val) => {
                const obj = val.val()

                if(obj.userKey !== payload.authUserKey){

                  reviews.push({
                    id: reviewKey,
                    idFromCat: key,
                    title: obj.title,
                    rating: obj.rating,
                    text: obj.text,
                    img: obj.img,
                    userKey: obj.userKey,
                    date: obj.date,
                    edited: obj.edited,
                    likes: 0,
                    likeKey: '',
                    liked: false,
                    name: '',
                    userImg: ''
                  })

                  const i = reviews.length - 1

                  if(obj.likes !== undefined && obj.likes !== null) {
                    var x = 0
                    for(let j in obj.likes) {
                      x++;
                      if(obj.likes[j].userKey === payload.authUserKey) {
                        reviews[i].liked = true
                        reviews[i].likeKey = j
                      }
                    }
                    reviews[i].likes = x
                  }


                  firebase.database().ref('/users/' + reviews[i].userKey).once('value')
                      .then((val) => {
                        const obj = val.val()
                        reviews[i].name = obj.userName
                        reviews[i].userImg = obj.profileImg
                      }).catch(err => {
                    commit('setLoading', false)
                    console.log(err)
                  })

                }

              }).catch(err => {
            commit('setLoading', false)
            console.log(err)
          })

        }

        console.log(reviews)
        commit('setLoading', false)

      }).catch(err => {
        commit('setLoading', false)
        console.log(err)
      })

      commit('setReviews', reviews)
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
              }).then(() => {
                commit('setLoading', false)
              }).catch(err => {
                commit('setLoading', false)
                console.log(err)
              })
            })
            commit('setError', {
              text: 'Produsul:' + payload.nume + ' a fost adaugat cu succes!',
              color: '#24ba22',
              icon: 'mdi-check-circle'
            })
          }).catch(err => {
            commit('setError', {
              text: 'Incarcarea produsului nu a reusit. Va rugam sa reincercati!',
              color: '#e32929',
              icon: 'mdi-alert-circle'
            })
      })
      commit('setLoading', false)
    },
    uploadReview ({commit}, payload) {
      if(payload.picture != null && payload.picture != undefined) {
        commit('setLoading', true)
        firebase.storage().ref('reviews_img/' + payload.picture.lastModified).put(payload.picture)
            .then((fileData) => {
              fileData.ref.getDownloadURL().then((url) => {
                firebase.database().ref('/reviews/').push({
                  rating: payload.rating,
                  text: payload.review,
                  title: payload.titluReview,
                  img: url,
                  userKey: payload.userKey,
                  date: payload.date,
                  link: '/categorii/' + payload.catId + '/produs/'
                      + payload.prodId,
                  edited: false
                }).then((data) => {
                  firebase.database().ref('/categorii/' + payload.catId + '/produse/' +
                      payload.prodId + '/pareri').push({
                    reviewKey: data.key
                  })
                  firebase.database().ref('/users/' + payload.userKey + '/reviews').push({
                    reviewKey: data.key
                  }).then(() => {
                      firebase.database().ref('/categorii/' + payload.catId + '/produse/' +
                          payload.prodId).update({
                        rating: payload.newRating,
                        reviews: payload.newReviews
                      }).catch(err => {
                        commit('setLoading', false)
                        console.log(err)
                      })

                    firebase.database().ref('/categorii/' + payload.catId + '/produse/' +
                        payload.prodId).once('value').then((val) => {
                          firebase.database().ref('/users/' + val.val().creatorKey +
                          '/notificari/').push({
                            userKey: payload.userKey,
                            prodName: payload.prodName,
                            link: payload.link,
                            icon: 'mdi-message-reply-text',
                            color: 'color:#1fc7ff',
                            date: payload.date,
                            time: payload.time,
                            seen: false
                          }).catch(err => {
                            commit('setLoading', false)
                            console.log(err)
                          })
                    }).catch(err => {
                      commit('setLoading', false)
                      commit('setError', {
                        text: 'Incarcarea review-ului nu a reusit. Va rugam sa reincercati!',
                        color: '#e32929',
                        icon: 'mdi-alert-circle'
                      })
                    })
                      commit('setLoading', false)
                    }).catch(err => {
                      commit('setLoading', false)
                    commit('setError', {
                      text: 'Incarcarea review-ului nu a reusit. Va rugam sa reincercati!',
                      color: '#e32929',
                      icon: 'mdi-alert-circle'
                    })
                    })
                  }).catch(err => {
                    commit('setLoading', false)
                  commit('setError', {
                    text: 'Incarcarea review-ului nu a reusit. Va rugam sa reincercati!',
                    color: '#e32929',
                    icon: 'mdi-alert-circle'
                  })
                  })
                }).catch(err => {
                  commit('setLoading', false)
                commit('setError', {
                  text: 'Incarcarea review-ului nu a reusit. Va rugam sa reincercati!',
                  color: '#e32929',
                  icon: 'mdi-alert-circle'
                })
                })
              }).catch(err => {
                commit('setLoading', false)
              commit('setError', {
            text: 'Incarcarea review-ului nu a reusit. Va rugam sa reincercati!',
            color: '#e32929',
            icon: 'mdi-alert-circle'
          })
              })
        commit('setError', {
          text: 'Review-ul a fost adaugat cu succes!',
          color: '#24ba22',
          icon: 'mdi-check-circle'
        })
      }
       else {
        commit('setLoading', true)
         firebase.database().ref('/reviews/').push({
          rating: payload.rating,
          text: payload.review,
          title: payload.titluReview,
          img: '',
          userKey: payload.userKey,
          date: payload.date,
          link: '/categorii/' + payload.catId + '/produs/'
               + payload.prodId,
          edited: false
        }).then(data => {
          firebase.database().ref('/categorii/' + payload.catId + '/produse/' +
              payload.prodId + '/pareri').push({
            reviewKey: data.key
          })
          firebase.database().ref('/users/' + payload.userKey + '/reviews').push({
            reviewKey: data.key
          }).then(() => {
              firebase.database().ref('/categorii/' + payload.catId + '/produse/' +
                  payload.prodId).update({
                rating: payload.newRating,
                reviews: payload.newReviews
              }).catch(err => {
                commit('setLoading', false)
                commit('setError', {
                  text: 'Incarcarea review-ului nu a reusit. Va rugam sa reincercati!',
                  color: '#e32929',
                  icon: 'mdi-alert-circle'
                })
              })

            firebase.database().ref('/categorii/' + payload.catId + '/produse/' +
                payload.prodId).once('value').then((val) => {
              firebase.database().ref('/users/' + val.val().creatorKey +
                  '/notificari/').push({
                userKey: payload.userKey,
                prodName: payload.prodName,
                link: payload.link,
                icon: 'mdi-message-reply-text',
                color: 'color:#1fc7ff',
                date: payload.date,
                time: payload.time,
                seen: false
              }).catch(err => {
                commit('setLoading', false)
                console.log(err)
              })
            }).catch(err => {
              commit('setLoading', false)
              commit('setError', {
                text: 'Incarcarea review-ului nu a reusit. Va rugam sa reincercati!',
                color: '#e32929',
                icon: 'mdi-alert-circle'
              })
            })
            commit('setLoading', false)
            }).catch(err => {
              commit('setLoading', false)
            commit('setError', {
              text: 'Incarcarea review-ului nu a reusit. Va rugam sa reincercati!',
              color: '#e32929',
              icon: 'mdi-alert-circle'
            })
            })
          }).catch(err => {
            commit('setLoading', false)
           commit('setError', {
             text: 'Incarcarea review-ului nu a reusit. Va rugam sa reincercati!',
             color: '#e32929',
             icon: 'mdi-alert-circle'
           })
          })
        commit('setError', {
          text: 'Review-ul a fost adaugat cu succes!',
          color: '#24ba22',
          icon: 'mdi-check-circle'
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
              firebase.database().ref('/reviews/' + obj[key].reviewKey).once('value')
                  .then((data) => {
                    const x = data.val()

                    reviews.push({
                      id: key,
                      title: x.title,
                      rating: x.rating,
                      text: x.text,
                      img: x.img,
                      userKey: x.userKey,
                      date: x.date,
                      edited: x.edited,
                      link: x.link,
                      likes: 0,
                      likeKey: '',
                      liked: false,
                      name: '',
                      userImg: ''
                    })

                    const i = reviews.length - 1

                    if(x.likes !== undefined && x.likes !== null) {
                      var y = 0
                      for(let j in x.likes) {
                        y++;
                        if(x.likes[j].userKey === payload) {
                          reviews[i].liked = true
                          reviews[i].likeKey = j
                        }
                      }
                      reviews[i].likes = y
                    }

                    firebase.database().ref('/users/' + payload).once('value')
                        .then((val) => {
                      reviews[i].name = val.val().userName
                      reviews[i].userImg = val.val().profileImg
                    }).catch(err => {
                      console.log(err)
                      commit('setLoading', false)
                    })

                  }).catch(err => {
                    console.log(err)
                   commit('setLoading', false)
              })

            }

            commit('setUserReviews', reviews)
            commit('setLoading', false)
          }).catch(err => {
        commit('setLoading', false)
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
    },
    updateReview ({commit}, payload) {
      commit('setLoading', true)
      if(payload.oldRating != payload.rating){
        firebase.database().ref('/categorii/' + payload.IdCat + '/produse/' + payload.IdProd)
            .update({
            rating: payload.bigRating - payload.oldRating + payload.rating
        })
      }
      firebase.database().ref('/categorii/' + payload.IdCat + '/produse/' + payload.IdProd +
      '/pareri/' + payload.id).once('value').then((data) => {
        const vm = data.val()
        if(payload.picture != null && payload.picture != undefined) {
          if(payload.imgUrl != ''){
            firebase.storage().ref('reviews_img/' + payload.imageUrl).delete().then(() => {

            }).catch(err => {
              commit('setLoading', false)
              commit('setError', {
                text: 'Modificarea review-ului nu a reusit. Va rugam sa reincercati!',
                color: '#e32929',
                icon: 'mdi-alert-circle'
              })
            })
          }

          firebase.storage().ref('reviews_img/' + payload.picture.lastModified).put(payload.picture)
              .then((fileData) => {
                fileData.ref.getDownloadURL().then((url) => {
                  firebase.database().ref('/reviews/' + vm.reviewKey).update({
                    img: url,
                    rating: payload.rating,
                    text: payload.text,
                    title: payload.title,
                    edited: true
                  }).catch(err => {
                    console.log(err)
                    commit('setError', {
                      text: 'Modificarea review-ului nu a reusit. Va rugam sa reincercati!',
                      color: '#e32929',
                      icon: 'mdi-alert-circle'
                    })
                  })
                }).catch(err => {
                  console.log(err)
                  commit('setError', {
                    text: 'Modificarea review-ului nu a reusit. Va rugam sa reincercati!',
                    color: '#e32929',
                    icon: 'mdi-alert-circle'
                  })
                })
              }).catch(err => {
            console.log(err)
            commit('setError', {
              text: 'Modificarea review-ului nu a reusit. Va rugam sa reincercati!',
              color: '#e32929',
              icon: 'mdi-alert-circle'
            })
          })
          commit('setError', {
            text: 'Review-ul a fost modificat cu succes!',
            color: '#24ba22',
            icon: 'mdi-check-circle'
          })
        }
         else {

          firebase.database().ref('/reviews/' + vm.reviewKey).update({
            rating: payload.rating,
            text: payload.text,
            title: payload.title,
            edited: true
          }).catch(err => {
            console.log(err)
            commit('setLoading', false)
            commit('setError', {
              text: 'Modificarea review-ului nu a reusit. Va rugam sa reincercati!',
              color: '#e32929',
              icon: 'mdi-alert-circle'
            })
          })
        }
      }).catch(err => {
        console.log(err)
        commit('setLoading', false)
        commit('setError', {
          text: 'Modificarea review-ului nu a reusit. Va rugam sa reincercati!',
          color: '#e32929',
          icon: 'mdi-alert-circle'
        })
      })
      commit('setLoading', false)
      commit('setError', {
        text: 'Review-ul a fost modificat cu succes!',
        color: '#24ba22',
        icon: 'mdi-check-circle'
      })
    },
    updateUserInfo ({commit}, payload) {
      if(payload.picture != null && payload.picture != undefined) {
        firebase.storage().ref('profile_img/' + payload.picture.lastModified).put(payload.picture)
            .then((fileData) => {
              fileData.ref.getDownloadURL().then((url) => {
                firebase.database().ref('/users/' + payload.key).update({
                  biografie: payload.bio,
                  profileImg: url,
                  userName: payload.name
                }).catch(err => {
                  console.log(err)
                  commit('setLoading', false)
                  commit('setError', {
                    text: 'A aparut o eroare. Va rugam sa reincercati!',
                    color: '#e32929',
                    icon: 'mdi-alert-circle'
                  })
                })

                firebase.firestore().collection('users').doc(payload.uid).update({
                  profileImg: url,
                  userName: payload.name
                }).catch(err => {
                  console.log(err)
                  commit('setLoading', false)
                  commit('setError', {
                    text: 'A aparut o eroare. Va rugam sa reincercati!',
                    color: '#e32929',
                    icon: 'mdi-alert-circle'
                  })
                })

                commit('setLoading', false)

              }).catch(err => {
                console.log(err)
                commit('setLoading', false)
                commit('setError', {
                  text: 'A aparut o eroare. Va rugam sa reincercati!',
                  color: '#e32929',
                  icon: 'mdi-alert-circle'
                })
              })
            }).catch(err => {
          console.log(err)
          commit('setError', {
            text: 'A aparut o eroare. Va rugam sa reincercati!',
            color: '#e32929',
            icon: 'mdi-alert-circle'
          })
          commit('setLoading', false)
        })
        commit('setError', {
          text: 'Datele dvs. au fost modificate cu succes!',
          color: '#24ba22',
          icon: 'mdi-check-circle'
        })
      }
       else if(payload.bio !== undefined) {
        firebase.database().ref('/users/' + payload.key).update({
          userName: payload.name,
          biografie: payload.bio
        }).catch(err => {
          console.log(err)
          commit('setLoading', false)
          commit('setError', {
            text: 'A aparut o eroare. Va rugam sa reincercati!',
            color: '#e32929',
            icon: 'mdi-alert-circle'
          })
        })

        firebase.firestore().collection('users').doc(payload.uid).update({
          userName: payload.name
        }).catch(err => {
          console.log(err)
          commit('setLoading', false)
          commit('setError', {
            text: 'A aparut o eroare. Va rugam sa reincercati!',
            color: '#e32929',
            icon: 'mdi-alert-circle'
          })
        })
        commit('setError', {
          text: 'Datele dvs. au fost modificate cu succes!',
          color: '#24ba22',
          icon: 'mdi-check-circle'
        })
      }
       else {
        firebase.database().ref('/users/' + payload.key).update({
          userName: payload.name
        }).catch(err => {
          console.log(err)
          commit('setLoading', false)
          commit('setError', {
            text: 'A aparut o eroare. Va rugam sa reincercati!',
            color: '#e32929',
            icon: 'mdi-alert-circle'
          })
        })

        firebase.firestore().collection('users').doc(payload.uid).update({
          userName: payload.name
        }).catch(err => {
          console.log(err)
          commit('setLoading', false)
          commit('setError', {
            text: 'A aparut o eroare. Va rugam sa reincercati!',
            color: '#e32929',
            icon: 'mdi-alert-circle'
          })
        })
        commit('setError', {
          text: 'Datele dvs. au fost modificate cu succes!',
          color: '#24ba22',
          icon: 'mdi-check-circle'
        })
      }
    },
    like ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('/reviews/' + payload.reviewKey + '/likes/').push({
        userKey: payload.userKey
      }).catch(err => {
        commit('setLoading', false)
        console.log(err)
      })

      firebase.database().ref('/reviews/' + payload.reviewKey).once('value')
          .then((val) => {
            firebase.database().ref('/users/' + val.val().userKey + '/notificari/')
                .push({
                  userKey: payload.userKey,
                  prodName: payload.prodName,
                  link: payload.link,
                  date: payload.date,
                  time: payload.time,
                  icon: 'mdi-heart',
                  color: 'color:red',
                  seen: false
                }).catch(err => {
              commit('setLoading', false)
              console.log(err)
            })
          }).catch(err => {
        commit('setLoading', false)
        console.log(err)
      })
      commit('setLoading', false)
    },
    unlike ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('/reviews/' + payload.reviewKey + '/likes/' + payload.likeKey)
          .remove()
          .catch(err => {
        commit('setLoading', false)
        console.log(err)
      })
      commit('setLoading', false)
    },
    loadNotificari ({commit}, payload) {

      firebase.firestore().collection('users').doc(payload.uid)
          .onSnapshot((doc) => {
        if (doc.exists) {
          const notificari = []
          firebase.database().ref('/users/' + doc.data().key + '/notificari/')
              .once('value').then((data) => {
            const obj = data.val()
            for(let key in obj) {
              notificari.push({
                key: key,
                text: '',
                color: obj[key].color,
                icon: obj[key].icon,
                prodName: obj[key].prodName,
                link: obj[key].link,
                date: obj[key].date,
                time: obj[key].time,
                seen: obj[key].seen,
                userName: ''
              })
              const i = notificari.length
              firebase.database().ref('/users/' + obj[key].userKey)
                  .once('value').then((val) => {
                notificari[i - 1].userName = val.val().userName
              })
              if(notificari[i - 1].icon === "mdi-message-reply-text") {
                notificari[i - 1].text = 'a adaugat un review la produsul tau: '
              }
                else if(notificari[i - 1].icon === "mdi-heart") {
                notificari[i - 1].text = 'ti-a apreciat review-ul la produsul: '
              }

            }
          }).catch(err => {
            commit('setLoading', false)
            console.log(err)
          })
          commit('setNotificari', notificari)
        }
      })
    },
    loadSearchSuggestions ({commit}) {
      const searchArray = []
      firebase.database().ref('/categorii/').once('value').then((val) => {
        const obj = val.val()
        for(let key in obj) {
          searchArray.push({
            searchObj: obj[key].numeCategorie,
            link: '/categorii/' + key
          })
        }
        for(let key in obj) {
          const catKey = key
          firebase.database().ref('/categorii/' + catKey + '/produse/')
              .once('value').then((val) => {
                const obj = val.val()
                for(let i in obj) {
                  searchArray.push({
                    searchObj: obj[i].name,
                    link: '/categorii/' + catKey + '/produs/' + i
                  })
                }
          })
        }
      })
      commit('setSearchArray', searchArray)
    },
    markAsRead ({commit}, payload) {
      firebase.database().ref('/users/' + payload + '/notificari/')
          .once('value').then((val) => {
            const obj = val.val()
        for(let key in obj) {
          firebase.database().ref('/users/' + payload + '/notificari/' + key)
              .update({
                seen: true
              }).catch((err) => {
                console.log(err)
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    deleteNotificari ({commit}, payload) {
      firebase.database().ref('/users/' + payload + '/notificari/').remove()
          .catch(err => {
            console.log(err)
          })
    },
    markOneNotfAsRead ({commit}, payload) {
      firebase.database().ref('/users/' + payload.userId + '/notificari/' +
      payload.notifId).update({
        seen: true
      }).catch(err => {
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
      return state.yourReview.concat(state.reviews)
    },
    theProd (state) {
      return state.prod
    },
    userReviews (state) {
      return state.userReviews
    },
    numeCat (state) {
      return state.numeCat
    },
    notificari (state) {
      return state.notificari
    },
    searchArray (state) {
      return state.searchArray
    }
  },
  modules: {
  }
})