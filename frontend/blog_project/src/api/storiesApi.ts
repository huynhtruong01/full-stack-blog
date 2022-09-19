import { StoryData } from '@/utils/interface'
import axiosClient from './axiosClient'

export const storiesApi = {
    getAll: <T extends { page: number; limit: number }>(params: T) => {
        const url = '/stories'
        return axiosClient.get(url, { params })
    },
    search: <T extends { page: number; limit: number; search: string }>(params: T) => {
        const url = '/stories/search'
        return axiosClient.get(url, { params })
    },
    getById(id: string) {
        const url = `/stories/${id}`
        return axiosClient.get(url)
    },
    add(data: StoryData) {
        const url = '/stories'
        return axiosClient.post(url, data)
    },
    update(data: StoryData) {
        const url = `/stories/${data._id}`
        return axiosClient.put(url, data)
    },
    remove(id: string) {
        const url = `/stories/${id}`
        return axiosClient.delete(url)
    },
}
