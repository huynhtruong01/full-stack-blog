import { BlogsRoutes } from '@/routes/BlogsRoutes'
import { useEffect } from 'react'

export interface BlogsProps {}

export function Blogs(props: BlogsProps) {
    return (
        <section className="w-full">
            <BlogsRoutes />
        </section>
    )
}
