import { Box } from '@mui/material'
import React from 'react'
import RoutesStory from './components/RoutesStory'

Stories.propTypes = {}

export function Stories() {
    return (
        <Box width="100%">
            <Box>
                <RoutesStory />
            </Box>
        </Box>
    )
}
