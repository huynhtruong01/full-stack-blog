import { AccountHome } from '@/features/account/pages'
import { BlogByUser } from '@/features/blog_by_user'
import { BlogUserEdit } from '@/features/blog_by_user/pages'
import { Route, Routes, useLocation } from 'react-router-dom'

export interface AccountRoutesProps {}

export function AccountRoutes(props: AccountRoutesProps) {
    const location = useLocation()

    return (
        <Routes>
            <Route path="" element={<AccountHome />} />
            <Route path="account-blog-list/:id" element={<BlogUserEdit />} />
            <Route path="account-blog-list" element={<BlogByUser />} />
        </Routes>
    )
}
