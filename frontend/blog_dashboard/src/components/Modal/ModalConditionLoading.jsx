import { Box, CircularProgress, Modal, Typography } from '@mui/material'
import React from 'react'
import { useQueryClient, useQuery } from 'react-query'

ModalConditionLoading.propTypes = {}

export function ModalConditionLoading() {
    return (
        <Box>
            <Modal open={true}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        border: 'none',
                        outline: 'none',
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                    >
                        <CircularProgress size={60} sx={{ color: '#fff' }} />
                        <Typography mt="12px" fontWeight={600} fontSize="1.2rem" color="#fff">
                            Loading...
                        </Typography>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}
