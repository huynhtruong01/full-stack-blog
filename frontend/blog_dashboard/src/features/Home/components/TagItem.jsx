import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Link } from 'react-router-dom'

TagItem.propTypes = {
    tag: PropTypes.object.isRequired,
}

function TagItem({ tag }) {
    const { name, number, icon, link } = tag
    const Icon = icon

    return (
        <Link to={link}>
            <Box
                borderRadius="8px"
                p={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                backgroundColor="#fff"
                width="100%"
                sx={{
                    '&:hover': {
                        backgroundColor: blue[700],
                        transition: '.2s ease-in-out',

                        '& .tag-icon': {
                            backgroundColor: '#fff',
                        },

                        '& p': {
                            color: '#fff',
                        },

                        '& .btn-link': {
                            svg: {
                                transform: 'translateX(3px)',
                                color: '#fff',
                            },
                        },
                    },
                }}
            >
                <Box display="flex" width="220px">
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="50px"
                        height="50px"
                        borderRadius="8px"
                        backgroundColor={blue[50]}
                        mr={1.5}
                        className="tag-icon"
                        sx={{
                            transition: '.2s ease-in-out',
                        }}
                    >
                        <Icon
                            sx={{
                                color: blue[700],
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography fontWeight={600} fontSize="1.2rem">
                            {number}
                        </Typography>
                        <Typography color={grey[400]} fontSize="0.8rem">
                            {name}
                        </Typography>
                    </Box>
                </Box>
                <Box className="btn-link">
                    <KeyboardArrowRightIcon
                        sx={{
                            color: blue[800],
                            transition: '.2s ease-in-out',
                        }}
                    />
                </Box>
            </Box>
        </Link>
    )
}

export default TagItem
