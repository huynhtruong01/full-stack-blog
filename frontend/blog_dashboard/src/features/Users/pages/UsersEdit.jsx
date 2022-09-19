import { Box, Typography } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usersApi from '../../../api/usersApi'
import { Loading } from '../../../components/common'
import { fetchUserById } from '../../../utils/fetchData'
import { toastifyOption } from '../../../utils/toastify'
import { uploadImage } from '../../../utils/uploadImage'
import UsersForm from '../components/UsersForm'

UsersEdit.propTypes = {}

export function UsersEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isLoading, error } = useQuery(id, fetchUserById, {
        cacheTime: 0,
    })

    const handleUpdate = async (values) => {
        try {
            const avatar = await uploadImage(values?.avatar)

            const data = await usersApi.update({
                ...values,
                avatar: avatar.url,
            })

            toast.success(data?.message, {
                ...toastifyOption,
                onClose: () => navigate('/users'),
            })
        } catch (error) {
            toast.error('Update user failed', {
                ...toastifyOption,
            })
            throw new Error(error.message)
        }
    }

    // console.log(data)

    return (
        <Box>
            {isLoading && <Loading />}
            {data && !isLoading && (
                <Box width="800px" m="auto">
                    <UsersForm initValues={data} onSubmit={handleUpdate} />
                </Box>
            )}
            {error && <Typography>Not found data</Typography>}
            <ToastContainer />
        </Box>
    )
}
