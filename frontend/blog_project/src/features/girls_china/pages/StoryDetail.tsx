import { Avatar, SkeletonDetail } from '@/components/common'
import { fetchByIdStory } from '@/utils/fetch_api'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export interface StoryDetailProps {}

export function StoryDetail(props: StoryDetailProps) {
    const { id }: any = useParams()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { data, isLoading }: any = useQuery([id], fetchByIdStory, {
        cacheTime: 0,
    })

    useEffect(() => {
        if (data) {
            document.title = `${data?.title} | H.Blog`
        }
    }, [data])

    const content = DOMPurify.sanitize(data?.content || '')

    return (
        <div className="w-full">
            {isLoading && <SkeletonDetail />}
            {data && (
                <div className="bg-white rounded border border-gray-200">
                    <div>
                        <div className="h-[370px] rounded overflow-hidden mb-4">
                            <img src={data?.avatarCover} alt={data?.fullname} />
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="mr-12 pr-12">
                                <Avatar imgUrl={data?.avatar} sizeAvatar="7xl" />
                                <h4 className="text-2xl font-semibold text-center mt-1 text-gray-900">
                                    {data?.fullname}
                                </h4>
                            </div>
                            <div>
                                <div className="flex mb-1.5 items-center">
                                    <span className="w-36 text-sm text-gray-500">Tên</span>
                                    <span className="font-semibold text-lg text-gray-900">
                                        {data?.fullname}
                                    </span>
                                </div>
                                <div className="flex mb-1.5 items-center">
                                    <span className="w-36 text-sm text-gray-500">Ngày sinh</span>
                                    <span className="font-semibold text-lg text-gray-900">
                                        {dayjs(data?.dateOfBirth).format('DD/MM/YYYY')}
                                    </span>
                                </div>
                                <div className="flex mb-1.5 items-center">
                                    <span className="w-36 text-sm text-gray-500">Nơi sinh</span>
                                    <span className="font-semibold text-lg text-gray-900">
                                        {data?.domicile}
                                    </span>
                                </div>
                                <div className="flex mb-1.5 items-center">
                                    <span className="w-36 text-sm text-gray-500">Quốc tịch</span>
                                    <span className="font-semibold text-lg text-gray-900">
                                        {data?.nationality}
                                    </span>
                                </div>
                                <div className="flex mb-1.5 items-center">
                                    <span className="w-36 text-sm text-gray-500">Nghề nghiệp</span>
                                    <span className="font-semibold text-lg text-gray-900">
                                        {data?.occupation}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 px-4 py-2">
                        <div className='relative py-4 before:content-[""] before:w-[100%] before:h-[1px] before:bg-gray-300 before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%]'>
                            <h2 className="text-center font-bold text-gray-900 text-3xl">
                                {data?.title}
                            </h2>
                            <p className="text-right text-sm text-gray-400 font-semibold mt-2 mr-8">
                                {dayjs(data?.createdAt).format('DD/MM/YYYY')}
                            </p>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: content }} className="mt-8" />
                    </div>
                </div>
            )}
        </div>
    )
}
