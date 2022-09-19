import { Avatar, Menu } from '@/components/common'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { GoPlus } from 'react-icons/go'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'

export interface AuthHeaderProps {}

export function AuthHeader(props: AuthHeaderProps) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [open, setOpen] = useState<boolean>(false)

    const handleLogout = async () => {
        try {
            // await authApi.logout()

            // remove user in local storage
            localStorage.removeItem('users')
            // set query client
            queryClient.setQueryData(['users'], null)
            queryClient.invalidateQueries(['users'])

            setOpen(false)

            navigate('/login')
        } catch (error: any) {
            throw new Error(error)
        }
    }

    const menuList = [
        {
            icon: FaUser,
            name: 'Thông tin tài khoản',
            onClick: () => {
                setOpen(false)
            },
            link: '/account',
        },
        {
            icon: BsFillBookmarkFill,
            name: 'Các bài viết đã lưu',
            onClick: () => {
                setOpen(false)
            },
            link: '/save-blog',
        },
        {
            icon: RiLogoutBoxRLine,
            name: 'Đăng xuất',
            onClick: handleLogout,
            link: null,
        },
    ]

    const { data }: any = useQuery(
        ['users'],
        async () => {
            try {
                return JSON.parse(localStorage.getItem('users') || '{}')
            } catch (error: any) {
                throw new Error(error)
            }
        },
        {
            staleTime: Infinity,
        }
    )

    const handleNavLogin = () => {
        navigate('/login')
        setOpen(false)
    }

    const handleNavRegister = () => {
        navigate('/register')
        setOpen(false)
    }

    const handleOpenMenu = () => {
        setOpen((prev: boolean) => !prev)
    }

    // console.log(data)

    return (
        <>
            {/* not have data */}
            {!Object.keys(data) && (
                <div className="flex gap-2 items-center">
                    <button
                        className="py-2 px-5 text-blue-500 font-medium border-blue-500 border-2 rounded-full hover:bg-blue-700 hover:text-white hover:border-blue-700 ease-in-out duration-200"
                        onClick={handleNavLogin}
                    >
                        Đăng nhập
                    </button>
                    <button
                        className="py-2 px-5 bg-blue-500 hover:bg-blue-700 font-medium ease-in-out duration-200 text-white rounded-full"
                        onClick={handleNavRegister}
                    >
                        Đăng ký
                    </button>
                </div>
            )}

            {/* have data  */}
            {data && (
                <div className="flex gap-8 items-center">
                    <Link to="/create-blog">
                        <button className="flex items-center cursor-pointer tracking-wider py-2 px-4 bg-blue-50 border-blue-500 border-2 rounded font-semibold text-blue-500 ease-in-out duration-200 hover:bg-blue-500 hover:text-white">
                            <span className="mr-2">
                                <GoPlus className="text-[18px] font-bold" />
                            </span>
                            Tạo bài viết
                        </button>
                    </Link>
                    <div className="relative">
                        <div
                            className="cursor-pointer border-4 border-gray-200 rounded-full hover:border-blue-500 ease-in-out duration-200"
                            onClick={handleOpenMenu}
                        >
                            <Avatar
                                imgUrl={data?.user?.avatar}
                                nameAvatar={data?.user?.fullname}
                                sizeAvatar="md"
                            />
                        </div>
                        <Menu menuList={menuList} open={open} setOpen={setOpen} />
                    </div>
                </div>
            )}
        </>
    )
}
