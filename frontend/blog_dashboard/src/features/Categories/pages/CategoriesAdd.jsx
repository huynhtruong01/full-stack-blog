import { Box } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import categoriesApi from '../../../api/categoriesApi'
import { getFirstPathname } from '../../../utils/common'
import { toastifyOption } from '../../../utils/toastify'
import CategoriesForm from '../components/CategoriesForm'

CategoriesAdd.propTypes = {}

export function CategoriesAdd() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const initValues = {
        name: '',
    }

    const handleAdd = async (values) => {
        try {
            const data = await categoriesApi.add({
                ...values,
            })

            toast.success(data?.message, {
                ...toastifyOption,
                onClose: () => navigate(`/${getFirstPathname(pathname)}`),
            })
        } catch (error) {
            toast.error('Create category failed', {
                ...toastifyOption,
            })
            console.log(error.message)
            throw new Error(error.message)
        }
    }

    return (
        <Box>
            <Box width="800px" m="auto">
                <CategoriesForm initValues={initValues} onSubmit={handleAdd} />
            </Box>
            <ToastContainer />
        </Box>
    )
}
