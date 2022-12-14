const Blog = require('../models/blogModel')
const Category = require('../models/categoryModel')
const User = require('../models/userModel')
const ApiFeatures = require('../utils/apiFeatures')
const pagination = require('../utils/pagination')

const BlogController = {
    // create blog
    addBlog: async (req, res) => {
        try {
            console.log(req.body)
            const newBlog = new Blog({
                ...req.body,
            })

            const category = await Category.findById({ _id: req.body.category })
            if (!category) {
                return res.status(404).json({ message: 'Not found this category' })
            }

            const blog = await newBlog.save()

            await Category.findByIdAndUpdate(
                { _id: req.body.category },
                {
                    $push: {
                        blogList: blog?._id,
                    },
                },
                {
                    new: true,
                }
            )
            res.status(200).json({ blog, message: 'Add blog successfully' })
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'Add blog failed' })
        }
    },
    // get all blog
    getAllBlog: async (req, res) => {
        const { limit } = pagination(req.query)

        try {
            const features = new ApiFeatures(
                Blog.find()
                    .populate({
                        path: 'user',
                        select: '-password',
                    })
                    .populate('category')
                    .populate({
                        path: 'likes',
                        select: '-password',
                    }),
                req.query
            )
                .pagination()
                .search()
                .sort()
                .filter()

            const blogs = await Promise.allSettled([
                features.query,
                Blog.count(features.queryString),
            ])

            let totalCount = 0
            const data = blogs[0].status === 'fulfilled' ? blogs[0].value : []

            if (req.query.search) {
                const count = await Blog.aggregate([
                    {
                        $match: {
                            $text: {
                                $search: req.query.search,
                            },
                        },
                    },
                    {
                        $count: 'count',
                    },
                    {
                        $project: {
                            count: 1,
                        },
                    },
                ])

                totalCount = Math.ceil(count[0]?.['count'] / limit) || 0
            } else {
                const count = blogs[1].status === 'fulfilled' ? blogs[1].value : 0
                totalCount = Math.ceil(count / limit) || 0
            }

            // console.log(data, totalCount)

            res.status(200).json({ data, totalCount })
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'Get all blog failed' })
        }
    },
    // get by id blog
    getByIdBlog: async (req, res) => {
        try {
            console.log(req.params.id)
            const blog = await Blog.findById({ _id: req.params.id })
                .populate({
                    path: 'user',
                    select: '-password',
                })
                .populate('category')

            if (!blog) {
                return res.status(404).json({ message: 'Not found this blog' })
            }

            res.status(200).json({ data: blog })
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'Get by id blog failed' })
        }
    },
    // get by user
    getBlogByUser: async (req, res) => {
        const { limit } = pagination(req.body)

        try {
            // const user = await Blog.findOne({ user: req.body.id })
            // if (!user) {
            //     return res.status(404).json({ message: 'Not found this user' })
            // }

            const features = new ApiFeatures(Blog.find({ user: req.body.id }), req.body)
                .pagination()
                .search()
                .sort()
                .filter()

            const blogs = await Promise.allSettled([
                features.query,
                Blog.count(features.queryString),
            ])

            let totalCount = 0
            const data = blogs[0].status === 'fulfilled' ? blogs[0].value : []

            if (req.body.search) {
                const count = await Blog.aggregate([
                    {
                        $match: {
                            $text: {
                                $search: req.body.search,
                            },
                        },
                    },
                    {
                        $count: 'count',
                    },
                    {
                        $project: {
                            count: 1,
                        },
                    },
                ])

                // console.log(count[0].count / limit, limit)

                totalCount = Math.ceil(count[0]?.['count'] / limit) || 0
            } else {
                const count = blogs[1].status === 'fulfilled' ? blogs[1].value : 0
                totalCount = Math.ceil(count / limit) || 0
            }

            res.status(200).json({ data, totalCount })
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'Get blog by user failed' })
        }
    },
    // get by category
    getBlogByCategory: async (req, res) => {
        const { limit } = pagination(req.body)

        try {
            // const category = await Blog.findOne({ category: req.body.id })
            // if (!category) {
            //     return res.status(404).json({ message: 'Not found this category' })
            // }

            const features = new ApiFeatures(Blog.find({ category: req.body.id }), req.body)
                .pagination()
                .search()
                .sort()
                .filter()

            const blogs = await Promise.allSettled([
                features.query,
                Blog.count(features.queryString),
            ])

            let totalCount = 0
            const data = blogs[0].status === 'fulfilled' ? blogs[0].value : []

            if (req.body.search) {
                const count = await Blog.aggregate([
                    {
                        $match: {
                            $text: {
                                $search: req.body.search,
                            },
                        },
                    },
                    {
                        $count: 'count',
                    },
                    {
                        $project: {
                            count: 1,
                        },
                    },
                ])

                totalCount = Math.ceil(count[0]?.['count'] / limit) || 0
            } else {
                const count = blogs[1].status === 'fulfilled' ? blogs[1].value : 0
                totalCount = Math.ceil(count / limit) || 0
            }

            res.status(200).json({ data, totalCount })
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'Get blog by user failed' })
        }
    },
    // update blog
    updateBlog: async (req, res) => {
        try {
            const blog = await Blog.findById({ _id: req.params.id })
            if (!blog) {
                return res.status(404).json({ message: 'Not found this blog' })
            }

            await Blog.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        ...req.body,
                    },
                },
                {
                    new: true,
                }
            )

            res.status(200).json({ message: 'Update blog successfully' })
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'Update blog failed' })
        }
    },
    // delete blog
    deleteBlog: async (req, res) => {
        try {
            const blog = await Blog.findById({ _id: req.params.id })
            if (!blog) {
                return res.status(404).json({ message: 'Not found this blog' })
            }

            const category = await Category.findById({ _id: blog.category })
            if (!category) {
                return res.status(404).json({ message: 'Not found this category' })
            }

            console.log(category)

            await Category.findByIdAndUpdate(
                { _id: category._id },
                {
                    $pull: {
                        blogList: blog._id,
                    },
                },
                {
                    new: true,
                }
            )

            await Blog.findByIdAndDelete({ _id: req.params.id })

            res.status(200).json({ message: 'Delete blog successfully' })
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'Delete blog failed' })
        }
    },
    // like blog
    likeBlog: async (req, res) => {
        try {
            // check blog exits
            const blog = await Blog.findById({ _id: req.body.blogId })
            if (!blog) {
                return res.status(404).json({ message: 'Kh??ng t??m th???y b??i vi???t n??y' })
            }

            // push user id to likes
            const likeBlog = await Blog.findByIdAndUpdate(
                { _id: req.body.blogId },
                {
                    $push: { likes: req.body.userId },
                },
                {
                    new: true,
                }
            )

            res.status(200).json({ blog: likeBlog })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: '???? c?? l???i x???y ra khi th??ch b??i vi???t n??y',
            })
        }
    },
    // unlike blog
    unlikeBlog: async (req, res) => {
        try {
            // check blog exits
            const blog = await Blog.findById({ _id: req.body.blogId })
            if (!blog) {
                return res.status(404).json({ message: 'Kh??ng t??m th???y b??i vi???t n??y' })
            }

            // pull user id from likes
            const unlikeBlog = await Blog.findByIdAndUpdate(
                { _id: req.body.blogId },
                {
                    $pull: { likes: req.body.userId },
                },
                {
                    new: true,
                }
            )

            res.status(200).json({ blog: unlikeBlog })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: '???? x???y ra l???i khi kh??ng thich b??i vi???t n??y',
            })
        }
    },
    // save blog
    savedBlog: async (req, res) => {
        try {
            // check user exits?
            const user = await User.findById({ _id: req.body.userId })
            if (!user) {
                return res.status(404).json({ message: 'Kh??ng t??m th???y ng?????i d??ng n??y' })
            }

            // check blog exits?
            const blog = await Blog.findById({ _id: req.body.blogId })
            if (!blog) {
                return res.status(404).json({ message: 'Kh??ng t??m th???y b??i vi???t n??y' })
            }

            // update savedBlog on user
            const savedBlog = await User.findByIdAndUpdate(
                { _id: req.body.userId },
                {
                    $push: { savedBlog: req.body.blogId },
                },
                {
                    new: true,
                }
            )

            res.status(200).json({ user: savedBlog })
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'L??u b??i vi???t th???t b???i' })
        }
    },
    // unsaved blog
    unsavedBlog: async (req, res) => {
        try {
            // check user exits?
            const user = await User.findById({ _id: req.body.userId })
            if (!user) {
                return res.status(404).json({ message: 'Kh??ng t??m th???y ng?????i d??ng n??y' })
            }

            // check blog exits?
            const blog = await Blog.findById({ _id: req.body.blogId })
            if (!blog) {
                return res.status(404).json({ message: 'Kh??ng t??m th???y b??i vi???t n??y' })
            }

            // update save blog on user
            const unsavedBlog = await User.findByIdAndUpdate(
                { _id: req.body.userId },
                {
                    $pull: { savedBlog: req.body.blogId },
                },
                {
                    new: true,
                }
            )

            res.status(200).json({ blog: unsavedBlog })
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'H???y l??u b??i vi???t th???t b???i' })
        }
    },
}

module.exports = BlogController
