import { appActions, appReducer } from 'app'
import { clearNotifyStateAction, setAppInitializeAction } from 'common'
import { authThunks } from 'features/auth/auth.slice'
import { UserProfileType } from 'features/auth/auth.api'

describe('app slice', () => {
    let initialState: any

    beforeEach(() => {
        initialState = {
            error: null,
            infoMessage: null,
            isLoading: false,
            isAppInitialized: false,
        }
    })

    it('should handle setIsLoading action', () => {
        const nextState = appReducer(initialState, appActions.setIsLoading({ isLoading: true }))

        expect(nextState.isLoading).toEqual(true)
        expect(nextState.error).toEqual(null)
        expect(nextState.infoMessage).toEqual(null)
        expect(nextState.isAppInitialized).toEqual(false)
    })

    it('should handle setAppInitialize action', () => {
        const nextState = appReducer(initialState, setAppInitializeAction())

        expect(nextState.isAppInitialized).toEqual(false)
    })

    it('should handle clearNotifyStateAction', () => {
        const nextState = appReducer(initialState, clearNotifyStateAction())

        expect(nextState.error).toEqual(null)
        expect(nextState.infoMessage).toEqual(null)
    })

    it('should handle pending actions status', () => {
        const action = { type: authThunks.login.pending.type }
        const nextState = appReducer(initialState, action)

        expect(nextState.isLoading).toEqual(true)
    })

    it('should handle fulfilled actions status', () => {
        const profile: UserProfileType = {
            _id: 'id',
            email: 'email',
            rememberMe: true,
            isAdmin: false,
            name: 'userName',
            verified: true,
            publicCardPacksCount: 4,
            created: 'created',
            updated: 'updated',
            __v: 43,
            token: 'token',
            tokenDeathTime: 242,
            avatar: 'avatar',
        }
        const action = { type: authThunks.login.fulfilled.type, payload: { profile } }
        const nextState = appReducer(initialState, action)

        expect(nextState.isLoading).toEqual(false)
    })

    it('should handle logout infoMessage when logout fulfilled', () => {
        const infoMessage = 'Logout success'
        const action = { type: authThunks.logout.fulfilled.type, payload: { info: infoMessage } }
        const nextState = appReducer(initialState, action)

        expect(nextState.infoMessage).toEqual(infoMessage)
    })
})
