import { yupResolver } from '@hookform/resolvers/yup'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { Box } from '@mui/material'
import { blue } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useLocation, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { ButtonFullWidth } from '../../../components/Buttons'
import {
    InputField,
    PasswordField,
    SelectField,
    UploadImageField,
} from '../../../components/FieldControl'
import { fetchRoles } from '../../../utils/fetchData'

UsersForm.propTypes = {
    initValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
}

function UsersForm({ initValues, onSubmit = null }) {
    const { id } = useParams()

    const schema = yup.object().shape({
        username: yup
            .string()
            .required('Please enter user name')
            .min(5, 'Please enter user name at least five characters'),
        fullname: yup
            .string()
            .required('Please enter full name')
            .test(
                'at-least-two-words',
                'Please enter at least two words',
                (value) => value.split(' ').filter((x) => !!x && x.length > 2).length >= 2
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
        checkPassword: yup.string(),
        password: yup.string().when('checkPassword', {
            is: (value) => value !== '',
            then: yup.string(),
            otherwise: yup
                .string()
                .required('Please enter password')
                .min(6, 'Please enter at least six characters')
                .max(20, 'Please enter maximum twenty characters'),
        }),
        role: yup.string().required('Please choose role for this account'),
    })

    const form = useForm({
        defaultValues: {
            username: initValues.username,
            fullname: initValues.fullname,
            avatar: initValues.avatar,
            email: initValues.email,
            password: initValues.password || '',
            role: initValues?.role?._id || initValues.role,
            checkPassword: id || '',
        },
        resolver: yupResolver(schema),
    })

    const result = useQuery('fetch-roles', fetchRoles)

    const handleSubmit = async (values) => {
        // console.log(values)
        if (!onSubmit) return
        try {
            if (id) {
                await onSubmit({ ...values, _id: id })
            } else {
                await onSubmit(values)
            }

            // form.reset()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box>
            {result?.data && (
                <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
                    <Box mb="16px">
                        <input type="text" name="checkPassword" hidden={true} />
                        <Box display="flex" columnGap={1}>
                            <Box flex={1}>
                                <InputField
                                    name="username"
                                    label="User Name"
                                    placeholder="atheticshuynh01"
                                    form={form}
                                    disabled={form.formState.isSubmitting}
                                />
                            </Box>
                            <Box flex={1}>
                                <InputField
                                    name="fullname"
                                    label="Full Name"
                                    placeholder="Athetics Huynh"
                                    form={form}
                                    disabled={form.formState.isSubmitting}
                                />
                            </Box>
                            <Box flex={1}>
                                <InputField
                                    name="email"
                                    label="Email"
                                    placeholder="abc@gmail.com"
                                    form={form}
                                    disabled={form.formState.isSubmitting}
                                />
                            </Box>
                        </Box>
                        <Box display="flex" columnGap={1}>
                            <Box flex={1}>
                                <PasswordField
                                    name="password"
                                    label="Password"
                                    form={form}
                                    disabled={form.formState.isSubmitting}
                                />
                            </Box>
                            <Box flex={1}>
                                <SelectField
                                    name="role"
                                    label="Role"
                                    form={form}
                                    disabled={form.formState.isSubmitting}
                                    values={result?.data?.roleList}
                                />
                            </Box>
                        </Box>
                        <UploadImageField
                            name="avatar"
                            label="Avatar"
                            form={form}
                            disabled={form.formState.isSubmitting}
                        />
                    </Box>

                    <ButtonFullWidth
                        txt={id ? 'Edit user' : 'Create user'}
                        icon={id ? EditIcon : AddIcon}
                        color={blue}
                        type="submit"
                        disabled={form.formState?.isSubmitting}
                    />
                </Box>
            )}
        </Box>
    )
}

export default UsersForm
