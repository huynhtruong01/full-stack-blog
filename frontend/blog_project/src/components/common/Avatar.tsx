import * as React from 'react'

export interface AvatarProps {
    imgUrl: string
    nameAvatar?: string
    sizeAvatar: string
}

export function Avatar({ imgUrl, nameAvatar, sizeAvatar = 'md' }: AvatarProps) {
    const renderSizeAvatar = () => {
        switch (sizeAvatar) {
            case 'sm': {
                return 'w-[24px] h-[24px]'
            }
            case 'md': {
                return 'w-[40px] h-[40px]'
            }
            case 'lg': {
                return 'w-[56px] h-[56px]'
            }
            case 'xl': {
                return 'w-[72px] h-[72px]'
            }
            case '2xl': {
                return 'w-[88px] h-[88px]'
            }
            case '3xl': {
                return 'w-[104px] h-[104px]'
            }
            case '4xl': {
                return 'w-[120px] h-[120px]'
            }
            case '5xl': {
                return 'w-[136px] h-[136px]'
            }
            case '6xl': {
                return 'w-[152px] h-[152px]'
            }
            case '7xl': {
                return 'w-[168px] h-[168px]'
            }
        }
    }

    return (
        <div className={`rounded-full overflow-hidden ${renderSizeAvatar()}`}>
            <img src={imgUrl} alt={nameAvatar} />
        </div>
    )
}
