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
import { InputField, TextAreaField } from '../../../components/FieldControl'

CategoriesForm.propTypes = {
    initValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
}

function CategoriesForm({ initValues, onSubmit = null }) {
    const { id } = useParams()
    const schema = yup.object().shape({
        name: yup.string().required('Please enter name category'),
        description: yup
            .string()
            .required('Please enter description category')
            .min(10, 'Please enter description at least ten characters')
            .max(100, 'Please enter description maximum hundred characters'),
    })

    const form = useForm({
        defaultValues: {
            name: initValues.name,
            description: initValues.description,
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values) => {
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
                    <InputField
                        name="name"
                        label="Name Category"
                        placeholder="Information Technology "
                        form={form}
                        disabled={form.formState.isSubmitting}
                    />
                    <TextAreaField
                        name="description"
                        label="Description"
                        placeholder="Write something..."
                        form={form}
                        disabled={form.formState.isSubmitting}
                        maximumCharacter={100}
                    />
                </Box>

                <ButtonFullWidth
                    txt={id ? 'Edit category' : 'Create category'}
                    icon={id ? EditIcon : AddIcon}
                    color={blue}
                    type="submit"
                    disabled={form.formState?.isSubmitting}
                />
            </Box>
        </Box>
    )
}

export default CategoriesForm
