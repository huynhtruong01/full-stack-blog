import { SkeletonList } from '@/components/common'
import { Pagination, Search, SelectSearch } from '@/components/filters'
import { fetchAllCategoryNotFilter, getAllAccountBlog } from '@/utils/fetch_api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import queryString from 'query-string'
import { useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BlogUserList } from './components'

export interface BlogByUserProps {}

export function BlogByUser(props: BlogByUserProps) {
    const location = useLocation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const users: any = queryClient.getQueryData(['users'])

    useEffect(() => {
        window.document.title = 'Các bài viết của bạn | H.Blog'
        const search = queryString.parse(location.search)
        const params = queryString.stringify({ limit: 10, page: 1, ...search })
        navigate({
            pathname: location.pathname,
            search: `?${params}`,
        })

        window.scrollTo(0, 0)
    }, [])

    const filters = useMemo(() => {
        console.log(location.search)
        const params: any = queryString.parse(location?.search)
        console.log(params)

        return {
            ...params,
            limit: Number.parseInt(params?.limit) || 10,
            page: Number.parseInt(params?.page) || 1,
        }
    }, [location.search])

    const { data, refetch, isLoading }: any = useQuery(
        [{ ...filters, id: users?.user?._id }],
        getAllAccountBlog,
        {
            staleTime: 3 * 60 * 1000,
        }
    )

    useEffect(() => {
        refetch()
    }, [filters])

    const categoryList = useQuery(['category-list-for-user-blog'], fetchAllCategoryNotFilter, {
        staleTime: Infinity,
    })

    const handlePageClick = (page: number) => {
        const newFilters = { ...filters, page }
        const params = queryString.stringify(newFilters)

        navigate({
            pathname: location.pathname,
            search: `?${params}`,
        })
    }

    const handleSearchChange = (value: string) => {
        const newFilters: any = { ...filters }
        let params

        if (value === '') {
            delete newFilters['search']
            params = queryString.stringify(newFilters)
        } else {
            params = queryString.stringify({ ...newFilters, search: value, page: 1 })
        }

        navigate({
            pathname: location.pathname,
            search: `?${params}`,
        })
    }

    const handleCategoryChange = (value: string) => {
        const newFilters: any = { ...filters }
        console.log(newFilters)
        let params: any
        if (value === '') {
            delete newFilters['category']
            params = queryString.stringify(newFilters)
        } else {
            params = queryString.stringify({ ...newFilters, category: value })
        }

        navigate({
            pathname: location.pathname,
            search: `?${params}`,
        })
    }

    return (
        <div className="w-full bg-white py-3">
            <div className="mb-5 flex items-center gap-4">
                <div className="w-[280px]">
                    <Search
                        valueSearch={filters?.search || ''}
                        onChange={handleSearchChange}
                        placeholder={`Nhập tiêu đề bài viết\u2026`}
                    />
                </div>
                <div>
                    <SelectSearch
                        category={filters?.category || ''}
                        valueList={categoryList?.data}
                        onChange={handleCategoryChange}
                        placeholder={`-- Chọn tất cả --`}
                    />
                </div>
            </div>

            <>
                {isLoading && <SkeletonList amount={9} />}
                {data && !isLoading && <BlogUserList blogList={data?.data} />}
                {data?.data?.length === 0 && categoryList?.data && (
                    <p className="text-center text-gray-600">
                        Không có bài viết nào ở đây. Vui lòng tạo bài viết{' '}
                        <span>
                            <Link
                                to="/create-blog"
                                className="inline text-blue-400 font-medium hover:text-blue-700 hover:underline"
                            >
                                tại đây
                            </Link>
                        </span>
                    </p>
                )}
                {data?.data?.length > 0 && categoryList?.data && (
                    <div className="py-4 flex justify-center">
                        <Pagination
                            prevPage={filters.page}
                            totalPage={data?.totalCount}
                            onClick={handlePageClick}
                        />
                    </div>
                )}
            </>
        </div>
    )
}
