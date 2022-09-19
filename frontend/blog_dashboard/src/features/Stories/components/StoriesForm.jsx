import { yupResolver } from '@hookform/resolvers/yup'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { Box } from '@mui/material'
import { blue } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { ButtonFullWidth } from '../../../components/Buttons'
import {
    DatePickerField,
    EditorField,
    InputField,
    TextAreaField,
    UploadImageField,
} from '../../../components/FieldControl'

StoriesForm.propTypes = {
    initValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
}

function StoriesForm({ initValues, onSubmit = null }) {
    const { id } = useParams()
    const schema = yup.object().shape({
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
        avatarCover: yup
            .mixed()
            .required('Please enter avatar cover')
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
        dateOfBirth: yup
            .date()
            .required('Please choose data of birth')
            .test(
                'invalid-date',
                'Date of birth incorrect or date must be less than date now',
                (value) => new Date(value).getTime() <= Date.now()
            )
            .typeError('Invalid type or date is empty'),
        domicile: yup
            .string()
            .required('Please enter domicile')
            .test(
                'at-least-four-words',
                'Please enter domicile at least four words',
                (value) => value.split(' ').filter((x) => !!x && x.length >= 2).length >= 4
            ),
        occupation: yup
            .string()
            .required('Please enter occupation')
            .test(
                'at-least-two-words',
                'Please enter occupation at least two words',
                (value) => value.split(' ').filter((x) => !!x && x.length >= 2).length >= 2
            ),
        nationality: yup
            .string()
            .required('Please enter nationality')
            .test(
                'at-least-two-words',
                'Please enter nationality at least two words',
                (value) => value.split(' ').filter((x) => !!x && x.length >= 2).length >= 2
            ),
        title: yup
            .string()
            .required('Please enter title story')
            .min(10, 'Please enter title at least ten characters')
            .max(50, 'Please enter title maximum fifty characters'),
        description: yup
            .string()
            .required('Please enter description story')
            .min(80, 'Please enter title at least eighty characters')
            .max(300, 'Please enter title maximum three hundred characters'),
        content: yup
            .string()
            .required('Please enter content story')
            .test(
                'at-least-twenty-words',
                'Please enter at least four hundreds words',
                (value) => value.split(' ').filter((x) => !!x && x.length > 2).length > 400
            ),
        urlSocial: yup.string().required('Please enter url social').url('Invalid url'),
    })

    const form = useForm({
        defaultValues: {
            fullname: initValues?.fullname,
            avatar: initValues?.avatar,
            avatarCover: initValues?.avatarCover,
            dateOfBirth: initValues?.dateOfBirth,
            domicile: initValues?.domicile,
            occupation: initValues?.occupation,
            nationality: initValues?.nationality,
            title: initValues?.title,
            description: initValues?.description,
            content: initValues?.content,
            urlSocial: initValues?.urlSocial,
        },
        resolver: yupResolver(schema),
    })

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
            <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
                <Box mb="16px">
                    <Box display="flex" columnGap={1}>
                        <Box flex={1}>
                            <InputField
                                name="fullname"
                                label="Full Name"
                                placeholder="Cuc Tinh Y"
                                form={form}
                                disabled={form.formState.isSubmitting}
                            />
                        </Box>
                        <Box flex={1}>
                            <DatePickerField
                                name="dateOfBirth"
                                label="Choose Date Of Birth"
                                form={form}
                                disabled={form.formState.isSubmitting}
                            />
                        </Box>
                    </Box>
                    <Box display="flex" columnGap={1}>
                        <Box flex={1}>
                            <InputField
                                name="domicile"
                                label="Domicile"
                                placeholder="Tu Xuyen, Trung Quoc"
                                form={form}
                                disabled={form.formState.isSubmitting}
                            />
                        </Box>
                        <Box flex={1}>
                            <InputField
                                name="occupation"
                                label="Occupation"
                                placeholder="Dien vien, ca sy"
                                form={form}
                                disabled={form.formState.isSubmitting}
                            />
                        </Box>
                    </Box>
                    <Box display="flex" columnGap={1}>
                        <Box flex={1}>
                            <InputField
                                name="nationality"
                                label="Nationality"
                                placeholder="Trung Quoc"
                                form={form}
                                disabled={form.formState.isSubmitting}
                            />
                        </Box>
                        <Box flex={1}>
                            <InputField
                                name="urlSocial"
                                label="URL Social"
                                placeholder="https://weibo.com/123456789"
                                form={form}
                                disabled={form.formState.isSubmitting}
                            />
                        </Box>
                    </Box>
                    <Box display="flex" columnGap={1}>
                        <Box flex={1}>
                            <UploadImageField
                                name="avatar"
                                label="Avatar"
                                form={form}
                                disabled={form.formState.isSubmitting}
                            />
                        </Box>
                        <Box flex={1}>
                            <UploadImageField
                                name="avatarCover"
                                label="Avatar Cover"
                                form={form}
                                disabled={form.formState.isSubmitting}
                            />
                        </Box>
                    </Box>
                    <TextAreaField
                        name="title"
                        label="Title Story"
                        placeholder="Somethings..."
                        form={form}
                        disabled={form.formState.isSubmitting}
                    />
                    <TextAreaField
                        name="description"
                        label="Description Story"
                        placeholder="Somethings..."
                        form={form}
                        disabled={form.formState.isSubmitting}
                        maximumCharacter={300}
                    />
                    <EditorField name="content" form={form} label="Content" />
                </Box>

                <ButtonFullWidth
                    txt={id ? 'Edit story' : 'Create story'}
                    icon={id ? EditIcon : AddIcon}
                    color={blue}
                    type="submit"
                    disabled={form.formState?.isSubmitting}
                />
            </Box>
        </Box>
    )
}

export default StoriesForm
