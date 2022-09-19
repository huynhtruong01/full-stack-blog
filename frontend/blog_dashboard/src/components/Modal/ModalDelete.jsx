import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import WarningIcon from '@mui/icons-material/Warning'
import { Box, Modal, Typography } from '@mui/material'
import { blue, grey, red } from '@mui/material/colors'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toastifyOption } from '../../utils/toastify'
import { formatMultiFirstText } from '../../utils/typography'
import { ButtonIcon, ButtonText } from '../Buttons'
import PropTypes from 'prop-types'

ModalDelete.propTypes = {
    fetchApiData: PropTypes.object.isRequired,
}

export function ModalDelete({ fetchApiData }) {
    const { pathname } = useLocation()
    const queryClient = useQueryClient()

    const { data } = useQuery('modal', ({ queryKey }) => {
        return queryClient.getQueryData(queryKey[0])
    })

    // delete by mutation
    const deleteData = useMutation(
        async (values) => {
            console.log(values)
            await fetchApiData.remove(values)
        },
        {
            onSuccess: () =>
                toast.success('Delete successfully', {
                    ...toastifyOption,
                }),
            onError: (error) => {
                console.log(error)
                toast.error(error.message, {
                    ...toastifyOption,
                })
            },
            onSettled: () => {
                // update value modal
                const modal = queryClient.getQueryData('modal')
                queryClient.setQueryData('modal', {
                    ...modal,
                    modalDelete: false,
                    id: null,
                })
                queryClient.invalidateQueries({
                    predicate: (query) => {
                        // console.log(query)
                        return (
                            query.queryKey === 'modal' ||
                            Object.keys(query.queryKey?.[0]).includes('limit')
                        )
                    },
                })
            },
        }
    )

    const handleDelete = async () => {
        try {
            // console.log(data.id)
            // delete by mutation
            deleteData.mutate(data?.id)
        } catch (error) {
            toast.error(error.message, {
                ...toastifyOption,
            })
        }
    }

    const handleClose = () => {
        const modal = queryClient.getQueryData('modal')
        queryClient.setQueryData('modal', {
            ...modal,
            modalDelete: false,
            id: null,
            name: '',
        })
        queryClient.invalidateQueries('modal')
    }

    // console.log(data)

    return (
        <Box>
            <Modal open={data?.modalDelete} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'relative',
                        top: '42%',
                        left: '50%',
                        backgroundColor: '#fff',
                        transform: 'translate(-50%, -50%)',
                        width: 530,
                        height: 270,
                        overflow: 'hidden',
                        borderRadius: '10px',
                        border: 'none',
                        outline: 'none',
                    }}
                >
                    <Box p={6}>
                        <CloseIcon
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                color: grey[600],
                                cursor: 'pointer',
                                fontSize: '1.8rem',
                                transition: '.2s ease-in-out',
                                '&:hover': {
                                    color: '#000',
                                },
                            }}
                        />
                        <Typography
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            component="h4"
                            variant="h6"
                            fontWeight="bold"
                            mb="16px"
                        >
                            <WarningIcon
                                sx={{
                                    color: red[500],
                                    mr: '8px',
                                }}
                            />
                            Delete {pathname.slice(1).toLowerCase()}?
                        </Typography>
                        <Box>
                            <Typography textAlign="center" fontWeight={500} color={grey[800]}>
                                Are you sure you want to delete "
                                <Typography component="span" color={blue[800]} fontWeight="bold">
                                    {formatMultiFirstText(data?.name)}
                                </Typography>
                                "?
                            </Typography>
                            <Typography textAlign="center" fontWeight={500} color={grey[800]}>
                                You can't undo this action.
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        position="absolute"
                        bottom={0}
                        width="100%"
                        display="flex"
                        justifyContent="flex-end"
                        backgroundColor={grey[200]}
                        p={2}
                    >
                        <Box mr="12px">
                            <ButtonText txt="Cancel" color={blue} callback={handleClose} />
                        </Box>
                        <ButtonIcon
                            txt="Delete"
                            icon={DeleteIcon}
                            color={red}
                            callback={handleDelete}
                        />
                    </Box>
                </Box>
            </Modal>
            <ToastContainer />
        </Box>
    )
}
