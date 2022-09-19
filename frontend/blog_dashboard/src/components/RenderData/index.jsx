import { Box } from '@mui/material'
import { blue, green, red } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'
import { formatDate } from '../../utils/date'
import { formatFirstText, formatMultiFirstText, truncateWords } from '../../utils/typography'
import { TextDisplayColor } from '../common/TextDisplayColor'
import Image from './components/Image'

RenderData.propTypes = {
    values: PropTypes.array.isRequired,
}

function RenderSwitch({ values }) {
    switch (values[0]) {
        case 'fullname':
        case 'name':
            return (
                <Box color={blue[700]} fontWeight={500}>
                    {formatMultiFirstText(values[1])}
                </Box>
            )
        case 'nameUser':
            return (
                <Box color={blue[700]} fontWeight={500}>
                    {values[1]}
                </Box>
            )
        case 'image':
        case 'avatar':
            return <Image img={values[1]} value={values[0]} />
        case 'occupation':
            return `${formatFirstText(values[1])}`
        case 'number':
            return `${values[1]}`
        case 'dateOfBirth':
        case 'date':
            return formatDate(values[1])
        case 'username':
        case 'email':
            return values[1]
        case 'isActive':
            return (
                <TextDisplayColor
                    txt={values[1] ? 'Active' : 'Not active'}
                    color={values[1] ? green : red}
                />
            )
        case 'title':
        case 'description':
            return truncateWords(formatFirstText(values[1]), 7)
        default:
            return `${formatMultiFirstText(values[1])}`
    }
}

function RenderData({ values }) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <RenderSwitch values={values} />
        </Box>
    )
}

export default RenderData
