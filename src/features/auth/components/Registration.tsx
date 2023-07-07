import React, { useCallback } from 'react'
import { EmailInput, Form, PasswordInput, useAppForm, paths } from 'common'
import { useAuth } from 'features/auth/hooks/useAuth'
import { useRedirect } from 'features/auth/hooks/useRedirect'

export const Registration = () => {
    const { errors, handleSubmit, register } = useAppForm(['email', 'password', 'confirmPassword'])
    const { registration } = useAuth()
    useRedirect()
    const onSubmit = useCallback(
        (data: any) => {
            registration(data)
        },
        [registration]
    )

    return (
        <div>
            <Form
                link={{ to: paths.LOGIN, text: 'Sign In' }}
                description={'Already have an account?'}
                title={'Sign Up'}
                btnName={'Sign Up'}
                onClick={() => {}}
                onSubmit={handleSubmit(onSubmit)}
            >
                <EmailInput label={'Email'} name={'email'} register={register} errors={errors} />
                <PasswordInput
                    label={'Password'}
                    name={'password'}
                    register={register}
                    errors={errors}
                />
                <PasswordInput
                    label={'Confirm password'}
                    name={'confirmPassword'}
                    register={register}
                    errors={errors}
                />
            </Form>
        </div>
    )
}
