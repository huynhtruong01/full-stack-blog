import { Box } from '@mui/material'
import React from 'react'
import RoutesBlog from './components/RoutesBlog'

Blogs.propTypes = {}

export function Blogs() {
    return (
        <Box width="100%">
            <Box>
                <RoutesBlog />
            </Box>
        </Box>
    )
}
