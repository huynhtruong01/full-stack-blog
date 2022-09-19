import { blogsApi, usersApi } from '@/api'
import { Avatar, SkeletonDetail } from '@/components/common'
import { fetchBlogById } from '@/utils/fetch_api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'
import { useEffect, useState } from 'react'
import { AiFillFolderAdd, AiFillLike } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'

export interface BlogsDetailProps {}

export function BlogsDetail(props: BlogsDetailProps) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { id }: any = useParams()
    const queryClient = useQueryClient()
    const users: any = queryClient.getQueryData(['users'])
    const { data, isLoading, refetch }: any = useQuery([id], fetchBlogById, {
        cacheTime: 0,
    })

    const [isLike, setIsLike] = useState<boolean>(() => data?.likes?.includes(users?.user?._id))
    const [like, setLike] = useState<number>(() => data?.likes?.length)
    const [isSaveBlog, setIsSaveBlog] = useState<boolean>(() =>
        data?.user?.saveBlog?.includes(data?._id)
    )
    const [isFollow, setIsFollow] = useState<boolean>(() =>
        data?.user?.follows?.includes(users?.user?._id)
    )

    // console.log(data)

    useEffect(() => {
        if (data)
            window.document.title = `${data?.title?.split(' ')?.slice(0, 4).join(' ')} | H.Blog`
    }, [data])

    useEffect(() => {
        if (!isLoading) {
            setLike(data?.likes?.length)
            setIsLike(data?.likes?.includes(users?.user?._id))
            setIsSaveBlog(data?.user?.savedBlog?.includes(data?._id))
            setIsFollow(data?.user?.followers?.includes(users?.user?._id))
        } else {
            setLike(0)
            setIsLike(false)
            setIsSaveBlog(false)
            setIsSaveBlog(false)
        }
    }, [isLoading, data])

    const content = DOMPurify.sanitize(data?.content || '')

    // like
    const handleLikeClick = async () => {
        try {
            if (!isLike) {
                setLike((prev: number) => prev + 1)
                setIsLike(true)
                await blogsApi.like({ blogId: data?._id, userId: users?.user?._id })
            } else {
                setLike((prev: number) => prev - 1)
                setIsLike(false)
                await blogsApi.unlike({ blogId: data?._id, userId: users?.user?._id })
            }

            refetch()
        } catch (error: any) {
            console.log(error)
        }
    }

    // follow
    const handleFollowClick = async () => {
        try {
            if (isFollow) {
                setIsFollow(false)
                await usersApi.unfollow({ id: users?.user?._id, userId: data?.user?._id })
            } else {
                setIsFollow(true)
                await usersApi.follow({ id: users?.user?._id, userId: data?.user?._id })
            }

            // update information user
            const user = await usersApi.getById(users?.user?._id)
            localStorage.setItem('users', JSON.stringify({ ...users, user: user?.data }))
            queryClient.setQueryData(['users'], { ...users, user: user?.data })

            refetch()
        } catch (error: any) {
            console.log(error)
        }
    }

    // save blog
    const handleSaveBlogClick = async () => {
        try {
            if (isSaveBlog) {
                setIsSaveBlog(false)
                await blogsApi.unsave({ blogId: data?._id, userId: users?.user?._id })
            } else {
                setIsSaveBlog(true)
                await blogsApi.save({ blogId: data?._id, userId: users?.user?._id })
            }

            refetch()
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <div>
            {isLoading && <SkeletonDetail />}
            {data && !isLoading && (
                <div className="bg-white rounded border border-gray-200">
                    <div>
                        <div className="h-[370px] rounded overflow-hidden mb-4">
                            <img src={data?.thumbnail} alt={data?.title} />
                        </div>
                        <div className="flex mx-12 justify-between">
                            <div className="flex px-2 items-center">
                                <div className="mr-3">
                                    <Link to={`/profile/${data?.user?._id}`}>
                                        <Avatar
                                            imgUrl={data?.user?.avatar}
                                            nameAvatar={data?.user?.fullname}
                                            sizeAvatar="lg"
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <Link to={`/profile/${data?.user?._id}`}>
                                        <span className="text-gray-900 leading-none text-xl font-bold hover:text-blue-700 hover:underline">
                                            {data?.user?.username}
                                        </span>
                                    </Link>
                                    <div className="text-sm leading-none text-gray-500">
                                        {data?.user?.fullname}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <button
                                        className={`flex items-center px-4 py-2 ${
                                            isFollow
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white text-blue-500 hover:bg-blue-50'
                                        } rounded border border-blue-500 font-medium ease-in-out duration-200`}
                                        onClick={handleFollowClick}
                                    >
                                        <FaUser className="mr-2 text-[22px]" />
                                        {isFollow ? 'Đã theo dõi' : 'Theo dõi'}
                                    </button>
                                </div>
                                <div className="mr-2">
                                    <button
                                        className={`flex items-center px-4 py-2 ${
                                            isLike
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white text-blue-500 hover:bg-blue-50'
                                        } rounded border border-blue-500 font-medium ease-in-out duration-200`}
                                        onClick={handleLikeClick}
                                    >
                                        <AiFillLike className="mr-2 text-[22px]" />
                                        {isLike ? 'Đã thích' : 'Thích'}
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className={`flex items-center px-4 py-2 ${
                                            isSaveBlog
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white text-blue-500 hover:bg-blue-50'
                                        } rounded border border-blue-500 font-medium ease-in-out duration-200`}
                                        onClick={handleSaveBlogClick}
                                    >
                                        <AiFillFolderAdd className="mr-2 text-[22px]" />
                                        {isSaveBlog ? 'Đã lưu' : 'Lưu bài viết'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 px-4 py-2">
                        <div className='relative py-4 pb-2 before:content-[""] before:w-[100%] before:h-[1px] before:bg-gray-300 before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%]'>
                            <h2 className="text-center font-bold text-gray-900 text-4xl w-[820px] m-auto">
                                {data?.title}
                            </h2>
                            <div className="flex justify-end items-end px-6 mt-4">
                                <div className="flex mr-4">
                                    <span className="text-gray-900 font-semibold text-sm mr-1">
                                        {like || '0'}
                                    </span>
                                    <div className="p-1 rounded bg-blue-700 cursor-pointer">
                                        <AiFillLike className="text-white text-[12px]" />
                                    </div>
                                </div>
                                <span className="text-right text-sm text-gray-400 font-medium">
                                    {dayjs(data?.createdAt).format('DD/MM/YYYY')}
                                </span>
                            </div>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: content }} className="mt-8" />
                    </div>
                </div>
            )}
        </div>
    )
}
