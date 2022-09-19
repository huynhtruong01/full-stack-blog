import { Button } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

ButtonFullWidth.propTypes = {
    txt: PropTypes.string.isRequired,
    icon: PropTypes.object,
    color: PropTypes.object,
    type: PropTypes.string,
    disabled: PropTypes.bool,
}

export function ButtonFullWidth({ txt = '', icon, color, type = '', disabled = false }) {
    const Icon = icon

    return (
        <>
            <Button
                type={type}
                fullWidth
                startIcon={Icon && <Icon />}
                variant="contained"
                disabled={disabled}
                sx={{
                    p: '8px 16px',
                    backgroundColor: color[500],

                    '&:hover': {
                        backgroundColor: color[700],
                    },
                }}
            >
                {txt}
            </Button>
        </>
    )
}
