import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import { Box, TextField } from '@mui/material'

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
}

export function InputField({ name, label, placeholder = '', form, disabled = false }) {
    const { control, formState } = form
    const error = formState.errors[name]

    return (
        <Box m="10px 0">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        fullWidth
                        label={label}
                        onChange={onChange}
                        value={value}
                        error={!!error}
                        helperText={error?.message}
                        placeholder={placeholder}
                        disabled={disabled}
                        sx={{
                            input: {
                                backgroundColor: '#fff',
                            },
                        }}
                    />
                )}
            />
        </Box>
    )
}
