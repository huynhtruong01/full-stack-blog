import { Box, Skeleton } from '@mui/material'
import React from 'react'

BackgroundSkeleton.propTypes = {}

export function BackgroundSkeleton() {
    return (
        <Box>
            <Skeleton
                variant="rectangular"
                width="100%"
                height={360}
                sx={{
                    borderRadius: '8px',
                }}
            />
        </Box>
    )
}
