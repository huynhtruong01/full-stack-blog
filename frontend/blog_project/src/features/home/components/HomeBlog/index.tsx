import { fetchAllBlog } from '@/utils/fetch_api'
import { useQuery } from '@tanstack/react-query'
import { BlogHomeList, BlogHomeSkeleton } from './components'

export interface HomeBlogProps {}

export function HomeBlog(props: HomeBlogProps) {
    const { data, isLoading } = useQuery([{ limit: 4, page: 1 }], fetchAllBlog)

    // console.log(data)
    return (
        <div>
            {isLoading && <BlogHomeSkeleton />}
            {data?.data?.length > 0 && !isLoading && <BlogHomeList blogList={data?.data} />}
        </div>
    )
}
