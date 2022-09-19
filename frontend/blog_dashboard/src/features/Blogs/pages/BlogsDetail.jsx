import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import {
    BackgroundArticle,
    CategoryLink,
    MainArticle,
    TitleArticle,
    UserInfo,
} from '../../../components/Article'
import { BackgroundSkeleton, UserSkeleton } from '../../../components/Skeleton'
import { fetchDetailBlog } from '../../../utils/fetchData'

BlogsDetail.propTypes = {}

export function BlogsDetail() {
    const { id } = useParams()

    const { data, isLoading } = useQuery(id, fetchDetailBlog, {
        cacheTime: 0,
    })
    // console.log(data)

    return (
        <Box
            sx={{
                p: '12px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: `1px solid ${grey[300]}`,
                a: {
                    display: 'inline-block',
                },
            }}
        >
            <Box mb="8px">
                {/* background blog */}
                {isLoading && <BackgroundSkeleton />}
                {data && !isLoading && (
                    <BackgroundArticle thumbnail={data?.thumbnail} title={data?.title} />
                )}
            </Box>

            <Box p="32px 64px">
                {/* info blog: user, title, category */}
                <Box>
                    {/* user */}
                    <Box>
                        {isLoading && <UserSkeleton />}
                        {data && !isLoading && (
                            <UserInfo
                                user={data?.user}
                                time={data?.createdAt}
                                likeNumber={data?.like?.length}
                            />
                        )}
                    </Box>

                    {/* title */}
                    {data && <TitleArticle title={data?.title} />}

                    {/* category */}
                    {data && <CategoryLink linkName={data?.category?.name} />}

                    {/* description */}
                    <Box mt="10px">
                        <Typography>{data?.description}</Typography>
                    </Box>
                </Box>

                {/* main article */}
                <Box p="32px 0">{data && <MainArticle article={data?.content} />}</Box>
            </Box>
        </Box>
    )
}
