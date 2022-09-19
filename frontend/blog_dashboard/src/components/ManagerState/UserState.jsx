import { useQueryClient } from 'react-query'

UserState.propTypes = {}

function UserState() {
    const queryClient = useQueryClient()

    const data = JSON.parse(localStorage.getItem('users')) || null

    queryClient.setQueryData('users', data)
}

export default UserState
