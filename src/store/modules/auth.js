import axios from 'axios'
import AuthService from '@/services/authService'

const token = localStorage.getItem('accessToken')
const userInfo = JSON.parse(localStorage.getItem('userInfo'))

const initialState = token 
    ? { status: { loggedIn: true }, token, userInfo }
    : { status: { loggedIn: false }, token: null, userInfo: null }

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                data => {
                    commit('loginSuccess', data)
                    axios.defaults.headers.common['Authorization'] = 'JWT ' + data.token
                    return Promise.resolve(data.token)
                },
                err => {
                    commit('loginFailure')
                    return Promise.reject(err)
                }
            )
        },

        logout({ commit }) {
            AuthService.logout()
            delete axios.defaults.headers.common['Authorization']
            commit('logout')
        }
    },

    mutations: {
        loginSuccess(state, data) {
            state.token = data.token
            state.userInfo = data.user
            state.status.loggedIn = true 

            localStorage.setItem('accessToken', state.token)
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        },

        loginFailure(state) {
            state.status.loggedIn = false
            state.token = null
        },

        logout(state) {
            state.status.loggedIn = false
            state.token = null
        },

        registerSuccess(state) {
            state.status.loggedIn = false
        },

        registerFailure(state) {
            state.status.loggedIn = false
        }
    }
}