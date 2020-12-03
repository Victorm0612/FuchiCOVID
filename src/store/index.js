import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showAdminMenu: false,
        moduleTitle: "Panel de control",
        user: JSON.parse(localStorage.getItem('user')) || {
            id_user: null,
            name: null,
            email: null,
            token: null,
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
        },
        showAdminMenu(state) {
            return state.showAdminMenu
        },
        moduleTitle(state) {
            return state.moduleTitle
        },
    },
    mutations: {
        setShowAdminMenu(state, value) {
            state.showAdminMenu = value
        },
        setModuleTitle(state, title) {
            state.moduleTitle = title
        },
        destroyToken(state) {
            state.user = {
                id_user: null,
                name: null,
                email: null,
                token: null,
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
                            localStorage.removeItem('center')
                            context.commit('destroyToken')
                            context.commit('setModuleTitle', 'Panel de control')
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
                            name: null,
                            email: null,
                            token: res.data.token,
                            refreshToken: res.data.refreshToken,
                            type_user: res.data.type
                        }
                        context.commit('assignDataUser', user)
                        context.dispatch('getDataUser')
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        getDataUser(context) {
            if (context.getters.retrieveUser.type_user == 1) {
                axios
                    .get("funcionario/" + context.getters.retrieveUser.id_user, {
                        headers: {
                            'Authorization': 'Token ' + context.getters.retrieveUser.token
                        }
                    })
                    .then((response) => {
                        console.log(response)
                        context.commit('assignDataUser', {
                            id_user: context.getters.retrieveUser.id_user,
                            name: response.data[0].nombre_funcionario,
                            email: response.data[0].email,
                            token: context.getters.retrieveUser.token,
                            refreshToken: context.getters.retrieveUser.refreshToken,
                            type_user: context.getters.retrieveUser.type_user
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else if (context.getters.retrieveUser.type_user == 2) {
                axios
                    .get("profesional/" + context.getters.retrieveUser.id_user, {
                        headers: {
                            'Authorization': 'Token ' + context.getters.retrieveUser.token
                        }
                    })
                    .then((response) => {
                        console.log(response)
                        context.commit('assignDataUser', {
                            id_user: context.getters.retrieveUser.id_user,
                            name: response.data[0].nombre_profesional,
                            email: response.data[0].email,
                            token: context.getters.retrieveUser.token,
                            refreshToken: context.getters.retrieveUser.refreshToken,
                            type_user: context.getters.retrieveUser.type_user
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        checkIfAdmin({
            commit
        }) {
            return (window.location.href.indexOf("dashboard") > -1) ? commit('setShowAdminMenu', true) :
                commit('setShowAdminMenu', false);
        }
    },
    modules: {}
})