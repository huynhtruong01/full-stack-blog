import React from 'react'
import PropTypes from 'prop-types'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { formatFirstText } from '../../utils/typography'

SelectSort.propTypes = {
    valueSort: PropTypes.string,
    dataList: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    label: PropTypes.string.isRequired,
}

export function SelectSort({ valueSort = '', dataList, onChange = null, label }) {
    const handleChange = (e) => {
        if (!onChange) return

        onChange(e.target.value)
    }

    return (
        <FormControl
            fullWidth
            sx={{
                position: 'relative',
                height: '46px',
                minWidth: '120px',
            }}
        >
            <InputLabel
                id="select-item"
                sx={{
                    position: 'absolute',
                }}
            >
                {label}
            </InputLabel>
            <Select
                labelId="select-item"
                value={valueSort === 'all' ? 'all' : valueSort}
                label={label}
                onChange={handleChange}
                sx={{
                    backgroundColor: '#fff',
                    height: '100%',
                }}
            >
                <MenuItem value="all">All</MenuItem>
                {dataList?.map((data) => (
                    <MenuItem key={data._id} value={data?._id}>
                        {formatFirstText(data?.name)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
