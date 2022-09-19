import axiosClient from './axiosClient'

export const usersApi = {
    getById(id: string) {
        const url = `/users/${id}`
        return axiosClient.get(url)
    },
    update(data: any) {
        const url = `/users/${data?._id}`
        return axiosClient.put(url, data)
    },
    addWebsiteUrl(data: { _id: string; websiteUrl: string }) {
        const url = `/users/add-website-url/${data._id}`
        return axiosClient.put(url, data)
    },
    removeWebsiteUrl(data: { _id: string; websiteUrl: string }) {
        const url = `/users/delete-website-url/${data?._id}`
        return axiosClient.put(url, data)
    },
    follow(data: { id: string; userId: string }) {
        const url = '/users/follow'
        return axiosClient.post(url, data)
    },
    unfollow(data: { id: string; userId: string }) {
        const url = '/users/unfollow'
        return axiosClient.post(url, data)
    },
}
