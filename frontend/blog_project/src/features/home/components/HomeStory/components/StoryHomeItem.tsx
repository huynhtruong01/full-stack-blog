import { truncateWords } from '@/utils/common'
import { StoryData } from '@/utils/interface'
import dayjs from 'dayjs'
import * as React from 'react'
import { Link } from 'react-router-dom'

export interface StoryHomeItemProps {
    story: StoryData
}

export function StoryHomeItem({ story }: StoryHomeItemProps) {
    return (
        <div className="px-3 last:pr-0 first:pl-0">
            <div className="w-full h-36 mb-1">
                <img src={story?.avatarCover} alt={story.title} className="rounded" />
            </div>
            <div className="px-1">
                <div className="mb-1.5">
                    <span className="text-xs text-gray-400">
                        {dayjs(story.createdAt).format('DD/MM/YYYY')}
                    </span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 hover:text-blue-700 hover:underline">
                    <Link to={`/girls-china/${story._id}`}>{story.title}</Link>
                </h4>
                <p className="text-sm text-gray-500 pr-6">{truncateWords(story.description, 15)}</p>
            </div>
        </div>
    )
}
