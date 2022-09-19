import { Box } from '@mui/material'
import React from 'react'
import RoutesCategory from './components/RoutesCategory'

Categories.propTypes = {}

export function Categories() {
    return (
        <Box width="100%">
            <Box>
                <RoutesCategory />
            </Box>
        </Box>
    )
}
