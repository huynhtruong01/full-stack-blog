import { fetchAllCategory } from '@/utils/fetch_api'
import { useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { CategoryHomeList, SkeletonCategory } from './components'

export interface HomeCategoryProps {}

export function HomeCategory(props: HomeCategoryProps) {
    const { data, isLoading } = useQuery(['category-review'], fetchAllCategory)

    return (
        <div>
            <div className="flex py-4 items-center justify-between mb-2">
                <h3 className="text-3xl font-bold text-gray-900">Danh mục</h3>
                <div className="font-medium text-gray-700">
                    <Link
                        to="/categories"
                        className="group flex items-center hover:text-blue-500 hover:underline"
                    >
                        Xem thêm{' '}
                        <MdKeyboardArrowRight className="opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:ml-1 ease-in-out duration-200" />
                    </Link>
                </div>
            </div>
            <div>
                {isLoading && <SkeletonCategory />}
                {data?.data?.length > 0 && !isLoading && (
                    <CategoryHomeList categoryList={data?.data} />
                )}
            </div>
        </div>
    )
}
