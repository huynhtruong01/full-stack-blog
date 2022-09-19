import { truncateWords } from '@/utils/common'
import { StoryData } from '@/utils/interface'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

export interface StoryProps {
    story: StoryData
}

export function Story({ story }: StoryProps) {
    return (
        <div className="rounded border border-gray-200 pb-4">
            <Link to={`/girls-china/${story._id}`} className="group">
                <div className="relative h-56 overflow-hidden rounded-t">
                    <img
                        src={story.avatarCover}
                        alt={story.fullname}
                        className="rounded-t group-hover:scale-110 duration-200 ease-in-out"
                    />
                    <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center opacity-0 invisible group-hover:bg-black group-hover:bg-opacity-40 group-hover:visible group-hover:opacity-100 ease-in-out duration-200">
                        <span className="bg-blue-500 text-white p-3 rounded hover:bg-blue-700 font-medium ease-in-out duration-200">
                            Xem chi tiết
                        </span>
                    </div>
                </div>
            </Link>

            <div className="mt-2 px-4 py-2 pt-1">
                <div className="text-xs text-gray-400 mb-1">
                    <span>{dayjs(story.createdAt).format('DD/MM/YYYY')}</span>
                </div>
                <Link to={`/girls-china/${story._id}`}>
                    <h3 className="text-xl font-bold text-gray-900 hover:text-blue-700 hover:underline mt-2">
                        {truncateWords(story.title, 4)}
                    </h3>
                </Link>
                <p className="text-sm text-gray-500 pr-4">{truncateWords(story.description, 13)}</p>
            </div>
            {/* <div className="mt-3 flex justify-center">
                <Link to={`/girls-china/${story._id}`}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 duration-200 ease-in-out">
                        Xem chi tiết
                    </button>
                </Link>
            </div> */}
        </div>
    )
}
