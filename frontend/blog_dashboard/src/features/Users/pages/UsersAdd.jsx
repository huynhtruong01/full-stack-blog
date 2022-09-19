import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usersApi from '../../../api/usersApi'
import { toastifyOption } from '../../../utils/toastify'
import { uploadImage } from '../../../utils/uploadImage'
import UsersForm from '../components/UsersForm'

UsersAdd.propTypes = {}

export function UsersAdd() {
    const navigate = useNavigate()
    const initValues = {
        username: '',
        fullname: '',
        avatar: '',
        email: '',
        password: '',
        role: '',
    }

    const handleAdd = async (values) => {
        try {
            const { avatar, ...otherValues } = values
            const avatarUrl = await uploadImage(values.avatar)

            const data = await usersApi.add({
                ...otherValues,
                avatar: avatarUrl.url,
            })

            toast.success(data?.message, {
                ...toastifyOption,
                onClose: () => navigate('/users'),
            })
        } catch (error) {
            toast.error('Create user failed', {
                ...toastifyOption,
            })
            console.log(error.message)
            throw new Error(error.message)
        }
    }

    return (
        <Box>
            <Box width="800px" m="auto">
                <UsersForm initValues={initValues} onSubmit={handleAdd} />
            </Box>
            <ToastContainer />
        </Box>
    )
}
