import { InputField, PasswordField } from '@/components/field_controls'
import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

export interface ModalEditInformationFormProps {
    user: any
    onSubmit: ((values: any) => Promise<void>) | null
}

export function ModalEditInformationForm({ user, onSubmit }: ModalEditInformationFormProps) {
    const schema = yup.object().shape({
        username: yup
            .string()
            .required('Vui lòng nhập tên người dùng của bạn')
            .test(
                'at-least-three-characters',
                'Vui lòng nhập ít nhất 3 ký tự trở lên',
                (value: string | undefined): boolean => {
                    if (!value) return false
                    return Boolean(
                        value?.split(' ')?.filter((x) => !!x && x.length >= 3)?.length >= 1
                    )
                }
            ),
        fullname: yup
            .string()
            .required('Vui lòng nhập họ tên của bạn')
            .test(
                'at-least-two-words',
                'Vui lòng nhập ít nhất 2 từ trở lên',
                (value: string | undefined): boolean => {
                    if (!value) return false
                    return Boolean(
                        value?.split(' ')?.filter((x) => !!x && x.length >= 2)?.length >= 2
                    )
                }
            ),
        password: yup
            .string()
            .required('Vui lòng nhập mật khẩu của bạn')
            .min(6, 'Mật khẩu của bạn ít nhất 6 ký tự')
            .max(20, 'Mật khẩu của bạn tối đa 20 ký tự'),
        confirmPassword: yup
            .string()
            .required('Vui lòng nhập mật khẩu của bạn')
            .oneOf([yup.ref('password')], 'Mật khẩu của bạn không khớp với mật khẩu trên'),
    })

    const form = useForm<{
        fullname: string
        username: string
        email: string
        password: string
        confirmPassword: string
    }>({
        defaultValues: {
            fullname: user?.fullname,
            username: user?.username,
            email: user?.email,
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values: any) => {
        if (!onSubmit) return

        try {
            await onSubmit(values)
            form.reset()
        } catch (error: any) {
            console.log(error)
            toast.error(error, {
                autoClose: 2000,
                theme: 'colored',
            })
        }
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="mb-6">
                <InputField
                    name="fullname"
                    form={form}
                    label="Họ tên"
                    placeholder={`Nhập họ tên\u2026`}
                />
                <InputField
                    name="username"
                    form={form}
                    label="Tên bạn dùng"
                    placeholder={`Nhập tên \u2026`}
                />
                <InputField
                    name="email"
                    form={form}
                    label="Email"
                    placeholder={`Nhập email \u2026`}
                    disabled={true}
                />
                <PasswordField name="password" form={form} label="Mật khẩu" />
                <PasswordField name="confirmPassword" form={form} label="Xác nhận mật khẩu" />
            </div>
            <button
                type="submit"
                className="text-white w-full bg-blue-500 hover:bg-blue-700 rounded border border-gray-200 text-sm font-medium px-10 py-3 hover:text-white focus:z-10 duration-200 ease-in-out"
            >
                Thay đổi thông tin
            </button>
        </form>
    )
}
