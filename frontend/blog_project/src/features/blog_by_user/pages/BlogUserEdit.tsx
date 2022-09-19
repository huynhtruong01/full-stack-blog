import { blogsApi } from '@/api'
import { CreateAndEditBlogForm, LoadingSpinner } from '@/components/common'
import { uploadImage } from '@/utils/common'
import { fetchBlogById } from '@/utils/fetch_api'
import { BlogData } from '@/utils/interface'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export interface BlogUserEditProps {}

export function BlogUserEdit(props: BlogUserEditProps) {
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Chỉnh sửa bài viết | H.Blog'
    }, [])

    const { data, isLoading } = useQuery([id], fetchBlogById, {
        cacheTime: 0,
    })

    const handleEdit = async (values: BlogData) => {
        try {
            let thumbnail = values?.thumbnail
            if (typeof values?.thumbnail !== 'string') {
                const { url }: any = await uploadImage(values?.thumbnail)
                thumbnail = url
            }

            await blogsApi.update({ ...values, _id: id, thumbnail })

            toast.success('Cập nhập bài viết thành công', {
                autoClose: 2000,
                theme: 'colored',
            })

            setTimeout(() => navigate('/account/account-blog-list'), 3000)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    return (
        <div>
            {isLoading && <LoadingSpinner />}
            {data && <CreateAndEditBlogForm onSubmit={handleEdit} initValues={data} />}
            <ToastContainer />
        </div>
    )
}
