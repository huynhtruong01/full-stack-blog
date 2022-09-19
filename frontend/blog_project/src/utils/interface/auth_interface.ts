// register
export interface RegisterData {
    username: string
    fullname: string
    email: string
    password: string
    role?: string
}

export interface RegisterValues {
    username: string
    fullname: string
    email: string
    password: string
    confirmPassword: string
}

// login
export interface LoginData {
    email: string
    password: string
}

export interface LoginValues {
    email: string
    password: string
}

// active
export interface ActiveTokenData {
    activeToken: string
}

// user
export interface InformationAccountData {
    _id: string
    fullname: string
    username: string
    detail: string
    website: string[]
    avatar: string
    email: string
}
