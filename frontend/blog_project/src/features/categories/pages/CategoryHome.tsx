import { LoadingSpinner } from '@/components/common'
import { Pagination } from '@/components/filters'
import { fetchAllCategory } from '@/utils/fetch_api'
import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CategoryList } from '../components'

export interface CategoryHomeProps {}

export function CategoryHome(props: CategoryHomeProps) {
    const location = useLocation()
    const navigate = useNavigate()

    const filters = useMemo(() => {
        const params: any = queryString.parse(location.search)

        return {
            ...params,
            limit: Number.parseInt(params?.limit) || 10,
            page: Number.parseInt(params?.page) || 1,
        }
    }, [location.search])

    useEffect(() => {
        document.title = 'Danh mục | H.Blog'
    })

    useEffect(() => {
        navigate({ pathname: location.pathname, search: `${queryString.stringify(filters)}` })
    }, [])

    const { data, isLoading } = useQuery([{ ...filters, type: 'categories' }], fetchAllCategory)

    const handlePaginationChange = (page: number) => {
        const newFilters = { ...filters, page }
        navigate({
            pathname: location.pathname,
            search: `${queryString.stringify(newFilters)}`,
        })
    }

    return (
        <div>
            {isLoading && <LoadingSpinner />}
            {data?.data?.length && (
                <>
                    <div className="mb-4">
                        <CategoryList categoryList={data?.data} />
                    </div>
                    <div className="flex justify-center items-center pt-8 pb-6">
                        <Pagination
                            prevPage={filters?.page}
                            totalPage={data?.totalCount}
                            onClick={handlePaginationChange}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
