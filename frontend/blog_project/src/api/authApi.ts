import { ActiveTokenData, LoginData, RegisterData } from '@/utils/interface'
import axiosClient from './axiosClient'

export const authApi = {
    register(data: RegisterData) {
        const url = '/auth/register'
        return axiosClient.post(url, data)
    },
    login(data: LoginData) {
        const url = '/auth/login'
        return axiosClient.post(url, data)
    },
    activeRegister(data: ActiveTokenData) {
        const url = '/auth/active'
        return axiosClient.post(url, data)
    },
    logout() {
        const url = '/auth/logout'
        return axiosClient.post(url)
    },
    refreshToken() {
        const url = '/auth/refresh-token'
        return axiosClient.get(url)
    },
    verifyEmail(data: { email: string }) {
        const url = '/auth/verify-email'
        return axiosClient.post(url, data)
    },
    forgotPassword(data: { email: string; password: string }) {
        const url = '/auth/forgot-password'
        return axiosClient.post(url, data)
    },
}
