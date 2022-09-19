import { Box, Typography } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import rolesApi from '../../../api/rolesApi'
import { Loading } from '../../../components/common'
import { getFirstPathname } from '../../../utils/common'
import { fetchRoleById } from '../../../utils/fetchData'
import { toastifyOption } from '../../../utils/toastify'
import RolesForm from '../components/RolesForm'

RolesEdit.propTypes = {}

export function RolesEdit() {
    const { id } = useParams()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const { data, isLoading, error } = useQuery(`${id}`, fetchRoleById, {
        enabled: !!id,
        cacheTime: 0,
    })

    // fetch id
    // const { data, loading, error } = useFetchById(id, rolesApi.getById)

    const handleUpdate = async (values) => {
        try {
            const data = await rolesApi.update({
                ...values,
            })

            toast.success(data?.message, {
                ...toastifyOption,
                onClose: () => navigate(`/${getFirstPathname(pathname)}`),
            })
        } catch (error) {
            toast.error('Update role failed', {
                ...toastifyOption,
            })
            throw new Error(error.message)
        }
    }

    return (
        <Box>
            {isLoading && <Loading />}
            {data && (
                <Box width="800px" m="auto">
                    <RolesForm initValues={data} onSubmit={handleUpdate} />
                </Box>
            )}
            {error && <Typography>Not found data</Typography>}
            <ToastContainer />
        </Box>
    )
}
