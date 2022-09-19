import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import blogsApi from '../../../api/blogsApi'
import { toastifyOption } from '../../../utils/toastify'
import { uploadImage } from '../../../utils/uploadImage'
import BlogsForm from '../components/BlogsForm'

BlogsAdd.propTypes = {}

export function BlogsAdd() {
    const navigate = useNavigate()
    const initValues = {
        user: '',
        thumbnail: '',
        title: '',
        description: '',
        content: '',
        category: '',
    }

    const handleAdd = async (values) => {
        try {
            const { thumbnail, ...otherValues } = values
            const thumbnailUrl = await uploadImage(thumbnail)

            await blogsApi.add({
                ...otherValues,
                thumbnail: thumbnailUrl.url,
            })

            toast.success('Create blog successfully', {
                ...toastifyOption,
                onClose: () => navigate('/blogs'),
            })
        } catch (error) {
            toast.error('Create blog failed', {
                ...toastifyOption,
            })
            throw new Error(error.message)
        }
    }

    return (
        <Box>
            <Box width="800px" m="auto">
                <BlogsForm initValues={initValues} onSubmit={handleAdd} />
            </Box>
            <ToastContainer />
        </Box>
    )
}
