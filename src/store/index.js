import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || {
            id_user: null,
            refreshToken: null,
            type_user: null
        },
    },
    getters: {
        loggedIn(state) {
            return state.user.refreshToken !== null
        },
        retrieveUser(state) {
            return state.user
        }
    },
    mutations: {
        destroyToken(state) {
            state.user = {
                id_user: null,
                refreshToken: null,
                type_user: null
            }
        },
        assignDataUser(state, user) {
            localStorage.setItem('user', JSON.stringify(user))
            state.user = user
        }
    },
    actions: {
        destroyToken(context) {
            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    axios.post('logout/', {
                            refreshToken: context.getters.retrieveUser.refreshToken
                        })
                        .then(res => {
                            localStorage.removeItem('user')
                            context.commit('destroyToken')
                            resolve(res)

                        })
                        .catch((error) => {
                            reject(error)
                        })
                })
            }
        },
        userLogin(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('login/', {
                        email: credentials.email,
                        contrasenia: credentials.contrasenia,
                    })
                    .then(res => {
                        const user = {
                            id_user: res.data.id,
                            refreshToken: res.data.refreshToken,
                            type_user: res.data.type
                        }
                        context.commit('assignDataUser', user)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
    },
    modules: {}
})