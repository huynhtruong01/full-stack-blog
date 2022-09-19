import { blogsApi } from './../../api/blogsApi'

// get all blog by user
export const blogOwnList = async (values: any) => {
    try {
        const { data }: any = await blogsApi.getByUser(values)

        return data
    } catch (error: any) {
        throw new Error(error)
    }
}

// get by id
export const fetchBlogById = async ({ queryKey }: any) => {
    try {
        const { data }: any = await blogsApi.getById(queryKey[0])

        return data
    } catch (error: any) {
        throw new Error(error)
    }
}

// get all save blog by user
export const getAllSaveBlog = async ({ queryKey }: any) => {
    try {
        const { type, ...newQueryKey }: any = queryKey[0]
        const data = await blogsApi.getAllSave(newQueryKey)

        return data
    } catch (error: any) {
        throw new Error(error)
    }
}

// get all
export const fetchAllBlog = async ({ queryKey }: any) => {
    try {
        let values: any
        const { type, ...newQueryKey }: any = queryKey[0]
        if (queryKey[0]?.name) {
            values = await blogsApi.search(newQueryKey)
        } else {
            values = await blogsApi.getAll(newQueryKey)
        }

        const { data, totalCount } = values

        const newData = data.map((x: any) => ({ ...x, likes: x.likes?.length }))
        return { data: newData, totalCount }
    } catch (error: any) {
        throw new Error(error)
    }
}

// get by user
export const fetchBlogByUser = async ({ queryKey }: any) => {
    try {
        const { data, totalCount }: any = await blogsApi.getByUser(queryKey[0])

        const newData = data?.map((x: any) => ({ ...x, likes: x.likes.length }))
        return { data: newData, totalCount }
    } catch (error: any) {
        throw new Error(error)
    }
}

// get by category
export const fetchBlogByCategory = async ({ queryKey }: any) => {
    try {
        console.log(queryKey[0])
        const { data, totalCount }: any = await blogsApi.getByCategory(queryKey[0])

        const newData = data?.map((x: any) => ({ ...x, likes: x.likes.length }))
        return { data: newData, totalCount }
    } catch (error: any) {
        throw new Error(error)
    }
}
