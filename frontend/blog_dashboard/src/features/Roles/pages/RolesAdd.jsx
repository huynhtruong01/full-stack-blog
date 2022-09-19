import { Box } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import rolesApi from '../../../api/rolesApi'
import { getFirstPathname } from '../../../utils/common'
import { toastifyOption } from '../../../utils/toastify'
import RolesForm from '../components/RolesForm'

RolesAdd.propTypes = {}

export function RolesAdd() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const initValues = {
        name: '',
        description: '',
    }

    const handleAdd = async (values) => {
        try {
            const data = await rolesApi.add({
                ...values,
            })

            toast.success(data?.message, {
                ...toastifyOption,
                onClose: () => navigate(`/${getFirstPathname(pathname)}`),
            })
        } catch (error) {
            toast.error('Create role failed', {
                ...toastifyOption,
            })
            console.log(error.message)
            throw new Error(error.message)
        }
    }

    return (
        <Box>
            <Box width="800px" m="auto">
                <RolesForm initValues={initValues} onSubmit={handleAdd} />
            </Box>
            <ToastContainer />
        </Box>
    )
}
