import { InputField, PasswordField } from '@/components/field_controls'
import { RegisterValues } from '@/utils/interface'
import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'

export interface RegisterFormProps {
    onSubmit: (values: RegisterValues) => Promise<void> | null
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
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
        email: yup
            .string()
            .required('Vui lòng nhập email của bạn')
            .email('Email của bạn không hợp lệ'),
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

    const form = useForm<RegisterValues>({
        defaultValues: {
            username: '',
            fullname: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values: RegisterValues) => {
        try {
            await onSubmit(values)
            form.reset()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="mb-6">
                <InputField
                    name="username"
                    label="Tên người dùng"
                    placeholder="Nhập tên người dùng..."
                    form={form}
                    disabled={form?.formState?.isSubmitting}
                />
                <InputField
                    name="fullname"
                    label="Họ tên"
                    placeholder="Nhập họ tên..."
                    form={form}
                    disabled={form?.formState?.isSubmitting}
                />
                <InputField
                    name="email"
                    label="Email"
                    placeholder="Nhập email..."
                    form={form}
                    disabled={form?.formState?.isSubmitting}
                />
                <PasswordField
                    name="password"
                    label="Mật khẩu"
                    form={form}
                    disabled={form?.formState?.isSubmitting}
                />
                <PasswordField
                    name="confirmPassword"
                    label="Xác nhận mật khẩu"
                    form={form}
                    disabled={form?.formState?.isSubmitting}
                />
            </div>
            <button
                className="w-full py-2 bg-blue-500 hover:bg-blue-700 text-white rounded ease-in-out duration-200 disabled:bg-gray-300 disabled:text-gray-100"
                disabled={form?.formState?.isSubmitting}
            >
                Đăng ký
            </button>
            <p className="mt-5 text-sm text-center text-gray-600">
                Bạn đã có tài khoản?
                <Link
                    to="/login"
                    className="text-red-500 ml-1 hover:text-red-700 font-semibold ease-in-out duration-200"
                >
                    Đăng nhập ngay
                </Link>
            </p>
        </form>
    )
}
