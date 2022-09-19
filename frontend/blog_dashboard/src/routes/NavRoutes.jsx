import { Box } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Blogs, Categories, Roles, Stories, Users } from '../features'

NavRoutes.propTypes = {}

export function NavRoutes() {
    return (
        <Box width="100%">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stories/*" element={<Stories />} />
                <Route path="/blogs/*" element={<Blogs />} />
                <Route path="/categories/*" element={<Categories />} />
                <Route path="/roles/*" element={<Roles />} />
                <Route path="/users/*" element={<Users />} />
            </Routes>
        </Box>
    )
}
