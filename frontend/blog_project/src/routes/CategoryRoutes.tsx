import { CategoryDetail, CategoryHome } from '@/features/categories/pages'
import { StoryDetail, StoryHome } from '@/features/girls_china/pages'
import { Route, Routes } from 'react-router-dom'

export interface CategoryRoutesProps {}

export function CategoryRoutes(props: CategoryRoutesProps) {
    return (
        <Routes>
            <Route path="" element={<CategoryHome />} />
            <Route path=":id" element={<CategoryDetail />} />
        </Routes>
    )
}
