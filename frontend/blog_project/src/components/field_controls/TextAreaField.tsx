import { useState } from 'react'
import { Controller } from 'react-hook-form'

export interface TextAreaFieldProps {
    name: string
    form: any
    label: string
    placeholder?: string
    maximumCharacters?: number
    rows?: number
    disabled?: boolean
}

export function TextAreaField({
    name,
    form,
    label,
    placeholder,
    maximumCharacters = 100,
    rows = 2,
    disabled = false,
}: TextAreaFieldProps) {
    const [numberCharacters, setNumberCharacters] = useState<number>(
        form.getValues(name)?.length || 0
    )
    const { control, formState }: any = form
    const error = formState?.errors[name]

    // console.log(error)

    return (
        <div className="my-2">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <div>
                            <label
                                htmlFor={label}
                                className={`block mb-1 text-lg font-medium text-gray-900 ${
                                    error ? 'text-red-700' : ''
                                } ${disabled ? 'text-gray-300' : ''}`}
                            >
                                {label}
                            </label>
                            <textarea
                                id={label}
                                rows={rows}
                                value={value}
                                disabled={disabled}
                                className={`block p-2.5 w-full text-gray-900 bg-gray-50 rounded border  focus:ring-blue-500 focus:border-blue-500 ${
                                    !!error
                                        ? 'border-red-700 text-red-700 focus:border-red-700'
                                        : ''
                                } ${disabled ? 'disabled:border-gray-300 text-gray-300' : ''}`}
                                placeholder={placeholder}
                                onChange={(e) => {
                                    setNumberCharacters(e.target.value.length)
                                    onChange(e.target.value)
                                }}
                            ></textarea>
                        </div>
                        <div className="flex justify-between px-2 mt-1">
                            {error && (
                                <span className="text-red-700 text-sm">{error?.message}</span>
                            )}
                            {!error && <span className="pl-2 mt-1 text-red-700 text-sm"></span>}
                            <span
                                className={`text-sm text-gray-400 ${error ? 'text-red-700' : ''}`}
                            >
                                {numberCharacters}/{maximumCharacters}
                            </span>
                        </div>
                    </>
                )}
            />
        </div>
    )
}
