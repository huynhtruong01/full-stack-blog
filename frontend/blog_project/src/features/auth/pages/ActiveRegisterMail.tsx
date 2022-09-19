import { authApi } from '@/api'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export interface ActiveRegisterMailProps {}

export function ActiveRegisterMail(props: ActiveRegisterMailProps) {
    const { token }: any = useParams()

    useEffect(() => {
        ;(async () => {
            if (!token) return

            await authApi.activeRegister({ activeToken: token })
        })()
    }, [])

    return (
        <div>
            <h3 className="text-2xl font-semibold text-center mb-4">
                Kích hoạt tài khoản của bạn thành công
            </h3>
            <div className="text-center text-gray-400 font-thin text-base">
                Vui lòng vào{' '}
                <Link
                    to="/login"
                    className="text-red-500 duration-200 ease-in-out hover:text-red-700"
                >
                    đăng nhập
                </Link>{' '}
                để vào trang web
            </div>
        </div>
    )
}
