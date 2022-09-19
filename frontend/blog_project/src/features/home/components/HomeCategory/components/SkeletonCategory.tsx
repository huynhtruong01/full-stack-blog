import { useId } from 'react'

export interface SkeletonCategoryProps {}

export function SkeletonCategory(props: SkeletonCategoryProps) {
    const id = useId()

    return (
        <div className="flex gap-4">
            {Array.from(new Array(4)).map((x, index) => (
                <div className="w-[25%] h-28 rounded bg-gray-200" key={`${index}-${id}`}></div>
            ))}
        </div>
    )
}
