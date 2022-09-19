import { Search, SelectSearch } from '@/components/filters'
import * as React from 'react'

export interface FiltersStoryProps {
    filters: any
    onChange?: (filters: any) => void | null
}

export function FiltersStory({ filters, onChange }: FiltersStoryProps) {
    const handleSearch = (value: string) => {
        if (!onChange) return
        const newFilters = { ...filters, name: value }
        onChange(newFilters)
    }

    return (
        <div className="flex">
            <div className="w-[300px]">
                <Search
                    valueSearch={filters?.search || ''}
                    placeholder={`Nhập tên tiều đề cần tìm\u2026`}
                    onChange={handleSearch}
                />
            </div>
        </div>
    )
}
