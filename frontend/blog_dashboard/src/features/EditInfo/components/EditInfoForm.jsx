import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    InputField,
    PasswordField,
    TextAreaField,
    UploadImageField,
} from '../../../components/FieldControl'
import { ButtonFullWidth } from '../../../components/Buttons'
import { blue } from '@mui/material/colors'
import { toastifyOption } from '../../../utils/toastify'
import { toast, ToastContainer } from 'react-toastify'
import { formatMultiFirstText } from '../../../utils/typography'

EditInfoForm.propTypes = {
    initValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
}

export function EditInfoForm({ initValues, onSubmit = null }) {
    const schema = yup.object().shape({
        username: yup
            .string()
            .required('Please enter user name')
            .test(
                'at-least-two-words',
                'Please enter at least two words',
                (value) => value.split(' ').filter((x) => !!x && x.length >= 3).length >= 1
            ),
        fullname: yup
            .string()
            .required('Please enter full name')
            .test(
                'at-least-two-words',
                'Please enter at least two words',
                (value) => value.split(' ').filter((x) => !!x && x.length >= 2).length >= 2
            ),
        avatar: yup
            .mixed()
            .required('Please choose avatar')
            .test('empty-image', 'Image is empty', (value) => value)
            .test('invalid-type', 'Invalid type', (value) => {
                const typeList = ['image/png', 'image/jpg', 'image/jpeg']
                return typeof value === 'string' || typeList.includes(value?.type)
            })
            .test(
                'max-size-image',
                'The largest image is 2MB',
                (value) => typeof value === 'string' || value?.size <= 2 * 1024 * 1024
            ),
        password: yup.string(),
        detail: yup.string(),
    })

    const form = useForm({
        defaultValues: {
            username: initValues?.username,
            fullname: formatMultiFirstText(initValues?.fullname),
            avatar: initValues?.avatar,
            password: '',
            detail: initValues?.detail,
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values) => {
        if (!onSubmit) return

        try {
            await onSubmit(values)
        } catch (error) {
            toast.error(error, {
                ...toastifyOption,
            })
        }
    }

    // console.log(initValues)

    return (
        <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
            <Typography component="h3" textAlign="center" fontSize="24px" fontWeight={600} mb={2}>
                Change Information
            </Typography>
            <Box>
                <InputField
                    name="username"
                    label="Username"
                    placeholder="abc01"
                    form={form}
                    disabled={form.formState.isSubmitting}
                />
                <InputField
                    name="fullname"
                    label="Full Name"
                    placeholder="Nguyen Van An"
                    form={form}
                    disabled={form.formState.isSubmitting}
                />
                <UploadImageField
                    form={form}
                    name="avatar"
                    label="Avatar"
                    disabled={form.formState.isSubmitting}
                />
                <PasswordField
                    name="password"
                    label="Password"
                    form={form}
                    disabled={form.formState.isSubmitting}
                />
                <TextAreaField
                    name="detail"
                    form={form}
                    label="Detail"
                    disabled={form.formState.isSubmitting}
                    placeholder="Write something..."
                />
            </Box>
            <ButtonFullWidth
                txt="Save Information"
                color={blue}
                disabled={form.formState.isSubmitting}
                type="submit"
            />
            <ToastContainer />
        </Box>
    )
}
