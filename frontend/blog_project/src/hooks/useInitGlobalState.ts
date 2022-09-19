import { useQueryClient } from '@tanstack/react-query'

export const useInitGlobalState = () => {
    const queryClient = useQueryClient()

    // users
    const users = JSON.parse(localStorage.getItem('users') || '') || []
    queryClient.setQueryData(['users'], users)

    // data delete
    queryClient.setQueryData(['data-modal'], null)

    // modal
    queryClient.setQueryData(['show-modal-delete'], false)
}
