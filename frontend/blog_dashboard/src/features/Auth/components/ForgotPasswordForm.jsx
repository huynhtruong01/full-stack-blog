import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import * as yup from 'yup'
import { ButtonFullWidth } from '../../../components/Buttons'
import { PasswordField } from '../../../components/FieldControl'
import { toastifyOption } from '../../../utils/toastify'

ForgotPasswordForm.propTypes = {}

function ForgotPasswordForm({ onSubmit = null }) {
    const { pathname } = useLocation()
    const schema = yup.object().shape({
        newPassword: yup
            .string()
            .required('Please enter new password')
            .min(6, 'Please enter new password at least six characters'),
        confirmPassword: yup
            .string()
            .required('Please enter confirm password')
            .oneOf([yup.ref('newPassword')], 'Confirm password incorrect'),
    })

    const form = useForm({
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values) => {
        if (!onSubmit) return
        try {
            await onSubmit(values)
            form.reset()
        } catch (error) {
            toast.error(error || error.message, {
                ...toastifyOption,
            })
        }
    }

    return (
        <>
            <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
                <Box mb="16px">
                    <PasswordField
                        name="newPassword"
                        label="New Password"
                        form={form}
                        disabled={form?.formState?.isSubmitting}
                    />
                    <PasswordField
                        name="confirmPassword"
                        form={form}
                        label="Confirm Password"
                        disabled={form?.formState?.isSubmitting}
                    />
                </Box>
                <ButtonFullWidth
                    txt={`${
                        pathname === '/forgot-password' ? 'Reset password' : 'Change password'
                    }`}
                    type="submit"
                    disabled={form?.formState?.isSubmitting}
                    color={blue}
                />
            </Box>
            <ToastContainer />
        </>
    )
}

export default ForgotPasswordForm
