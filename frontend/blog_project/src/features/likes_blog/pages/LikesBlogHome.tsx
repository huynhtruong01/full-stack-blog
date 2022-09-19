import queryString from 'query-string'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export interface LikesBlogHomeProps {}

export function LikesBlogHome(props: LikesBlogHomeProps) {
    const location = useLocation()

    const filters = useMemo(() => {
        const params: any = queryString.parse(location.search)

        return {
            ...params,
            limit: Number.parseInt(params.limit) || 10,
            page: Number.parseInt(params.page) || 1,
        }
    }, [location.search])

    return <div></div>
}
