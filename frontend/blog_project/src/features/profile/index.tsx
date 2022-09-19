import { LoadingSpinner } from '@/components/common'
import { fetchByIdUser } from '@/utils/fetch_api'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProfileInfo, ProfileTab } from './components'
import { ProfileBlogByUser, ProfileDetail } from './pages'

export interface ProfileProps {}

export function Profile(props: ProfileProps) {
    const [activeTab, setActiveTab] = useState<string>('profile-detail')
    const { id } = useParams()
    const { data, isLoading } = useQuery([id], fetchByIdUser, {
        cacheTime: 0,
    })

    useEffect(() => {
        if (data) {
            document.title = `${data?.username} | H.Blog`
        }
    }, [data])

    return (
        <>
            {isLoading && <LoadingSpinner />}
            {data && (
                <div className="max-w-5xl m-auto bg-white rounded">
                    <div>
                        <div className="h-[380px]">
                            <img
                                src="https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ"
                                alt=""
                                className="rounded"
                            />
                        </div>
                        <ProfileInfo profile={data} />
                    </div>
                    <div>
                        <ProfileTab activeTab={activeTab} setActiveTab={setActiveTab} />
                        <div className="py-8">
                            {activeTab === 'profile-detail' && <ProfileDetail user={data} />}
                            {activeTab === 'profile-blog' && <ProfileBlogByUser user={data} />}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
