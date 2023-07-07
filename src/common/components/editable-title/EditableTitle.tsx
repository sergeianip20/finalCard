import React, { ChangeEvent, FC, memo, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { SuperButton } from 'common'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { useAuth } from 'features/auth/hooks/useAuth'

type EditableTitlePropsType = {
    userName: string
    margin?: string
}

export const EditableTitle: FC<EditableTitlePropsType> = memo(({ userName, margin }) => {
    const [newUserName, setNewUserName] = useState<string>(userName)
    const [editMode, setEditMode] = useState<boolean>(false)
    const { updateUserName } = useAuth()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewUserName(e.currentTarget.value)
    }
    const openEditorMode = () => setEditMode(true)

    const handleSetEditor = () => {
        setEditMode(false)
        updateUserName({ name: newUserName })
    }

    const handleBlur = () => {
        setEditMode(false)
        setNewUserName(userName)
    }

    return (
        <Box sx={{ margin: margin }}>
            {!editMode ? (
                <Typography
                    sx={{
                        fontSize: '20px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {newUserName}
                    <IconButton onClick={openEditorMode}>
                        <BorderColorIcon sx={{ color: '#000', fontSize: '20px' }} />
                    </IconButton>
                </Typography>
            ) : (
                <TextField
                    label='Nickname'
                    value={newUserName}
                    autoFocus
                    name={'text'}
                    variant='standard'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                        endAdornment: (
                            <SuperButton
                                name={'Save'}
                                onMouseDown={handleSetEditor}
                                textColor={'white'}
                                margin={'0 0 5px 0'}
                            />
                        ),
                    }}
                />
            )}
        </Box>
    )
})
