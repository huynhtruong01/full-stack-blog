export const formatMultiFirstText = (txt = '') => {
    if (!txt) return

    return txt
        .split(' ')
        .map((x) => `${x[0].toUpperCase()}${x.slice(1).toLowerCase()}`)
        .join(' ')
}

export const formatFirstText = (txt = '') => {
    if (!txt) return

    return `${txt[0].toUpperCase()}${txt.slice(1).toLowerCase()}`
}

export const truncateWords = (str, size) => {
    if (!str || str <= size) return

    // console.log(size)

    return `${str?.split(' ')?.slice(0, size)?.join(' ')} \u2026`
}
