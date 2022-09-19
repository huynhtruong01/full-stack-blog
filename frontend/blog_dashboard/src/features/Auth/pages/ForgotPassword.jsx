import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { toastifyOption } from '../../../utils/toastify'
import ForgotPasswordForm from '../components/ForgotPasswordForm'
import { useQueryClient } from 'react-query'
import authApi from '../../../api/authApi'
import { TitleForm } from '../../../components/common'

ForgotPassword.propTypes = {}

export function ForgotPassword() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    useEffect(() => {
        const users = queryClient.getQueryData('users')
        if (users?.accessToken) navigate('/')
    }, [])

    const handleSubmit = async (values) => {
        try {
            const modal = queryClient.getQueryData('modal')
            console.log(modal)
            const email = modal.email
            const newValues = { password: values.newPassword, email }

            const data = await authApi.forgotPassword(newValues)

            queryClient.setQueryData('modal', {
                ...modal,
                email: '',
            })
            queryClient.invalidateQueries('modal')

            toast.success(data?.message, {
                ...toastifyOption,
                onClose: () => navigate('/login'),
            })
        } catch (error) {
            throw new Error(error?.message)
        }
    }

    return (
        <Box display="flex" justifyContent="center">
            <Box width="380px" p="22px 18px" backgroundColor="#fff" borderRadius="8px">
                <TitleForm txt="Create New Password" mb={4} />
                <ForgotPasswordForm onSubmit={handleSubmit} />
            </Box>
            <ToastContainer />
        </Box>
    )
}
