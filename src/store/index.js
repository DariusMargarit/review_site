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
    loadProductReviews ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('/categorii/' + payload.catId + '/produse/' + payload.prodId + '/pareri')
          .once('value').then((data) => {
            const reviews = []
            const obj = data.val()
        for(let key in obj) {
          const reviewKey = obj[key].reviewKey
          firebase.database().ref('/reviews/' + reviewKey).once('value')
              .then((val) => {
            const obj = val.val()

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
                  userImg: null
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

          }).catch(err => {
            commit('setLoading', false)
            console.log(err)
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
      if(payload.picture != null && payload.picture != undefined) {
        commit('setLoading', true)
        firebase.storage().ref('reviews_img/' + payload.picture.name).put(payload.picture)
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
                            color: 'color:#1fc7ff'
                          }).catch(err => {
                            commit('setLoading', false)
                            console.log(err)
                          })
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
                console.log(err)
              })

            firebase.database().ref('/categorii/' + payload.catId + '/produse/' +
                payload.prodId).once('value').then((val) => {
              firebase.database().ref('/users/' + val.val().creatorKey +
                  '/notificari/').push({
                userKey: payload.userKey,
                icon: 'mdi-message-reply-text',
                color: 'color:#1fc7ff'
              }).catch(err => {
                commit('setLoading', false)
                console.log(err)
              })
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
                      name: '',
                      userImg: null
                    })

                    const i = reviews.length - 1

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
              console.log(err)
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
                    commit('setLoading', false)
                  })
                }).catch(err => {
                  console.log(err)
                  commit('setLoading', false)
                })
              }).catch(err => {
            console.log(err)
            commit('setLoading', false)
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
          })
        }
      }).catch(err => {
        console.log(err)
        commit('setLoading', false)
      })
      commit('setLoading', false)
    },
    updateUserInfo ({commit}, payload) {
      commit('setLoading', true)
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
                })

                firebase.firestore().collection('users').doc(payload.uid).update({
                  profileImg: url,
                  userName: payload.name
                }).catch(err => {
                  console.log(err)
                  commit('setLoading', false)
                })

                commit('setLoading', false)

              }).catch(err => {
                console.log(err)
                commit('setLoading', false)
              })
            }).catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
      }
       else {
        firebase.database().ref('/users/' + payload.key).update({
          userName: payload.name,
          biografie: payload.bio
        }).catch(err => {
          console.log(err)
          commit('setLoading', false)
        })

        firebase.firestore().collection('users').doc(payload.uid).update({
          userName: payload.name
        }).catch(err => {
          console.log(err)
          commit('setLoading', false)
        })

        commit('setLoading', false)
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
                  icon: 'mdi-heart',
                  color: 'color:red'
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
                text: '',
                color: obj[key].color,
                icon: obj[key].icon,
                prodName: obj[key].prodName,
                link: obj[key].link,
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
            searchObj: obj[key].numeCategorie
          })
        }
        for(let key in obj) {
          firebase.database().ref('/categorii/' + key + '/produse/')
              .once('value').then((val) => {
                const obj = val.val()
                for(let i in obj) {
                  searchArray.push({
                    searchObj: obj[i].name
                  })
                }
          })
        }
      })
      commit('setSearchArray', searchArray)
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
