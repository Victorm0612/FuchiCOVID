<template>
  <v-app>
    <div id="app">
      <nav-bar id="navbar" class="mb-10"></nav-bar>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/navComponent.vue";

export default {
  name: "App",
  components: {
    NavBar
  },
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

</style>
