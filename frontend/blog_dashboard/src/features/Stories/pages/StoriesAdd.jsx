import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import storiesApi from '../../../api/storiesApi'
import { toastifyOption } from '../../../utils/toastify'
import { uploadImage } from '../../../utils/uploadImage'
import StoriesForm from '../components/StoriesForm'

StoriesAdd.propTypes = {}

export function StoriesAdd() {
    const navigate = useNavigate()
    const initValues = {
        fullname: '',
        avatar: '',
        avatarCover: '',
        dateOfBirth: '',
        domicile: '',
        occupation: '',
        nationality: '',
        title: '',
        description: '',
        content: '',
        urlSocial: '',
    }

    const handleAdd = async (values) => {
        try {
            const { avatar, avatarCover, ...otherValues } = values
            const avatarUrl = await uploadImage(values.avatar)
            const avatarCoverUrl = await uploadImage(values.avatarCover)

            await storiesApi.add({
                ...otherValues,
                avatar: avatarUrl.url,
                avatarCover: avatarCoverUrl.url,
            })

            toast.success('Create story successfully', {
                ...toastifyOption,
                onClose: () => navigate('/stories'),
            })
        } catch (error) {
            toast.error('Create story failed', {
                ...toastifyOption,
            })
            throw new Error(error.message)
        }
    }

    return (
        <Box>
            <Box width="800px" m="auto">
                <StoriesForm initValues={initValues} onSubmit={handleAdd} />
            </Box>
            <ToastContainer />
        </Box>
    )
}
