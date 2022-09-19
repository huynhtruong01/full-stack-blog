import { BlogData, BlogDataLike } from '@/utils/interface'
import axiosClient from './axiosClient'

export const blogsApi = {
    getAll: <T extends { page: number; limit: number }>(params: T) => {
        const url = '/blogs'
        return axiosClient.get(url, { params })
    },
    getById(id: string) {
        const url = `/blogs/${id}`
        return axiosClient.get(url)
    },
    search: <T extends { page: number; limit: number; search: string }>(params: T) => {
        const url = '/blogs/search'
        return axiosClient.get(url, { params })
    },
    getByUser: <T extends { page?: number; limit: number }>(data: T) => {
        const url = `/blogs/by-user`
        return axiosClient.post(url, data)
    },
    getByCategory: <T extends { page?: number; limit: number }>(data: T) => {
        const url = `/blogs/by-category`
        return axiosClient.post(url, data)
    },
    add(data: BlogData) {
        const url = '/blogs'
        return axiosClient.post(url, data)
    },
    update(data: BlogData) {
        const url = `/blogs/${data?._id}`
        return axiosClient.put(url, data)
    },
    remove(id: string) {
        const url = `/blogs/${id}`
        return axiosClient.delete(url)
    },
    like(data: BlogDataLike) {
        const url = '/blogs/like-blog'
        return axiosClient.post(url, data)
    },
    unlike(data: BlogDataLike) {
        const url = '/blogs/unlike-blog'
        return axiosClient.post(url, data)
    },
    save(data: BlogDataLike) {
        const url = '/blogs/save-blog'
        return axiosClient.post(url, data)
    },
    unsave(data: BlogDataLike) {
        const url = '/blogs/unsave-blog'
        return axiosClient.post(url, data)
    },
    getAllSave: <T extends { id: string; page: number; limit: number }>(params?: T) => {
        const url = '/save-blog'
        return axiosClient.get(url, { params })
    },
}
