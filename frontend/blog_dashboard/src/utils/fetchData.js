import blogsApi from '../api/blogsApi'
import categoriesApi from '../api/categoriesApi'
import commonApi from '../api/commonApi'
import rolesApi from '../api/rolesApi'
import storiesApi from '../api/storiesApi'
import usersApi from '../api/usersApi'
import ArticleIcon from '@mui/icons-material/Article'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import CategoryIcon from '@mui/icons-material/Category'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import authApi from '../api/authApi'

// ==================== Common ===========================
const tagList = [
    {
        name: 'Blogs',
        link: '/blogs',
        icon: ArticleIcon,
    },
    {
        name: 'Stories',
        link: '/stories',
        icon: AutoStoriesIcon,
    },
    {
        name: 'Users',
        link: '/users',
        icon: PeopleAltIcon,
    },
    {
        name: 'Categories',
        link: '/categories',
        icon: CategoryIcon,
    },
    {
        name: 'Roles',
        link: '/roles',
        icon: AssignmentIndIcon,
    },
]
export const fetchAllCount = async ({ queryKey }) => {
    try {
        const counts = await commonApi.getAllCount()
        const countArrList = Object.values(counts)

        const newTagList =
            tagList.map((tag, index) => ({ ...tag, number: countArrList[index] })) || []

        return newTagList
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchDataChartBlog = async ({ queryKey }) => {
    try {
        // console.log(queryKey)
        const { data } = await commonApi.getDataBlogChart(queryKey[0])

        // console.log(data)

        return data
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchTopLikeBlog = async ({ queryKey }) => {
    try {
        const { data } = await commonApi.getTopLikeBlog()

        // console.log(data)

        return data
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchUserList = async ({ queryKey }) => {
    try {
        const { data } = await usersApi.getAll()

        return data
    } catch (error) {
        throw new Error(error)
    }
}

// =================== Story =============================
// fetch all story by filters
export const fetchStories = async ({ queryKey }) => {
    try {
        const { type, ...filters } = queryKey[0]
        let result
        if (filters.name) {
            result = await storiesApi.search(filters)
        } else {
            result = await storiesApi.getAll(filters)
        }

        const newData =
            result?.data?.map((x, index) => ({
                _id: x._id,
                number: index + 1,
                image: x.avatarCover,
                fullname: x.fullname,
                dateOfBirth: x.dateOfBirth,
                domicile: x.domicile,
                occupation: x.occupation,
                nationality: x.nationality,
            })) || []

        return {
            storyList: newData,
            totalCount: result?.totalCount,
        }
    } catch (error) {
        throw new Error(error)
    }
}

// fetch by id stories
export const fetchStoryById = async ({ queryKey }) => {
    try {
        const { data } = await storiesApi.getById(queryKey[0])
        // console.log(data)

        return data
    } catch (error) {
        throw new Error(error)
    }
}

// ===================== User ==========================
// fetch all user by filters
export const fetchUsers = async ({ queryKey }) => {
    try {
        const { type, ...filters } = queryKey[0]
        let values
        if (!filters?.name) {
            values = await usersApi.getAll(filters)
        } else {
            values = await usersApi.search(filters)
        }

        const newData =
            values?.data?.map((x, index) => ({
                _id: x._id,
                number: index + 1,
                avatar: x.avatar,
                username: x.username,
                fullname: x.fullname,
                email: x.email,
                role: x.role.name,
                isActive: x.isActive,
            })) || []

        return {
            userList: newData,
            totalCount: values?.totalCount,
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

// fetch by id user
export const fetchUserById = async ({ queryKey }) => {
    try {
        const { data } = await usersApi.getById(queryKey[0])

        return data
    } catch (error) {
        throw new Error(error)
    }
}

// ========================= Role =========================
// fetch all role by filters
export const fetchRoles = async ({ queryKey }) => {
    try {
        const { type, ...filters } = queryKey[0]
        let values
        if (!filters?.name) {
            values = await rolesApi.getAll(filters)
        } else {
            values = await rolesApi.search(filters)
        }

        const newData =
            values?.data?.map((x, index) => ({
                _id: x._id,
                number: index + 1,
                name: x.name,
                description: x.description,
            })) || []

        return {
            roleList: newData,
            totalCount: values?.totalCount,
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

// fetch by id
export const fetchRoleById = async ({ queryKey }) => {
    try {
        const { data } = await rolesApi.getById(queryKey[0])

        return data
    } catch (error) {
        throw new Error(error)
    }
}

// ================= Category ======================
// fetch all by filters
export const fetchCategories = async ({ queryKey }) => {
    try {
        const { type, ...filters } = queryKey[0]
        let values
        if (!filters?.name) {
            values = await categoriesApi.getAll(filters)
        } else {
            values = await categoriesApi.search(filters)
        }

        const newData =
            values?.data?.map((x, index) => ({
                _id: x._id,
                number: index + 1,
                name: x.name,
                description: x.description,
            })) || []

        return {
            categoryList: newData,
            totalCount: values.totalCount,
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

// fetch by id
export const fetchCategoryById = async ({ queryKey }) => {
    try {
        const { data } = await categoriesApi.getById(queryKey[0])

        return data
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchAllCategory = async () => {
    try {
        const { data } = await categoriesApi.getAll()

        return data
    } catch (error) {
        throw new Error(error)
    }
}

// =================== Blogs ========================
// fetch all by filters
export const fetchBlogs = async ({ queryKey }) => {
    try {
        const { type, ...filters } = queryKey[0]
        let values
        if (!filters?.name) {
            values = await blogsApi.getAll(filters)
        } else {
            values = await blogsApi.search(filters)
        }

        const newData =
            values.data.map((x, index) => ({
                _id: x._id,
                number: index + 1,
                image: x.thumbnail,
                nameUser: x?.user?.username,
                title: x.title,
                category: x.category.name,
                likes: x.likes.length === 0 ? '0' : x.likes.length,
            })) || []

        // console.log(values.data)

        return {
            blogList: newData,
            totalCount: values.totalCount,
        }
    } catch (error) {
        throw new Error(error?.message)
    }
}

// fetch by id
export const fetchBlogById = async ({ queryKey }) => {
    try {
        const { data } = await blogsApi.getById(queryKey[0])
        // console.log(data)

        const { category, user, ...newData } = data

        return {
            ...newData,
            user: user._id,
            category: category._id,
        }
    } catch (error) {
        throw new Error(error)
    }
}

// fetch detail
export const fetchDetailBlog = async ({ queryKey }) => {
    try {
        const { data } = await blogsApi.getById(queryKey[0])

        return data
    } catch (error) {
        throw new Error(error)
    }
}

// ================ Refresh token =================
export const fetchRefreshToken = async () => {
    const users = localStorage.getItem('users')
    if (!users) return

    try {
        const users = await authApi.refreshToken()

        console.log(users)
        return users
    } catch (error) {
        throw new Error(error)
    }
}
