import AddIcon from '@mui/icons-material/Add'
import { Box, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import queryString from 'query-string'
import React, { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import blogsApi from '../../../api/blogsApi'
import { ButtonIcon } from '../../../components/Buttons'
import { Data, Loading } from '../../../components/common'
import { PaginationPage, SearchPage, SelectSort } from '../../../components/Filters'
import { ModalDelete } from '../../../components/Modal'
import { getFirstPathname } from '../../../utils/common'
import { fetchAllCategory, fetchBlogs } from '../../../utils/fetchData'

BlogsHome.propTypes = {}

export function BlogsHome() {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const params = queryString.stringify({ page: 1, limit: 10 })
        navigate({
            pathname: location.pathname,
            search: `?${params}`,
        })
    }, [])

    const filters = useMemo(() => {
        const params = queryString.parse(location.search)

        return {
            ...params,
            page: Number.parseInt(params?.page) || 1,
            limit: Number.parseInt(params?.limit) || 10,
            type: getFirstPathname(location.pathname),
        }
    }, [location.search])

    // blog
    const { data, isLoading, refetch } = useQuery([filters], fetchBlogs)
    useEffect(() => {
        refetch()
    }, [filters])

    // console.log(data)

    const dataHeader = ['no', 'image', 'name user', 'title', 'category', 'likes', 'options']

    // category
    const categories = useQuery('categories', fetchAllCategory, {
        cacheTime: Infinity,
        staleTime: Infinity,
    })

    const handleAddBlog = () => {
        navigate(`${location?.pathname}/add`)
    }

    const handlePaginationChange = (page) => {
        // setFilters((prev) => ({ ...prev, page }))
        const params = queryString.stringify({ ...filters, page })
        navigate({
            pathname: location.pathname,
            search: `?${params}`,
        })
    }

    const handleSearchChange = (value) => {
        // setFilters((prev) => ({ ...prev, name: value }))
        const params = queryString.stringify({ ...filters, name: value, page: 1 })
        navigate({
            pathname: location.pathname,
            search: `?${params}`,
        })
    }

    const handleSortCategoryChange = (value) => {
        const newFilters = { ...filters }
        let params
        if (value === 'all') {
            delete newFilters.category
            params = queryString.stringify({ ...newFilters })
        } else {
            params = queryString.stringify({ ...newFilters, category: value })
        }

        navigate({
            pathname: location.pathname,
            search: `?${params}`,
        })
    }

    return (
        <Box width="100%">
            <Box>
                <Box mb="15px">
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex">
                            <Box mr={1}>
                                <SearchPage
                                    placeholder="Search name..."
                                    onChange={handleSearchChange}
                                />
                            </Box>
                            {categories?.data && (
                                <SelectSort
                                    label="Category"
                                    valueSort={filters.category || 'all'}
                                    dataList={categories?.data}
                                    onChange={handleSortCategoryChange}
                                />
                            )}
                        </Box>
                        <ButtonIcon
                            txt="Add new blog"
                            icon={AddIcon}
                            color={blue}
                            callback={handleAddBlog}
                            p="5px 16px 5px 10px"
                        />
                    </Box>
                </Box>
                <Box>
                    {isLoading && <Loading />}
                    {data && data?.blogList?.length > 0 && !isLoading && (
                        <>
                            <Box mb="16px">
                                <Data data={{ dataHeader, dataBody: data.blogList }} />
                            </Box>
                            <Box display="flex" justifyContent="flex-end">
                                <PaginationPage
                                    page={filters.page}
                                    count={data.totalCount}
                                    onChange={handlePaginationChange}
                                />
                            </Box>
                        </>
                    )}
                    {data?.blogList?.length === 0 && (
                        <Typography textAlign="center" mt="30px" fontSize="1.2rem">
                            Not found data :((
                        </Typography>
                    )}
                </Box>
            </Box>
            <ModalDelete fetchApiData={blogsApi} />
        </Box>
    )
}
