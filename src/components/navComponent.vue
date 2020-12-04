<template>
  <div id="nav-bar" class="mx-auto overflow-hidden">       
    <v-app-bar flat dark fixed> 
      <router-link to="/">
        <img class="pt-2" width="200" height="100" :src="require('@/assets/logo.png')" />
      </router-link>
      <v-spacer></v-spacer>
      <v-avatar v-if="isloggedIn" color="primary" size="40">
        <span class="white--text headline">{{retrieveName}}</span>
      </v-avatar>
      <v-btn v-if="!isMobile && !isloggedIn" text :ripple="false" id="menu" to="/">Inicio</v-btn>
      <v-btn v-if="!isMobile && !isloggedIn" text :ripple="false" id="menu" to="/covid">Covid19</v-btn>
      <v-btn icon :ripple="false" v-ripple="{ class: 'transparent--text' }" id="menu" v-if="!isMobile && !isloggedIn" to="/login">
        <v-icon>fas fa-user</v-icon>
      </v-btn>
      <v-btn v-if="isloggedIn && !isMobile" text :ripple="false" id="menu" to="/logout">
        <v-icon>fas fa-sign-out-alt</v-icon>
      </v-btn>
      <v-menu transition="slide-y-transition" offset-y full-width max-width="500" center v-if="isMobile || isloggedIn">
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" v-on="on"></v-app-bar-nav-icon>    
        </template>
        <v-list>
          <v-list-item-group active-class="cyan--text text--accent-4">
            <v-list-item v-for="link in link_user" v-show="link.requireType.includes(retrieveTypeUser)" :key="link.text" @click="moveToRoute(link.route)">
              <v-list-item-title class="text-capitalize">{{link.text}}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavComponent",
  data() {
    return {
      link_user: [
      {text: 'Inicio', route: 'Home', requireType: [1,2]},
      {text: 'Covid19', route: 'Covid', requireType: [1,2]},
      {text: 'Dasboard', route: 'DashBoard', requireType:[1,2]},
      {text: 'Cerrar Sesión', route: 'Logout', requireType: [1,2]}
      ]
    };
  },
  created() {
    this.timeToExp();
  },
  updated() {
    this.timeToExp();
  },
  methods: {
    moveToRoute: function(route) {
      if (this.$router.currentRoute.name !== route) {
        this.$router.push({ name: route });
      }else{
        this.drawer = false;
      }
    },
    timeToExp(){
      if(this.loggedIn){
        let exp = new Date(VueJwtDecode.decode(this.$store.getters.retrieveUser.token).exp * 1000);
        let actual = new Date()
        let totalTime = exp.getTime() - actual.getTime()
        console.log(totalTime)
        setTimeout(() => {this.$router.push({ name: 'Logout' });}, totalTime);
      }
    },
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    isloggedIn(){
      return this.$store.getters.loggedIn;
    },
    retrieveTypeUser(){
      return this.$store.getters.retrieveUser.type_user;
    },
    retrieveName(){
      let arrayName = this.$store.getters.retrieveUser.name.split(" ")
      let initials=" "
      for( let names of arrayName){
        initials +=names.substring(0,1); 
      }
      return initials;
    }
  },
};
</script>

<style scoped>
#menu {
  color: #ffff;
  margin-left: 2rem;
  margin-right: 1rem;
  
  text-shadow: 1px 2px 2px black;
}
#menu::before {
  background-color: transparent !important;
}
</style>