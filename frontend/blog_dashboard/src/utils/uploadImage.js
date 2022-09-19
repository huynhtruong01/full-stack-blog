import axios from 'axios'

export const checkFile = (file) => {
    let message = ''
    const typeList = ['image/png', 'image/jpeg', 'image/jpg']
    if (!file) {
        message = 'File is empty'
        return message
    }
    if (file.size >= 6 * 1024 * 1024) {
        message = 'The file largest is 2MB'
        return message
    }
    if (!typeList.includes(file.type)) {
        message = 'Invalid type'
        return message
    }

    return message
}

export const uploadImage = async (file) => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'rhgrkrru')
    formData.append('cloud_name', 'huynhtruong01')

    const res = await fetch('https://api.cloudinary.com/v1_1/huynhtruong01/image/upload', {
        method: 'POST',
        body: formData,
    })

    const data = await res.json()

    return {
        public_id: data.public_id,
        url: data.url,
    }
}
