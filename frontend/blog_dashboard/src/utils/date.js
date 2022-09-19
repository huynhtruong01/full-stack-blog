export const formatDate = (date) => {
    let newDate = !date ? Date.now() : date

    const dates = `0${new Date(newDate).getDate()}`.slice(-2)
    const month = `0${new Date(newDate).getMonth()}`.slice(-2)
    const year = new Date(newDate).getFullYear()

    return `${dates}/${month}/${year}`
}
