import { TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { formatMultiFirstText } from '../../../utils/typography'
import PropTypes from 'prop-types'

TableDataHeader.propTypes = {
    data: PropTypes.array.isRequired,
}

function TableDataHeader({ data }) {
    return (
        <TableHead>
            <TableRow>
                {data?.map((x) => (
                    <TableCell align="center" key={x}>
                        {formatMultiFirstText(x)}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default TableDataHeader
