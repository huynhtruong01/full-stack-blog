import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { StoriesAdd, StoriesDetail, StoriesEdit, StoriesHome } from '../pages'

RoutesStory.propTypes = {}

function RoutesStory() {
    return (
        <>
            <Routes>
                <Route path="/" element={<StoriesHome />} />
                <Route path="/:id" element={<StoriesDetail />} />
                <Route path="/add" element={<StoriesAdd />} />
                <Route path="/edit/:id" element={<StoriesEdit />} />
            </Routes>
        </>
    )
}

export default RoutesStory
