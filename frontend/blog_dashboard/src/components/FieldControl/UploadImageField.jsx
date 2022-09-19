import { Box, FormHelperText, FormLabel } from '@mui/material'
import { grey, red } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller } from 'react-hook-form'

UploadImageField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
}

export function UploadImageField({ name, label, form, disabled = false }) {
    const { control, formState } = form
    const error = formState.errors[name]

    return (
        <Box
            sx={{
                m: '10px 0',
                input: {
                    p: '16.5px 14px',
                    backgroundColor: '#fff',
                    width: '100%',
                    fontSize: '1rem',
                    border: `1px solid ${grey[400]}`,
                    borderRadius: '4px',
                    color: grey[600],

                    '&:hover': {
                        borderColor: '#000',
                    },

                    '&.error': {
                        borderColor: red[400],
                        color: red[400],
                    },
                },
            }}
        >
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Box>
                        <FormLabel error={!!error}>{label}</FormLabel>
                        <input
                            label={label}
                            type="file"
                            className={`${!!error ? 'error' : ''}`}
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => onChange(e.target.files[0])}
                            disabled={disabled}
                        />
                        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                    </Box>
                )}
            />
        </Box>
    )
}
