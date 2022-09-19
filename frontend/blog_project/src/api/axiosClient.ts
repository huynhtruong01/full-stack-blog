import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://athetics-blog-app.herokuapp.com/api',
    // baseURL: 'http://localhost:5500/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosClient.interceptors.request.use(
    function (config) {
        return config
    },
    function (error: any) {
        return Promise.reject(error?.response?.data?.message)
    }
)

axiosClient.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (error: any) {
        console.log(error)
        return Promise.reject(error?.response?.data?.message)
    }
)

export default axiosClient
