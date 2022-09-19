import { CategoryData } from '@/utils/interface'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { CategoryHomeItem } from './CategoryHomeItem'

export interface CategoryHomeListProps {
    categoryList: Array<CategoryData>
}

export function CategoryHomeList({ categoryList }: CategoryHomeListProps) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
    }

    return (
        <div className="flex gap-4">
            {categoryList.map((category: CategoryData) => (
                <div className="w-[calc(100%_/_4_-_16px)]" key={category._id}>
                    <CategoryHomeItem category={category} />
                </div>
            ))}
        </div>
    )
}
