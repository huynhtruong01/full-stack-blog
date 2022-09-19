import * as React from 'react'
import { GrFormPrevious } from 'react-icons/gr'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

export interface PaginationProps {
    prevPage: number
    totalPage: number
    onClick?: (page: number) => void | null
}

export function Pagination({ prevPage, onClick, totalPage }: PaginationProps) {
    const handlePrev = () => {
        if (prevPage === 1 || !onClick) return
        onClick(prevPage - 1)
    }

    const handleNext = () => {
        if (prevPage === totalPage || !onClick) return
        onClick(prevPage + 1)
    }

    const handlePageClick = (page: number) => {
        if (page === prevPage || !onClick) return
        onClick(page)
    }

    return (
        <div className="flex">
            <button
                className="w-9 h-9 flex justify-center p-2 mr-2 border border-gray-600 rounded disabled:text-gray-300 disabled:cursor-not-allowed disabled:border-gray-300"
                disabled={prevPage === 1}
                onClick={handlePrev}
            >
                <MdArrowBackIosNew
                    className={`text-lg ${prevPage === 1 ? 'text-gray-300' : 'text-gray-600'}`}
                />
            </button>
            {Array.from(new Array(totalPage), (_, i) => i + 1).map((pageNumber) => (
                <button
                    className={`w-9 h-9 flex justify-center items-center p-2 rounded mr-2 ${
                        prevPage === pageNumber
                            ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-700 hover:border-blue-700 hover:text-white'
                            : 'text-gray-600 border border-gray-600 hover:bg-gray-300 hover:border-gray-300 hover:text-gray-700'
                    }  ease-in-out duration-200`}
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}
            <button
                className="w-9 h-9 flex justify-center p-2 border border-gray-600 rounded disabled:text-gray-300 disabled:cursor-not-allowed disabled:border-gray-300"
                disabled={prevPage === totalPage}
                onClick={handleNext}
            >
                <MdArrowForwardIos
                    className={`text-lg ${
                        prevPage === totalPage ? 'text-gray-300' : 'text-gray-600'
                    }`}
                />
            </button>
        </div>
    )
}
