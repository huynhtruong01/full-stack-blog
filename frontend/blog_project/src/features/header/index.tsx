import { NavLinkData } from '@/utils/interface'
import { Link } from 'react-router-dom'
import { NavLink } from './components'
import { AuthHeader } from './components/AuthHeader'

export interface HeaderProps {}

export function Header(props: HeaderProps) {
    const navList: Array<NavLinkData> = [
        {
            id: 1,
            name: 'Girls China',
            path: 'girls-china',
        },
        {
            id: 2,
            name: 'Blog',
            path: 'blogs',
        },
    ]

    return (
        <header className="w-full border-b border-gray-300 fixed top-0 left-0 bg-white z-50">
            <div className="max-w-6xl flex justify-between items-center px-4 py-3 m-auto">
                <div>
                    <Link to="/" className="font-bold text-blue-500 text-2xl">
                        H.Blog
                    </Link>
                </div>
                <div>
                    <NavLink navList={navList} />
                </div>
                <div>
                    <AuthHeader />
                </div>
            </div>
        </header>
    )
}
