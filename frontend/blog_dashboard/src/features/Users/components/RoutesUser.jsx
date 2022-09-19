import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UsersAdd, UsersEdit, UsersHome } from '../pages'

RoutesUser.propTypes = {}

function RoutesUser() {
    return (
        <>
            <Routes>
                <Route path="/" element={<UsersHome />} />
                <Route path="/add" element={<UsersAdd />} />
                <Route path="/edit/:id" element={<UsersEdit />} />
            </Routes>
        </>
    )
}

export default RoutesUser
