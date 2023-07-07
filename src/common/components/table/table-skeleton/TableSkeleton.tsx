import * as React from 'react'
import Skeleton from '@mui/material/Skeleton'
import TableRow from '@mui/material/TableRow'
import { TableCell } from '@mui/material'

type TableSkeletonPropsType = {
    defaultCell: number
    defaultRow: string
}

export const TableSkeleton: React.FC<TableSkeletonPropsType> = ({ defaultCell, defaultRow }) => {
    let cell = []
    const row = []
    for (let i = 0; i < defaultCell; i++) {
        cell.push(i)
    }
    for (let i = 0; i < +defaultRow; i++) {
        row.push(i)
    }

    const tableCell = cell.map((c, i) => (
        <TableCell key={i}>
            <Skeleton variant='rounded' height={30} />
        </TableCell>
    ))

    return (
        <>
            {row.map((r, i) => (
                <TableRow key={i}>{tableCell}</TableRow>
            ))}
        </>
    )
}
