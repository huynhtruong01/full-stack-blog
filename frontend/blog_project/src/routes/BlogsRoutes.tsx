import { BlogsDetail, BlogsHome } from '@/features/blogs/pages'
import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

export interface BlogsRoutesProps {}

export function BlogsRoutes(props: BlogsRoutesProps) {
    return (
        <Routes>
            <Route path="" element={<BlogsHome />} />
            <Route path=":id" element={<BlogsDetail />} />
        </Routes>
    )
}
