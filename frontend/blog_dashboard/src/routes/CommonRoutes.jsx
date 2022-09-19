import { Box } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { NotFoundPage } from '../components/common'
import { EditInfo, InformationPage } from '../features'

CommonRoutes.propTypes = {}

export function CommonRoutes() {
    return (
        <Box>
            <Routes>
                <Route path="info/:name" element={<InformationPage />} />
                <Route path="edit-info/:name" element={<EditInfo />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Box>
    )
}
