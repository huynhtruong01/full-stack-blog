import { truncate, truncateWords } from '@/utils/common'
import dayjs from 'dayjs'
import * as React from 'react'
import { Link } from 'react-router-dom'

export interface BlogOwnItemProps {
    blog: any
}

export function BlogOwnItem({ blog }: BlogOwnItemProps) {
    return (
        <div className="w-full flex gap-4 border-b-2 border-gray-200 py-3 first:pt-0 last:border-0">
            <div className="w-[200px]">
                <img className="rounded" src={blog?.thumbnail} alt={blog?.title} />
            </div>
            <div className="flex-1 py-1">
                <div className="text-xs text-gray-400">
                    <span>{dayjs(blog?.created).format('DD/MM/YYYY')}</span>
                </div>
                <Link to={`/blogs/${blog?._id}`}>
                    <h3 className="text-xl font-bold text-gray-700 hover:text-blue-700 hover:underline mt-1.5">
                        {truncateWords(blog?.title, 4)}
                    </h3>
                </Link>
                <p className="text-sm text-gray-500">{truncateWords(blog?.description, 22)}</p>
            </div>
        </div>
    )
}
