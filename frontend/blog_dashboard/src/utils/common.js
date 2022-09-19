export const getFirstPathname = (pathname) => {
    if (!pathname) return

    return pathname.replaceAll('-', ' ').split('/')[1]
}

// time upload blog
const monthList = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

export const timeBlog = (time) => {
    const date = new Date(time)

    const day = date.getDate()
    const month = date.getMonth()

    return `${monthList[month]} ${day}`
}
