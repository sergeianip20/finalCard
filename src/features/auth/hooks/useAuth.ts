import { useAppSelector, useAppDispatch } from 'app'
import { authThunks } from 'features/auth/auth.slice'
import {
    redirectPathSelector,
    profileSelector,
    checkEmailMessageSelector,
    userIdSelector,
} from 'features/auth/auth.selectors'
import { LoginFieldsType } from 'features/auth/components/Login'
import {
    ForgotPassBodyType,
    RegisterBodyType,
    SetNewPassBodyType,
    UpdateProfileBodyType,
} from 'features/auth/auth.api'
import { emailMessage } from 'features/auth/constants'
import { useCallback } from 'react'

export const useAuth = () => {
    const dispatch = useAppDispatch()
    const profile = useAppSelector(profileSelector)
    const redirectPath = useAppSelector(redirectPathSelector)
    const emailAddress = useAppSelector(checkEmailMessageSelector)
    const authorizedUserId = useAppSelector(userIdSelector)

    const isProfileDefine = () => Boolean(profile)
    const isUserAuth = isProfileDefine()

    const login = useCallback(
        (data: LoginFieldsType) => {
            const payload = {
                email: data.loginEmail,
                password: data.loginPassword,
                rememberMe: data.rememberMe,
            }
            dispatch(authThunks.login(payload))
        },
        [dispatch]
    )

    const logout = useCallback(() => dispatch(authThunks.logout()), [dispatch])

    const registration = useCallback(
        (data: RegisterBodyType) => {
            dispatch(authThunks.register(data))
        },
        [dispatch]
    )

    const forgotPassword = useCallback(
        (data: { email: string }) => {
            const payload: ForgotPassBodyType = {
                email: data.email,
                from: 'App developers ;)',
                message: emailMessage,
            }
            dispatch(authThunks.forgotPassword(payload))
        },
        [dispatch]
    )

    const setNewPassword = useCallback(
        (password: string, token: string) => {
            const payload: SetNewPassBodyType = {
                password,
                resetPasswordToken: token,
            }
            dispatch(authThunks.setNewPassword(payload))
        },
        [dispatch]
    )

    const updateUserName = useCallback(
        (data: UpdateProfileBodyType) => {
            dispatch(authThunks.updateProfile(data))
        },
        [dispatch]
    )

    return {
        login,
        registration,
        logout,
        updateUserName,
        forgotPassword,
        setNewPassword,
        profile,
        isUserAuth,
        redirectPath,
        emailAddress,
        authorizedUserId,
    }
}
