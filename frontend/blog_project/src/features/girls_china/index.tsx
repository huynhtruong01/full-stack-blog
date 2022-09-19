import { GirlsChinaRoutes } from '@/routes'
import { useEffect } from 'react'

export interface GirlsChinaProps {}

export function GirlsChina(props: GirlsChinaProps) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <section className="w-full">
            <GirlsChinaRoutes />
        </section>
    )
}
