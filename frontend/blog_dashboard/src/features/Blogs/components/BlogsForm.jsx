import { yupResolver } from '@hookform/resolvers/yup'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { Box } from '@mui/material'
import { blue } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { ButtonFullWidth } from '../../../components/Buttons'
import {
    EditorField,
    SelectField,
    TextAreaField,
    UploadImageField,
} from '../../../components/FieldControl'
import { fetchCategories, fetchUsers } from '../../../utils/fetchData'

BlogsForm.propTypes = {
    initValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
}

function BlogsForm({ initValues, onSubmit = null }) {
    const { id } = useParams()
    const schema = yup.object().shape({
        user: yup.string().required('Please choose user'),
        thumbnail: yup
            .mixed()
            .required('Please choose thumbnail')
            .test('empty-image', 'Image is empty', (value) => value)
            .test('invalid-type', 'Invalid type', (value) => {
                const typeList = ['image/png', 'image/jpg', 'image/jpeg']
                return typeof value === 'string' || typeList.includes(value?.type)
            })
            .test(
                'max-size-image',
                'The largest image is 4MB',
                (value) => typeof value === 'string' || value?.size <= 4 * 1024 * 1024
            ),
        title: yup
            .string()
            .required('Please enter title story')
            .min(10, 'Please enter title at least ten characters')
            .max(50, 'Please enter title maximum fifty characters'),
        category: yup.string().required('Please choose category'),
        description: yup
            .string()
            .required('Please enter description story')
            .min(80, 'Please enter title at least eighty characters')
            .max(300, 'Please enter title maximum three hundred characters'),
        category: yup.string().required('Please choose category'),
        content: yup
            .string()
            .required('Please enter content story')
            .test(
                'at-least-twenty-words',
                'Please enter at least four hundreds words',
                (value) => value.split(' ').filter((x) => !!x && x.length > 2).length > 400
            ),
    })

    const form = useForm({
        defaultValues: {
            user: initValues?.user,
            thumbnail: initValues?.thumbnail,
            title: initValues?.title,
            description: initValues?.description,
            category: initValues?.category,
            content: initValues?.content,
        },
        resolver: yupResolver(schema),
    })

    const categories = useQuery('fetch-categories', fetchCategories, {
        cacheTime: 0,
        staleTime: 0,
    })
    const users = useQuery('fetch-users', fetchUsers)

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
            {users?.data && categories?.data && (
                <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
                    <Box mb="16px">
                        <Box width="100%" display="flex" columnGap={1.5}>
                            <Box flex={1}>
                                <SelectField
                                    name="user"
                                    label="User"
                                    form={form}
                                    disabled={form.formState.isSubmitting}
                                    values={users.data.userList}
                                />
                            </Box>
                            <Box flex={1}>
                                <SelectField
                                    name="category"
                                    label="Category"
                                    form={form}
                                    disabled={form.formState.isSubmitting}
                                    values={categories?.data?.categoryList}
                                />
                            </Box>
                        </Box>
                        <UploadImageField
                            name="thumbnail"
                            label="Thumbnail"
                            form={form}
                            disabled={form.formState.isSubmitting}
                        />
                        <TextAreaField
                            name="title"
                            label="Title Blog"
                            placeholder="Write somethings..."
                            form={form}
                            disabled={form.formState.isSubmitting}
                        />
                        <TextAreaField
                            name="description"
                            label="Description Blog"
                            placeholder="Write somethings..."
                            form={form}
                            disabled={form.formState.isSubmitting}
                            maximumCharacter={300}
                        />
                        <EditorField
                            name="content"
                            label="Content"
                            form={form}
                            disabled={form.formState.isSubmitting}
                        />
                    </Box>
                    <ButtonFullWidth
                        txt={id ? 'Edit blog' : 'Create blog'}
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

export default BlogsForm
