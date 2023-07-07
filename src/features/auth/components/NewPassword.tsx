import React, { useCallback } from 'react'
import { Form, InfoMessage, PasswordInput, useAppForm } from 'common'
import { useParams } from 'react-router-dom'
import { useAuth } from 'features/auth/hooks/useAuth'
import { useRedirect } from 'features/auth/hooks/useRedirect'

export const NewPassword = () => {
    const { token } = useParams()
    const { register, errors, handleSubmit } = useAppForm(['password'])
    const { setNewPassword } = useAuth()
    useRedirect()

    const resetPasswordToken = token ? token : ''
    const onSubmit = useCallback(
        (data: { password: string }) => {
            setNewPassword(data.password, resetPasswordToken)
        },
        [setNewPassword, resetPasswordToken]
    )

    return (
        <div>
            <Form
                title={'Create new password'}
                btnName={'Create new password'}
                onClick={handleSubmit(onSubmit)}
            >
                <PasswordInput
                    label={'New password'}
                    name={'password'}
                    errors={errors}
                    register={register}
                />
                <InfoMessage
                    text={'Create new password and we will send you further instructions to email'}
                />
            </Form>
        </div>
    )
}
