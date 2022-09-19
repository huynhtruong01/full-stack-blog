import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import authApi from '../../../api/authApi'
import { TitleForm } from '../../../components/common'
import { toastifyOption } from '../../../utils/toastify'
import LoginForm from '../components/LoginForm'

Login.propTypes = {}

export function Login() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    useEffect(() => {
        const users = queryClient.getQueryData('users')
        if (users?.accessToken) navigate('/')
    }, [])

    const handleSubmit = async (values) => {
        try {
            const data = await authApi.login(values)

            // save local storage
            localStorage.setItem('users', JSON.stringify(data))

            queryClient.setQueryData('users', data)
            queryClient.invalidateQueries('users')

            toast.success(data?.message, {
                ...toastifyOption,
                onClose: () => navigate('/'),
            })
        } catch (error) {
            toast.error(error.message, {
                ...toastifyOption,
            })
            throw new Error(error.message)
        }
    }

    return (
        <Box display="flex" justifyContent="center">
            <Box width="380px" p="22px 18px" backgroundColor="#fff" borderRadius="8px">
                <TitleForm txt="Login" mb={4} />
                <LoginForm onSubmit={handleSubmit} />
            </Box>
            <ToastContainer />
        </Box>
    )
}
