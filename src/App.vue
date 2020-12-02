<template>
  <v-app>
    <div id="app">
      <nav-bar id="navbar"></nav-bar>

      <v-layout row wrap>
        <v-flex d-flex>
          <dash-board-component v-if="false || isAdmin"></dash-board-component>
          <v-main>
            <router-view/>
          </v-main>
        </v-flex>
      </v-layout>
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/navComponent.vue";
import DashBoardComponent from "@/components/DashBoardComponent.vue";

export default {
  name: "App",
  components: {
    NavBar,
    DashBoardComponent
  },
  async mounted() {
    await this.$store.dispatch("checkIfAdmin");
  },
  async updated() {
    await this.$store.dispatch("checkIfAdmin");
  },
  computed: {
    isAdmin() {
      return this.$store.getters.showAdminMenu;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: black;
  
}
#navbar {
  margin-bottom: 3rem;
}
</style>
