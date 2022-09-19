import SearchIcon from '@mui/icons-material/Search'
import { Box, InputAdornment, TextField } from '@mui/material'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'

SearchPage.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
}

export function SearchPage({ placeholder = '', onChange = null }) {
    const [value, setValue] = useState('')

    const debounceSearch = useCallback(
        debounce((value) => onChange(value), 1000),
        []
    )

    const handleSearchChange = (e) => {
        if (!onChange) return

        setValue(e.target.value)
        debounceSearch(e.target.value)
    }

    return (
        <Box minWidth="250px">
            <TextField
                value={value}
                fullWidth
                variant="outlined"
                onChange={handleSearchChange}
                placeholder={placeholder}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    backgroundColor: '#fff',
                    input: {
                        p: '11.5px 14px',
                    },
                }}
            />
        </Box>
    )
}
