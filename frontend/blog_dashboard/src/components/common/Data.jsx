import { Box } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import TableData from '../TableData'

Data.propTypes = {
    data: PropTypes.object.isRequired,
}

export function Data({ data }) {
    // console.log(data)

    return <Box>{data && <TableData dataHeader={data.dataHeader} dataBody={data.dataBody} />}</Box>
}
