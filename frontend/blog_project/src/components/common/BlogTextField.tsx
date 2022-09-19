import { categoriesApi } from '@/api'
import { SelectField, TextAreaField } from '@/components/field_controls'
import { useQuery } from '@tanstack/react-query'

export interface BlogTextFieldProps {
    name: any
    label: any
    placeholder?: any
    form: any
    disabled?: boolean
}

export function BlogTextField({
    name,
    label,
    placeholder,
    form,
    disabled = false,
}: BlogTextFieldProps) {
    const fetchCategoryList = async ({ queryKey }: any) => {
        try {
            const { data }: any = await categoriesApi.getAll()

            const newDataList = data?.map((x: any) => ({ name: x.name, value: x._id }))

            return newDataList
        } catch (error: any) {
            throw new Error(error)
        }
    }

    const { data } = useQuery(['category-list'], fetchCategoryList, {
        staleTime: 3 * 60 * 1000,
    })

    return (
        <div className="w-full flex gap-6">
            <div className="w-[380px]">
                <TextAreaField
                    name={name?.title}
                    form={form}
                    label={label?.title}
                    placeholder={placeholder?.title}
                    disabled={disabled}
                />
                {data && (
                    <SelectField
                        name={name?.category}
                        label={label?.category}
                        form={form}
                        placeholder={placeholder?.category}
                        valueList={data}
                    />
                )}
            </div>
            <div className="flex-1">
                <TextAreaField
                    name={name?.description}
                    form={form}
                    label={label?.description}
                    placeholder={placeholder?.description}
                    rows={5}
                    maximumCharacters={200}
                />
            </div>
        </div>
    )
}
