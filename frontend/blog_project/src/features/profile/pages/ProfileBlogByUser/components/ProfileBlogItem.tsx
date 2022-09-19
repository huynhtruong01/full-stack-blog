import { truncateWords } from '@/utils/common'
import { BlogData } from '@/utils/interface'
import dayjs from 'dayjs'
import * as React from 'react'
import { AiFillLike } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export interface ProfileBlogItemProps {
    blog: BlogData
}

export function ProfileBlogItem({ blog }: ProfileBlogItemProps) {
    return (
        <div className="border rounded border-gray-200">
            <div className="h-[300px]">
                <img src={blog.thumbnail} alt={blog.title} className="rounded-t" />
            </div>
            <div className="p-4 pt-6">
                <div>
                    <Link to={`/blogs/${blog._id}`}>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-700 hover:underline">
                            {blog.title}
                        </h3>
                    </Link>
                    <p className="text-gray-500 text-sm">{blog.description}</p>
                </div>
                <div className="flex justify-end items-end mt-4">
                    <div className="flex items-center mr-4 font-medium text-white px-1.5 py-0.5 rounded bg-blue-700">
                        <span className="mr-1.5">{blog?.likes || '0'}</span>
                        <AiFillLike className="text-white" />
                    </div>
                    <span className="text-gray-400 text-sm">
                        {dayjs(blog.createdAt).format('DD/MM/YYYY')}
                    </span>
                </div>
            </div>
        </div>
    )
}
