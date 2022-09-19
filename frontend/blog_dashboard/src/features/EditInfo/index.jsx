import React from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Box } from '@mui/material'
import { EditInfoForm } from './components/EditInfoForm'
import { toastifyOption } from '../../utils/toastify'
import { toast } from 'react-toastify'
import { uploadImage } from '../../utils/uploadImage'
import usersApi from '../../api/usersApi'
import { useNavigate } from 'react-router-dom'

EditInfo.propTypes = {}

export function EditInfo() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const users = useQuery('users', async ({ queryKey }) => {
        try {
            const usersData = queryClient.getQueryData(queryKey[0])

            return usersData
        } catch (error) {
            throw new Error(error)
        }
    })

    const update = useMutation(
        async (values) => {
            try {
                await usersApi.update({ ...values, _id: users?.data?.user?._id })
            } catch (error) {
                throw new Error(error)
            }
        },
        {
            onSuccess: async () => {
                // get user api
                const { data } = await usersApi.getById(users?.data?.user?._id)

                // set users in local storage
                const usersLocal = JSON.parse(localStorage.getItem('users'))
                console.log(usersLocal)
                localStorage.setItem('users', JSON.stringify({ ...usersLocal, user: data }))

                // set users in react query
                queryClient.setQueryData('users', { ...usersLocal, user: data })
                queryClient.invalidateQueries('users')

                toast.success('Change user successfully', {
                    ...toastifyOption,
                    onClose: () =>
                        navigate(`/info/${users?.data?.user?.username.replace(' ', '-')}`),
                })
            },
            onError: (error) => {
                toast.error(error.message, {
                    ...toastifyOption,
                })
            },
        }
    )

    const handleSubmit = async (values) => {
        try {
            const newValues = { ...values }
            if (newValues.avatar && typeof newValues.avatar !== 'string') {
                const image = await uploadImage(newValues.avatar)
                newValues.avatar = image.url
            }

            await update.mutate(newValues)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box pt={3}>
            <Box backgroundColor="#fff" p={3} borderRadius="8px" width="500px" m="auto">
                {users?.data && (
                    <EditInfoForm initValues={users?.data?.user} onSubmit={handleSubmit} />
                )}
            </Box>
        </Box>
    )
}
