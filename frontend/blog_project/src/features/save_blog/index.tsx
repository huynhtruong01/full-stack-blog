import { SkeletonList } from '@/components/common'
import { getAllSaveBlog } from '@/utils/fetch_api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import queryString from 'query-string'
import { useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SaveBlogList } from './components'

export interface SaveBlogProps {}

export function SaveBlog(props: SaveBlogProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const queryClient = useQueryClient()

    const users: any = queryClient.getQueryData(['users'])

    // console.log(users)

    useEffect(() => {
        window.document.title = 'Các bài viết đã lưu | H.Blog'
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const params = queryString.stringify({ limit: 10, page: 1 })
        navigate({
            pathname: location.pathname,
            search: `?${params}`,
        })
    }, [])

    const filters = useMemo(() => {
        const params: any = queryString.parse(location.search)

        return {
            ...params,
            limit: Number.parseInt(params?.limit) || 10,
            page: Number.parseInt(params?.page) || 1,
        }
    }, [location.search])

    const { data, isLoading, refetch } = useQuery(
        [{ id: users?.user?._id, type: 'save-blog', ...filters }],
        getAllSaveBlog,
        {
            cacheTime: 0,
        }
    )

    useEffect(() => {
        refetch()
    }, [filters])

    return (
        <section>
            {isLoading && <SkeletonList amount={9} />}
            {data?.data?.length === 0 && !isLoading && (
                <p className="text-center text-gray-500">
                    Không có bài viết nào đã lưu ở đây.{' '}
                    <Link
                        to="/blogs"
                        className="inline text-blue-500 hover:text-blue-700 font-medium duration-200 ease-in-out"
                    >
                        Nhấn vào đây để xem bài viết
                    </Link>
                </p>
            )}
            {data?.data?.length > 0 && (
                <div className="w-full bg-white rounded">
                    {<SaveBlogList blogList={data?.data} />}
                </div>
            )}
        </section>
    )
}
