<template>
    <v-container>
        <div>
            <v-row no-gutters>
                <v-col md="1" sm="2" class="hidden-sm-and-up">
                    <v-avatar @click="goToUserProfile(review.userKey)" size="42">
                        <img :src="review.userImg" class="avatarr">
                    </v-avatar>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="4" sm="2" md="2" align="right" align-self="center" v-if="review.edited === true">
                    (editat)
                </v-col>
                <v-col class="centru" cols="2" sm="1" v-if="userKey !== review.userKey">
                    <ReportReviewPopup />
                </v-col>
                <v-col cols="2" sm="1" v-if="userKey === review.userKey">
                    <div style="margin-left: 1rem;" @mouseover="transfData(review)">
                        <EditReviewPopup :reviewDet="reviewDet" />
                    </div>
                </v-col>
            </v-row>
            <v-row style="max-height:12rem; margin-top: 0.2rem;">
                <v-col md="1" sm="2" class="hidden-xs-only">
                    <v-avatar @click="goToUserProfile(review.userKey)" size="42">
                        <img :src="review.userImg" class="avatarr">
                    </v-avatar>
                </v-col>
                <v-col md="6" class="hidden-sm-and-down">
                    <v-card-title @click="goToUserProfile(review.userKey)" style="cursor: pointer" class="titlu">
                        {{review.name}}
                    </v-card-title>
                </v-col>
                <v-col cols="12" sm="6" md="5">
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-col cols="8" sm="7" align="right">
                            <v-rating class="stele"
                                      background-color="warning lighten-1"
                                      color="warning"
                                      half-increments
                                      length="5"
                                      readonly
                                      size="1.5rem"
                                      :value=review.rating
                            ></v-rating>
                        </v-col>
                        <v-col cols="4" sm="5" align="left">
                            <div class="rating">
                                ({{review.rating}})</div>
                        </v-col>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-col>
                <v-col class="hidden-md-and-up" cols="12">
                    <v-card-title class="titlu">{{review.name}}</v-card-title>
                </v-col>
            </v-row>
            <v-row style="margin-bottom: 0.5rem;">
                <v-col>
                    <v-card-title class="text">{{review.title}}</v-card-title>
                    <v-card-text class="subtitlu">{{review.text | quotes}}</v-card-text>
                </v-col>
                <v-col cols="12"sm="6" v-if="review.img" align="center">
                    <div><v-img class="imagini" :src="review.img" /></div>
                </v-col>
            </v-row>
            <v-row no-gutters class="font">
                <v-col cols="2" sm="1">
                    <v-btn icon v-if="review.liked" @click="unlike(review)">
                        <v-icon style="color: red">
                            mdi-heart
                        </v-icon>
                    </v-btn>
                    <v-btn class="heart-btn-click" icon v-else @click="like(review)">
                        <v-icon>
                            mdi-heart-outline
                        </v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="4" align-self="center" align="left">
                    {{ review.likes }}
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="6" sm="2" align-self="center" align="right">
                    {{ review.date }}
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
    import EditReviewPopup from "./EditReviewPopup";
    import ReportReviewPopup from "./ReportReviewPopup";
    export default {
        name: "Review.vue",
        props: ['review', 'Ids'],
        components: {
            'EditReviewPopup': EditReviewPopup,
            'ReportReviewPopup' : ReportReviewPopup
        },
        data () {
            return {
                reviewDet: {
                    id: null,
                    img: null,
                    name: '',
                    rating: 0,
                    text: '',
                    title: '',
                    userImg: null,
                    userKey: null,
                    IdCat: this.Ids.IdCat,
                    IdProd: this.Ids.IdProd
                }
            }
        },
        computed: {
            theProd () {
                return this.$store.getters.theProd
            },
            userIsAuthenticated () {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
            userKey () {
                if(this.$store.getters.user !== null && this.$store.getters.user !== undefined) {
                    return this.$store.getters.user.key
                }
            }
        },
        methods: {
            goToUserProfile (id) {
                this.$router.push('/user/' + id)
            },
            transfData (value) {
                this.reviewDet.id = value.idFromCat
                this.reviewDet.img = value.img
                this.reviewDet.name = value.name
                this.reviewDet.rating = value.rating
                this.reviewDet.text = value.text
                this.reviewDet.title = value.title
                this.reviewDet.userImg = value.userImg
                this.reviewDet.userKey = value.userKey
            },
            like (value) {
                if(this.userIsAuthenticated) {
                    this.$store.dispatch('like', {
                        reviewKey: value.id,
                        userKey: this.userKey,
                        prodName: this.theProd.name,
                        link: '/categorii/' + this.Ids.IdCat + '/produs/' + this.Ids.IdProd
                    })
                }
                else {
                    this.$router.push('/Login')
                }
            },
            unlike (value) {
                this.$store.dispatch('unlike', {
                    reviewKey: value.id,
                    likeKey: value.likeKey
                })
            }
        },

    }
</script>

<style scoped>
    .avatarr{
        font-size:32px;
    }
    .avatarr:hover {
        cursor: pointer;
    }
    .centru {
        align-content: center;
        justify-content: center;
        display: flex;
    }

    .font {
        font-family: 'Lato', sans-serif;
        font-weight: bold;
    }

    .heart-btn-click :hover {
        color: red;
    }
    .imagini{
        max-width:220px;
        max-height: 220px;
        padding: 5px;
    }
    .text{
        padding:10px;
        font-family: 'Archivo Black', sans-serif;
        font-size: 20px;
    }
    .subtitlu{
        font-size:18px;
        padding-top:7px;
        padding-right: 10px;
        font-family: 'Lato', sans-serif;
        font-weight: bolder;
    }
    .titlu {
        font-family: 'Archivo Black', sans-serif;
        font-weight: bolder;
        font-size: 25px;
        word-break: break-word;
    }
    .stele{
        color: #ff9454;
        margin-top: 17px;
    }
    .rating{
        font-size: 20px;
        padding: 3px;
        margin-top: 13px;
        font-family: 'Lato', sans-serif;
        font-weight: bold;
    }
</style>