import { createSlice } from '@reduxjs/toolkit'
import {
    authApi,
    LoginBodyType,
    UserProfileType,
    RegisterBodyType,
    ForgotPassBodyType,
    SetNewPassBodyType,
    UpdateProfileBodyType,
} from 'features/auth/auth.api'
import {
    createAppAsyncThunk,
    clearRedirectPathAction,
    thunkErrorHandler,
    setAppInitializeAction,
} from 'common/utils'

const initialState = {
    profile: null as UserProfileType | null,
    redirectPath: '/' as RedirectPathType,
    checkEmailMessage: '' as string,
}
export type AuthInitialStateType = typeof initialState

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(clearRedirectPathAction, state => {
                state.redirectPath = '/'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.profile = action.payload.profile
            })
            .addCase(register.fulfilled, (state, action) => {
                state.redirectPath = action.payload.redirectPath
            })
            .addCase(logout.fulfilled, state => {
                state.profile = null
            })
            .addCase(authMe.fulfilled, (state, action) => {
                state.profile = action.payload.profile
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.checkEmailMessage = action.payload.checkEmailMessage
                state.redirectPath = action.payload.redirectPath
            })
            .addCase(setNewPassword.fulfilled, (state, action) => {
                state.redirectPath = action.payload.redirectPath
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.profile = action.payload.profile
            })
    },
})

const register = createAppAsyncThunk<{ redirectPath: RedirectPathType }, RegisterBodyType>(
    'auth/register',
    async (data, { rejectWithValue }) => {
        try {
            await authApi.register(data)
            return { redirectPath: '/auth/login' }
        } catch (e) {
            const error = thunkErrorHandler(e)
            return rejectWithValue(error)
        }
    }
)

const login = createAppAsyncThunk<{ profile: UserProfileType }, LoginBodyType>(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const res = await authApi.login(data)
            return { profile: res.data }
        } catch (e) {
            const error = thunkErrorHandler(e)
            return rejectWithValue(error)
        }
    }
)

const logout = createAppAsyncThunk<InfoMessageType>(
    'auth/logout',
    async (data, { rejectWithValue }) => {
        try {
            const res = await authApi.logout()
            return { info: res.data.info }
        } catch (e) {
            const error = thunkErrorHandler(e)
            return rejectWithValue(error)
        }
    }
)

const authMe = createAppAsyncThunk<{ profile: UserProfileType }>(
    'auth/me',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await authApi.me()
            return { profile: res.data }
        } catch (e) {
            const error = thunkErrorHandler(e)
            return rejectWithValue(error)
        } finally {
            dispatch(setAppInitializeAction())
        }
    }
)

const forgotPassword = createAppAsyncThunk<
    { redirectPath: RedirectPathType; checkEmailMessage: string } & InfoMessageType,
    ForgotPassBodyType
>('auth/forgotPass', async (data, { rejectWithValue }) => {
    try {
        const res = await authApi.forgotPassword(data)
        return {
            redirectPath: '/auth/check-email',
            checkEmailMessage: data.email,
            info: res.data.info,
        }
    } catch (e) {
        const error = thunkErrorHandler(e)
        return rejectWithValue(error)
    }
})

const setNewPassword = createAppAsyncThunk<
    { info: string; redirectPath: RedirectPathType } & InfoMessageType,
    SetNewPassBodyType
>('auth/setNewPassword', async (data, { rejectWithValue }) => {
    try {
        const res = await authApi.setNewPassword(data)
        return { error: res.data.error, redirectPath: '/auth/login', info: res.data.info }
    } catch (e) {
        const error = thunkErrorHandler(e)
        return rejectWithValue(error)
    }
})
const updateProfile = createAppAsyncThunk<{ profile: UserProfileType }, UpdateProfileBodyType>(
    'auth/updateProfile',
    async (data, { rejectWithValue }) => {
        try {
            const res = await authApi.updateProfile(data)
            return { profile: res.data.updatedUser }
        } catch (e) {
            const error = thunkErrorHandler(e)
            return rejectWithValue(error)
        }
    }
)
export const authReducer = slice.reducer
export const authThunks = {
    register,
    login,
    logout,
    forgotPassword,
    setNewPassword,
    authMe,
    updateProfile,
}

// TYPES
export type RedirectPathType = '/auth/login' | '/auth/check-email' | '/' | '/packs'
export type InfoMessageType = { info: string }
