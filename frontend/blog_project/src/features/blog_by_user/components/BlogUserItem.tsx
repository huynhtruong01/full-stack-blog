import { blogsApi } from '@/api'
import { ButtonIcon } from '@/components/common'
import { truncateWords } from '@/utils/common'
import { BlogData } from '@/utils/interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import queryString from 'query-string'
import { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

export interface BlogUserItemProps {
    blog: BlogData
}

export function BlogUserItem({ blog }: BlogUserItemProps) {
    const location = useLocation()
    const queryClient = useQueryClient()

    const deleteBlog = useMutation(
        async (values: any) => {
            try {
                await blogsApi.remove(values?.id)
            } catch (error: any) {
                throw new Error(error)
            }
        },
        {
            onSuccess: () => {
                const users: any = queryClient.getQueryData(['users'])
                const keyBlogByUser: any = queryString.parse(location.search)
                console.log(keyBlogByUser)

                queryClient.invalidateQueries([
                    {
                        ...keyBlogByUser,
                        id: users?.user?._id,
                        limit: Number.parseInt(keyBlogByUser.limit) || 10,
                        page: Number.parseInt(keyBlogByUser.page) || 1,
                    },
                ])
            },
            onError: (error: any) => {
                throw new Error(error)
            },
            onSettled: () => {},
        }
    )

    const handleDeleteBlog = async (values: any) => {
        try {
            deleteBlog.mutate(values)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    const handleShowModal = () => {
        queryClient.setQueryData(['data-modal'], {
            title: 'Xóa bài viết',
            message: `Bạn có chắc chắn muốn xóa bài viết "${truncateWords(blog.title, 3)}"?`,
            values: {
                id: blog._id,
            },
            callback: handleDeleteBlog,
        })
        queryClient.invalidateQueries(['data-modal'])
    }

    return (
        <div className="w-full flex flex-col rounded border-2 border-gray-100">
            <Link to={`/blogs/${blog._id}`}>
                <div className="h-[185px] overflow-hidden rounded-t">
                    <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="rounded-t hover:scale-110 duration-200 ease-in-out"
                    />
                </div>
            </Link>
            <div className="pt-2 pb-1">
                <div className="px-4">
                    <div>
                        <span className="text-xs text-gray-400 font-medium">
                            {dayjs(blog.createdAt).format('DD/MM/YYYY')}
                        </span>
                    </div>
                    <Link to={`/blogs/${blog._id}`}>
                        <h3 className="text-xl font-bold text-gray-800 hover:text-blue-700 hover:underline mt-2">
                            {truncateWords(blog.title, 4)}
                        </h3>
                    </Link>
                    <p className="text-sm text-gray-500">{truncateWords(blog.description, 12)}</p>
                </div>
                <div className="flex justify-center items-center gap-3 p-2 mt-2">
                    <ButtonIcon
                        name="Xóa"
                        icon={MdDelete}
                        colorBg="red"
                        callback={handleShowModal}
                    />
                    <Link to={`/account/account-blog-list/${blog._id}`}>
                        <ButtonIcon name="Chỉnh sửa" icon={MdEdit} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
