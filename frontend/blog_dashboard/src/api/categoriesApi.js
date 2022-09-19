import axiosClient from './axiosClient'

const categoriesApi = {
    getAll(params) {
        const url = '/categories'
        return axiosClient.get(url, { params })
    },
    search(params) {
        const url = '/categories/search'
        return axiosClient.get(url, { params })
    },
    getById(id) {
        const url = `/categories/${id}`
        return axiosClient.get(url)
    },
    add(data) {
        const url = '/categories'
        return axiosClient.post(url, data)
    },
    update(data) {
        const url = `/categories/${data._id}`
        return axiosClient.put(url, data)
    },
    remove(id) {
        const url = `/categories/${id}`
        return axiosClient.delete(url)
    },
}

export default categoriesApi
