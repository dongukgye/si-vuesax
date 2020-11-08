import axios from 'axios'
import httpClient from '@/services/core/httpClient'

const BASE_URL = process.env.VUE_APP_API_BASE_URL + '/inventory'

class InventoryDataService {
    getPartList(params) {
        const requestConfig = {
            path: '/inventory/parts/',
            method: 'get',
            payload: params

        }
        return httpClient.request(requestConfig)
    }

    createPart(data) {
        return axios.post(BASE_URL + '/parts/', data)
    }

    updatePart(data) {
        return axios.put(BASE_URL + `/part/${data.id}/`, data)
    }

    deletePart(data) {
        return axios.delete(BASE_URL + `/part/${data.id}/`)
    }

    getCategoryList() {
        return axios.get(BASE_URL + '/categories/')
    }

    createCategory(data) {
        return axios.post(BASE_URL + '/categories/', data)
    }

    updateCategory(data) {
        return axios.put(BASE_URL + `/category/${data.id}/`, data)
    }

    deleteCategory(data) {
        return axios.delete(BASE_URL + `/category/${data.id}/`)
    }

    getProductList() {
        return axios.get(BASE_URL + '/products/')
    }

    createProduct(data) {
        return axios.post(BASE_URL + '/products/', data)
    }

    updateProduct(data) {
        return axios.put(BASE_URL + `/product/${data.id}/`, data)
    }

    deleteProduct(data) {
        return axios.delete(BASE_URL + `/product/${data.id}/`)
    }

    addPartByFile(data) {
        return axios.put(BASE_URL + `/parts/bulk/`, data)
    }

    addProductByFile(data) {
        return axios.put(BASE_URL + `/products/bulk/`, data)
    }

}

export default new InventoryDataService()