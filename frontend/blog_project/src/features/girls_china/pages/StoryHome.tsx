import { SkeletonList } from '@/components/common'
import { Pagination } from '@/components/filters'
import { fetchAllStory } from '@/utils/fetch_api'
import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FiltersStory, StoryList } from '../components'

export interface StoryHomeProps {}

export function StoryHome(props: StoryHomeProps) {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        window.document.title = 'Tỷ tỷ xứ Trung | H.Blog'
    })

    const filters = useMemo(() => {
        const params: any = queryString.parse(location.search)

        return {
            ...params,
            page: Number.parseInt(params?.page) || 1,
            limit: Number.parseInt(params?.limit) || 10,
        }
    }, [location.search])

    useEffect(() => {
        const params = queryString.stringify({
            limit: 10,
            page: 1,
        })
        navigate({
            pathname: location.pathname,
            search: `?${params}`,
        })
    }, [])

    const { data, isLoading, refetch }: any = useQuery(
        [{ ...filters, type: 'girls-china' }],
        fetchAllStory
    )
    useEffect(() => {
        refetch()
    }, [filters])

    const handlePaginationChange = (page: number) => {
        const newFilters = { ...filters, page }
        navigate({
            pathname: location.pathname,
            search: `?${queryString.stringify(newFilters)}`,
        })
    }

    const handleFilters = (filters: any) => {
        navigate({
            pathname: location.pathname,
            search: `?${queryString.stringify(filters)}`,
        })
    }

    return (
        <div className="w-full m-auto">
            <div className="mb-4">
                <FiltersStory filters={filters} onChange={handleFilters} />
            </div>
            {isLoading && <SkeletonList amount={10} />}
            {data?.data && !isLoading && (
                <div className="mt-4">
                    <StoryList storyList={data.data} />
                    <div className="flex justify-center mt-1 pt-2 pb-2">
                        <Pagination
                            prevPage={filters.page}
                            totalPage={data?.totalCount}
                            onClick={handlePaginationChange}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
