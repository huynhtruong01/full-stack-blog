import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'
import HeaderList from '../HeaderList'
import { UserList } from './components/UserList'

UserActivity.propTypes = {
    userList: PropTypes.array.isRequired,
}

export function UserActivity({ userList }) {
    return (
        <Box backgroundColor="#fff" borderRadius="8px" p={2}>
            <HeaderList title="Activity" link="/users" />
            <Box>
                {userList?.length > 0 && <UserList userList={userList} />}
                {userList?.length === 0 && (
                    <Typography textAlign="center" fontSize=".9rem" color={grey[400]}>
                        Not have user list
                    </Typography>
                )}
            </Box>
        </Box>
    )
}
