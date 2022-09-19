import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { ChartBlogByMonth, ChartBlogByYear } from './components'
import SelectValue from '../SelectValue'

Chart.propTypes = {
    blogDataChartList: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func,
}

export function Chart({ blogDataChartList, type, onChange = null }) {
    const menuTypeList = ['month', 'year']

    const handleChange = (type) => {
        if (!onChange) return
        onChange(type)
    }

    return (
        <Box backgroundColor="#fff" p={4} borderRadius="8px">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography component="h4" fontSize="1.2rem" fontWeight="bold">
                    Blogs
                </Typography>
                <SelectValue type={type} dataList={menuTypeList} onChange={handleChange} />
            </Box>
            <Box>
                {type === 'month' && <ChartBlogByMonth blogDataChartList={blogDataChartList} />}
                {type === 'year' && <ChartBlogByYear blogDataChartList={blogDataChartList} />}
            </Box>
        </Box>
    )
}
