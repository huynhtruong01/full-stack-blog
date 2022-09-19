import { checkFileImage, uploadImage } from '@/utils/common'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export interface EditorElementProps {
    content: string
    onChange: any
    error: boolean
    placeholder?: string
    disabled?: boolean
}

export function EditorElement({
    content,
    onChange,
    error,
    placeholder = '',
    disabled,
}: EditorElementProps) {
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
                const check = checkFileImage(file)
                // console.log(check)
                if (check !== '') return

                // show loading when load image
                queryClient.setQueryData(['loading'], { modalLoading: true })
                queryClient.invalidateQueries(['loading'])

                const photo: any = await uploadImage(file)
                // console.log(photo)

                const quill: any = quillRef.current
                const range = quill?.getEditor().getSelection()?.index
                // console.log(range)
                if (range !== undefined) {
                    quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`)
                }

                // hidden loading
                queryClient.setQueryData(['loading'], { modalLoading: false })
                queryClient.invalidateQueries(['loading'])
            } catch (error) {
                console.log(error)
            }
        }
    }, [content])

    useEffect(() => {
        const quill: any = quillRef.current
        if (!quill) return

        let toolbar = quill.getEditor().getModule('toolbar')
        toolbar.addHandler('image', handleChangeImage)
    }, [handleChangeImage])

    return (
        <div>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                className={`${error ? 'border-red-700' : ''} bg-gray-100 ${
                    disabled ? 'border-gray-300 text-white' : ''
                } border`}
                placeholder={placeholder}
                modules={modules}
                value={!content ? '' : content}
                defaultValue={content}
                onChange={(e) => {
                    if (!onChange) return
                    onChange(e)
                }}
            />
        </div>
    )
}
