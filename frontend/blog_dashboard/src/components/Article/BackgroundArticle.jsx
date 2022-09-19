import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'

BackgroundArticle.propTypes = {
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string,
}

export function BackgroundArticle({ thumbnail, title = '' }) {
    return (
        <Box width="100%" height={400} borderRadius="8px" overflow="hidden">
            <img src={thumbnail} alt={title} />
        </Box>
    )
}

export default BackgroundArticle
