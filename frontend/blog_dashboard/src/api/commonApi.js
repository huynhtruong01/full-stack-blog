import axiosClient from './axiosClient'

const commonApi = {
    getAllCount() {
        const url = '/common/count'
        return axiosClient.get(url)
    },
    getDataBlogChart(data) {
        const url = '/common/data-blog-chart'
        return axiosClient.post(url, data)
    },
    getTopLikeBlog() {
        const url = '/common/top-like-blog'
        return axiosClient(url)
    },
}

export default commonApi
