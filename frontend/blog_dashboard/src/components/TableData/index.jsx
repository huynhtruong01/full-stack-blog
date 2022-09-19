import { Box, Paper, Table, TableContainer } from '@mui/material'
import React from 'react'
import TableDataBody from './components/TableDataBody'
import TableDataHeader from './components/TableDataHeader'
import PropTypes from 'prop-types'

TableData.propTypes = {
    dataHeader: PropTypes.array.isRequired,
    dataBody: PropTypes.array.isRequired,
}

function TableData({ dataHeader, dataBody }) {
    // console.log(dataBody)

    return (
        <>
            {dataHeader && dataBody && (
                <Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableDataHeader data={dataHeader} />
                            <TableDataBody data={dataBody} />
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </>
    )
}

export default TableData
