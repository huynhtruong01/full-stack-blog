import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { blue } from '@mui/material/colors'
import { formatFirstText, formatMultiFirstText } from '../../utils/typography'
import { formatDate } from '../../utils/date'
import Image from '../RenderData/components/Image'

RenderValue.propTypes = {
    keyName: PropTypes.string.isRequired,
    valueName: PropTypes.string.isRequired,
}

export function RenderValue({ keyName, valueName }) {
    switch (keyName) {
        case 'fullname':
        case 'name':
            return (
                <Box color={blue[700]} fontWeight={500}>
                    {formatMultiFirstText(valueName)}
                </Box>
            )
        case 'image':
        case 'avatar':
            return <Image img={valueName} />
        case 'description':
        case 'occupation':
            return `${formatFirstText(valueName)}`
        case 'number':
            return `${valueName}`
        case 'dateOfBirth':
        case 'date':
            return formatDate(valueName)
        case 'username':
        case 'email':
            return valueName
        default:
            return `${formatMultiFirstText(valueName)}`
    }
}
