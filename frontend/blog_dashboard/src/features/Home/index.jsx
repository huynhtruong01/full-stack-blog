import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ModalConditionLoading } from '../../components/Modal'
import {
    fetchAllCount,
    fetchDataChartBlog,
    fetchTopLikeBlog,
    fetchUserList,
} from '../../utils/fetchData'
import { BlogTopLike, Chart, TagList, UserActivity } from './components'

Home.propTypes = {}

export function Home() {
    const [filters, setFilters] = useState({
        type: 'month',
        year: new Date().getFullYear(),
    })

    const counts = useQuery('counts', fetchAllCount, {
        cacheTime: Infinity,
        staleTime: Infinity,
    })

    const dataChart = useQuery([filters], fetchDataChartBlog, {
        cacheTime: Infinity,
        staleTime: Infinity,
    })

    const topLikeBlog = useQuery('top-like-blog', fetchTopLikeBlog, {
        cacheTime: Infinity,
        staleTime: Infinity,
    })

    const userList = useQuery('user-list', fetchUserList, {
        cacheTime: Infinity,
        staleTime: 60 * 1000,
    })

    useEffect(() => {
        dataChart.refetch()
    }, [filters])

    const handleChartChange = (type) => {
        setFilters((prev) => ({ ...prev, type }))
    }

    // console.log(userList?.data)

    return (
        <Box>
            {counts?.data && topLikeBlog?.data && userList?.data && (
                <Box display="flex">
                    <Box flex="2.5" mr="16px">
                        <Box mb="16px">
                            <TagList tagList={counts.data} />
                        </Box>
                        <Chart
                            blogDataChartList={dataChart?.data}
                            type={filters.type}
                            onChange={handleChartChange}
                        />
                    </Box>
                    <Box flex="1">
                        <Box>
                            <Box mb={2}>
                                <BlogTopLike blogList={topLikeBlog?.data} />
                            </Box>
                            <Box>
                                <UserActivity userList={userList?.data} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
            {counts?.isLoading && <ModalConditionLoading />}
            {counts?.error && <Typography textAlign="center">Load data failed</Typography>}
        </Box>
    )
}
