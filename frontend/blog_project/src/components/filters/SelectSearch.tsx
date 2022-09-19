import { formatUppercaseFirstText } from '@/utils/common'
import * as React from 'react'

interface SelectValue {
    value: string
    name: string
}

export interface SelectSearchProps {
    category: string
    valueList: Array<SelectValue>
    onChange: (value: string) => void
    placeholder?: string
}

export function SelectSearch({
    category,
    valueList,
    onChange,
    placeholder = '-- Chọn --',
}: SelectSearchProps) {
    const handleSelectChange = (e: any) => {
        onChange(e.target.value)
    }

    return (
        <div>
            <select
                className="bg-gray-100 border border-gray-300 rounded p-4 focus:ring-blue-500 focus:border-blue-500 block w-full text-gray-700"
                value={category}
                onChange={handleSelectChange}
            >
                <option value="">{placeholder}</option>
                {valueList?.map((x) => (
                    <option value={x.value} key={x.value}>
                        {formatUppercaseFirstText(x.name)}
                    </option>
                ))}
            </select>
        </div>
    )
}
