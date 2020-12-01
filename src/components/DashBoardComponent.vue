<template>
  <div id="dashboard" class="pt-3 overflow-hidden">
    <v-navigation-drawer id="drawer" permanent expand-on-hover>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title"> {{ name }} </v-list-item-title>
            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
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
            @click="moveToRoute(link.route)"
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
        { text: "Registro Profesional", route: "Home", requireType: [1] },
        { text: "Registro Paciente", route: "Covid", requireType: [1] },
        { text: "Profesionales", route: "DashBoard", requireType: [1] },
        { text: "Pacientes", route: "DashBoard", requireType: [1, 2] },
        { text: "Visitas", route: "DashBoard", requireType: [2] },
        { text: "Medicamentos", route: "DashBoard", requireType: [2] },
        { text: "Mapa Contagios", route: "DashBoard", requireType: [1, 2] },
        { text: "Reportes", route: "DashBoard", requireType: [1, 2] },
      ],
    };
  },
  created() {
    this.getDataUser();
  },
  updated() {
    this.getDataUser();
  },
  methods: {
    getDataUser() {
      if (this.retrieveTypeUser == 1) {
        axios
          .get("funcionario/" + this.retrieveIdUser)
          .then((response) => {
            this.name = response.data[0].nombre_funcionario;
            this.email = response.data[0].email;
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
  },
};
</script>

<style scoped>
#dashboard {
  height: 100vh;
  background-image: linear-gradient(
      to bottom,
      rgba(2, 5, 22, 0.52),
      rgba(0, 0, 0, 0.3)
    ),
    url("../assets/familia.jpg");
  background-size: cover;
}
#drawer {
  position: fixed;
}
</style>