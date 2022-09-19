import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RolesAdd, RolesEdit, RolesHome } from '../pages'

RoutesRole.propTypes = {}

function RoutesRole() {
    return (
        <>
            <Routes>
                <Route path="/" element={<RolesHome />} />
                <Route path="/add" element={<RolesAdd />} />
                <Route path="/edit/:id" element={<RolesEdit />} />
            </Routes>
        </>
    )
}

export default RoutesRole
