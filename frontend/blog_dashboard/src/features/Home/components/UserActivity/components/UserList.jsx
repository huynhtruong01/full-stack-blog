import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { UserItem } from './UserItem'

UserList.propTypes = {
    userList: PropTypes.array.isRequired,
}

export function UserList({ userList }) {
    return (
        <Box>
            {userList?.slice(0, 5)?.map((user) => (
                <Box key={user?._id} mb={1}>
                    <UserItem user={user} />
                </Box>
            ))}
        </Box>
    )
}
