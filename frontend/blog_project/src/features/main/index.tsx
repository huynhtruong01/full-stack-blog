import { ModalDelete } from '@/components/common'
import { useInitGlobalState } from '@/hooks'
import { CommonRoutes, FeatureRoutes } from '@/routes'

export interface MainProps {}

export function Main(props: MainProps) {
    useInitGlobalState()

    return (
        <main className="max-w-6xl pt-[96px] pb-9 bg-white min-h-screen m-auto px-4">
            <FeatureRoutes />
            <CommonRoutes />
            <ModalDelete />
        </main>
    )
}
