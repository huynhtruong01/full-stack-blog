import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import { Avatar, Box } from '@mui/material'
import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import authApi from '../../../api/authApi'
import { MenuButton } from '../../../components/Buttons'
import PropTypes from 'prop-types'

AvatarLogged.propTypes = {
    user: PropTypes.object.isRequired,
}

function AvatarLogged({ user }) {
    const queryClient = useQueryClient()
    const [anchorEl, setAnchorEl] = useState(null)
    const navigate = useNavigate()

    const users = useQuery('users', async ({ queryKey }) => {
        try {
            const usersData = queryClient.getQueryData(queryKey[0])

            return usersData
        } catch (error) {
            throw new Error(error)
        }
    })

    const handleClick = (e) => {
        console.log(e.currentTarget)
        setAnchorEl(e.currentTarget)
    }

    const menuList = [
        {
            name: 'Show information',
            icon: PersonIcon,
            callback: () => {
                navigate(`/info/${users?.data?.user?.username.replace(' ', '-')}`)
            },
        },
        {
            name: 'Logout',
            icon: LogoutIcon,
            callback: async () => {
                try {
                    // call logout api
                    await authApi.logout(user)
                    // remove local storage users
                    localStorage.removeItem('users')
                    // clear user in react query
                    queryClient.setQueryData('users', null)
                    queryClient.invalidateQueries('users')

                    navigate('/login')
                } catch (error) {
                    throw new Error(error?.message || error)
                }
            },
        },
    ]

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Box>
                <Box
                    id="demo-positioned-button"
                    aria-controls={!!anchorEl ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={!!anchorEl ? 'true' : undefined}
                    sx={{
                        cursor: 'pointer',
                        borderRadius: '50%',
                    }}
                    onClick={handleClick}
                >
                    <Avatar src={user?.avatar} />
                </Box>
                <MenuButton anchorEl={anchorEl} setAnchorEl={setAnchorEl} menuList={menuList} />
            </Box>
        </Box>
    )
}

export default AvatarLogged
