import { BlogData } from '@/utils/interface'
import dayjs from 'dayjs'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { BlogHomeItem } from './BlogHomeItem'

export interface BlogHomeListProps {
    blogList: Array<BlogData>
}

export function BlogHomeList({ blogList }: BlogHomeListProps) {
    return (
        <div className="flex flex-row gap-8">
            <div className="w-[600px]">
                {blogList && (
                    <>
                        <div className="mb-2">
                            <img
                                src={blogList[0].thumbnail}
                                alt={blogList[0].title}
                                className="rounded"
                            />
                        </div>
                        <div className="pr-6">
                            <div className="mb-2">
                                <span className="text-gray-400 text-xs font-medium">
                                    {dayjs(blogList[0].createdAt).format('DD/MM/YYYY')}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold mb-1 text-gray-900 hover:text-blue-700 hover:underline">
                                <Link to={`/blogs/${blogList[0]._id}`}>{blogList[0].title}</Link>
                            </h2>
                            <p className="text-sm text-gray-500 font-[400]">
                                {blogList[0].description}
                            </p>
                        </div>
                    </>
                )}
            </div>

            <div className="flex-1">
                <div className="mb-6">
                    {Array.from(new Array(3))
                        .fill(blogList[0])
                        .map((blog: BlogData, index: number) => (
                            <BlogHomeItem blog={blog} key={`${blog._id} + ${index}`} />
                        ))}
                </div>
                <div className="flex justify-center">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 text-sm ease-in-out duration-200">
                        <Link to={`/blogs`}>Xem thêm</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}
