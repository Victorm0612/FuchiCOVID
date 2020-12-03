<template>
  <div id="dashboard" class="pt-3 overflow-hidden">
    <v-navigation-drawer id="drawer" permanent expand-on-hover>
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title"> {{retrieveName}} </v-list-item-title>
            <v-list-item-subtitle>{{ retrieveEmail }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item-group active-class="cyan--text text--accent-4">
          <v-list-item
            v-for="link in link_user"
            v-show="link.requireType.includes(retrieveTypeUser)"
            :key="link.text"
            @click="changeComponent(link.text)"
          >
            <v-list-item-title class="text-capitalize">{{
              link.text
            }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DashBoard",
  data() {
    return {
      name: "",
      email: "",
      link_user: [
        { text: "Panel de control", route: "Dashboard", requireType: [1,2]},
        { text: "Perfil", route: "Profile", requireType:[1,2]},
        { text: "Registro de Profesionales", route: "RegisterPro", requireType: [1] },
        { text: "Registro de Pacientes", route: "RegisterPacient", requireType: [1] },
        { text: "Profesionales", route: "Profesionales", requireType: [1] },
        { text: "Pacientes", route: "Pacientes", requireType: [1, 2] },
        { text: "Visitas", route: "DashBoard", requireType: [2] },
        { text: "Medicamentos", route: "DashBoard", requireType: [2] },
        { text: "Mapa de Contagios", route: "MapaComponent", requireType: [1, 2] },
        { text: "Reportes", route: "DashBoard", requireType: [1, 2] },
      ],
    };
  },
  methods: {
    changeComponent(listTitle) {
      this.$store.commit('setModuleTitle', listTitle);
    },
  },
  computed: {
    isloggedIn() {
      return this.$store.getters.loggedIn;
    },
    retrieveTypeUser() {
      return this.$store.getters.retrieveUser.type_user;
    },
    retrieveIdUser() {
      return this.$store.getters.retrieveUser.id_user;
    },
    retrieveName(){
      return this.$store.getters.retrieveUser.name;
    },
    retrieveEmail(){
      return this.$store.getters.retrieveUser.email;
    }
  },
};
</script>

<style scoped>

</style>