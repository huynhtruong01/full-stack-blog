import { yupResolver } from '@hookform/resolvers/yup'
import LoginIcon from '@mui/icons-material/Login'
import { Box } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
import { ButtonFullWidth } from '../../../components/Buttons'
import { InputField, PasswordField } from '../../../components/FieldControl'
import { toastifyOption } from '../../../utils/toastify'

LoginForm.propTypes = {}

function LoginForm({ onSubmit = null }) {
    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Please enter email/phone number')
            .test('invalid-email-phone-number', 'Invalid email or phone number', (value) => {
                const reEmail =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                const rePhoneNumber = /^[+]/g

                if (reEmail.test(value) || rePhoneNumber.test(value)) return value

                return false
            }),
        password: yup
            .string()
            .required('Please enter password')
            .min(6, 'Please enter password at least six characters'),
    })

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values) => {
        if (!onSubmit) return
        try {
            await onSubmit(values)
            form.reset()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
                <Box mb="16px">
                    <InputField
                        name="email"
                        label="Email/Phone Number"
                        form={form}
                        placeholder="abc@gmail.com/+084366773298"
                        disabled={form?.formState?.isSubmitting}
                    />
                    <PasswordField
                        name="password"
                        form={form}
                        label="Password"
                        disabled={form?.formState?.isSubmitting}
                    />
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        sx={{
                            span: {
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                color: grey[600],
                                transition: '.2s ease-in-out',

                                '&:hover': {
                                    color: grey[800],
                                },
                            },
                        }}
                    >
                        <Link to="/verify-email">
                            <span>Forgot password?</span>
                        </Link>
                    </Box>
                </Box>
                <ButtonFullWidth
                    txt="Login"
                    icon={LoginIcon}
                    type="submit"
                    disabled={form?.formState?.isSubmitting}
                    color={blue}
                />
            </Box>
            <ToastContainer />
        </>
    )
}

export default LoginForm
