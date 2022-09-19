import { usersApi } from '@/api'
import { ButtonIcon } from '@/components/common'
import { formatUppercaseFirstText } from '@/utils/common'
import { useQueryClient } from '@tanstack/react-query'
import { IoAdd } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import { toast, ToastContainer } from 'react-toastify'
import { InputAddField } from './InputAddField'

export interface InformationDetailProps {
    user: { _id: string; detail: string }
    showInputAdd: boolean
    setShowInputAdd: any
}

export function InformationDetail({ user, showInputAdd, setShowInputAdd }: InformationDetailProps) {
    const queryClient = useQueryClient()

    const handleShowInput = (key: string) => {
        const isShow = !showInputAdd
        setShowInputAdd((prev: any) => ({ ...prev, [key]: isShow }))
    }

    const handleSaveDetail = async (value: string) => {
        try {
            const newValues = { _id: user._id, detail: value }
            await usersApi.update(newValues)
            const users: any = queryClient.getQueryData(['users'])
            const newUser = await usersApi.getById(user._id)

            // local storage
            localStorage.setItem('users', JSON.stringify({ ...users, user: newUser.data }))

            // query
            queryClient.setQueryData(['users'], { ...users, user: newUser.data })
            queryClient.invalidateQueries(['users'])

            // set show input => false
            handleShowInput('addDetail')
        } catch (error: any) {
            console.log(error)
            toast.error(error, {
                autoClose: 2000,
                theme: 'colored',
            })
        }
    }

    return (
        <div>
            {showInputAdd && (
                <div className="mb-4">
                    <InputAddField
                        placeholder={user.detail ? 'Chỉnh sửa mô tả' : 'Thêm mô tả'}
                        setShowInput={setShowInputAdd}
                        initValue={user.detail ? user.detail : ''}
                        onSubmit={handleSaveDetail}
                    />
                </div>
            )}

            {user.detail && !showInputAdd && (
                <>
                    <div className="mb-4">
                        <p className="text-gray-400">Mô tả</p>
                        <p className="font-medium text-gray-700">
                            {formatUppercaseFirstText(user?.detail)}
                        </p>
                    </div>
                    <div onClick={() => handleShowInput('addDetail')}>
                        <ButtonIcon name="Chỉnh sửa mô tả" icon={MdEdit} />
                    </div>
                </>
            )}

            {!user.detail && !showInputAdd && (
                <div onClick={() => handleShowInput('addDetail')}>
                    <ButtonIcon name="Thêm mô tả" icon={IoAdd} />
                </div>
            )}

            <ToastContainer />
        </div>
    )
}
