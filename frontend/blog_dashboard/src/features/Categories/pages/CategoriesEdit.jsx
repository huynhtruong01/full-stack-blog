import { Box, Typography } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import categoriesApi from '../../../api/categoriesApi'
import { Loading } from '../../../components/common'
import { getFirstPathname } from '../../../utils/common'
import { fetchCategoryById } from '../../../utils/fetchData'
import { toastifyOption } from '../../../utils/toastify'
import CategoriesForm from '../components/CategoriesForm'

CategoriesEdit.propTypes = {}

export function CategoriesEdit() {
    const { id } = useParams()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const { data, isLoading, error } = useQuery(`${id}`, fetchCategoryById, {
        enabled: !!id,
        cacheTime: 0,
    })

    const handleUpdate = async (values) => {
        try {
            const data = await categoriesApi.update({
                ...values,
            })

            toast.success(data?.message, {
                ...toastifyOption,
                onClose: () => navigate(`/${getFirstPathname(pathname)}`),
            })
        } catch (error) {
            toast.error('Update category failed', {
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
                    <CategoriesForm initValues={data} onSubmit={handleUpdate} />
                </Box>
            )}
            {error && <Typography>Not found data</Typography>}
            <ToastContainer />
        </Box>
    )
}
