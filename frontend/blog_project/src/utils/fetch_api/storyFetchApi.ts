import { storiesApi } from '@/api'

// get all
export const fetchAllStory = async ({ queryKey }: any) => {
    const { type, ...newQueryKey } = queryKey[0]

    try {
        let values: any
        if (newQueryKey?.name) {
            values = await storiesApi.search(newQueryKey)
        } else {
            values = await storiesApi.getAll(newQueryKey)
        }

        const { data, totalCount } = values
        return { data, totalCount }
    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}

// get by id
export const fetchByIdStory = async ({ queryKey }: any) => {
    try {
        const { data }: any = await storiesApi.getById(queryKey[0])

        return data
    } catch (error: any) {
        throw new Error(error)
    }
}
