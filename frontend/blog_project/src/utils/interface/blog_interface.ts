// api
export interface BlogData {
    _id?: string
    user?: any
    title: string
    description: string
    thumbnail: string
    content: string
    category: any
    likes?: number | any[]
    createdAt?: string
    updatedAt?: string
}

export interface BlogDataLike {
    blogId: string
    userId: string
}
