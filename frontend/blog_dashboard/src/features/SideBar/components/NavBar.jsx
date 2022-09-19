import ArticleIcon from '@mui/icons-material/Article'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import CategoryIcon from '@mui/icons-material/Category'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Link, useLocation } from 'react-router-dom'
import { getFirstPathname } from '../../../utils/common'

NavBar.propTypes = {}

function NavBar() {
    const { pathname } = useLocation()
    const [path, setPath] = useState(getFirstPathname(pathname))
    const queryClient = useQueryClient()
    const { data } = useQuery('users', () => {
        const users = queryClient.getQueryData('users')

        return users
    })

    // console.log(data)

    const navList = [
        {
            id: 1,
            icon: DashboardIcon,
            txt: 'Dashboard',
            path: data?.user ? '' : 'login',
        },
        {
            id: 2,
            icon: AutoStoriesIcon,
            txt: 'Stories',
            path: data?.user ? 'stories' : 'login',
        },
        {
            id: 3,
            icon: ArticleIcon,
            txt: 'Blogs',
            path: data?.user ? 'blogs' : 'login',
        },
        {
            id: 4,
            icon: CategoryIcon,
            txt: 'Categories',
            path: data?.user ? 'categories' : 'login',
        },
        {
            id: 5,
            icon: AssignmentIndIcon,
            txt: 'Roles',
            path: data?.user ? 'roles' : 'login',
        },
        {
            id: 6,
            icon: PeopleAltIcon,
            txt: 'Users',
            path: data?.user && data?.user?.role?.name === 'admin' ? 'users' : 'login',
        },
    ]

    useEffect(() => {
        const path = getFirstPathname(pathname)
        setPath(path)
    }, [pathname])

    return (
        <Box width="100%" p="12px" pt="16px" height="100vh">
            <Box
                sx={{
                    width: '100%',
                    a: {
                        textAlign: 'center',
                        mb: '18px',
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        color: blue[700],
                    },
                }}
            >
                <Link to="/">H.News</Link>
            </Box>
            <Box>
                <List>
                    {navList.map((nav) => {
                        const Icon = nav.icon
                        return (
                            <Link to={nav.path} key={nav.id}>
                                <ListItem
                                    sx={{
                                        width: '100%',
                                        pl: 0,
                                        pr: 0,
                                    }}
                                >
                                    <ListItemButton
                                        sx={{
                                            borderRadius: '5px',
                                            backgroundColor: `${
                                                path === nav.path && path !== 'login'
                                                    ? blue[600]
                                                    : 'transparent'
                                            }`,
                                            color: `${
                                                path === nav.path && path !== 'login'
                                                    ? '#fff'
                                                    : grey[800]
                                            }`,
                                            svg: {
                                                color: `${
                                                    path === nav.path && path !== 'login'
                                                        ? '#fff'
                                                        : grey[800]
                                                }`,
                                            },
                                            '&:hover': {
                                                backgroundColor: `${
                                                    path === nav.path && path !== 'login'
                                                        ? blue[600]
                                                        : blue[300]
                                                }`,
                                                svg: {
                                                    color: '#fff',
                                                },
                                                span: {
                                                    color: '#fff',
                                                },
                                            },
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Icon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={nav.txt}
                                            sx={{
                                                span: {
                                                    fontWeight: 600,
                                                },
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        )
                    })}
                </List>
            </Box>
        </Box>
    )
}

export default NavBar
