import { StoryData } from '@/utils/interface'
import * as React from 'react'
import { Story } from './Story'

export interface StoryListProps {
    storyList: Array<StoryData> | []
}

export function StoryList({ storyList }: StoryListProps) {
    return (
        <div className="flex items-center gap-3 flex-wrap">
            {storyList.map((story) => (
                <div key={story?._id} className="w-[calc(100%_/_3_-_12px)]">
                    <Story story={story} />
                </div>
            ))}
        </div>
    )
}
