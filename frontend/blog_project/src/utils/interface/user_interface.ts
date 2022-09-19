import { InformationAccountData } from './auth_interface'
import { BlogData } from './blog_interface'
export interface UserData {
    _id?: string
    username: string
    fullname: string
    detail?: string
    website?: string[]
    avatar: string
    email: string
    savedBlog?: BlogData[]
    followers: InformationAccountData[]
    following: InformationAccountData[]
    isActive?: boolean
    createdAt?: Date
    updatedAt?: Date
}
