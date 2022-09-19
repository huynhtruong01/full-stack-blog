import * as React from 'react'
import { Skeleton } from './components'

export interface SkeletonListProps {
    amount: number
}

export function SkeletonList({ amount }: SkeletonListProps) {
    const widthSkeleton =
        amount <= 4 ? `w-[${Math.floor(100 / amount)}%]` : `w-[calc(100%_/_${3}_-_16px)]`

    return (
        <div className={`w-full flex flex-row ${amount <= 4 ? 'gap-6' : 'gap-4 flex-wrap'}`}>
            {Array.from(new Array(amount)).map((x, index) => (
                <div className={`${widthSkeleton} last:pr-0 first:pl-0`} key={index}>
                    <Skeleton amount={amount} />
                </div>
            ))}
        </div>
    )
}
