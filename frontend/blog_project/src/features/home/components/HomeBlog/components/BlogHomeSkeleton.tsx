import { useId } from 'react'

export interface BlogHomeSkeletonProps {}

export function BlogSkeletonItem() {
    return (
        <div className="flex gap-4 py-4 border-b border-b-gray-300 first:pt-0 last:border-0">
            <div className="w-[200px] h-28">
                <div className="flex justify-center items-center w-full h-full bg-gray-300 rounded">
                    <svg
                        className="w-12 h-12 text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 640 512"
                    >
                        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                    </svg>
                </div>
            </div>
            <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded w-14 mb-6"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-[50%] mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-[70%]"></div>
            </div>
        </div>
    )
}

export function BlogHomeSkeleton(props: BlogHomeSkeletonProps) {
    const id = useId()

    return (
        <div className="flex flex-row gap-8 animate-pulse">
            <div className="w-[600px]">
                <div className="flex justify-center items-center w-full h-72 bg-gray-300 rounded mb-2">
                    <svg
                        className="w-12 h-12 text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 640 512"
                    >
                        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                    </svg>
                </div>
                <div className="pr-6">
                    <div className="mb-2">
                        <div className="h-2 bg-gray-200 rounded w-20 mb-4"></div>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 hover:text-blue-700 hover:underline">
                        <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-5 bg-gray-200 rounded w-48"></div>
                    </h2>
                    <p>
                        <div className="h-2.5 bg-gray-200 rounded w-[460px] mb-1.5"></div>
                        <div className="h-2.5 bg-gray-200 rounded w-[260px] mb-1.5"></div>
                        <div className="h-2.5 bg-gray-200 rounded w-[390px]"></div>
                    </p>
                </div>
            </div>

            <div className="flex-auto">
                <div className="mb-6">
                    {Array.from(new Array(3)).map((x, index) => (
                        <BlogSkeletonItem key={`${index}-${id}`} />
                    ))}
                </div>
            </div>
        </div>
    )
}
