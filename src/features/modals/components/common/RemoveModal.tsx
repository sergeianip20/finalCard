import React, { memo, ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { SuperButton } from 'common/components/button/SuperButton'

type PacksModalPropsType = {
    handleClose: () => void
    onRemove: () => void
    modalTitle: string
    children: ReactNode
}

export const RemoveModal: React.FC<PacksModalPropsType> = memo(
    ({ handleClose, onRemove, modalTitle, children }) => {
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            background: '#fff',
            borderRadius: '2px',
            boxShadow: 24,
        }
        return (
            <Box sx={style}>
                <Box
                    display={'flex'}
                    justifyContent='space-between'
                    sx={{ borderBottom: '1px solid #D9D9D9' }}
                >
                    <Typography variant='h6' component='h2' sx={{ p: 2 }}>
                        {modalTitle}
                    </Typography>
                    <IconButton onClick={handleClose} sx={{ p: 2 }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {children}
                <Box display={'flex'} justifyContent='space-between' sx={{ p: '0 24px 36px' }}>
                    <SuperButton
                        name={'Cancel'}
                        color={'secondary'}
                        rounded={true}
                        width={'130'}
                        type={'button'}
                        callback={handleClose}
                    />
                    <SuperButton
                        name={'Remove'}
                        textColor={'white'}
                        color={'error'}
                        rounded={true}
                        width={'130'}
                        callback={onRemove}
                    />
                </Box>
            </Box>
        )
    }
)
