import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Link, useLocation } from 'react-router-dom'
import { ButtonText } from '../../components/Buttons'
import { getFirstPathname } from '../../utils/common'
import { formatFirstText } from '../../utils/typography'
import AvatarLogged from './components/AvatarLogged'

Header.propTypes = {}

function Header() {
    const { pathname } = useLocation()
    const queryClient = useQueryClient()

    const { data } = useQuery('users', (queryKey) => {
        const users = queryClient.getQueryData(queryKey[0])
        console.log(users)

        return users
    })

    // console.log(data)

    return (
        <Box>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: '#fff',
                    borderBottom: `1px solid ${grey[300]}`,
                    boxShadow: 'none',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Link to={`/${getFirstPathname(pathname)}`}>
                        <Typography
                            sx={{
                                textAlign: 'center',
                                fontSize: '1.3rem',
                                fontWeight: 700,
                                color: grey[800],
                                transition: '.2s ease-in-out',

                                '&:hover': {
                                    color: blue[700],
                                },
                            }}
                        >
                            {pathname === '/'
                                ? 'Dashboard'
                                : formatFirstText(getFirstPathname(pathname))}
                        </Typography>
                    </Link>
                    <Box>
                        {!data?.user && (
                            <Link to="/login">
                                <ButtonText txt="Login" color={blue} />
                            </Link>
                        )}
                        {data?.user && <AvatarLogged user={data?.user} />}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
