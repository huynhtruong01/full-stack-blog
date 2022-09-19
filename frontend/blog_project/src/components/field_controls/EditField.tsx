import { Controller } from 'react-hook-form'
import { EditorElement } from '../common'

export interface EditFieldProps {
    name: string
    label: string
    form: any
    placeholder?: string
    disabled?: boolean
}

export function EditField({ name, label, form, placeholder, disabled }: EditFieldProps) {
    const { control, formState } = form

    const error = formState?.errors[name]

    return (
        <div className="my-2">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <label
                            htmlFor={label}
                            className={`block mb-1 text-lg font-medium text-gray-900 ${
                                error ? 'text-red-700' : ''
                            }`}
                        >
                            {label}
                        </label>
                        <EditorElement
                            content={value}
                            onChange={onChange}
                            error={!!error}
                            placeholder={placeholder}
                            disabled={disabled}
                        />
                        {error && (
                            <div className="pl-2">
                                <span className="text-red-700 text-sm mt-1">{error?.message}</span>
                            </div>
                        )}
                    </>
                )}
            />
        </div>
    )
}
