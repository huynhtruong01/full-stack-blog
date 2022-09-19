import { Box } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ForgotPassword, Login, VerifyEmail } from '../features/Auth/pages'

AuthRoutes.propTypes = {}

export function AuthRoutes() {
    return (
        <Box>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/change-password" element={<ForgotPassword />} />
            </Routes>
        </Box>
    )
}
