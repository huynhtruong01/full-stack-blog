import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import Pagination from '@mui/material/Pagination'

PaginationPage.propTypes = {
    page: PropTypes.number,
    count: PropTypes.number,
    onChange: PropTypes.func,
}

export function PaginationPage({ page = 1, count = 3, onChange = null }) {
    const handlePageChange = (e, page) => {
        if (!onChange) return
        onChange(page)
    }

    return (
        <Box>
            <Pagination
                page={page}
                count={count}
                shape="rounded"
                onChange={handlePageChange}
                color="primary"
            />
        </Box>
    )
}
