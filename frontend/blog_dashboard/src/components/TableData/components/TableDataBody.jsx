import { Box, TableBody, TableCell, TableRow } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useId } from 'react'
import { DeleteButton, DetailButton, EditButton } from '../../Options'
import RenderData from '../../RenderData'
import { useLocation } from 'react-router-dom'

TableDataBody.propTypes = {
    data: PropTypes.array.isRequired,
}

function TableDataBody({ data }) {
    const { pathname } = useLocation()
    const id = useId()
    // console.log(data)

    const detailList = ['stories', 'blogs']

    return (
        <>
            {data?.length > 0 && (
                <TableBody>
                    {data?.map((row) => {
                        const { _id, ...rest } = row
                        const list = Object.entries(rest)

                        return (
                            <TableRow key={`${row._id}${id}`}>
                                {list?.map((x, index) => (
                                    <TableCell key={`${x[1]}${index}${id}`} align="center">
                                        {<RenderData values={x} />}
                                    </TableCell>
                                ))}
                                <TableCell align="center">
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        columnGap="5px"
                                    >
                                        <EditButton id={_id} />
                                        <DeleteButton
                                            data={{
                                                id: row._id,
                                                name: row.fullname || row.name || row.title,
                                            }}
                                        />
                                        {detailList.includes(pathname?.slice(1)) && (
                                            <DetailButton id={_id} />
                                        )}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            )}
        </>
    )
}

export default TableDataBody
