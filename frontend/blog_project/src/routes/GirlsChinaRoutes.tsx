import { StoryDetail, StoryHome } from '@/features/girls_china/pages'
import { Route, Routes } from 'react-router-dom'

export interface GirlsChinaRoutesProps {}

export function GirlsChinaRoutes(props: GirlsChinaRoutesProps) {
    return (
        <Routes>
            <Route path="" element={<StoryHome />} />
            <Route path=":id" element={<StoryDetail />} />
        </Routes>
    )
}
