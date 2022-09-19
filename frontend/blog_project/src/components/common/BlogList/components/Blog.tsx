// import { truncateWords } from '@/utils/common'
// import { BlogData } from '@/utils/interface'
import { truncateWords } from '@/utils/common'
import { BlogData } from '@/utils/interface'
import dayjs from 'dayjs'
import * as React from 'react'
import { AiFillLike } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export interface BlogProps {
    blog: BlogData
}

export function Blog({ blog }: BlogProps) {
    return (
        <div className="rounded border border-gray-300 pb-2 overflow-hidden">
            <Link to={`/blogs/${blog._id}`} className="group">
                <div className="relative h-48 overflow-hidden rounded-t">
                    <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="rounded-t group-hover:scale-110 duration-200 ease-in-out"
                    />
                    <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center opacity-0 invisible group-hover:bg-black group-hover:bg-opacity-40 group-hover:visible group-hover:opacity-100 ease-in-out duration-200">
                        <span className="bg-blue-500 text-white p-3 rounded hover:bg-blue-700 font-medium ease-in-out duration-200">
                            Xem chi tiết
                        </span>
                    </div>
                </div>
            </Link>

            <div className="p-2">
                <div className="mt-2 px-2">
                    <Link to={`/blogs/${blog._id}`}>
                        <h3 className="text-xl font-bold text-gray-900 hover:text-blue-700 hover:underline">
                            {truncateWords(blog.title, 4)}
                        </h3>
                    </Link>
                    <p className="text-sm text-gray-500 font-[300]">
                        {truncateWords(blog.description, 11)}
                    </p>
                </div>
                <div className="flex justify-between mt-6 px-2 items-end">
                    <div className="font-sm">
                        {blog?.user?.username && (
                            <Link
                                to={`/profile/${blog?.user?._id}`}
                                className="inline bg-blue-500 p-2 rounded hover:bg-blue-700 font-semibold text-white ease-in-out duration-200"
                            >
                                By <span>{blog?.user?.username}</span>
                            </Link>
                        )}
                    </div>
                    <span className="text-sm text-gray-400">
                        {dayjs(blog.createdAt).format('DD/MM/YYYY')}
                    </span>
                </div>
            </div>
        </div>
    )
}
