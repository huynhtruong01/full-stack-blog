import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { ButtonIcon } from '../Buttons'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useLocation, useNavigate } from 'react-router-dom'
import { blue } from '@mui/material/colors'

DetailButton.propTypes = {
    id: PropTypes.string.isRequired,
}

export function DetailButton({ id }) {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const handleDetailClick = () => {
        navigate(`${pathname}/${id}`)
    }

    return (
        <Box>
            <ButtonIcon icon={MoreHorizIcon} color={blue} callback={handleDetailClick} />
        </Box>
    )
}
