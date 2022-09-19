import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller } from 'react-hook-form'
import { formatMultiFirstText } from '../../utils/typography'

SelectField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    values: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
}

export function SelectField({ name, label, form, disabled = false, values }) {
    const { control, formState } = form
    const error = formState.errors[name]

    return (
        <Box m="10px 0">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <FormControl fullWidth error={!!error} disabled={disabled}>
                        <InputLabel id="select-field" error={!!error}>
                            {label}
                        </InputLabel>
                        <Select
                            labelId="select-field"
                            value={value}
                            label={label}
                            error={!!error}
                            onChange={onChange}
                            sx={{
                                backgroundColor: '#fff',
                            }}
                        >
                            <MenuItem value="">
                                <em>
                                    <b>-- Select one somethings --</b>
                                </em>
                            </MenuItem>
                            {values?.map((x) => (
                                <MenuItem key={x._id} value={x._id}>
                                    {formatMultiFirstText(x.name || x.username)}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                    </FormControl>
                )}
            />
        </Box>
    )
}
