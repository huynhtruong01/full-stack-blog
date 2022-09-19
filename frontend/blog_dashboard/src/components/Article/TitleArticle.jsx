import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

TitleArticle.propTypes = {
    title: PropTypes.string.isRequired,
}

export function TitleArticle({ title }) {
    return (
        <Typography
            compoent="h1"
            variant="h1"
            lineHeight={1.25}
            fontWeight="bold"
            mb="8px"
            fontSize="3rem"
        >
            {title}
        </Typography>
    )
}
