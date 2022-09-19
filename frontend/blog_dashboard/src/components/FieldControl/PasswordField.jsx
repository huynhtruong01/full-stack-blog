import {
    Box,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import PropTypes from 'prop-types'

PasswordField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
}

export function PasswordField({ name, label, form, disabled = false }) {
    const [toggle, setToggle] = useState(false)
    const { control, formState } = form
    const error = formState.errors[name]

    const handleClick = () => {
        setToggle((prev) => !prev)
    }

    return (
        <Box m="10px 0">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <FormControl variant="outlined" disabled={disabled} fullWidth>
                        <InputLabel htmlFor="input-password" error={!!error}>
                            {label}
                        </InputLabel>
                        <OutlinedInput
                            id="input-password"
                            type={toggle ? 'text' : 'password'}
                            value={value}
                            error={!!error}
                            onChange={onChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClick} edge="end">
                                        {toggle ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label={label}
                            sx={{
                                backgroundColor: '#fff',
                            }}
                        />
                        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                    </FormControl>
                )}
            />
        </Box>
    )
}
