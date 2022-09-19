import { Box, Typography } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import blogsApi from '../../../api/blogsApi'
import { Loading } from '../../../components/common'
import { fetchBlogById } from '../../../utils/fetchData'
import { toastifyOption } from '../../../utils/toastify'
import { uploadImage } from '../../../utils/uploadImage'
import BlogsForm from '../components/BlogsForm'

BlogsEdit.propTypes = {}

export function BlogsEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isLoading, error } = useQuery(id, fetchBlogById, {
        cacheTime: 0,
    })

    const handleUpdate = async (values) => {
        try {
            let thumbnail = values.thumbnail
            if (values.thumbnail && typeof values.thumbnail !== 'string') {
                const newThumbnail = await uploadImage(values.thumbnail)
                thumbnail = newThumbnail.url
            }

            await blogsApi.update({
                ...values,
                thumbnail,
            })

            toast.success('Update successfully', {
                ...toastifyOption,
                onClose: () => navigate('/blogs'),
            })
        } catch (error) {
            toast.error('Update failed', {
                ...toastifyOption,
            })
            throw new Error(error.message)
        }
    }
    // console.log(data)

    return (
        <Box>
            {isLoading && <Loading />}
            {data && !isLoading && (
                <Box width="800px" m="auto">
                    <BlogsForm initValues={data} onSubmit={handleUpdate} />
                </Box>
            )}
            {error && <Typography>Not found data</Typography>}
            <ToastContainer />
        </Box>
    )
}
