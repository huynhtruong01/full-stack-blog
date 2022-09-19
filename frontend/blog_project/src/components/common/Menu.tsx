import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

interface MenuItem {
    icon: any
    name: string
    onClick: (() => void) | null
    link: string | null
}

export interface MenuProps {
    menuList: Array<MenuItem>
    open: boolean
    setOpen: any
}

export function Menu({ menuList, open, setOpen }: MenuProps) {
    const handleClick = async (callback: (() => void) | null) => {
        if (!callback) return

        try {
            await callback()
        } catch (error: any) {
            console.log(error)
            toast.error(error, {
                autoClose: 2000,
                theme: 'colored',
            })
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <div
                className={`fixed top-0 left-0 ${
                    open ? 'visible opacity-100' : 'invisible opacity-0'
                } w-full h-full bg-transparent overflow-hidden`}
                onClick={handleClose}
            ></div>
            <div
                className={`absolute ${
                    open ? 'visible opacity-100' : 'invisible opacity-0'
                } top-[55px] right-0 z-10 w-[250px] font-normal bg-white rounded divide-y divide-gray-100 shadow duration-100 ease-in-out`}
            >
                <ul className="text-sm text-gray-700 p-2" aria-labelledby="dropdownLargeButton">
                    {menuList.map((menu) => {
                        const Icon = menu.icon

                        return (
                            <li
                                className={`cursor-pointer ${
                                    menu.name === 'Đăng xuất'
                                        ? 'pt-1 border-t-2 border-gray-100'
                                        : 'rounded mb-2'
                                }`}
                                onClick={async () => await handleClick(menu.onClick)}
                                key={menu.link}
                            >
                                {menu.link && (
                                    <Link
                                        to={menu.link}
                                        className="rounded block py-2 px-4 hover:bg-blue-500 ease-in-out duration-200 hover:text-white"
                                    >
                                        <div className="flex items-center">
                                            <span className="mr-5">
                                                <Icon className="text-[19px]" />
                                            </span>
                                            <span className="text-base font-medium">
                                                {menu.name}
                                            </span>
                                        </div>
                                    </Link>
                                )}
                                {!menu.link && (
                                    <a className="rounded block py-2 px-4 hover:bg-blue-500 ease-in-out duration-200 hover:text-white">
                                        <div className="flex items-center">
                                            <span className="mr-5">
                                                <Icon className="text-[19px]" />
                                            </span>
                                            <span className="text-base font-medium">
                                                {menu.name}
                                            </span>
                                        </div>
                                    </a>
                                )}
                            </li>
                        )
                    })}
                </ul>
                <ToastContainer />
            </div>
        </>
    )
}
