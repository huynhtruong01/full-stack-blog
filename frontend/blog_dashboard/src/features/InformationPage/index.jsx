import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Typography } from '@mui/material'
import { useQuery, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonIcon } from '../../components/Buttons/ButtonIcon'
import EditIcon from '@mui/icons-material/Edit'
import { blue } from '@mui/material/colors'
import { Loading } from '../../components/common'

InformationPage.propTypes = {}

export function InformationPage() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const users = useQuery('users', async ({ queryKey }) => {
        try {
            const usersData = queryClient.getQueryData(queryKey[0])

            return usersData
        } catch (error) {
            throw new Error(error)
        }
    })

    if (!users) {
        navigate('/login')
    }

    const handleNavEdit = () => {
        navigate(`/edit-info/${users?.data?.user?.username.replace(' ', '-')}`)
    }

    return (
        <Box width="100%" minHeight="100vh" backgroundColor="#fff">
            <Box display="flex" justifyContent="center" pt="40px">
                {users?.isLoading && <Loading />}
                {users?.data && (
                    <>
                        <Box>
                            <Avatar
                                alt={users?.data?.user?.username}
                                src={users?.data?.user?.avatar}
                                sx={{
                                    width: '116px',
                                    height: '116px',
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                ml: '20px',
                            }}
                        >
                            <Typography
                                component="h2"
                                variant="h2"
                                fontSize="32px"
                                fontWeight={700}
                            >
                                {users?.data?.user?.username}
                            </Typography>
                            <Typography component="h3" fontSize="18px" fontWeight={600}>
                                {users?.data?.user?.fullname}
                            </Typography>
                            <Box mt={2}>
                                <ButtonIcon
                                    txt="Edit information"
                                    icon={EditIcon}
                                    color={blue}
                                    callback={handleNavEdit}
                                />
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    )
}
