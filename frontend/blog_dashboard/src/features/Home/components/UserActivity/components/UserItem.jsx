import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Typography } from '@mui/material'
import { blue, green, grey, red } from '@mui/material/colors'
import { TextDisplayColor } from '../../../../../components/common/TextDisplayColor'
import { Link } from 'react-router-dom'
import { formatFirstText } from '../../../../../utils/typography'

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}

export function UserItem({ user }) {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
                <Box mr={1}>
                    <Avatar alt={user?.username} src={user?.avatar} />
                </Box>
                <Box>
                    <Link to={`/users/${user?._id}`}>
                        <Typography
                            component="h6"
                            fontWeight="bold"
                            fontSize="1rem"
                            sx={{
                                transition: '.2s ease-in-out',
                                '&:hover': {
                                    color: blue[600],
                                },
                            }}
                        >
                            {user?.username}
                        </Typography>
                    </Link>
                    <>
                        {!user?.detail && (
                            <Typography fontSize=".8rem" color={grey[400]}>
                                Have not detail
                            </Typography>
                        )}
                        {user?.detail && (
                            <Typography color={grey[500]} fontSize=".9rem">
                                {formatFirstText(user?.detail)
                                    .split(' ')
                                    .filter((x) => !!x)
                                    .slice(0, 3)
                                    .join(' ')}
                                ...
                            </Typography>
                        )}
                    </>
                </Box>
            </Box>
            <Box>
                {user?.isActive && <TextDisplayColor txt="Active" color={green} fontSize=".9rem" />}
                {!user?.isActive && (
                    <TextDisplayColor txt="Not active" color={red} fontSize=".9rem" />
                )}
            </Box>
        </Box>
    )
}
