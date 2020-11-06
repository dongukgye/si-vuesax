import httpClient from './core/httpClient'

class AuthService {
    login(user) {
        const params = {
            path: '/auth/token-auth',
            method: 'post',
            payload: user
        }
        return httpClient.request(params)
    }

    logout() {
        localStorage.removeItem('accessToken')
    }
}

export default new AuthService()