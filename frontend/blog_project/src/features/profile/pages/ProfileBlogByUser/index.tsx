import { LoadingSpinner } from '@/components/common'
import { fetchBlogByUser } from '@/utils/fetch_api'
import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { ProfileBlogList } from './components'

export interface ProfileBlogByUserProps {
    user: any
}

export function ProfileBlogByUser({ user }: ProfileBlogByUserProps) {
    const location = useLocation()
    const filters: any = useMemo(() => {
        const params: any = queryString.parse(location.search)

        return {
            ...params,
            limit: Number.parseInt(params.limit) || 100,
            page: Number.parseInt(params.page) || 1,
        }
    }, [location.search])

    const { data, isLoading } = useQuery([{ ...filters, id: user?._id }], fetchBlogByUser)

    return (
        <div className="max-w-3xl m-auto">
            {isLoading && <LoadingSpinner />}
            {data?.data?.length > 0 && (
                <div>
                    <ProfileBlogList blogList={data?.data} />
                </div>
            )}
        </div>
    )
}
