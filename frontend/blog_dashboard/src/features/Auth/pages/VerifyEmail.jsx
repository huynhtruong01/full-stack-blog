import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import authApi from '../../../api/authApi'
import { TitleForm } from '../../../components/common'
import VerifyEmailForm from '../components/VerifyEmailForm'

VerifyEmail.propTypes = {}

export function VerifyEmail() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    useEffect(() => {
        const users = queryClient.getQueryData('users')
        if (users?.accessToken) navigate('/')
    }, [])

    const verifyEmail = useMutation(
        async (values) => {
            await authApi.verifyEmail(values)
            return values
        },
        {
            onSuccess: (data) => {
                // set email query
                const modal = queryClient.getQueryData('modal')
                queryClient.setQueryData('modal', {
                    ...modal,
                    email: data.email,
                })
                queryClient.invalidateQueries('modal')
                navigate('/forgot-password')
            },
            onError: (error) => {
                throw new Error(error.message)
            },
        }
    )

    const handleSubmit = async (values) => {
        try {
            verifyEmail.mutate(values)
        } catch (error) {
            throw new Error(error?.message)
        }
    }

    return (
        <Box display="flex" justifyContent="center">
            <Box width="380px" p="22px 18px" backgroundColor="#fff" borderRadius="8px">
                <TitleForm txt="Verify email" mb={4} />
                <VerifyEmailForm onSubmit={handleSubmit} />
            </Box>
            <ToastContainer />
        </Box>
    )
}
