import { fetchBlogByUser } from '@/utils/fetch_api'
import { UserData } from '@/utils/interface/user_interface'
import { useQuery } from '@tanstack/react-query'
import * as React from 'react'

export interface ProfileInfoProps {
    profile: UserData
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
    const { data, isLoading } = useQuery([{ id: profile?._id }], fetchBlogByUser)

    return (
        <div className="flex px-14 justify-between">
            <div className="flex">
                <div className="translate-y-[-50%] w-[158px] h-[158px] overflow-hidden mr-3 p-1.5 bg-white rounded-full">
                    <img src={profile?.avatar} alt={profile?.fullname} className="rounded-full" />
                </div>
                <div className="py-1">
                    <h4 className="font-bold text-3xl text-gray-900 mb-0.5">{profile?.username}</h4>
                    <p className="text-sm text-gray-400">{profile?.fullname}</p>
                </div>
            </div>
            <div className="flex gap-6 py-2">
                <div className="text-gray-500 text-lg font-[300]">
                    <span className="font-semibold text-black mr-1.5">{data?.data?.length}</span>
                    Bài viết
                </div>
                <div className="text-gray-500 text-lg font-[300]">
                    <span className="font-semibold text-black mr-1.5">
                        {profile?.following?.length}
                    </span>
                    Đang Follow
                </div>
                <div className="text-gray-500 text-lg font-[300]">
                    <span className="font-semibold text-black mr-1.5">
                        {profile?.followers?.length}
                    </span>
                    Follower
                </div>
            </div>
        </div>
    )
}
