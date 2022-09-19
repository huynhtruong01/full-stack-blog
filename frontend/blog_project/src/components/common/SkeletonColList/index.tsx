import * as React from 'react'
import { SkeletonColItem } from './components'

export interface SkeletonColListProps {
    amount: number
}

export function SkeletonColList({ amount }: SkeletonColListProps) {
    return (
        <div className="flex flex-col">
            {Array.from(new Array(amount)).map((x, index) => (
                <SkeletonColItem key={index} />
            ))}
        </div>
    )
}
