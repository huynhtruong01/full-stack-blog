import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import * as yup from 'yup'
import { ButtonFullWidth } from '../../../components/Buttons'
import { InputField } from '../../../components/FieldControl'
import { toastifyOption } from '../../../utils/toastify'

VerifyEmailForm.propTypes = {}

function VerifyEmailForm({ onSubmit = null }) {
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
    })

    const form = useForm({
        defaultValues: {
            email: '',
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
                    <InputField
                        name="email"
                        label="Email/Phone Number"
                        placeholder="abc@gmail.com/+084366773298"
                        form={form}
                        disabled={form?.formState?.isSubmitting}
                    />
                </Box>
                <ButtonFullWidth
                    txt="Verify email"
                    type="submit"
                    disabled={form?.formState?.isSubmitting}
                    color={blue}
                />
            </Box>
            <ToastContainer />
        </>
    )
}

export default VerifyEmailForm
