import { describe, expect, it } from '@jest/globals'
import { clearRedirectPathAction } from 'common/utils'
import {
    AuthInitialStateType,
    authReducer,
    authThunks,
    RedirectPathType,
} from 'features/auth/auth.slice'
import { UserProfileType } from 'features/auth/auth.api'

describe('auth slice', () => {
    let initialState: AuthInitialStateType
    beforeEach(() => {
        initialState = {
            profile: null,
            redirectPath: '/auth/login',
            checkEmailMessage: '',
        }
    })

    it('should set profile data if login success', () => {
        const profile: UserProfileType = {
            _id: 'userId',
            email: 'email',
            rememberMe: true,
            isAdmin: false,
            name: 'userName',
            verified: false,
            publicCardPacksCount: 2,
            created: 'created',
            updated: 'updated',
            __v: 5,
            token: 'token',
            tokenDeathTime: 1452,
            avatar: 'avatar',
        }
        const action = { type: authThunks.login.fulfilled.type, payload: { profile } }
        const nextState = authReducer(initialState, action)

        expect(nextState.profile).toEqual(action.payload.profile)
    })

    it('should handle clearNotifyStateAction', () => {
        const nextState = authReducer(initialState, clearRedirectPathAction())

        expect(nextState.redirectPath).toEqual('/')
    })

    it('should set redirect path if registration success', () => {
        const redirectPath: RedirectPathType = '/auth/login'
        const action = { type: authThunks.register.fulfilled.type, payload: { redirectPath } }
        const nextState = authReducer(initialState, action)

        expect(nextState.redirectPath).toEqual(action.payload.redirectPath)
    })

    it('should clear profile data if logout success', () => {
        const action = { type: authThunks.logout.fulfilled.type }
        const nextState = authReducer(initialState, action)

        expect(nextState.profile).toEqual(null)
    })

    it('should set profile data if auth request success', () => {
        const profile: UserProfileType = {
            _id: 'userId',
            email: 'email',
            rememberMe: true,
            isAdmin: false,
            name: 'userName',
            verified: false,
            publicCardPacksCount: 2,
            created: 'created',
            updated: 'updated',
            __v: 5,
            token: 'token',
            tokenDeathTime: 1452,
            avatar: 'avatar',
        }
        const action = { type: authThunks.authMe.fulfilled.type, payload: { profile } }
        const nextState = authReducer(initialState, action)

        expect(nextState.profile).toEqual(action.payload.profile)
    })

    it('should set infoMessage and redirectPath if forgotPassword success', () => {
        const payload = {
            redirectPath: '/auth/check-email',
            checkEmailMessage: 'check email message',
        }

        const action = { type: authThunks.forgotPassword.fulfilled.type, payload }
        const nextState = authReducer(initialState, action)

        expect(nextState.checkEmailMessage).toEqual(action.payload.checkEmailMessage)
        expect(nextState.redirectPath).toEqual(action.payload.redirectPath)
    })

    it('should set redirectPath if setNewPassword success', () => {
        const payload = {
            redirectPath: '/auth/login',
        }

        const action = { type: authThunks.setNewPassword.fulfilled.type, payload }
        const nextState = authReducer(initialState, action)

        expect(nextState.redirectPath).toEqual(action.payload.redirectPath)
    })

    it('should set profile data if updateProfile success', () => {
        const profile: UserProfileType = {
            _id: 'userId',
            email: 'email',
            rememberMe: true,
            isAdmin: false,
            name: 'userName',
            verified: false,
            publicCardPacksCount: 2,
            created: 'created',
            updated: 'updated',
            __v: 5,
            token: 'token',
            tokenDeathTime: 1452,
            avatar: 'avatar',
        }
        const action = { type: authThunks.updateProfile.fulfilled.type, payload: { profile } }
        const nextState = authReducer(initialState, action)

        expect(nextState.profile).toEqual(action.payload.profile)
    })
})
