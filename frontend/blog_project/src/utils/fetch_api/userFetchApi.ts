import { usersApi } from '@/api'
export const fetchByIdUser = async ({ queryKey }: any) => {
    try {
        const { data } = await usersApi.getById(queryKey[0])

        return data
    } catch (error: any) {
        throw new Error(error)
    }
}
