import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

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
type EditorModalPropsType = {
    title: string
    open: boolean
    children: React.ReactNode
    handleClose: () => void
}
export const AppModal: React.FC<EditorModalPropsType> = ({
    title,
    open,
    handleClose,
    children,
}) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Box
                    display={'flex'}
                    justifyContent='space-between'
                    sx={{ borderBottom: '1px solid #D9D9D9' }}
                >
                    <Typography variant='h6' component='h2' sx={{ p: 2 }}>
                        {title}
                    </Typography>
                    <IconButton onClick={handleClose} sx={{ p: 2 }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {children}
            </Box>
        </Modal>
    )
}
