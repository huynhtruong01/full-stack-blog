import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ModalLoading } from './ModalLoading'

export interface ModalDeleteProps {}

export function ModalDelete(props: ModalDeleteProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const queryClient = useQueryClient()
    const isShowModal: any = useQuery(['show-modal-delete'], async () => {
        const showModal = queryClient.getQueryData(['show-modal-delete'])
        return showModal
    })

    useEffect(() => {
        console.log(isShowModal)
        if (isShowModal?.data) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [isShowModal])

    const { data }: any = useQuery(['data-modal'], async () => {
        try {
            const data = queryClient.getQueryData(['data-modal'])

            return data
        } catch (error: any) {
            console.log(error)
            throw new Error(error)
        }
    })

    const handleClose = () => {
        queryClient.setQueryData(['show-modal-delete'], false)
        queryClient.invalidateQueries(['show-modal-delete'])
    }

    const handleClick = async () => {
        // console.log(callback)
        if (!data?.callback) return

        try {
            setIsLoading(true)
            if (data?.values) {
                // console.log(data?.values)
                await data?.callback(data?.values)
            } else {
                await data?.callback()
            }

            // close modal
            queryClient.setQueryData(['show-modal-delete'], false)
            queryClient.invalidateQueries(['show-modal-delete'])

            setIsLoading(false)

            toast.success(data?.toastTitle || 'Xóa thành công', {
                autoClose: 2000,
                theme: 'colored',
            })
        } catch (error: any) {
            toast.error(error, {
                autoClose: 2000,
                theme: 'colored',
            })
        }
    }

    const Icon = data?.icon

    return (
        <>
            {isShowModal.data && (
                <div>
                    <div
                        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex bg-black bg-opacity-25"
                        onClick={handleClose}
                    >
                        <div className="relative h-full md:h-auto">
                            <div className="relative bg-white rounded-lg shadow px-8 py-6 pb-4">
                                {data?.icon && (
                                    <div className="flex justify-center items-start p-2">
                                        <div className="p-2 rounded-full bg-red-100">
                                            <Icon className="text-[30px] text-red-600" />
                                        </div>
                                    </div>
                                )}
                                <div className="p-4 pt-2">
                                    <h3 className="text-center font-bold text-2xl text-gray-700 mb-2">
                                        {data?.title}
                                    </h3>
                                    <p className="text-base text-gray-400 text-center w-[85%] m-auto font-normal">
                                        {data?.message}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center p-2 space-x-2 mt-2">
                                    <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-3xl text-sm px-10 py-3 text-center duration-200 ease-in-out">
                                        {data?.btnContinue || 'Hủy'}
                                    </button>
                                    <button
                                        className="text-white bg-red-500 hover:bg-red-700 rounded-3xl border border-gray-200 text-sm font-medium px-10 py-3 hover:text-white focus:z-10 duration-200 ease-in-out"
                                        onClick={handleClick}
                                    >
                                        {data?.btnCancel || 'Xóa'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ModalLoading open={isLoading} />
            <ToastContainer />
        </>
    )
}
