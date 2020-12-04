<template>
  <div>
    <v-row class="d-flex" align="center" justify="center">
      <v-col cols="12" md="12">
        <v-btn color="primary" @click="getReportes(2)"
          >Número de visitas por mes</v-btn
        >
      </v-col>
      <v-col cols="12" md="12">
        <v-btn color="primary" @click="getReportes(1)"
          >Número de visitas por día</v-btn
        >
      </v-col>
      <v-col cols="12" md="12">
        <v-btn color="primary" @click="getReportesBarrio"
          >Contagiados por barrio</v-btn
        >
      </v-col>
      <v-col cols="12" md="12">
        <v-btn color="primary" @click="getReportesEdad"
          >Contagiados por edad</v-btn
        >
      </v-col>
    </v-row>
    <v-dialog v-model="dialogDate" max-width="700px">
      <v-row>
        <v-col>
          <v-date-picker
            mode="single"
            tint-color="#f142f4"
            v-model="fecha"
            is-double-paned
            is-inline
          >
          </v-date-picker>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-btn @click="send" color="primary">Buscar Reporte</v-btn>
        </v-col>
      </v-row>
    </v-dialog>
    <v-dialog v-model="dialogInfo">
      <v-card>
        <v-card-title
          ><pre>{{message}}</pre></v-card-title
        >
        <v-card-text align="start" justify="start">
            <pre>{{result}}</pre>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogError" width="300">
      <v-alert
        style="margin-bottom: 0"
        type="error"
        transition="scale-transition"
      >
        Por favor, seleccione una fecha
      </v-alert>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ReportesComponent",
  data() {
    return {
      message: "",
      result: "",
      dialogError: false,
      type: false,
      dialogInfo: false,
      dialogDate: false,
      barrios: [],
      fecha: "",
    };
  },
  methods: {
    getReportesBarrio() {
      axios
        .get("reportebarrio/", {
          headers: {
            Authorization: "Token " + this.$store.getters.retrieveUser.token,
          },
        })
        .then((response) => {
            this.message='¡Contagios por Barrio!'
            let msg = 'El reporte arrojó los siguientes datos sobre los contagios por barrio: \n';
            for(let barrio of response.data){
                msg += '\nBarrio: '+ barrio.nom_bar+'\nCantidad: '+barrio.num_cont+'\n'
            }
            this.result = msg;
            this.dialogInfo = true;
        });
    },
    getReportesEdad() {
      axios
        .get("reporteedad/", {
          headers: {
            Authorization: "Token " + this.$store.getters.retrieveUser.token,
          },
        })
        .then((response) => {
          this.result = 'El reporte de edad arrojó lo siguiente: \nTotal pacientes actuales: '+response.data[0].totalpacientes+'\nPacientes menores a 20 años: '+response.data[0].pac20+'\nPacientes entre los 20 y los 30 años: '+response.data[0].pac30+'\nPacientes entre los 30 y los 50 años: '+response.data[0].pac50+'\nPacientes mayores a 50 años: '+response.data[0].pac_sup50
          this.dialogInfo = true;
        });
    },
    getReportes(number) {
      this.dialogDate = true;
      this.number = number;
    },
    send() {
      if (this.fecha == "") {
        this.dialogError = true;
      } else if (this.number == 2) {
        this.dialogError = false;
        this.type = true;
        axios
          .post(
            "reportefecha/",
            {
              fecha: this.fecha.substring(0, 7),
              type_req: this.number,
            },
            {
              headers: {
                Authorization:
                  "Token " + this.$store.getters.retrieveUser.token,
              },
            }
          )
          .then((response) => {
            console.log(response.data[0]);
            this.result ='Los resultados del reporte para el mes #'+this.fecha+': ';
            this.message = '\nLa cantidad visitas para este mes fueron: '+response.data[0].promcontmes;
            this.dialogDate = false;
            this.dialogInfo = true;
            console.log(this.result);
          });
      } else if (this.number == 1) {
        this.type = false;
        axios
          .post(
            "reportefecha/",
            {
              fecha: this.fecha,
              type_req: this.number,
            },
            {
              headers: {
                Authorization:
                  "Token " + this.$store.getters.retrieveUser.token,
              },
            }
          )
          .then((response) => {
            console.log(response.data[0]);
            this.message ='Los resultados del reporte para el día #'+this.fecha+': ';
            this.result = '\nLa cantidad visitas para este día fueron: '+response.data[0].promcontdia;
            console.log(this.result);
            this.dialogDate = false;
            this.dialogInfo = true;
          });
      }
    },
  },
};
</script>
<style lang="sass" scoped>
</style>