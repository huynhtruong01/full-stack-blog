import { CategoryData } from '@/utils/interface'
import { CategoryItem } from './CategoryItem'

export interface CategoryListProps {
    categoryList: Array<CategoryData>
}

export function CategoryList({ categoryList }: CategoryListProps) {
    return (
        <div className="flex gap-4">
            {categoryList.map((category: CategoryData, index: number) => (
                <div key={category._id} className="w-[calc(100%_/_3_-_16px)]">
                    <CategoryItem category={category} index={index + 1} />
                </div>
            ))}
        </div>
    )
}
