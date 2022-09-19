import { Search, SelectSearch } from '@/components/filters'
import { fetchAllCategoryNotFilter } from '@/utils/fetch_api'
import { useQuery } from '@tanstack/react-query'

export interface FiltersBlogProps {
    filters: any
    onChange: (filters: any) => void
}

export function FiltersBlog({ filters, onChange }: FiltersBlogProps) {
    const { data } = useQuery(['category-list'], fetchAllCategoryNotFilter)

    const handleSearchChange = (value: string) => {
        let newFilters: any
        if (value === '') {
            newFilters = { ...filters }
            delete newFilters.search
        } else {
            newFilters = { ...filters, search: value }
        }

        onChange(newFilters)
    }

    const handleSelectChange = (value: string) => {
        let newFilters: any
        if (value === '') {
            newFilters = { ...filters }
            delete newFilters.category
        } else {
            newFilters = { ...filters, category: value }
        }

        onChange(newFilters)
    }

    return (
        <div className="flex">
            <div className="mr-3">
                <Search
                    valueSearch={filters.search || ''}
                    onChange={handleSearchChange}
                    placeholder={`Nhập tiêu đề bài viết\u2026`}
                />
            </div>
            <div>
                <SelectSearch
                    category={filters.category}
                    placeholder={`Chọn thể loại`}
                    valueList={data}
                    onChange={handleSelectChange}
                />
            </div>
        </div>
    )
}
