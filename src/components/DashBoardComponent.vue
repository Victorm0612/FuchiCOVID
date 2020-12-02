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
        { text: "Perfil", route: "Profile", requireType:[1,2]},
        { text: "Registro de Profesionales", route: "RegisterPro", requireType: [1] },
        { text: "Registro Paciente", route: "Covid", requireType: [1] },
        { text: "Profesionales", route: "Profesionales", requireType: [1] },
        { text: "Pacientes", route: "DashBoard", requireType: [1, 2] },
        { text: "Visitas", route: "DashBoard", requireType: [2] },
        { text: "Medicamentos", route: "DashBoard", requireType: [2] },
        { text: "Mapa Contagios", route: "DashBoard", requireType: [1, 2] },
        { text: "Reportes", route: "DashBoard", requireType: [1, 2] },
      ],
    };
  },
  watch:{
    changeData(){
      this.getDataUser()
    }
  },
  created() {
    this.getDataUser();
  },
  methods: {
    changeComponent(listTitle) {
      this.$store.commit('setModuleTitle', listTitle);
    },
    getDataUser() {
      if (this.retrieveTypeUser == 1) {
        axios
          .get("funcionario/" + this.retrieveIdUser)
          .then((response) => {
            this.name = response.data[0].nombre_funcionario;
            this.email = response.data[0].email;
            this.$store.commit('assignDataUser',{
              id_user: this.retrieveIdUser,
                name: response.data[0].nombre_funcionario,
                email: response.data[0].email,
                refreshToken: this.$store.getters.retrieveUser.refreshToken,
                type_user: this.retrieveTypeUser
            })
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.retrieveTypeUser == 2) {
        axios
          .get("profesional/" + this.retrieveIdUser)
          .then((response) => {
            this.name = response.data[0].nombre_profesional;
            this.email = response.data[0].email;
          })
          .catch((error) => {
            console.log(error);
          });
      }
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