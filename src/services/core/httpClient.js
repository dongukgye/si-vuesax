import axios from 'axios'

class HttpClient {
    baseURL = process.env.VUE_APP_API_BASE_URL

    request(params) {
        return new Promise((resolve, reject) => {
            const axiosConfig = {
                url: this.baseURL + params.path,
                method: params.method,
                data: params.payload
            }
            
            axios.request(axiosConfig)
                .then(resp => {
                    resolve(resp.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

export default new HttpClient()