import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { blue, grey } from '@mui/material/colors'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { timeBlog } from '../../utils/common'

UserInfo.propTypes = {
    user: PropTypes.object.isRequired,
    time: PropTypes.string,
    like: PropTypes.number,
}

export function UserInfo({ user, time = Date.now(), likeNumber = 0 }) {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
                <Box width="40px" height="40px" borderRadius="50%" overflow="hidden">
                    <Link to="/">
                        <Avatar
                            alt={user?.username}
                            src={user?.avatar}
                            sx={{
                                width: '40px',
                                height: '40px',
                            }}
                        />
                    </Link>
                </Box>
                <Box
                    sx={{
                        pl: '12px',
                    }}
                >
                    <Box
                        sx={{
                            a: {
                                display: 'inline',
                                fontWeight: 700,
                                lineHeight: '24px',
                                transition: '.2s ease-in-out',

                                '&:hover': {
                                    color: blue[800],
                                },
                            },
                        }}
                    >
                        <Link to="/">{user?.username}</Link>
                    </Box>
                    <Typography
                        sx={{
                            fontSize: '12px',
                            lineHeight: '18px',
                            color: grey[500],
                        }}
                    >
                        Posted on {timeBlog(time)}
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Box
                    display="flex"
                    alignItems="center"
                    p="3px 10px"
                    backgroundColor={blue[700]}
                    color="#fff"
                    borderRadius="4px"
                >
                    <ThumbUpIcon
                        sx={{
                            mr: '5px',
                            width: '15px',
                        }}
                    />
                    <Typography component="span" fontSize="13px">
                        {likeNumber}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
