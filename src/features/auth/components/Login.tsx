import React, { FC, useCallback } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import { AppLink, EmailInput, Form, PasswordInput, paths, useAppForm } from 'common'
import { useAuth } from 'features/auth/hooks/useAuth'
import FormControlLabel from '@mui/material/FormControlLabel'

export type LoginFieldsType = {
    loginEmail: string
    loginPassword: string
    rememberMe: boolean
}

export const Login: FC<any> = () => {
    const { errors, handleSubmit, register } = useAppForm(['loginEmail', 'loginPassword'])
    const { login } = useAuth()
    const onSubmit = useCallback((data: LoginFieldsType) => login(data), [login])

    return (
        <Box>
            <Form
                link={{ to: paths.REGISTER, text: 'Sign Up' }}
                description={"Don't have an account?"}
                title={'Sign In'}
                btnName={'Sign In'}
                onSubmit={handleSubmit(onSubmit)}
            >
                <EmailInput
                    label={'Email'}
                    name={'loginEmail'}
                    register={register}
                    errors={errors}
                />
                <PasswordInput
                    label={'Password'}
                    name={'loginPassword'}
                    register={register}
                    errors={errors}
                />
                <FormControlLabel
                    sx={{ alignSelf: 'self-start', marginTop: '20px' }}
                    control={<Checkbox {...register('rememberMe')} />}
                    label='Remember me'
                />
                <AppLink justifyContent={'flex-end'} colorText={'black'} fontWeight={500}>
                    <Link to={paths.FORGOT_PASSWORD}>Forgot Password?</Link>
                </AppLink>
            </Form>
        </Box>
    )
}
