import { LoadingSpinner } from '@/components/common'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import * as React from 'react'

export interface LikesBlogProps {}

export function LikesBlog(props: LikesBlogProps) {
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery(['users'], () => {
        const users: any = queryClient.getQueryData(['users'])
        return users
    })

    return (
        <div>
            {isLoading && <LoadingSpinner />}
            {data && <p></p>}
        </div>
    )
}
