import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'

CategoryLink.propTypes = {
    linkName: PropTypes.string.isRequired,
}

export function CategoryLink({ linkName }) {
    return (
        <Link to="/">
            <Box
                p="4px 8px"
                sx={{
                    border: '1px solid transparent',
                    borderRadius: '0.375rem',
                    transition: '.2s ease-in-out',

                    '&:hover': {
                        border: `1px solid ${blue[700]}`,
                        backgroundColor: blue[100],
                    },
                }}
            >
                <Typography component="span" color={blue[700]} mr="3px" fontWeight={500}>
                    #
                </Typography>
                <Typography component="span">{linkName}</Typography>
            </Box>
        </Link>
    )
}
