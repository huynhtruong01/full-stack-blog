import * as React from 'react'
import { Controller } from 'react-hook-form'

export interface InputFieldProps {
    label: string
    name: string
    placeholder?: string
    form: any
    disabled?: boolean
}

export function InputField({ name, label, placeholder, form, disabled = false }: InputFieldProps) {
    const { control, formState } = form
    const error = formState?.errors[name]

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <div className="my-2">
                    <label
                        htmlFor={label}
                        className="block mb-1 font-medium text-gray-900 text-base"
                    >
                        {label}
                    </label>
                    <input
                        type="text"
                        id={label}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className="bg-white border border-gray-300 text-gray-900 rounded focus:border-blue-500 block w-full p-2.5 disabled:border-gray-300 disabled:text-gray-300"
                        placeholder={placeholder}
                        disabled={disabled}
                    />
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">{error?.message}</span>
                    </p>
                </div>
            )}
        />
    )
}
