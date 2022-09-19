import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import TagItem from './TagItem'

TagList.propTypes = {
    tagList: PropTypes.array.isRequired,
}

export function TagList({ tagList }) {
    return (
        <Box display="flex" gap="16px" flexWrap="wrap">
            {tagList?.map((tag, index) => (
                <Box key={`${tag.link}${index}`} width="calc(100% / 3 - 12px)">
                    <TagItem tag={tag} />
                </Box>
            ))}
        </Box>
    )
}
