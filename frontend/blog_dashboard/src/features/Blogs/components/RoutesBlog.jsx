import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { BlogsAdd, BlogsDetail, BlogsEdit, BlogsHome } from '../pages'

RoutesBlog.propTypes = {}

function RoutesBlog() {
    return (
        <>
            <Routes>
                <Route path="/" element={<BlogsHome />} />
                <Route path="/:id" element={<BlogsDetail />} />
                <Route path="/add" element={<BlogsAdd />} />
                <Route path="/edit/:id" element={<BlogsEdit />} />
            </Routes>
        </>
    )
}

export default RoutesBlog
