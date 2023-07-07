import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    fulfilled,
    fulfilledWithInfo,
    loginFulfilled,
    pending,
    rejected,
    initializePending,
} from 'common'
import { clearNotifyStateAction, setAppInitializeAction } from 'common/utils'
const slice = createSlice({
    name: 'app',
    initialState: {
        error: null as string | null,
        infoMessage: null as string | null,
        isLoading: false,
        isAppInitialized: false,
    },
    reducers: {
        setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
            state.isLoading = action.payload.isLoading
        },
    },
    extraReducers: builder => {
        builder
            .addCase(clearNotifyStateAction, state => {
                state.error = null
                state.infoMessage = null
            })
            .addCase(setAppInitializeAction, state => {
                state.isAppInitialized = false
            })
            .addMatcher(initializePending, state => {
                state.isAppInitialized = true
            })
            .addMatcher(pending, state => {
                state.isLoading = true
            })
            .addMatcher(fulfilled, state => {
                state.isLoading = false
            })
            .addMatcher(fulfilledWithInfo, (state, action) => {
                state.infoMessage = action.payload.info
            })
            .addMatcher(loginFulfilled, (state, action) => {
                state.infoMessage = `Hello, ${action.payload.profile.name} !`
            })
            .addMatcher(rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
    },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
