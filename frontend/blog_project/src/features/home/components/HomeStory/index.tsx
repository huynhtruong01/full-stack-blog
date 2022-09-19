import { SkeletonList } from '@/components/common'
import { fetchAllStory } from '@/utils/fetch_api'
import { useQuery } from '@tanstack/react-query'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { StoryHomeList } from './components'

export interface HomeStoryProps {}

export function HomeStory(props: HomeStoryProps) {
    const { data, isLoading }: any = useQuery(
        [{ limit: 10, page: 1, type: 'home-story' }],
        fetchAllStory
    )

    // console.log(data)

    return (
        <div>
            <div className="flex py-4 items-center justify-between mb-2">
                <h3 className="text-3xl font-bold text-gray-900">Các tỷ tỷ trung quốc</h3>
                <div className="font-medium text-gray-700">
                    <Link
                        to="/categories"
                        className="group flex items-center hover:text-blue-500 hover:underline"
                    >
                        Xem thêm{' '}
                        <MdKeyboardArrowRight className="opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:ml-1 ease-in-out duration-200" />
                    </Link>
                </div>
            </div>
            <div>
                {isLoading && <SkeletonList amount={4} />}
                {data?.data?.length > 0 && !isLoading && (
                    <StoryHomeList storyList={data.data.slice(0, 4)} />
                )}
            </div>
        </div>
    )
}
