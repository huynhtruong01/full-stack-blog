import { BlogData } from '@/utils/interface'
import * as React from 'react'
import { ProfileBlogItem } from './ProfileBlogItem'

export interface ProfileBlogListProps {
    blogList: Array<BlogData>
}

export function ProfileBlogList({ blogList }: ProfileBlogListProps) {
    return (
        <div>
            {blogList?.map((blog) => (
                <div key={blog._id} className="py-6">
                    <ProfileBlogItem blog={blog} />
                </div>
            ))}
        </div>
    )
}
