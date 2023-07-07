import React, { memo } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Select from '@mui/material/Select'
import { SelectChangeEvent } from '@mui/material/Select/SelectInput'

export type CardsPaginationPropsType = {
    disabled?: boolean
    page: number
    pageCount: number
    totalCount: number
    onChange: (page: string, count: string) => void
}

export const CardsPagination: React.FC<CardsPaginationPropsType> = memo(
    ({ page, pageCount, totalCount, onChange, disabled }) => {
        const lastPage = Math.ceil(totalCount / +pageCount) || 0

        const styleForContainer = {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '40px',
        }
        const styleForFormControl = {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
        }

        const handleSelectorChange = (event: SelectChangeEvent) => {
            onChange(page + '', event.target.value)
        }
        const handlePaginationChange = (event: React.ChangeEvent<unknown>, page: number) => {
            onChange(page + '', pageCount + '')
        }

        return (
            <Box sx={styleForContainer}>
                <Pagination
                    disabled={disabled}
                    count={lastPage}
                    page={+page || 1}
                    color='primary'
                    shape='rounded'
                    onChange={handlePaginationChange}
                />
                <FormControl sx={styleForFormControl}>
                    <Box component={'span'}>Show</Box>
                    <Select
                        disabled={disabled}
                        autoWidth={true}
                        sx={{ width: '70px', height: '36px' }}
                        value={`${pageCount || 4}`}
                        onChange={handleSelectorChange}
                    >
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'7'}>7</MenuItem>
                        <MenuItem value={'10'}>10</MenuItem>
                    </Select>
                    <Box component={'span'}>Cards per Page</Box>
                </FormControl>
            </Box>
        )
    }
)
