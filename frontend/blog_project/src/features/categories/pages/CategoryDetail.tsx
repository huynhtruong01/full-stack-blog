import { LoadingSpinner, TabList } from '@/components/common'
import { formatUppercaseFirstText } from '@/utils/common'
import { fetchCategoryById } from '@/utils/fetch_api'
import { Tab } from '@/utils/interface'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { FaListAlt } from 'react-icons/fa'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { MdDescription } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { CategoryBlogList } from '../components'

export interface CategoryDetailProps {}

export function CategoryDetail(props: CategoryDetailProps) {
    const [activeTab, setActiveTab] = useState('category-description')
    const { id }: any = useParams()

    const { data, isLoading }: any = useQuery(
        [{ type: 'category-id-detail', id }],
        fetchCategoryById
    )

    useEffect(() => {
        if (data) {
            document.title = `${formatUppercaseFirstText(data?.name)} | H.Blog`
        }
        window.scrollTo(0, 0)
    }, [data])

    const tabList: Tab[] = useMemo(
        () => [
            {
                icon: MdDescription,
                name: 'Mô tả',
                path: 'category-description',
            },
            {
                icon: FaListAlt,
                name: 'Các bài viết',
                path: 'category-blog-list',
            },
        ],
        []
    )

    return (
        <>
            {isLoading && <LoadingSpinner />}
            {data && (
                <section>
                    <div className="mb-10">
                        <h3 className="text-center text-4xl text-gray-900 font-semibold">
                            {data.name.toUpperCase()}
                        </h3>
                    </div>
                    <div>
                        <TabList
                            tabList={tabList}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        <div className="pt-6">
                            {activeTab === 'category-description' && (
                                <div className="flex items-center p-2 bg-blue-50 text-blue-700 rounded">
                                    <HiOutlineArrowNarrowRight className="mr-2" />
                                    <em>
                                        <b>{data.description}</b>
                                    </em>
                                </div>
                            )}
                            {activeTab === 'category-blog-list' && <CategoryBlogList id={id} />}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}
