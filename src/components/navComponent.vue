<template>
  <div id="nav-bar" class="mx-auto overflow-hidden">       
    <v-app-bar color="transparent" flat dark fixed> 
      <router-link to="/">
        <img width="200" height="100" :src="require('@/assets/Logo.png')" />
      </router-link>
      <v-spacer></v-spacer>
      <v-menu  transition="slide-y-transition" offset-y full-width max-width="500" center v-if="isMobile">
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" v-on="on"></v-app-bar-nav-icon>    
        </template>
        <v-list>
          <v-list-item-group active-class="cyan--text text--accent-4">
          <v-list-item to="/">
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>
          <v-list-item to="/covid">
            <v-list-item-title>Covid19</v-list-item-title>
          </v-list-item>
          <v-list-item to="/login">
            <v-list-item-title>Iniciar Sesión</v-list-item-title>
          </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-btn v-if="!isMobile" text :ripple="false" id="menu" to="/">Inicio</v-btn>
      <v-btn v-if="!isMobile" text :ripple="false" id="menu" to="/covid">Covid19</v-btn>
      <v-btn
        icon
        :ripple="false"
        v-ripple="{ class: 'transparent--text' }"
        id="menu"
        v-if="!isMobile"
        to="/login"
      >
        <v-icon>fas fa-user</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavComponent",
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },
};
</script>

<style scoped>
#menu {
  color: #ffff;
  margin-left: 2rem;
  margin-right: 1rem;
  background: transparent;
  text-shadow: 1px 2px 2px black;
}
#menu::before {
  background-color: transparent !important;
}
</style>