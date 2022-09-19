import { Box, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller } from 'react-hook-form'

DatePickerField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
}

export function DatePickerField({ name, label, form, disabled = false }) {
    const { control, formState } = form
    const error = formState.errors[name]

    return (
        <Box m="10px 0">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label={label}
                            value={value}
                            onChange={(e) => onChange(e)}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    {...params}
                                    error={!!error}
                                    helperText={error?.message}
                                    sx={{
                                        input: {
                                            backgroundColor: '#fff',
                                        },
                                    }}
                                    disabled={disabled}
                                />
                            )}
                        />
                    </LocalizationProvider>
                )}
            />
        </Box>
    )
}
