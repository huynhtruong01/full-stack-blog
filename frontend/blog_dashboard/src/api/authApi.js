import axiosClient from './axiosClient'

const authApi = {
    register(data) {
        const url = '/auth/register'
        return axiosClient.post(url, data)
    },
    activeRegister(data) {
        const url = '/auth/active'
        return axiosClient.post(url, data)
    },
    login(data) {
        const url = '/auth/login'
        return axiosClient.post(url, data)
    },
    logout(data) {
        const url = '/auth/logout'
        return axiosClient.post(url, data)
    },
    refreshToken() {
        const url = '/auth/refresh-token'
        return axiosClient.get(url)
    },
    verifyEmail(data) {
        const url = '/auth/verify-email-dashboard'
        return axiosClient.post(url, data)
    },
    forgotPassword(data) {
        const url = '/auth/forgot-password'
        return axiosClient.post(url, data)
    },
}

export default authApi
