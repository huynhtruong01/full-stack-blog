import { getFirstPathname } from '@/utils/common'
import { NavLinkData } from '@/utils/interface'
import { Link, useLocation } from 'react-router-dom'

export interface NavLinkProps {
    navList: Array<NavLinkData>
}

export function NavLink({ navList }: NavLinkProps) {
    const { pathname } = useLocation()

    return (
        <nav>
            <ul className="flex justify-center">
                {navList?.map((nav) => (
                    <li
                        key={nav?.id}
                        className={`relative ml-14 py-2 overflow-hidden before:content-[''] before:ease-in-out before:duration-300 before:w-full before:h-1 before:absolute before:bottom-0 before:left-[-80px] before:bg-blue-500 before:rounded hover:before:left-0 ${
                            getFirstPathname(pathname) === nav?.path
                                ? 'before:left-[0] text-blue-700'
                                : ''
                        }`}
                    >
                        <Link
                            to={nav?.path}
                            className=" font-medium ease-in-out duration-200 hover:text-blue-700 "
                        >
                            {nav?.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
