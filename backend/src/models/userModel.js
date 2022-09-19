const mongoose = require('mongoose')

const user = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        detail: {
            type: String,
            trim: true,
            default: '',
        },
        website: [
            {
                type: String,
                trim: true,
            },
        ],
        avatar: {
            type: String,
            default: 'http://cdn.onlinewebfonts.com/svg/img_569204.png',
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            trim: true,
        },
        role: {
            type: mongoose.Types.ObjectId,
            ref: 'Role',
            required: true,
            default: '62ebefbbad8d1d9b40a3ef72',
        },
        rf_token: { type: String, select: false },
        savedBlog: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Blog',
            },
        ],
        followers: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        following: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

user.index({ username: 'text' })
const User = mongoose.model('User', user)
User.createIndexes({ username: 'text' })

module.exports = User
