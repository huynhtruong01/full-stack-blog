import { formatUppercaseFirstText, truncateWords } from '@/utils/common'
import { CategoryData } from '@/utils/interface'
import * as React from 'react'
import { IoMdArrowRoundForward } from 'react-icons/io'
import { Link } from 'react-router-dom'

export interface CategoryItemProps {
    category: CategoryData
    index: number
}

export function CategoryItem({ category, index }: CategoryItemProps) {
    return (
        <Link to={`/categories/${category._id}`}>
            <div className="group flex items-center justify-between bg-blue-500 hover:bg-blue-700 px-5 py-2.5 pr-6 rounded ease-in-out duration-200">
                <div className="flex items-center">
                    <div className="text-6xl font-bold py-3 pr-4 text-blue-200">{index}.</div>
                    <div className="mr-1.5">
                        <h3 className="text-2xl font-bold text-white">
                            {formatUppercaseFirstText(category.name)}
                        </h3>
                        <p className="text-xs text-gray-200">
                            {truncateWords(category.description, 5)}
                        </p>
                    </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-white duration-200 ease-in-out">
                    <IoMdArrowRoundForward className="text-2xl" />
                </div>
            </div>
        </Link>
    )
}
