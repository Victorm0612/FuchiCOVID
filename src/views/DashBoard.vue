<template>
  <v-container fluid class="mt-3" id="dashboard">
    <div class="pt-5">
    <h1>{{ moduleTitle }}</h1>
    <profile-component v-if="moduleTitle == 'Perfil'"></profile-component>
    <register-pro-component v-if="moduleTitle == 'Registro de Profesionales'"></register-pro-component>
    <profesionales-component v-if="moduleTitle == 'Profesionales'"></profesionales-component>
    <register-pacient-component v-if="moduleTitle == 'Registro de Pacientes'"></register-pacient-component>
    <pacientes-component v-if="moduleTitle == 'Pacientes'"></pacientes-component>
    <mapa-component v-if="moduleTitle == 'Mapa de Contagios'"></mapa-component>
    <register-visit-component v-if="moduleTitle == 'Registar Vista'"></register-visit-component>
    <visits-component v-if="moduleTitle == 'Visitas'"></visits-component>
    <medicamentos-component v-if="moduleTitle == 'Medicamentos'"></medicamentos-component>
    <v-row class="pt-3">
      <v-col cols="12" md="4">
        <registrations-card-component
          v-if="moduleTitle == 'Panel de control'"
        ></registrations-card-component>
      </v-col>
      <v-col cols="12" md="4">
        <requests-card-component
          v-if="moduleTitle == 'Panel de control'"
        ></requests-card-component>
      </v-col>
      <v-col cols="12" md="4">
        <quotation-card-component
          v-if="moduleTitle == 'Panel de control'"
        ></quotation-card-component>
      </v-col>
    </v-row>
    <v-row class="custom4cols">
      <v-col cols="12" md="4" xs="12">
        <cancel-card-component
          v-if="moduleTitle == 'Panel de control'"
        ></cancel-card-component>
      </v-col>
    </v-row>
    </div>
  </v-container>
</template>

<script>

import ProfileComponent from "@/components/ProfileComponent.vue";
import RegisterProComponent from "@/components/RegisterProComponent.vue";
import ProfesionalesComponent from "@/components/ProfesionalesComponent.vue";
import PacientesComponent from "@/components/PacientesComponent.vue";
import RegisterPacientComponent from "@/components/RegisterPacientComponent.vue";
import RegisterVisitComponent from "@/components/RegisterVisitComponent.vue";
import VisitsComponent from '../components/VisitsComponent.vue';
import MapaComponent from "@/components/MapaComponent.vue";

import RegistrationsCardComponent from "@/components/dashboard-components/RegistrationsCardComponent.vue";
import RequestsCardComponent from "@/components/dashboard-components/RequestsCardComponent.vue";
import QuotationCardComponent from "@/components/dashboard-components/QuotationCardComponent.vue";
import CancelCardComponent from "@/components/dashboard-components/CancelCardComponent.vue";
import MedicamentosComponent from '../components/medicamentosComponent.vue';


    export default {
        name: 'DashBoard',
        components:{
            ProfileComponent,
            RegisterProComponent,
            ProfesionalesComponent,
            PacientesComponent,
            RegisterPacientComponent,
            RegisterVisitComponent,
            MapaComponent,
            VisitsComponent,

            RegistrationsCardComponent,
            RequestsCardComponent,
            QuotationCardComponent,
            CancelCardComponent,
                MedicamentosComponent,
 
        },
  computed: {
    moduleTitle() {
      return this.$store.state.moduleTitle;
    }
  }
    }
</script>

<style scoped>
#dashboard {
    
  height: 125vh;
  background-image: linear-gradient(
      to bottom,
      rgba(2, 5, 22, 0.52),
      rgba(0, 0, 0, 0.3)
    ),
    url("../assets/familia.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-repeat: repeat-y;
}
h1 {
  padding-bottom: 20px;
  color: white;
  text-shadow: 1px 4px 5px black;
}

.custom4cols {
  width: 76.5% !important;
  max-width: 76.5% !important;
  flex-basis: 76.5% !important;
  flex-wrap: unset !important;
}
</style>