import { formatCapitalMultiText } from '@/utils/common'
import { useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { ModalEditInformation } from '../pages'

export interface InformationMainProps {
    user: any
}

export function InformationMain({ user }: InformationMainProps) {
    const [open, setOpen] = useState<boolean>(false)

    const handleOpenModal = () => {
        setOpen(true)
    }

    return (
        <div className="rounded bg-white overflow-hidden border border-gray-200">
            <div className="py-3 px-6 bg-blue-500 rounded-t">
                <h3 className="text-lg font-bold text-white ">Thông tin chính của bạn</h3>
            </div>
            <div className="px-6 py-3">
                <div className="mb-8">
                    <div className="mb-4">
                        <p className="text-gray-400 text-sm">Tên đầy đủ của bạn</p>
                        <p className="font-semibold text-gray-700">
                            {formatCapitalMultiText(user?.fullname)}
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-400 text-sm">Tên tài khoản của bạn</p>
                        <p className="font-semibold text-gray-700">{user.username}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="font-semibold text-gray-700">{user.email}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-400 text-sm">Mật khẩu</p>
                        <p className="font-semibold text-gray-700 tracking-wider text-xl">
                            {''.padStart(12, '\u2022')}
                        </p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        className="flex items-center py-2 px-4 rounded text-white bg-blue-500 font-medium hover:bg-blue-700 ease-in-out duration-200"
                        onClick={handleOpenModal}
                    >
                        <span className="mr-2">
                            <MdModeEdit className="text-[18px]" />
                        </span>
                        Chỉnh sửa thông tin
                    </button>
                </div>
            </div>
            <ModalEditInformation open={open} setOpen={setOpen} user={user} />
        </div>
    )
}
