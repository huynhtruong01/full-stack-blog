import { BlogData } from '@/utils/interface'
import * as React from 'react'
import { BlogUserItem } from './BlogUserItem'

export interface BlogUserListProps {
    blogList: Array<BlogData>
}

export function BlogUserList({ blogList }: BlogUserListProps) {
    return (
        <div className="flex gap-4 flex-wrap">
            {blogList?.map((blog: BlogData) => (
                <div key={`${blog._id}`} className="w-[calc(100%_/_3_-_16px)]">
                    <BlogUserItem blog={blog} />
                </div>
            ))}
        </div>
    )
}
