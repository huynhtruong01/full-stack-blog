import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { formatFirstText } from '../../../../../utils/typography'
import { blue, grey } from '@mui/material/colors'
import { Link } from 'react-router-dom'

BlogTopLikeItem.propTypes = {
    blog: PropTypes.object.isRequired,
}

function BlogTopLikeItem({ blog }) {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="flex-start">
                <Box width="60px" height="60px" overflow="hidden" borderRadius="8px" mr={1}>
                    <img src={blog?.thumbnail} alt={blog?.title} />
                </Box>
                <Box>
                    <Link to={`/blogs/${blog?._id}`}>
                        <Typography
                            component="h6"
                            fontWeight="bold"
                            sx={{
                                transition: '.2s ease-in-out',
                                '&:hover': {
                                    color: blue[600],
                                },
                            }}
                        >
                            {formatFirstText(blog?.title).split(' ').slice(0, 2).join(' ')}...
                        </Typography>
                    </Link>
                    <Typography fontSize=".8rem" color={grey[400]}>
                        {formatFirstText(blog?.title).split(' ').slice(0, 5).join(' ')}...
                    </Typography>
                </Box>
            </Box>
            <Box display="flex" alignItems="center">
                <Typography
                    fontSize=".85rem"
                    mr={0.5}
                    sx={{
                        color: blue[700],
                        fontWeight: 700,
                        span: {
                            color: grey[400],
                        },
                    }}
                >
                    {blog?.likes > 0 ? blog?.likes?.length : '0'} <span>likes</span>
                </Typography>
            </Box>
        </Box>
    )
}

export default BlogTopLikeItem
