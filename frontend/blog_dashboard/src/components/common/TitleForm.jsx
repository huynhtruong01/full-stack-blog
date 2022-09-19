import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

TitleForm.propTypes = {
    txt: PropTypes.string.isRequired,
    color: PropTypes.object,
    mb: PropTypes.number,
}

export function TitleForm({ txt, color = grey, mb = 2 }) {
    return (
        <>
            {txt && (
                <Typography
                    component="h3"
                    variant="h5"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 600,
                        color: color[800],
                        mb: mb,
                    }}
                >
                    {txt}
                </Typography>
            )}
        </>
    )
}
