import { Box, Skeleton } from '@mui/material'
import React from 'react'

export function UserSkeleton() {
    return (
        <Box>
            <Box width="40px" height="40px" borderRadius="50%" overflow="hidden">
                <Skeleton variant="circular" width={40} height={40} />
            </Box>
            <Box
                sx={{
                    padding: '12px',
                }}
            >
                <Skeleton
                    variant="text"
                    width="20%"
                    height={20}
                    sx={{
                        mb: '5px',
                    }}
                />
                <Skeleton variant="text" width="100%" height={14} />
            </Box>
        </Box>
    )
}
