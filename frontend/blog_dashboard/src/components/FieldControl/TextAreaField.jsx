import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import { Box, TextField } from '@mui/material'

TextAreaField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    maximumCharacter: PropTypes.number,
}

export function TextAreaField({
    name,
    label,
    placeholder = '',
    form,
    disabled = false,
    maximumCharacter = 50,
}) {
    const { control, formState, getValues } = form
    const error = formState.errors[name]
    const [character, setCharacter] = useState(getValues()[name] || '')

    return (
        <Box m="10px 0">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextField
                            fullWidth
                            label={label}
                            onChange={(e) => {
                                setCharacter(e.target.value)
                                onChange(e.target.value)
                            }}
                            value={value}
                            error={!!error}
                            helperText={error?.message}
                            multiline
                            minRows={name === 'title' ? 2 : 4}
                            maxRows={name === 'title' ? 2 : 4}
                            placeholder={placeholder}
                            disabled={disabled}
                            sx={{
                                '.MuiOutlinedInput-root': {
                                    backgroundColor: '#fff',
                                },
                            }}
                        />
                        <Box component="small" display="flex" justifyContent="flex-end">
                            {character.length}/{maximumCharacter}
                        </Box>
                    </>
                )}
            />
        </Box>
    )
}
