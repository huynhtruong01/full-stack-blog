import { Account } from '@/features/account'
import { ActiveRegisterMail, Login, Register } from '@/features/auth/pages'
import { CreateBlog } from '@/features/create_blog'
import { SaveBlog } from '@/features/save_blog'
import { Route, Routes } from 'react-router-dom'

export interface CommonRoutesProps {}

export function CommonRoutes(props: CommonRoutesProps) {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="active/:token" element={<ActiveRegisterMail />} />
            <Route path="create-blog" element={<CreateBlog />} />
        </Routes>
    )
}
