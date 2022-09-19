import React from 'react'
import PropTypes from 'prop-types'
import { grey } from '@mui/material/colors'
import { Box } from '@mui/material'
import { formatFirstText } from '../../utils/typography'
import theme from '../../utils/theme'

TextDisplayColor.propTypes = {
    txt: PropTypes.string.isRequired,
    color: PropTypes.object,
    fontSize: PropTypes.string,
}

export function TextDisplayColor({ txt, color = grey, fontSize = '1rem' }) {
    return (
        <Box
            sx={{
                display: 'inline',
                p: theme.spacing(0.7, 1.5),
                color: color[700],
                backgroundColor: color[50],
                fontWeight: 500,
                borderRadius: '5px',
                fontSize: fontSize,
                border: `2px solid ${color[700]}`,
            }}
        >
            {formatFirstText(txt)}
        </Box>
    )
}
