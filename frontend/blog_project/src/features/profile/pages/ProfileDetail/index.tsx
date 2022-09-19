import { truncate } from '@/utils/common'
import * as React from 'react'
import { Link } from 'react-router-dom'

export interface ProfileDetailProps {
    user: any
}

interface ProfileDetailItem {
    name: string
    key: string
}

export function ProfileDetail({ user }: ProfileDetailProps) {
    const profileDetailList: Array<ProfileDetailItem> = [
        {
            name: 'Tên người dùng',
            key: 'username',
        },
        {
            name: 'Tên đầy đủ',
            key: 'fullname',
        },
        {
            name: 'Mô tả',
            key: 'detail',
        },
        {
            name: 'Website cá nhân',
            key: 'website',
        },
    ]

    return (
        <div className="px-4">
            {profileDetailList?.map((item: ProfileDetailItem) => (
                <div
                    className="flex border-b last:border-0 border-blue-300 mb-2 last:mb-0"
                    key={item.key}
                >
                    <div className="w-48 mr-4 p-4 py-6 bg-blue-50 text-blue-700 font-medium rounded-t rounded-r">
                        <span>{item.name}</span>
                    </div>
                    <div className="flex-1 p-4 py-6">
                        {item.key === 'website' ? (
                            <ul>
                                {user[item.key]?.map((x: any, index: number) => (
                                    <li
                                        className="mb-2 last:mb-0 text-gray-800 hover:text-blue-700 hover:underline"
                                        key={item.name + index}
                                    >
                                        <a href={x} target="_blank">
                                            {truncate(x, 60)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span className="text-gray-800 text-lg">{user[item.key]}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
