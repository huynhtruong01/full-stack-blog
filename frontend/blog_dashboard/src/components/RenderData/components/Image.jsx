import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box } from '@mui/material'

Image.propTypes = {
    img: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
}

function Image({ img, value }) {
    return (
        <>
            {value !== 'avatar' && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '70px',
                        borderRadius: '3px',
                        overflow: 'hidden',
                    }}
                >
                    <img src={img} alt="" />
                </Box>
            )}
            {value === 'avatar' && (
                <Box>
                    <Avatar
                        src={img}
                        sx={{
                            width: '40px',
                            height: '40px',
                        }}
                    />
                </Box>
            )}
        </>
    )
}

export default Image
