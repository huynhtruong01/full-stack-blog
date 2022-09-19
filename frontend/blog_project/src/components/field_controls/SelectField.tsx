import { formatUppercaseFirstText } from '@/utils/common'
import * as React from 'react'
import { Controller } from 'react-hook-form'

interface Value {
    value: string
    name: string
}

export interface SelectFieldProps {
    name: string
    label: string
    form: any
    placeholder?: string
    valueList: Array<Value>
    disabled?: boolean
}

export function SelectField({
    name,
    label,
    form,
    valueList,
    placeholder = '',
    disabled = false,
}: SelectFieldProps) {
    const { control, formState }: any = form
    const error = formState?.errors[name]

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
                            <select
                                id={label}
                                disabled={disabled}
                                className={`bg-gray-50 border text-gray-900 rounded focus:ring-0 focus:border-blue-500 block w-full p-2.5 text-base cursor-pointer ${
                                    !!error
                                        ? 'border-red-700 focus:border-red-700 placeholder:text-red-700'
                                        : ''
                                } ${
                                    disabled
                                        ? 'disabled:border-gray-300 disabled:text-gray-300'
                                        : ''
                                }`}
                                value={value}
                                onChange={onChange}
                            >
                                <option value="">{placeholder}</option>
                                {valueList?.map((x) => (
                                    <option value={x?.value} key={value}>
                                        {formatUppercaseFirstText(x?.name)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {error && (
                            <p className="text-red-700 text-sm mt-1 pl-2">{error?.message}</p>
                        )}
                    </>
                )}
            />
        </div>
    )
}
