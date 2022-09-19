import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchStoryById } from '../../../utils/fetchData'
import { MainArticle } from '../../../components/Article'
import { Loading, RenderValue } from '../../../components/common'

StoriesDetail.propTypes = {}

export function StoriesDetail() {
    const { id } = useParams()

    const { data, isLoading } = useQuery(id, fetchStoryById, {
        cacheTime: 0,
    })

    // console.log(data)

    const infoList = [
        {
            title: 'Name',
            name: 'fullname',
        },
        {
            title: 'Birthday',
            name: 'dateOfBirth',
        },
        {
            title: 'Domicile',
            name: 'domicile',
        },
        {
            title: 'Nationality',
            name: 'nationality',
        },
        {
            title: 'Occupation',
            name: 'occupation',
        },
        {
            title: 'Description',
            name: 'description',
        },
    ]

    return (
        <>
            {isLoading && <Loading />}
            {data && (
                <Box p="16px" backgroundColor="#fff" borderRadius="8px">
                    <Box display="flex" mb="32px" pt="4px">
                        <Box width="300px" mr="20px" borderRadius="8px" overflow="hidden">
                            <img src={data?.avatar} alt="" />
                        </Box>
                        <Box flex="1 1 0">
                            {infoList?.map((x) => (
                                <Box key={x.name} display="flex" alignItems="flex-start" mb="12px">
                                    <Box width="120px" fontWeight={600}>
                                        {x.title}
                                    </Box>
                                    <Box flex="1 1 0">
                                        <RenderValue keyName={x.name} valueName={data?.[x.name]} />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box>
                        <Typography component="h3" variant="h4">
                            {data?.title}
                        </Typography>
                        <MainArticle article={data?.content} />
                    </Box>
                </Box>
            )}
        </>
    )
}
