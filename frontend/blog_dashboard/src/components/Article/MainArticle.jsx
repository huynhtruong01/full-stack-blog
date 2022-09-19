import React from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify'
import { Box } from '@mui/material'

MainArticle.propTypes = {
    article: PropTypes.string.isRequired,
}

export function MainArticle({ article }) {
    const html = DOMPurify.sanitize(article)

    return (
        <Box
            sx={{
                p: {
                    display: 'flex',
                    justifyContent: 'center',
                    img: {
                        width: 'auto',
                        borderRadius: '3px',
                    },
                },
            }}
        >
            <Box dangerouslySetInnerHTML={{ __html: html }} />
        </Box>
    )
}
