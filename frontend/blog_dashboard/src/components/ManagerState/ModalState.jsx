import { useQueryClient } from 'react-query'

ModalState.propTypes = {}

function ModalState() {
    const queryClient = useQueryClient()
    queryClient.setQueryData('modal', {
        modalDelete: false,
        id: null,
        name: '',
        email: '',
    })

    queryClient.setQueryData('loading', {
        modalLoading: false,
    })
}

export default ModalState
