import { StoryData } from '@/utils/interface'
import * as React from 'react'
import { StoryHomeItem } from './StoryHomeItem'

export interface StoryHomeListProps {
    storyList: Array<StoryData>
}

export function StoryHomeList({ storyList }: StoryHomeListProps) {
    return (
        <div className="flex">
            {storyList?.map((story: StoryData) => (
                <StoryHomeItem story={story} key={story._id} />
            ))}
        </div>
    )
}
