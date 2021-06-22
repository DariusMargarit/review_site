<template>
    <v-dialog v-model="dialogadd" width="600">
        <template v-slot:activator="{ on }">
            <v-btn class="homebutton text--black font-weight-bold" plain v-on="on">Adauga un produs nou</v-btn>
        </template>

        <v-card>
            <div class="main">
                <form @submit.prevent="submitForm">
                    <div @click="dialogadd = !dialogadd"><v-icon class="closeIcon">mdi-close</v-icon></div>
                    <h1>Adauga un produs!</h1>
                    <br />
                    <div align="center">

                        <v-text-field
                                prepend-inner-icon="mdi-format-title"
                                v-model="nume"
                                label="Nume"
                                :error-messages="nameErrors"
                                required
                                clearable
                        ></v-text-field>

                        <v-textarea
                                prepend-inner-icon="mdi-lead-pencil"
                                v-model="description"
                                label="Descriere"
                                auto-grow
                                no-resize
                                required
                                :error-messages="descriptionErrors"
                                clearable
                        ></v-textarea>
                        <div>
                            <v-file-input
                                    prepend-inner-icon="mdi-format-title"
                                    label="Adaugati o imagine"
                                    dense
                                    required
                                    show-size
                                    prepend-icon=""
                                    v-model="picture"
                            ></v-file-input>
                            <img :src="this.imageUrl" class="imagePreview" v-if="this.picture">
                        </div>
                        <v-text-field
                                prepend-inner-icon="mdi-link"
                                v-model="link"
                                label="Link"
                                required
                                clearable
                        ></v-text-field>

                    </div>
                    <div align="center">
                        <br />
                        <v-btn class="mr-4 " outlined text style="font-family: 'Lato', sans-serif; font-weight: bold;" type="submit" :loading="loading">trimite</v-btn>
                        <v-btn @click="clear" outlined text style="font-family: 'Lato', sans-serif; font-weight: bold;">goleste</v-btn>
                    </div>
                </form>

            </div>
        </v-card>
    </v-dialog>
</template>

<script>
    import { validationMixin } from 'vuelidate'
    import { required, maxLength, minLength } from 'vuelidate/lib/validators'

    export default {

        mixins: [validationMixin],
        validations: {
            name: { required, maxLength: maxLength(15), minLength: minLength(3) },
            description: {required, maxLength: maxLength(100)},
        },
        props: {
            catKey: {
                type: String
            }
        },
        data: () => ({
            nume: '',
            description: '',
            imageUrl: null,
            picture: null,
            loading: false,
            dialogadd: false,
            link: ''
        }),
        watch : {
          picture (value) {
              if(value != null && value != undefined)
              {
                  const reader = new FileReader();
                  const vm = this
                  reader.addEventListener("load", function () {
                      vm.imageUrl = this.result
                  })
                  reader.readAsDataURL(value)
              }
          },
        },
        computed: {
            nameErrors () {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.name.required && errors.push('Numele produsului este obligatoriu')
                return errors
            },
            descriptionErrors () {
                const errors = []
                if(!this.$v.description.$dirty) return errors
                !this.$v.description.required && errors.push('Descrierea produsului este obligatorie')
                return errors
            },
            user () {
                return this.$store.getters.user
            },
        },
        methods: {
            submitForm () {
                this.loading = true;
                const det = {
                    nume: this.nume,
                    description: this.description,
                    picture: this.picture,
                    pictureName: this.picture.name,
                    link: this.link,
                    userKey: this.user.key,
                    catKey: this.catKey
                }
                this.$store.dispatch('uploadProdus', det)
            },
            clear () {
                this.$v.$reset()
                this.nume = ''
                this.description = ''
                this.loading = false
                this.imageUrl = null
                this.picture = null
                this.link = ''
            },
        }
    }


</script>


<style>

    .main {
        background-color: ghostwhite;
        min-height: 60vh;
        min-width: 40vh;
        text-align: center;
        justify-content: center;
        align-content: center;
        display: flex;
        padding: 60px;
        font-family: 'Lato', sans-serif;
        font-weight: bold;
    }

    .homebutton{
        background-color: hsl(47, 95%, 49%);
        font-family: 'Archivo-Black', sans-serif;
      padding-left: 0;
    }

    .closeIcon {
        align:right;
        float: right;
    }
    .closeIcon:hover {
        cursor:pointer;
        background-color: lightskyblue;
    }

    .imagePreview {
        width: 300px;
        min-height: 100px;
        padding: 5px;
        margin: 15px;
        align-items: center;
        justify-items: center;
        display: flex;
        color: #cccccc;
    }


</style>
