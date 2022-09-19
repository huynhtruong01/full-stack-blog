import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import BlogTopLikeItem from './BlogTopLikeItem'

BlogTopLikeList.propTypes = {
    blogList: PropTypes.array.isRequired,
}

export function BlogTopLikeList({ blogList }) {
    return (
        <Box width="100%">
            {blogList?.slice(0, 5)?.map((blog) => (
                <Box key={blog?._id} mb={1}>
                    <BlogTopLikeItem blog={blog} />
                </Box>
            ))}
        </Box>
    )
}
