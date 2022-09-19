import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { ButtonIcon } from '../Buttons'
import DeleteIcon from '@mui/icons-material/Delete'
import { red } from '@mui/material/colors'
import { useQueryClient } from 'react-query'

DeleteButton.propTypes = {
    data: PropTypes.object.isRequired,
}

export function DeleteButton({ data }) {
    const queryClient = useQueryClient()

    const handleOpenModal = () => {
        const modal = queryClient.getQueryData('modal')
        queryClient.setQueryData('modal', {
            ...modal,
            modalDelete: true,
            id: data?.id,
            name: data?.name || data?.title,
        })
        queryClient.invalidateQueries('modal')
    }

    return (
        <Box>
            <ButtonIcon icon={DeleteIcon} color={red} callback={handleOpenModal} />
        </Box>
    )
}
