import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef } from 'react'
import { useQueryClient } from 'react-query'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { checkFile, uploadImage } from '../../utils/uploadImage'

EditorQuill.propTypes = {
    content: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    error: PropTypes.bool,
}

export function EditorQuill({ content, onChange = null, error = false }) {
    const quillRef = useRef(null)
    const queryClient = useQueryClient()
    const container = [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown

        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript

        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction
        [{ align: [] }],

        ['clean', 'link', 'image', 'video'],
    ]

    const modules = {
        toolbar: { container },
    }

    const handleChangeImage = useCallback(() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.click()

        input.onchange = async () => {
            try {
                const files = input.files

                if (!files) return

                const file = files[0]
                const check = checkFile(file)
                // console.log(check)
                if (check !== '') return

                // show loading when load image
                queryClient.setQueryData('loading', { modalLoading: true })
                queryClient.invalidateQueries('loading')

                const photo = await uploadImage(file)
                // console.log(photo)

                const quill = quillRef.current
                const range = quill?.getEditor().getSelection()?.index
                // console.log(range)
                if (range !== undefined) {
                    quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`)
                }

                // hidden loading
                queryClient.setQueryData('loading', { modalLoading: false })
                queryClient.invalidateQueries('loading')
            } catch (error) {
                console.log(error)
            }
        }
    }, [content])

    useEffect(() => {
        const quill = quillRef.current
        if (!quill) return

        // console.log(quill.getEditor().getModule('toolbar'))
        let toolbar = quill.getEditor().getModule('toolbar')
        toolbar.addHandler('image', handleChangeImage)
    }, [handleChangeImage, content])

    // console.log(content)

    return (
        <Box>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                className={`${error ? 'error' : ''}`}
                placeholder="Write something..."
                modules={modules}
                defaultValue={content}
                onChange={(e) => {
                    if (!onChange) return
                    onChange(e)
                }}
            />
        </Box>
    )
}
