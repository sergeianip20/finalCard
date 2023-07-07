import React, { FC, memo, useState } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormInputValues } from 'common/hooks/useAppForm'
import IconButton from '@mui/material/IconButton'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'

type PasswordInputType = {
    label: string
    register: UseFormRegister<FormInputValues>
    errors: FieldErrors<FormInputValues>
    name: 'password' | 'loginPassword' | 'confirmPassword'
}

export const PasswordInput: FC<PasswordInputType> = memo(({ label, register, errors, name }) => {
    const [visibilityEye, setVisibilityEye] = useState<boolean>(false)
    const setPasswordVisible = () => {
        setVisibilityEye(!visibilityEye)
    }
    return (
        <Box sx={{ mt: '30px', position: 'relative' }}>
            <TextField
                {...register(name)}
                error={!!errors[name]}
                helperText={`${errors[name] ? errors[name]?.message : ''}`}
                label={label}
                type={`${visibilityEye ? 'text' : 'password'}`}
                variant='standard'
                fullWidth={true}
            />
            <Box sx={{ position: 'absolute', right: '0', top: '10px' }}>
                <IconButton onClick={setPasswordVisible}>
                    {visibilityEye ? <VisibilityIcon /> : <VisibilityOff />}
                </IconButton>
            </Box>
        </Box>
    )
})
