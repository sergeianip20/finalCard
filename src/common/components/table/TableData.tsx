import React, { FC, memo } from 'react'
import noFile from 'assets/img/no-file.svg'
import Box from '@mui/material/Box'

type TableDataPropsType = {
    image: string | undefined
    text: string
}
export const TableData: FC<TableDataPropsType> = memo(({ image, text }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '15px',
            }}
        >
            {!image || image === ' ' ? (
                text !== ' ' ? (
                    <div style={{ wordBreak: 'break-all'}}>{text}</div>
                ) : (
                    <img style={{ width: '35px' }} src={noFile} alt='no-file' />
                )
            ) : (
                <img src={image} alt='questionImg' style={{ width: '55px' }} />
            )}
        </Box>
    )
})
