import Typography from '@mui/material/Typography'
import React, { FC } from 'react'
import Box from '@mui/material/Box'

type RemoveModalMessagePropsType = {
    entityName: string
    entityImage?: string
    whatToDelete: string
}
export const RemoveModalMessage: FC<RemoveModalMessagePropsType> = ({
    entityName,
    whatToDelete,
    entityImage,
}) => {
    const isImageDisplay = entityImage !== undefined && entityImage !== ' ' && entityImage
    return (
        <>
            <Typography
                variant='h6'
                component='div'
                sx={{
                    p: '30px 20px',
                    fontSize: '14px',
                    fontWeight: '400',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ textAlign: 'center' }}>
                    Do you really want to remove
                    <b style={{ color: 'red' }}>{` ${entityName}`}</b>
                    ?
                    <br />
                    {whatToDelete} will be deleted.
                </Box>
                {isImageDisplay && (
                    <img
                        style={{
                            width: '65px',
                            margin: '5px',
                            top: 20,
                            right: 50,
                        }}
                        src={entityImage}
                        alt={'question'}
                    />
                )}
            </Typography>
        </>
    )
}
