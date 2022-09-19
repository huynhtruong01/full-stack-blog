import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { formatFirstText } from '../../../utils/typography'

SelectValue.propTypes = {
    dataList: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func,
}

function SelectValue({ dataList, type, onChange = null }) {
    const handleChange = (e) => {
        if (!onChange) return

        onChange(e.target.value)
    }

    return (
        <FormControl
            size="small"
            sx={{
                fontSize: '.9rem',
            }}
        >
            <InputLabel id="type-chart">Sort by</InputLabel>
            <Select
                labelId="type-chart"
                id="demo-simple-select"
                value={type}
                label="Sort by"
                onChange={handleChange}
            >
                {dataList?.map((data) => (
                    <MenuItem key={data} value={data}>
                        {formatFirstText(data)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectValue
