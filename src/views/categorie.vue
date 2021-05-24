<template>
    <v-main style="margin:auto;width:65%">
        <navbar />
        <br><br><br><br><br>
        <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
                v-if="loading"
        ></v-progress-circular>
        <div class="d-flex flex-no-wrap" v-if="!loading">
            <div style="width:30%">
                <div class="button" v-if="userIsAuthenticated">
                    <add-product :catKey="catKey" />
                </div>
                <div class="zonaFiltre">
                    <div class="Filtre" style="padding:15px;">
                        <H3 style="margin-bottom:8px">Cauta dupa nr. de stele</H3>
                        <div style="margin-top: 0px" v-for="(filtru, index) in stele">
                            <v-checkbox  class="stele" v-model="selected.stele" :value="index + 1" :label="filtru"></v-checkbox>
                        </div>
                    </div>
                    <div class="Filtre" style="padding:15px">
                        <H3 style="margin-bottom:8px;">Cauta dupa nr. de review-uri</H3>
                        <div style="margin-top: 0px" v-for="(filtru, index) in nrrev">
                            <v-checkbox class="stele" v-model="selected.nrrev" :value="index + 1" :label="filtru"></v-checkbox>
                        </div>
                    </div>
                </div>
            </div>
            <v-container>
                <v-row>
                    <v-col>
                        <div align="center" class="cattitle mb-7">
                            {{ numeCat }} ({{ produse.length }})
                        </div>
                        <v-card class="pa-7 mb-4" v-for="produs in produse" :key="produs.id">
                            <div><img @click="goToProduct(produs.id)" class="imagini" :src="produs.img" alt="alt text" /></div>
                            <div>
                                <div class="rat" style="margin-top: 2px; font-family: 'Lato', sans-serif;">
                                    ({{ (isNaN(produs.rating/produs.reviews)) ? 0 : (produs.rating/produs.reviews) | toFixed }})
                                </div>
                                <v-rating class="ste"
                                          background-color="warning lighten-1"
                                          color="warning"
                                          half-increments
                                          length="5"
                                          readonly
                                          size="25"
                                          :value=(produs.rating/produs.reviews)
                                ></v-rating>
                                <v-card-title @click="goToProduct(produs.id)" class="texti">{{ produs.name }}</v-card-title>
                                <v-card-subtitle class="tex">Reviews: {{ produs.reviews}}</v-card-subtitle>
                                <v-card-text class="tex">{{ produs.descriere }}</v-card-text>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </v-main>
</template>

<script>
    import Navbar from "../components/Navbar";
    import AddProdusPopup from "../components/AddProdusPopup";
    export default {
        name: "categorie",
        props: ['id'],
        components: {
            'navbar': Navbar,
            'add-product': AddProdusPopup
        },
        created () {
            this.$store.dispatch('loadProduse', {
                id: this.id,
                stele: [],
                nrrev: []
            })
            this.$store.dispatch('loadCatName', this.id)
        },
        data () {
            return {
                catKey: this.id,
                stele: ["1 stea", "2 stele", "3 stele", "4 stele", "5 stele"],
                nrrev: ["1-5", "5-10", "10+"],
                selected: {
                    stele: [],
                    nrrev: []
                }
            }
        },
        watch: {
            selected: {
                handler: function () {
                    this.$store.dispatch('loadProduse', {
                        id: this.id,
                        stele: this.selected.stele,
                        nrrev: this.selected.nrrev
                    })
                },
                deep: true
            }
        },
        computed: {
            produse () {
                return this.$store.getters.produse
            },
            loading () {
                return this.$store.getters.loading
            },
            userIsAuthenticated () {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
            numeCat () {
                return this.$store.getters.numeCat
            }
        },
        methods: {
            goToProduct (id) {
                this.$router.push('/categorii/' + this.id + '/produs/' + id)
            },
        }
    }
</script>

<style scoped>
    .Filtre{
        border: 1px solid #ccc;
        margin: 7px;
    }
    .zonaFiltre{
        border: 2px solid #ccc;
        margin-right: 20px;
    }
    .stele{
        margin-top: 0;
      font-family: 'Lato', sans-serif;
      font-weight: bold;
    }
    .imagini{
        width: auto;
        height: 110px;
        float: left;
        cursor: pointer;
        margin: 20px;
    }
    .texti{
        font-family: 'Arial Black', sans-serif;
        padding:10px;
        cursor: pointer;

    }
    .tex{
        font-size: 16px;
        text-align: left;
        padding-top: 8px;
        font-family: 'Lato', sans-serif;
        font-weight: bold;
    }
    .ste{
        color: #ff9454;
        float: right;
    }
    .rat{
        float: right;
        font-size: 14px;
        padding: 3px;
    }
    .button {
        margin-bottom: 30px;
        text-align: center;
    }
    .cattitle{
        font-size: 30px;
    }
</style>
