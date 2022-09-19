import { Box, CircularProgress, Modal, Typography } from '@mui/material'
import React from 'react'
import { useQueryClient, useQuery } from 'react-query'

ModalLoading.propTypes = {}

export function ModalLoading() {
    const queryClient = useQueryClient()
    const { data } = useQuery('loading', async ({ queryKey }) => {
        const key = queryClient.getQueryData(queryKey[0])
        console.log(queryKey[0], key)
        return { modalLoading: key?.modalLoading || false }
    })

    console.log(data)

    return (
        <Box>
            <Modal open={data?.modalLoading}>
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
