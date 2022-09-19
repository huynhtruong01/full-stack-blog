import axiosClient from './axiosClient'

const usersApi = {
    getAll(params) {
        const url = '/users'
        return axiosClient.get(url, { params })
    },
    search(params) {
        const url = '/users/search'
        return axiosClient.get(url, { params })
    },
    getById(id) {
        const url = `/users/${id}`
        return axiosClient.get(url)
    },
    add(data) {
        const url = '/users'
        return axiosClient.post(url, data)
    },
    update(data) {
        const url = `/users/${data._id}`
        return axiosClient.put(url, data)
    },
    remove(id) {
        const url = `/users/${id}`
        return axiosClient.delete(url)
    },
    follow(data) {
        const url = 'users/follow'
        return axiosClient.post(url, data)
    },
    unfollow(data) {
        const url = 'users/unfollow'
        return axiosClient.post(url, data)
    },
    getAllFollower(id, params) {
        const url = `/users/get-all-follower/${id}`
        return axiosClient.get(url, { params })
    },
    getAllFollowing(id, params) {
        const url = `/users/get-all-following/${id}`
        return axiosClient.get(url, { params })
    },
}

export default usersApi
