import { blogsApi } from '@/api'
import { CreateAndEditBlogForm, ModalLoading } from '@/components/common'
import { uploadImage } from '@/utils/common'
import { BlogData } from '@/utils/interface'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export interface CreateBlogProps {}

interface CreateBlogValues {
    title: string
    description: string
    category: string
    content: string
    thumbnail: any
}

export function CreateBlog(props: CreateBlogProps) {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const users: any = queryClient.getQueryData(['users'])
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const initValues: BlogData = {
        title: '',
        description: '',
        thumbnail: '',
        content: '',
        category: '',
    }

    useEffect(() => {
        window.document.title = 'Tạo bài viết | H.Blog'
    }, [])

    const handleSubmit = async (values: CreateBlogValues) => {
        setOpen(true)
        try {
            let thumbnail = values?.thumbnail
            if (typeof values?.thumbnail !== 'string') {
                const { url }: any = await uploadImage(values?.thumbnail)
                thumbnail = url
            }

            const newValues = { ...values, user: users?.user?._id, thumbnail }
            await blogsApi.add(newValues)

            toast.success('Tạo bài viết thành công', {
                autoClose: 2000,
                theme: 'colored',
            })

            setTimeout(() => navigate('/'), 3000)
        } catch (error: any) {
            console.log(error)
            toast.error(error, {
                autoClose: 2000,
                theme: 'colored',
            })
        }

        setOpen(false)
    }

    return (
        <section className="bg-white rounded">
            <div>
                <div>
                    <span className="text-2xl leading-normal text-gray-800 font-bold tracking-wide">
                        Tạo bài viết
                    </span>
                </div>
                <div className="mt-1">
                    <span className="text-gray-400 text-lg leading-normal font-thin">
                        Đăng bài viết lên trang
                    </span>
                </div>
            </div>
            <div className="mt-6">
                <CreateAndEditBlogForm onSubmit={handleSubmit} initValues={initValues} />
            </div>
            <ModalLoading open={open} setOpen={setOpen} />
            <ToastContainer />
        </section>
    )
}
