import AddIcon from '@mui/icons-material/Add'
import { Box, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import queryString from 'query-string'
import React, { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import storiesApi from '../../../api/storiesApi'
import { ButtonIcon } from '../../../components/Buttons'
import { PaginationPage, SearchPage } from '../../../components/Filters'
import { ModalDelete } from '../../../components/Modal'
import { getFirstPathname } from '../../../utils/common'
import { fetchStories } from '../../../utils/fetchData'
import { Data, Loading } from '../../../components/common'

StoriesHome.propTypes = {}

export function StoriesHome() {
    const navigate = useNavigate()
    const location = useLocation()

    window.scrollTo(0, 0)

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

    const { data, isLoading, isFetching, refetch } = useQuery([filters], fetchStories)
    useEffect(() => {
        refetch()
    }, [filters])

    const dataHeader = [
        'no',
        'image',
        'fullname',
        'date of birth',
        'domicile',
        'occupation',
        'nationality',
        'options',
    ]

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

    return (
        <Box width="100%">
            <Box>
                <Box mb="15px">
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <SearchPage placeholder="Search name..." onChange={handleSearchChange} />
                        <ButtonIcon
                            txt="Add new story"
                            icon={AddIcon}
                            color={blue}
                            callback={handleAddBlog}
                        />
                    </Box>
                </Box>
                <Box>
                    {isLoading && <Loading />}
                    {data && data?.storyList?.length > 0 && !isLoading && (
                        <>
                            <Box mb="16px">
                                <Data data={{ dataHeader, dataBody: data.storyList }} />
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
                    {data?.storyList?.length === 0 && (
                        <Typography textAlign="center" mt="30px" fontSize="1.2rem">
                            Not found data :((
                        </Typography>
                    )}
                </Box>
            </Box>
            <ModalDelete fetchApiData={storiesApi} />
        </Box>
    )
}
