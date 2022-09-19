import { Box } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import storiesApi from '../../../api/storiesApi'
import { Loading } from '../../../components/common'
import { fetchStoryById } from '../../../utils/fetchData'
import { toastifyOption } from '../../../utils/toastify'
import { uploadImage } from '../../../utils/uploadImage'
import StoriesForm from '../components/StoriesForm'

StoriesEdit.propTypes = {}

export function StoriesEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isLoading, error } = useQuery(id, fetchStoryById, {
        cacheTime: 0,
    })

    const handleUpdate = async (values) => {
        try {
            let newAvatarList = [values.avatar, values.avatarCover]
            for (let i = 0; i < newAvatarList.length; i++) {
                if (newAvatarList[i] && typeof newAvatarList[i] !== 'string') {
                    const newAvatar = await uploadImage(newAvatarList[i])
                    newAvatarList[i] = newAvatar.url
                }
            }

            await storiesApi.update({
                ...values,
                avatar: newAvatarList[0],
                avatarCover: newAvatarList[1],
            })

            toast.success('Update successfully', {
                ...toastifyOption,
                onClose: () => navigate('/stories'),
            })
        } catch (error) {
            toast.error('Update failed', {
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
                    <StoriesForm initValues={data} onSubmit={handleUpdate} />
                </Box>
            )}
            {error && <Typography>Not found data</Typography>}
            <ToastContainer />
        </Box>
    )
}
