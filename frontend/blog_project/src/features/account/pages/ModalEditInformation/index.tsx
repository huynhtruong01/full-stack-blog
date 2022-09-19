import { usersApi } from '@/api'
import { useQueryClient } from '@tanstack/react-query'
import * as React from 'react'
import { toast } from 'react-toastify'
import { ModalEditInformationForm } from './components/ModalEditInformationForm'

export interface ModalEditInhtmlFormationProps {
    open: boolean
    setOpen: any
    user: any
}

export function ModalEditInformation({ open, setOpen, user }: ModalEditInhtmlFormationProps) {
    const queryClient = useQueryClient()
    const handleCloseModal = () => {
        setOpen(false)
    }

    const handleSubmit = async (values: any) => {
        try {
            // console.log(values)
            const { data }: any = await usersApi.update({ ...values, _id: user?._id })
            const users: any = queryClient.getQueryData(['users'])

            // local storage
            localStorage.setItem('users', JSON.stringify({ ...users, user: data }))

            // query
            queryClient.setQueryData(['users'], { ...users, user: data })
            queryClient.invalidateQueries(['user'])

            // close modal
            handleCloseModal()

            toast.success('Thông tin của bạn đã được thay đổi thành công', {
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

    return (
        <>
            {open && (
                <div>
                    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-modal md:h-full justify-center items-center flex bg-black bg-opacity-25">
                        <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
                            <div className="relative bg-white rounded-lg shadow">
                                <button
                                    className="absolute top-3 right-3 cursor-pointer bg-transparent hover:bg-gray-200 p-1 rounded ease-in-out duration-200"
                                    onClick={handleCloseModal}
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                                <div className="p-6">
                                    <h3 className="text-center text-2xl text-gray-700 font-semibold mb-3">
                                        Thay đổi thông tin
                                    </h3>
                                    <ModalEditInformationForm user={user} onSubmit={handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
