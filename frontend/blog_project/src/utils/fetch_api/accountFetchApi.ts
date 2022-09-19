import { blogsApi } from '@/api'

export const getAllAccountBlog = async ({ queryKey }: any) => {
    try {
        const data = await blogsApi.getByUser(queryKey[0])

        return data
    } catch (error: any) {
        throw new Error(error)
    }
}
