import { LoadingSpinner } from '@/components/common'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { IoIosCloudUpload } from 'react-icons/io'

export interface ThumbnailFieldProps {
    name: string
    form: any
    initValue?: string
}

export function ThumbnailField({ name, form, initValue = '' }: ThumbnailFieldProps) {
    const [thumbnail, setThumbnail] = useState(initValue)
    const [loading, setLoading] = useState<boolean>(false)

    const handleThumbnailChange = async (file: any) => {
        if (!file) return

        setLoading(true)
        try {
            const url: any = URL.createObjectURL(file)
            setThumbnail(url)
            setLoading(false)
            return url
        } catch (error: any) {
            console.log(error)
            setLoading(false)
            throw new Error(error)
        }
    }

    const { control, formState }: any = form
    const error = formState?.errors[name]

    return (
        <div className="w-full">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <div className="w-full h-[450px]">
                            {!form.getValues(name) && !loading && (
                                <label
                                    htmlFor="thumbnail"
                                    className={`w-full h-full border-2 border-dashed rounded hover:border-blue-500 hover:bg-gray-100 p-6 cursor-pointer flex justify-center items-center flex-col ease-in-out duration-100 ${
                                        !!error ? 'border-red-700 hover:border-red-700' : ''
                                    }`}
                                >
                                    <div className="text-gray-400">
                                        <IoIosCloudUpload className="text-5xl" />
                                    </div>
                                    <div className="mt-5">
                                        <div className="text-center">
                                            <span className="text-xl font-medium text-gray-800">
                                                Chọn ảnh để tải lên
                                            </span>
                                        </div>
                                        <div className="text-center">
                                            <span className="font-sm text-gray-400 text-center">
                                                Chọn ảnh tối đa 3MB
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white py-2 px-8 font-medium rounded mt-4 hover:bg-blue-700 ease-in-out duration-200"
                                    >
                                        Chọn tập tin
                                    </button>
                                </label>
                            )}
                            {thumbnail && form.getValues(name) && !loading && (
                                <label
                                    htmlFor="thumbnail"
                                    className={`w-full h-full bg-blue-500 ${
                                        !!error ? 'bg-red-700' : ''
                                    }`}
                                >
                                    <div className="w-full h-full rounded cursor-pointer p-1 bg-blue-500">
                                        <img src={thumbnail} alt="" className="rounded" />
                                    </div>
                                </label>
                            )}
                            {loading && (
                                <div className="w-full h-full flex justify-center items-center bg-black bg-opacity-20 rounded border-2 border-dashed border-blue-500">
                                    <div className="mr-3">
                                        <LoadingSpinner />
                                    </div>
                                    <p className="text-gray-700 font-medium text-xl">
                                        Đang tải ảnh...
                                    </p>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            id="thumbnail"
                            accept="image/*"
                            hidden
                            onChange={async (e: any) => {
                                const file = await e.target.files[0]
                                await handleThumbnailChange(file)
                                return onChange(file)
                            }}
                            // value={value}
                        />
                        {error && (
                            <p className="pl-2 mt-1 text-red-700 text-sm">{error?.message}</p>
                        )}
                    </>
                )}
            />
        </div>
    )
}
