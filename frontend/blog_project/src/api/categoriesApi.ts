import axiosClient from './axiosClient'

export const categoriesApi = {
    getAll: <T extends { page?: number; limit?: number }>(params?: T) => {
        const url = '/categories'
        return axiosClient.get(url, { params })
    },
    getById(id: string) {
        const url = `/categories/${id}`
        return axiosClient.get(url)
    },
}
