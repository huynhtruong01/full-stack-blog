import { useEffect } from 'react'
import { HomeBlog, HomeCategory, HomeStory } from './components'

export interface HomeProps {}

export function Home(props: HomeProps) {
    useEffect(() => {
        document.title = 'Trang chủ | H.Blog'
        window.scrollTo(0, 0)
    }, [])

    return (
        <section className="bg-white">
            <div className="max-w-6xl m-auto px-4">
                <div className="pb-10">
                    <h1 className="text-5xl font-semibold text-center py-6 border-b border-gray-300 text-gray-900">
                        CÁC BÀI VIẾT
                    </h1>
                    <div className="py-6">
                        <HomeBlog />
                    </div>
                </div>
                <div className="pt-8 pb-10">
                    <HomeStory />
                </div>
                <div className="pt-8 pb-10">
                    <HomeCategory />
                </div>
            </div>
        </section>
    )
}
