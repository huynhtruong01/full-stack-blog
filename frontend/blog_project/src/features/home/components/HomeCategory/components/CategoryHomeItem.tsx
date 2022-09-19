import { formatUppercaseFirstText, truncateWords } from '@/utils/common'
import { CategoryData } from '@/utils/interface'
import * as React from 'react'
import { Link } from 'react-router-dom'

export interface CategoryHomeItemProps {
    category: CategoryData
}

export function CategoryHomeItem({ category }: CategoryHomeItemProps) {
    return (
        <Link to={`/categories/${category._id}`}>
            <div className="px-6 py-4 rounded-md bg-blue-500 text-center border-2 border-blue-700 cursor-pointer hover:bg-blue-700 ease-in-out duration-200">
                <h4 className="text-xl font-bold text-white mb-2">
                    {formatUppercaseFirstText(category.name)}
                </h4>
                <p className="text-sm text-white font-medium">
                    {truncateWords(category.description, 6)}
                </p>
            </div>
        </Link>
    )
}
