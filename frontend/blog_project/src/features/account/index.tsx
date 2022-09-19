import { AccountRoutes } from '@/routes'

export interface AccountProps {}

export function Account(props: AccountProps) {
    return (
        <section className="w-full">
            <AccountRoutes />
        </section>
    )
}
