import {
    createSlice,
    isFulfilled,
    isPending,
    isRejected,
    isRejectedWithValue,
    PayloadAction,
} from '@reduxjs/toolkit'
import {
    CreatePackModelType,
    GetPacksParamsType,
    packsApi,
    PacksResponseType,
    PackType,
    UpdatePackModelType,
} from 'features/packs/packs.api'
import { thunkErrorHandler, clearNotifyStateAction, createAppAsyncThunk } from 'common/utils'

const packsInitialState = {
    packs: {} as PacksResponseType,
    params: {
        page: '1',
        pageCount: '4',
        min: '0',
        max: '100',
        user_id: '',
        packName: '',
    } as GetPacksParamsType,
    isLoading: false,
    error: null as string | null,
    infoMessage: null as string | null,
    selectedPack: {} as PackType,
}

const slice = createSlice({
    name: 'packs',
    initialState: packsInitialState,
    reducers: {
        setQueryParams: (state, actions: PayloadAction<{ params: GetPacksParamsType }>) => {
            state.params = { ...state.params, ...actions.payload.params }
        },
        setSelectedPack: (state, action: PayloadAction<{ id: string }>) => {
            const pack = state.packs.cardPacks.find(pack => pack._id === action.payload.id)
            if (pack) state.selectedPack = pack
        },
    },
    extraReducers: builder => {
        builder
            .addCase(clearNotifyStateAction, state => {
                state.error = null
                state.infoMessage = null
            })
            .addCase(getPacks.fulfilled, (state, action) => {
                state.packs = action.payload.packs
                state.isLoading = false
            })
            .addCase(updatePack.fulfilled, (state, action) => {
                state.selectedPack = action.payload.updatedCardsPack
            })
            .addMatcher(pendingPacks, state => {
                state.isLoading = true
            })
            .addMatcher(fulfilledEditor, (state, action) => {
                state.infoMessage = action.payload.infoMessage
            })
            .addMatcher(rejectedPacks, state => {
                state.isLoading = false
            })
            .addMatcher(rejectedWithValuePacks, (state, action) => {
                state.error = action.payload
            })
    },
})

const getPacks = createAppAsyncThunk<{ packs: PacksResponseType }>(
    'packs/getPacks',
    async (data, thunkAPI) => {
        const { getState, rejectWithValue } = thunkAPI
        try {
            const params = getState().packs.params
            const res = await packsApi.getPacks(params)
            return { packs: res.data }
        } catch (e) {
            const error = thunkErrorHandler(e)
            return rejectWithValue(error)
        }
    }
)
const createPack = createAppAsyncThunk<{ infoMessage: string }, CreatePackModelType>(
    'packs/createPack',
    async (data, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        try {
            const res = await packsApi.createPack(data)
            dispatch(packsThunks.getPacks())
            return { infoMessage: `${res.data.newCardsPack.name} pack created` }
        } catch (e) {
            const error = thunkErrorHandler(e)
            return rejectWithValue(error)
        }
    }
)
const removePack = createAppAsyncThunk<
    { infoMessage: string },
    { packId: string; withRedirect: boolean }
>('packs/removePack', async (data, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        const res = await packsApi.removePack(data.packId)
        if (!data.withRedirect) {
            dispatch(packsThunks.getPacks())
        }
        return { infoMessage: `${res.data.deletedCardsPack.name} pack removed` }
    } catch (e) {
        const error = thunkErrorHandler(e)
        return rejectWithValue(error)
    }
})
const updatePack = createAppAsyncThunk<
    { infoMessage: string; updatedCardsPack: PackType },
    UpdatePackModelType
>('packs/updatePack', async (data, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        const res = await packsApi.updatePack(data)
        dispatch(packsThunks.getPacks())
        return {
            infoMessage: `${res.data.updatedCardsPack.name} pack updated`,
            updatedCardsPack: res.data.updatedCardsPack,
        }
    } catch (e) {
        const error = thunkErrorHandler(e)
        return rejectWithValue(error)
    }
})

const fulfilledEditor = isFulfilled(createPack, removePack, updatePack)
const rejectedPacks = isRejected(getPacks, createPack, removePack, updatePack)
const pendingPacks = isPending(getPacks, createPack, removePack, updatePack)
const rejectedWithValuePacks = isRejectedWithValue(getPacks, createPack, removePack, updatePack)

export const packsReducer = slice.reducer
export const packsAction = slice.actions
export const packsThunks = { getPacks, createPack, removePack, updatePack }

// type
export type PacksInitialStateType = typeof packsInitialState