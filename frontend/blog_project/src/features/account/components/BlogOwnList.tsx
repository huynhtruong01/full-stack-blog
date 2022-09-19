import { LoadingSpinner, SkeletonColList } from '@/components/common'
import { blogOwnList } from '@/utils/fetch_api'
import { useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router-dom'
import { BlogOwnItem } from './BlogOwnItem'

export interface BlogOwnListProps {
    user: any
}

export function BlogOwnList({ user }: BlogOwnListProps) {
    const location = useLocation()
    const { data, isLoading } = useQuery(['blog-list-own'], async () => {
        try {
            const data = await blogOwnList({ limit: 10, id: user?._id })
            return data
        } catch (error: any) {
            throw new Error(error)
        }
    })

    // console.log(data)

    return (
        <div className="sticky top-[96px] w-full border border-gray-200 bg-white rounded">
            <div className="py-3 px-6 bg-blue-500 rounded-t">
                <h3 className="text-lg font-bold text-white">Danh sách các bài viết của bạn</h3>
            </div>

            <div className="py-5 px-5">
                {data?.length === 0 && (
                    <p className="text-center text-gray-500">Bạn không có bài viết nào 😥😥😥</p>
                )}
                {isLoading && <SkeletonColList amount={5} />}
                {data && data?.length > 0 && !isLoading && (
                    <>
                        <div>
                            {data?.map((blog: any) => (
                                <BlogOwnItem blog={blog} key={blog._id} />
                            ))}
                        </div>
                        <div className="mt-6 flex justify-center">
                            <Link
                                to={`${location?.pathname}/account-blog-list`}
                                className="text-blue-500 font-medium py-2 px-5 border border-blue-500 rounded hover:bg-blue-500 hover:text-white ease-in-out duration-200"
                            >
                                Xem chi tiết
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
