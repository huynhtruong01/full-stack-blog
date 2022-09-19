import {
    Account,
    Blogs,
    Categories,
    GirlsChina,
    Home,
    LikesBlog,
    Profile,
    SaveBlog,
} from '@/features'
import { Route, Routes } from 'react-router-dom'

export interface FeatureRoutesProps {}

export function FeatureRoutes(props: FeatureRoutesProps) {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="account/*" element={<Account />} />
            <Route path="categories/*" element={<Categories />} />
            <Route path="save-blog/*" element={<SaveBlog />} />
            <Route path="girls-china/*" element={<GirlsChina />} />
            <Route path="blogs/*" element={<Blogs />} />
            <Route path="likes-blog/*" element={<LikesBlog />} />
            <Route path="profile/:id" element={<Profile />} />
        </Routes>
    )
}
