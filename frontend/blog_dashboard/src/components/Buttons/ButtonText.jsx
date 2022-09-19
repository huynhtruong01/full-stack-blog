import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'

ButtonText.propTypes = {
    txt: PropTypes.string.isRequired,
    color: PropTypes.object,
    callback: PropTypes.func,
    p: PropTypes.string,
}

export function ButtonText({ txt, color = grey, callback = null }) {
    const handleClick = async () => {
        if (!callback) return

        try {
            await callback()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box display="inline-block">
            <Box
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    backgroundColor: color[400],
                    p: '8px 16px',
                    cursor: 'pointer',
                    borderRadius: '3px',
                    fontWeight: 500,
                    transition: '.2s ease-in-out',

                    '&:hover': {
                        backgroundColor: color[600],
                    },
                }}
            >
                {txt}
            </Box>
        </Box>
    )
}
