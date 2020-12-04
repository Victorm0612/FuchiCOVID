import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from "./plugins/vuetify";
import 'vue-lazy-youtube-video/dist/style.css'
import LazyYoutubeVideo from 'vue-lazy-youtube-video'
import VueCookies from 'vue-cookies'
import VueJwtDecode from 'vue-jwt-decode';
import VueGeolocation from 'vue-browser-geolocation';
import * as VueGoogleMaps from 'vue2-google-maps';
import VCalendar from 'v-calendar';

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
    componentPrefix: 'vc', // Use <vc-calendar /> instead of <v-calendar />
    // ...other defaults
});


Vue.use(VueJwtDecode)
Vue.use(VueGeolocation)
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyB8NHGLW64s2kr7Ql0FSWA42aTFnOF03HU'
    }
})

Vue.component('LazyYoutubeVideo', LazyYoutubeVideo)

Vue.use(VueAxios, axios)
Vue.use(VueCookies)

axios.defaults.baseURL = 'https://testerfuchi.herokuapp.com/';
Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')