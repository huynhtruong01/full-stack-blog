import axiosClient from './axiosClient'

const rolesApi = {
    getAll(params) {
        const url = '/roles'
        return axiosClient.get(url, { params })
    },
    search(params) {
        const url = '/roles/search'
        return axiosClient.get(url, { params })
    },
    getById(id) {
        const url = `/roles/${id}`
        return axiosClient.get(url)
    },
    add(data) {
        const url = '/roles'
        return axiosClient.post(url, data)
    },
    update(data) {
        const url = `/roles/${data._id}`
        return axiosClient.put(url, data)
    },
    remove(id) {
        const url = `/roles/${id}`
        return axiosClient.delete(url)
    },
}

export default rolesApi
