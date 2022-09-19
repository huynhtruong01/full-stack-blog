import axios from 'axios'
axios.defaults.withCredentials = true

const axiosClient = axios.create({
    baseURL: 'https://athetics-blog-app.herokuapp.com/api',
    // baseURL: 'http://localhost:5500/api',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
})

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        return config
    },
    function (error) {
        return Promise.reject(error.response.data)
    }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (error) {
        return Promise.reject(error.response.data)
    }
)

export default axiosClient
