import { usersApi } from '@/api'
import { ButtonIcon } from '@/components/common'
import { truncate } from '@/utils/common'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { IoAdd, IoCloseSharp } from 'react-icons/io5'
import { InputAddField } from './InputAddField'

export interface InformationWebsiteProps {
    user: any
    website: Array<string>
    showInputAdd: boolean
    setShowInputAdd: any
}

export function InformationWebsite({
    user,
    website,
    showInputAdd,
    setShowInputAdd,
}: InformationWebsiteProps) {
    const queryClient = useQueryClient()

    const handleShowInput = (key: string) => {
        const isShow = !showInputAdd
        setShowInputAdd((prev: any) => ({ ...prev, [key]: isShow }))
    }

    const handleSaveWebsite = async (value: string) => {
        try {
            const newValues = { _id: user._id, websiteUrl: value }
            await usersApi.addWebsiteUrl(newValues)
            const newUser = await usersApi.getById(user._id)
            const users: any = queryClient.getQueryData(['users'])

            // local storage
            localStorage.setItem('users', JSON.stringify({ ...users, user: newUser.data }))

            // query
            queryClient.setQueryData(['users'], { ...users, user: newUser.data })
            queryClient.invalidateQueries(['users'])

            // set show input => false
            handleShowInput('addWebsite')
        } catch (error: any) {
            throw new Error(error)
        }
    }

    const handleRemoveWebsite = async (values: any) => {
        try {
            await usersApi.removeWebsiteUrl(values)
            const newUser = await usersApi.getById(user._id)
            const users: any = queryClient.getQueryData(['users'])

            // local storage
            localStorage.setItem('users', JSON.stringify({ ...users, user: newUser.data }))

            // query
            queryClient.setQueryData(['users'], { ...users, user: newUser.data })
            queryClient.invalidateQueries(['users'])
        } catch (error: any) {
            console.log(error)
            throw new Error(error)
        }
    }

    const handleOpen = (value: string) => {
        const newValues = {
            _id: user._id,
            websiteUrl: value,
        }

        // console.log(user?._id)

        queryClient.setQueryData(['data-modal'], {
            message: 'Bạn có chắc chắn muốn xóa website này không?',
            values: newValues,
            title: 'Xóa website',
            icon: AiFillDelete,
            callback: handleRemoveWebsite,
        })
        queryClient.setQueryData(['show-modal-delete'], true)
        queryClient.invalidateQueries({
            queryKey: ['data-modal', 'show-modal-delete'],
        })
    }

    return (
        <div>
            {website.length > 0 && (
                <div>
                    <div className="mb-4">
                        <p className="text-gray-400 mb-2">Trang web cá nhân</p>
                        <p>
                            {website.map((link) => (
                                <div className="flex justify-between items-center mb-2" key={link}>
                                    <a
                                        href={link}
                                        target="_blank"
                                        className="text-sm text-blue-500 hover:text-blue-700 hover:underline ease-in-out duration-200"
                                    >
                                        {truncate(link, 35)}
                                    </a>
                                    <span
                                        className="group cursor-pointer p-1 bg-red-200 rounded hover:bg-red-700 hover:text-white ease-in-out duration-200"
                                        onClick={() => handleOpen(link)}
                                    >
                                        <IoCloseSharp className="text-red-700 group-hover:text-white font-medium" />
                                    </span>
                                </div>
                            ))}
                        </p>
                    </div>
                    {showInputAdd && (
                        <div>
                            <InputAddField
                                placeholder="Thêm trang web cá nhân"
                                setShowInput={setShowInputAdd}
                                initValue=""
                                onSubmit={handleSaveWebsite}
                            />
                        </div>
                    )}
                    {!showInputAdd && (
                        <div onClick={() => handleShowInput('addWebsite')}>
                            <ButtonIcon name="Thêm website" icon={IoAdd} />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
