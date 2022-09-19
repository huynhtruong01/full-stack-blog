import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CategoriesAdd, CategoriesEdit, CategoriesHome } from '../pages'

RoutesCategory.propTypes = {}

function RoutesCategory() {
    return (
        <>
            <Routes>
                <Route path="/" element={<CategoriesHome />} />
                <Route path="/add" element={<CategoriesAdd />} />
                <Route path="/edit/:id" element={<CategoriesEdit />} />
            </Routes>
        </>
    )
}

export default RoutesCategory
