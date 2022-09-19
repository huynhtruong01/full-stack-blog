import { Box, FormControl, FormHelperText, FormLabel } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller } from 'react-hook-form'
import { EditorQuill } from '../Editor'

EditorField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
}

export function EditorField({ name, form, label, disabled = false }) {
    const { control, formState } = form
    const error = formState.errors[name]

    return (
        <Box m="10px 0">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <FormControl variant="outlined" disabled={disabled} fullWidth>
                        <FormLabel error={!!error}>{label}</FormLabel>
                        <EditorQuill error={!!error} content={value} onChange={onChange} />
                        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                    </FormControl>
                )}
            />
        </Box>
    )
}
