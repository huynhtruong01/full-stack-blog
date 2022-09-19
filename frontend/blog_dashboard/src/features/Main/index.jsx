import { Box } from '@mui/material'
import React from 'react'
import { ModalLoading } from '../../components/Modal'
import { AuthRoutes, CommonRoutes, NavRoutes } from '../../routes'
import Header from '../Header'

Main.propTypes = {}

function Main() {
    window.scrollTo(0, 0)

    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: '#F5F7F9',
                minHeight: '100vh',
            }}
        >
            <Box position="sticky" top={0} zIndex={10}>
                <Header />
            </Box>
            <Box>
                <CommonRoutes />
            </Box>
            <Box
                sx={{
                    p: '12px',
                    pt: '16px',
                }}
            >
                <NavRoutes />
                <AuthRoutes />
            </Box>
            <ModalLoading />
        </Box>
    )
}

export default Main
