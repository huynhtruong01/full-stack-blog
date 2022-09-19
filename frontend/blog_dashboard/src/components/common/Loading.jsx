import React from 'react'
import PropTypes from 'prop-types'
import { Box, CircularProgress } from '@mui/material'

Loading.propTypes = {}

export function Loading() {
    return (
        <Box display="flex" justifyContent="center">
            <CircularProgress />
        </Box>
    )
}
