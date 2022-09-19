import axiosClient from './axiosClient'

const blogsApi = {
    getAll(params) {
        const url = '/blogs'
        return axiosClient.get(url, { params })
    },
    getById(id) {
        const url = `/blogs/${id}`
        return axiosClient.get(url)
    },
    search(params) {
        const url = '/blogs/search'
        return axiosClient.get(url, { params })
    },
    getByUser(data) {
        const url = `/blogs/by-user`
        return axiosClient.post(url, data)
    },
    getByCategory(data) {
        const url = `/blogs/by-category`
        return axiosClient.post(url, data)
    },
    add(data) {
        const url = '/blogs'
        return axiosClient.post(url, data)
    },
    update(data) {
        const url = `/blogs/${data._id}`
        return axiosClient.put(url, data)
    },
    remove(id) {
        const url = `/blogs/${id}`
        return axiosClient.delete(url)
    },
    like(data) {
        const url = '/blogs/like-blog'
        return axiosClient.post(url, data)
    },
    unlike(data) {
        const url = '/blogs/unlike-blog'
        return axiosClient.post(url, data)
    },
    save(data) {
        const url = '/blogs/save-blog'
        return axiosClient.post(url, data)
    },
    unsave(data) {
        const url = '/blogs/unsave-blog'
        return axiosClient.post(url, data)
    },
    getAllSave(params) {
        const url = '/blogs/get-all-save'
        return axiosClient.get(url, { params })
    },
}

export default blogsApi
