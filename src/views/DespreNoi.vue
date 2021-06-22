<template>

  <v-main class="font">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet">

    <v-container style="margin-top: 4%;" class="containers">
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
        <v-col align-self="center" cols="12" sm="6">
            <v-card class="card">
              <v-card-text class="card_text">
                <span class="font" style="padding:15px; font-weight:800; font-size: 34px;">- Darius -</span>
                <br /><br />
                <v-avatar size="130" style="">
                  <img src="../assets/darius.jpg" />
                </v-avatar>
                <br /><br />
                <span class="font" style="padding-bottom:15px; font-size: 17px; justify-content: center; align-content:center; display: flex;">Trei cuvinte prin care colegii de echipă l-au descris: </span>
                <ul style="list-style-position: inside; list-style-type: square">
                  <li>ambițios</li>
                  <li>bun lider</li>
                  <li>foarte muncitor</li>
                </ul>
                <br />
                <h3>Fun fact: știe să se dea bine cu patinele</h3>
              </v-card-text>
            </v-card>
        </v-col>
        <v-col align-self="center">
          <v-card class="card">
            <v-card-text class="card_text">
              <span class="font" style="padding:15px;font-weight:800; font-size: 34px;">- Patri -</span>
              <br /><br />
              <v-avatar size="130" style="">
                <img src="../assets/patri.jpg" />
              </v-avatar>
              <br /><br />
              <p class="font" style="padding-bottom:15px; font-weight: 200; font-size: 17px; justify-content: center; align-content:center; text-align: center; display: flex;">Trei cuvinte prin care colegii de echipă au descris-o: </p>
              <ul style="list-style-position: inside; list-style-type: square">
                <li>perfecționistă</li>
                <li>motivată</li>
                <li>creativă</li>
              </ul>
              <br />
              <h3>Fun fact: știe să cânte la ukulele</h3>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </v-main>

</template>

<script>

  export default {
    components: {

    }
  }
</script>

<style>
  .font {
    margin-top: 5rem;
    font-family: 'Archivo Black', sans-serif;
  }
  .grad {
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(0,204,255,0.05) 23%, rgba(0,204,255,0.1) 100%);
  }
  /*.container {*/
  /*  display:flex;*/
  /*  align-content: center;*/
  /*  justify-content: center;*/
  /*  font-family: 'Archivo Black', sans-serif;*/
  /*}*/
  .card {
    /*width: 60%;*/
    /*padding: 5%;*/
    /*margin: 5%;*/
  }

  /*.title {*/
  /*  margin-bottom: 15px;*/
  /*  font-size: 200px;*/
  /*  font-weight: 800;*/
  /*  padding: 25px 15px;*/
  /*  font-family: 'Archivo Black', sans-serif;*/
  /*  position: center;*/
  /*}*/
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
    align-content: center;
    justify-content: center;
    text-align: center;
  }

  .card_text{
    text-align: center;
  }
</style>
