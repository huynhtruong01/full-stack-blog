import { usersApi } from '@/api'
import { ModalLoading } from '@/components/common'
import { checkFileImage, formatCapitalMultiText, uploadImage } from '@/utils/common'
import { InformationAccountData } from '@/utils/interface'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { toast } from 'react-toastify'
import { InformationDetail } from './InformationDetail'
import { InformationMain } from './InformationMain'
import { InformationWebsite } from './InformationWebsite'

export interface InformationAccountProps {
    user: InformationAccountData
}

export function InformationAccount({ user }: InformationAccountProps) {
    const queryClient = useQueryClient()
    const [showInputAdd, setShowInputAdd] = useState<any>({
        addDetail: false,
        addWebsite: false,
    })
    const [open, setOpen] = useState<boolean>(false)

    const handleAvatarChange = async (e: any) => {
        try {
            const files = await e.target.files

            const isValidFile = checkFileImage(files[0])

            if (isValidFile !== '') {
                throw new Error(isValidFile)
            }

            setOpen(true)

            const { url }: any = await uploadImage(files[0])

            await usersApi.update({ _id: user._id, avatar: url })
            const newUser: any = await usersApi.getById(user._id)
            const users: any = queryClient.getQueryData(['users'])

            // local storage
            localStorage.setItem('users', JSON.stringify({ ...users, user: newUser.data }))

            // query
            queryClient.setQueryData(['users'], { ...users, user: newUser.data })
            queryClient.invalidateQueries(['users'])

            setOpen(false)
        } catch (error: any) {
            toast.error(error, {
                autoClose: 2000,
                theme: 'colored',
            })
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center p-6 bg-white rounded border border-gray-200">
                <div>
                    <label htmlFor="avatar" className="cursor-pointer">
                        <div className="relative w-[65px] h-[65px] border-4 hover:border-blue-500 ease-in-out duration-200 rounded-full">
                            <img src={user.avatar} alt={user.fullname} className="rounded-full" />
                            <div className="absolute right-[-5px] top-0 cursor-pointer rounded-full bg-blue-500 p-[2px] border-2 border-white hover:bg-blue-700 ease-in-out duration-200">
                                <MdEdit className="text-white text-sm" />
                            </div>
                        </div>
                    </label>
                    <input
                        type="file"
                        hidden
                        id="avatar"
                        accept="image/*"
                        onChange={handleAvatarChange}
                    />
                </div>
                <div className="px-4">
                    <h3 className="text-2xl font-bold text-gray-700">
                        {formatCapitalMultiText(user.fullname)}
                    </h3>
                    <p className="text-sm text-gray-400 font-thin">{user.username}</p>
                </div>
            </div>
            <InformationMain user={user} />
            <div className="rounded bg-white overflow-hidden border border-gray-200">
                <div className="py-3 px-6 bg-blue-500 rounded-t">
                    <h3 className="text-xl font-bold text-white ">Thông tin khác của bạn</h3>
                </div>
                <div className="px-6 py-3">
                    <div className="mb-8">
                        <div className="py-4 border-b-2 border-gray-200">
                            <InformationDetail
                                user={user}
                                showInputAdd={showInputAdd.addDetail}
                                setShowInputAdd={setShowInputAdd}
                            />
                        </div>

                        <div className="py-4">
                            <InformationWebsite
                                website={user?.website}
                                user={user}
                                showInputAdd={showInputAdd.addWebsite}
                                setShowInputAdd={setShowInputAdd}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ModalLoading open={open} setOpen={setOpen} />
        </div>
    )
}
