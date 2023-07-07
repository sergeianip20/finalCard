import React, { useCallback } from 'react'
import Box from '@mui/material/Box'
import { EmailInput, Form, InfoMessage, paths, useAppForm } from 'common'
import { useRedirect } from 'features/auth/hooks/useRedirect'
import { useAuth } from 'features/auth/hooks/useAuth'

export const ForgotPassword = () => {
    const { register, errors, handleSubmit } = useAppForm(['email'])
    const { forgotPassword } = useAuth()
    useRedirect()

    const onSubmit = useCallback(
        (data: { email: string }) => {
            forgotPassword(data)
        },
        [forgotPassword]
    )

    return (
        <Box>
            <Form
                link={{ to: paths.LOGIN, text: 'Try logging in' }}
                description={'Did you remember your password?'}
                title={'Forgot your password?'}
                btnName={'Send Instructions'}
                onClick={handleSubmit(onSubmit)}
            >
                <EmailInput label={'Email'} errors={errors} register={register} name={'email'} />
                <InfoMessage
                    text={'Enter your email address and we will send you further instructions'}
                />
            </Form>
        </Box>
    )
}
