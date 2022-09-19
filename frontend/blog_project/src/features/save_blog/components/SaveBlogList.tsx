import { BlogData } from '@/utils/interface'
import { SaveBlogItem } from './SaveBlogItem'

export interface SaveBlogListProps {
    blogList: Array<BlogData>
}

export function SaveBlogList({ blogList }: SaveBlogListProps) {
    return (
        <div className="flex gap-4 flex-wrap">
            {blogList?.map((blog: BlogData) => (
                <div key={`${blog._id}`} className="w-[calc(100%_/_3_-_16px)]">
                    <SaveBlogItem blog={blog} />
                </div>
            ))}
        </div>
    )
}
