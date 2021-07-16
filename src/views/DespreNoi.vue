<template>

  <v-main class="font">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet">

    <v-container style="margin-top: 4%;" class="containers container-main">
      <v-row style="flex-basis: 31%;">
        <v-col align-self="center" cols="12" sm="6">
          <h1>Care este scopul site-ului nostru?</h1>
          <p style="font-family: 'Lato', sans-serif; font-weight: bold;">
            De la inceputul pandemiei de covid-19, viata fiecaruia dintre noi s-a schimbat radical.
            Odata cu implementarea masurilor de siguranta, cu totii am inceput sa facem cumparaturi online mai des.
            Astfel, consideram ca este benefica existenta unui spatiu virtual unde oricine poate lasa sau gasi o recenzie.
          </p>
        </v-col>
        <v-col align-self="center">
          <img src="../assets/team-meeting-illustration.png" style="width: 90%; height: 90%;" />
        </v-col>
      </v-row>
    </v-container>

    <div style="padding:20px" class="separator"><v-icon>mdi-chevron-triple-right</v-icon></div>

    <v-container class="containers">
      <v-row style="flex-basis: 31%">
        <v-col align-self="center">
          <h1 class="font">Cine sunt membrii echipei?</h1>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="grad containers">
      <v-row style="flex-basis: 31%;">
        <v-col style="align-items: center; justify-content: center; display: flex;" >
          <v-card class="card">
            <v-card-text class="card_text">
              <div align="center" style="padding:15px;font-weight:800; font-size: 34px;" class="font">
                <span class="font" style="padding:15px; font-weight:800; font-size: 34px;">- Darius -</span>
              </div>
              <br />
              <div align="center">
                <v-avatar size="130" style="">
                  <img src="../assets/darius.jpg" />
                </v-avatar>
              </div>
              <br />
              <div>
                <span class="font" style="padding-bottom:15px; font-size: 17px; align-content:center; display: flex;">Trei cuvinte prin care colegii de echipă l-au descris: </span>
                <ul style="list-style-position: inside; list-style-type: square">
                  <li>ambițios</li>
                  <li>bun lider</li>
                  <li>foarte muncitor</li>
                </ul>
              </div>
              <br />
              <div>
                <h3>Fun fact: știe să se dea bine cu patinele</h3>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col style="align-items: center; justify-content: center; display: flex;" >
          <v-card class="card">
            <v-card-text class="card_text">
              <div align="center" style="padding:15px;font-weight:800; font-size: 34px;" class="font">
                <span class="font" style="padding:15px;font-weight:800; font-size: 34px;">- Iulian -</span>
              </div>
              <br />
              <div align="center">
                <v-avatar size="130" style="">
                  <img src="../assets/iulian.jpeg" class />
                </v-avatar>
              </div>
              <br />
              <div>
                <span class="font" style="padding-bottom:15px;font-weight: 200; font-size: 17px; align-content:center; display: flex;">Trei cuvinte prin care colegii de echipă l-au descris: </span>
                <ul style="list-style-position: inside; list-style-type: square">
                  <li>harnic</li>
                  <li>respectuos</li>
                  <li>inteligent</li>
                </ul>
              </div>
              <br />
              <div>
                <h3 >Fun fact: știe să facă scheme cu bicicleta</h3>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col style="align-items: center; justify-content: center; display: flex;" >
          <v-card class="card">
            <v-card-text class="card_text">
              <div align="center" style="padding:15px;font-weight:800; font-size: 34px;" class="font">
                <span class="font" style=" padding:15px;font-weight:800; font-size: 34px;">- Robert -</span>
              </div>
              <br />
              <div align="center">
                <v-avatar size="130" style="">
                  <img src="../assets/robert.jpg" />
                </v-avatar>
              </div>
              <br />
              <div>
                <span class="font" style="padding-bottom:15px;font-weight: 200; font-size: 17px; align-content:center; display: flex;">Trei cuvinte prin care colegii de echipă l-au descris: </span>
                <ul style="list-style-position: inside; list-style-type: square">
                  <li>deștept</li>
                  <li>atent</li>
                  <li>meticulos</li>
                </ul>
              </div>
              <br />
              <div>
                <h3>Fun fact: îi place să schieze</h3>
              </div>
              <br />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col style="align-items: center; justify-content: center; display: flex;" >
          <v-card class="card">
            <v-card-text class="card_text">
              <div align="center" style="padding:15px;font-weight:800; font-size: 34px;" class="font">
                <span class="font" style="padding:15px;font-weight:800; font-size: 34px;">- Patri -</span>
              </div>
              <br />
              <div align="center">
                <v-avatar size="130" style="">
                  <img src="../assets/patri.jpg" />
                </v-avatar>
              </div>
              <br />
              <div>
                <span class="font" style="padding-bottom:15px; font-weight: 200; font-size: 17px; align-content:center; display: flex;">Trei cuvinte prin care colegii de echipă au descris-o: </span>
                <ul style="list-style-position: inside; list-style-type: square">
                  <li>perfecționistă</li>
                  <li>motivată</li>
                  <li>creativă</li>
                </ul>
              </div>
              <br />
              <div>
                <h3>Fun fact: știe să cânte la ukulele</h3>
              </div>
              <br />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </v-main>

</template>

<script>

  export default {

    data() {
      return {
        coechipieri: [
          {  nume: 'Darius', poza: 'darius.jpg', atr1: 'ambitios', atr2: 'bun lider', atr3: 'muncitor', fact: 'știe să se dea bine cu patinele' },
          {  nume: 'Iulian', poza: 'iulian.jpeg', atr1: 'harnic', atr2: 'respectuos', atr3: 'inteligent', fact: 'știe să facă scheme cu bicicleta' },
          {  nume: 'Robert', poza: 'robert.jpg', atr1: 'destept', atr2: 'atent', atr3: 'meticulos', fact: 'îi place să schieze' },
          { nume: 'Patri', poza: 'patri.jpg', atr1: 'perfectionista', atr2: 'motivata', atr3: 'creativa', fact: 'știe să cânte la ukulele' }
        ]
      }
  },

    components: {

    },
    created() {
      window.scrollTo(0,0)
    },

  }
</script>

<style>

@media screen and (max-width: 1264px) {
  .container-main {
    margin-top: 10rem !important;
  }

  .card {
    margin: 5rem;
    height: 75vh;
    width: 20rem !important;
    padding: 2rem;
  }

}

  .font {
    margin-top: 1rem;
    font-family: 'Archivo Black', sans-serif;
  }
  .grad {
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(0,204,255,0.05) 23%, rgba(0,204,255,0.1) 100%);
    width: 100%;
  }

  .separator {
    display: flex;
    align-items: center;
    text-align: center;
    font-family: 'Arvo', serif;
  }
  .separator::before,
  .separator::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e0eaf5;
  }
  .separator:not(:empty)::before {
    margin-right: .25em;
  }
  .separator:not(:empty)::after {
    margin-left: .25em;
  }

  .containers {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .card_text{
    text-align: center;
    margin-top: 0;
  }

  .card {
    margin: 5rem;
    height: 75vh;
    width: 30rem;
    padding: 2rem;
  }

</style>
