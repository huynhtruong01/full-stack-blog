import { authApi } from '@/api'
import { LoginValues } from '@/utils/interface'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LoginForm } from '../components'

export interface LoginProps {}

export function Login(props: LoginProps) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const handleLogin = async (values: LoginValues) => {
        try {
            const users = await authApi.login(values)

            // save local storage
            localStorage.setItem('users', JSON.stringify(users))

            // set query client
            queryClient.setQueryData(['users'], users)
            queryClient.invalidateQueries(['users'])
            console.log('render code')

            toast.success('Đăng nhập thành công', {
                autoClose: 2000,
                theme: 'colored',
            })

            setTimeout(() => navigate('/'), 3000)
        } catch (error: any) {
            toast.error(error, {
                autoClose: 2000,
                theme: 'colored',
            })
            throw new Error(error)
        }
    }

    return (
        <div>
            <div className="w-[400px] m-auto p-4 border border-gray-200 rounded-md bg-gray-50">
                <h3 className="text-2xl text-center mb-4 font-bold">Đăng nhập</h3>
                <LoginForm onSubmit={handleLogin} />
            </div>
            <ToastContainer />
        </div>
    )
}
