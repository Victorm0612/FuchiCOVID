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
Vue.use(VueJwtDecode)

Vue.component('LazyYoutubeVideo', LazyYoutubeVideo)

Vue.use(VueAxios, axios)
Vue.use(VueCookies)

axios.defaults.baseURL = 'http://localhost:3000/';
Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')