import React from 'react'
import email from 'assets/img/email.svg'
import Box from '@mui/material/Box'
import { Form, InfoMessage, paths } from 'common'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'features/auth/hooks/useAuth'

export const CheckEmail = () => {
    const navigate = useNavigate()
    const { emailAddress } = useAuth()
    const toLogin = () => navigate(paths.LOGIN)

    return (
        <Box>
            <Form title={'Check Email'} btnName={'Back to login'} onClick={toLogin}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Box
                        component={'img'}
                        sx={{
                            width: '150px',
                            mb: '20px',
                            mt: '20px',
                        }}
                        src={email}
                        alt='check-email'
                    />
                    <InfoMessage
                        text={`We’ve sent an Email with instructions to ${emailAddress}`}
                    />
                </Box>
            </Form>
        </Box>
    )
}
