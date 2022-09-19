import * as React from 'react'

export interface ButtonIconProps {
    name: string
    icon: any
    fullWidth?: boolean
    fontSize?: string
    colorBg?: string
    callback?: (() => void) | null
}

export function ButtonIcon({
    name,
    icon,
    fullWidth = false,
    fontSize = 'base',
    colorBg = 'blue',
    callback = null,
}: ButtonIconProps) {
    const Icon = icon

    const renderFontSize = () => {
        switch (fontSize) {
            case 'sm':
                return 'text-sm'
            case 'lg':
                return 'text-lg'
        }
    }

    const renderColor = () => {
        switch (colorBg) {
            case 'blue':
                return 'bg-blue-500 hover:bg-blue-700'
            case 'red':
                return 'bg-red-500 hover:bg-red-700'
        }
    }

    const handleClick = async () => {
        if (!callback) return

        try {
            await callback()
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <button
            className={`flex items-center ${
                fullWidth ? 'w-full' : ''
            } justify-center text-white p-1 ${renderColor()} rounded py-2 px-4 ${renderFontSize()} duration-200 ease-in-out`}
            onClick={handleClick}
        >
            <span className="mr-1">
                <Icon className="text-[17px]" />
            </span>
            {name}
        </button>
    )
}
