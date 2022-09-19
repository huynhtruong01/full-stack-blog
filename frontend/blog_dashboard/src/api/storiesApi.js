import axiosClient from './axiosClient'

const storiesApi = {
    getAll(params) {
        const url = '/stories'
        return axiosClient.get(url, { params })
    },
    search(params) {
        const url = '/stories/search'
        return axiosClient.get(url, { params })
    },
    getById(id) {
        const url = `/stories/${id}`
        return axiosClient.get(url)
    },
    add(data) {
        const url = '/stories'
        return axiosClient.post(url, data)
    },
    update(data) {
        const url = `/stories/${data._id}`
        return axiosClient.put(url, data)
    },
    remove(id) {
        const url = `/stories/${id}`
        return axiosClient.delete(url)
    },
}

export default storiesApi
