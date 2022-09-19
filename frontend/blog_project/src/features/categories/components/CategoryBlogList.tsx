import { BlogList, LoadingSpinner } from '@/components/common'
import { fetchBlogByCategory } from '@/utils/fetch_api'
import { useQuery } from '@tanstack/react-query'

export interface CategoryBlogListProps {
    id: string
}

export function CategoryBlogList({ id }: CategoryBlogListProps) {
    const { data, isLoading } = useQuery([{ id }], fetchBlogByCategory, {})

    return (
        <div>
            {isLoading && <LoadingSpinner />}
            {data?.data?.length > 0 && <BlogList blogList={data?.data} />}
        </div>
    )
}
