import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { BlogTopLikeList } from './components/BlogTopLikeList'
import { blue, grey } from '@mui/material/colors'
import HeaderList from '../HeaderList'

BlogTopLike.propTypes = {
    blogList: PropTypes.array.isRequired,
}

export function BlogTopLike({ blogList }) {
    return (
        <Box backgroundColor="#fff" borderRadius="8px" p={2}>
            <HeaderList title="Top Blogs" link="/blogs" />
            <Box>
                {blogList?.length > 0 && <BlogTopLikeList blogList={blogList} />}
                {blogList?.length === 0 && (
                    <Typography textAlign="center" fontSize=".9rem" color={grey[400]}>
                        Not have blog list
                    </Typography>
                )}
            </Box>
        </Box>
    )
}
