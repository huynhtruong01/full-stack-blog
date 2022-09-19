import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { blue } from '@mui/material/colors'

HeaderList.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
}

function HeaderList({ title, link }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,

                a: {
                    display: 'inline',
                },
            }}
        >
            <Typography fontSize="1.1rem" fontWeight={700}>
                {title}
            </Typography>
            <Link to={link}>
                <Typography
                    fontSize=".85rem"
                    color={blue[500]}
                    fontWeight={500}
                    sx={{
                        transition: '.2s ease-in-out',

                        '&:hover': {
                            color: blue[700],
                        },
                    }}
                >
                    See more
                </Typography>
            </Link>
        </Box>
    )
}

export default HeaderList
