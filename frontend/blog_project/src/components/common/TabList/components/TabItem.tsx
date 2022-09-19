import { Tab } from '@/utils/interface'

export interface TabItemProps {
    tab: Tab
    activeTab: string
    onClick: (path: string) => void
}

export function TabItem({ tab, activeTab, onClick }: TabItemProps) {
    const Icon = tab.icon

    return (
        <li
            className="mr-1 cursor-pointer hover:bg-blue-100 rounded-t-sm rounded-r-sm overflow-hidden duration-200 ease-in-out"
            onClick={() => onClick(tab.path)}
        >
            <div
                className={`flex items-center gap-2 px-4 py-2 border-b-4 ${
                    activeTab === tab.path
                        ? 'text-blue-700 border-b-4 border-blue-700 bg-blue-50'
                        : 'hover:text-blue-700 border-transparent'
                } text-lg duration-200 ease-in-out`}
            >
                <Icon className="text-[20px]" />
                {tab.name}
            </div>
        </li>
    )
}
