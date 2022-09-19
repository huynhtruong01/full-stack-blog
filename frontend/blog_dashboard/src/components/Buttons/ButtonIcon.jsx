import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'

ButtonIcon.propTypes = {
    txt: PropTypes.string,
    icon: PropTypes.object.isRequired,
    color: PropTypes.object,
    callback: PropTypes.func,
}

export function ButtonIcon({ txt = '', icon, color = grey, callback = null }) {
    const Icon = icon

    const handleClick = async () => {
        if (!callback) return

        try {
            await callback()
        } catch (error) {
            console.log(error)
        }
    }

    const p = txt ? `8px 16px 8px ${txt && icon ? '13px' : '16px'}` : '5px'

    return (
        <Box display="inline-block">
            <Box
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: `${txt ? '#fff' : color[600]}`,
                    backgroundColor: `${txt ? color[400] : color[50]}`,
                    p: p,
                    cursor: 'pointer',
                    borderRadius: '3px',
                    fontWeight: 500,
                    transition: '.2s ease-in-out',

                    '&:hover': {
                        backgroundColor: `${txt ? color[600] : color[100]}`,
                    },

                    svg: {
                        mr: `${txt ? '10px' : '0'}`,
                    },
                }}
            >
                {icon && <Icon />}
                {txt && <>{txt}</>}
            </Box>
        </Box>
    )
}
