import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import { Box } from '@mui/material'
import { green } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ButtonIcon } from '../Buttons'

EditButton.propTypes = {
    id: PropTypes.string.isRequired,
}

export function EditButton({ id }) {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const handleNavEdit = () => {
        navigate(`${pathname}/edit/${id}`)
    }

    return (
        <Box>
            <ButtonIcon icon={ModeEditOutlineIcon} color={green} callback={handleNavEdit} />
        </Box>
    )
}
