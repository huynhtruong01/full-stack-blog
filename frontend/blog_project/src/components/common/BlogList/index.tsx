import { BlogData } from '@/utils/interface'
import * as React from 'react'
import { Blog } from './components'

export interface BlogListProps {
    blogList: Array<BlogData>
}

export function BlogList({ blogList }: BlogListProps) {
    return (
        <div className="flex gap-4 flex-wrap">
            {blogList.map((blog: BlogData) => (
                <div className="w-[calc(100%_/_3_-_16px)]" key={blog._id}>
                    <Blog blog={blog} />
                </div>
            ))}
        </div>
    )
}
