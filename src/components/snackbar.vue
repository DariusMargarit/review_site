<template>
    <v-main>
        <v-snackbar v-model="snackbar"
                    :timeout="4000"
                    :multi-line="true"
                    bottom right
                    :color="error.color"
                    class="snack">
            <span style="font-size: 1rem">
                <i>
                    <v-icon size="28" class="mr-4">
                        {{ error.icon }}
                    </v-icon>
                </i>
                {{ error.text }}
            </span>
            <v-btn text temporary dark @click="snackbar = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-snackbar>
    </v-main>
</template>

<script>
    export default {
        name: "snackbar.vue",
        data () {
            return {
                snackbar: false
            }
        },
        watch: {
            error (value) {
                if(value !== null && value !== undefined)
                    this.snackbar = true
            }
        },
        computed: {
            error () {
                return this.$store.getters.error
            },
        }
    }
</script>

<style scoped>
    .snack{
        font-family: 'Lato', sans-serif;
        font-weight: bold;
        display: flex;
    }
</style>
