import { BlogList, LoadingSpinner, SkeletonList } from '@/components/common'
import { Pagination } from '@/components/filters'
import { fetchAllBlog } from '@/utils/fetch_api'
import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FiltersBlog } from '../components'

export interface BlogsHomeProps {}

export function BlogsHome(props: BlogsHomeProps) {
    const location: { pathname: string; search: string } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        window.document.title = 'Blog | H.Blog'
        const search = queryString.parse(location.search)
        const params = queryString.stringify({ limit: 10, page: 1, ...search })

        navigate({
            pathname: location.pathname,
            search: `?${params}`,
        })
    }, [])

    const filters = useMemo(() => {
        const params: any = queryString.parse(location.search)

        return {
            ...params,
            limit: Number.parseInt(params.limit) || 10,
            page: Number.parseInt(params.page) || 1,
        }
    }, [location.search])

    const { data, isLoading, refetch }: any = useQuery(
        [{ ...filters, type: 'blog' }],
        fetchAllBlog,
        {
            cacheTime: 0,
        }
    )

    useEffect(() => {
        refetch()
    }, [filters])

    const handlePaginationChange = (page: number) => {
        const params = queryString.stringify({ ...filters, page })
        navigate({
            pathname: location.pathname,
            search: `?${params}`,
        })
    }

    const handleFiltersChange = (filters: any) => {
        const params = queryString.stringify(filters)
        navigate({
            pathname: location.pathname,
            search: `?${params}`,
        })
    }

    // console.log(data)

    return (
        <div className="bg-white rounded">
            <div className="mb-3">
                <FiltersBlog filters={filters} onChange={handleFiltersChange} />
            </div>
            {isLoading && <SkeletonList amount={9} />}
            {data && (
                <div className="mt-3">
                    <BlogList blogList={data.data} />
                    <div className="flex justify-center mt-2 pt-3 pb-4">
                        <Pagination
                            prevPage={filters.page}
                            totalPage={data.totalCount}
                            onClick={handlePaginationChange}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
