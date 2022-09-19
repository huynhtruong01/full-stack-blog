import { Tab } from '@/utils/interface'
import * as React from 'react'
import { TabItem } from './components'

export interface TabListProps {
    tabList: Tab[]
    activeTab: string
    setActiveTab: any
}

export function TabList({ tabList, activeTab, setActiveTab }: TabListProps) {
    const handleTabClick = (path: string) => {
        setActiveTab(path)
    }

    return (
        <div>
            <div className="border-b border-gray-200 ">
                <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 ">
                    {tabList?.map((tab) => (
                        <TabItem
                            tab={tab}
                            activeTab={activeTab}
                            onClick={handleTabClick}
                            key={tab.path}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}
