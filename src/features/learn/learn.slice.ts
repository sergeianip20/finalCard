import {
    createSlice,
    isFulfilled,
    isPending,
    isRejected,
    isRejectedWithValue,
    PayloadAction,
} from '@reduxjs/toolkit'
import {
    cardsApi,
    CardType,
    GetCardsParamsType,
    UpdateCardGradeRequestType,
} from 'features/cards/cards.api'
import { createAppAsyncThunk, clearNotifyStateAction, thunkErrorHandler } from 'common/utils'

const learnInitialState = {
    cards: [] as CardType[],
    answersCount: 0,
    requestsCount: 0,
    selectedPackId: '',
    isLoading: false,
    error: null as null | string,
}

const slice = createSlice({
    name: 'learn',
    initialState: learnInitialState,
    reducers: {
        setAnswersCount: state => {
            state.answersCount = state.answersCount + 1
        },
        setRequestCounter: state => {
            state.requestsCount = state.requestsCount + 1
        },
        resetCounter: (state, action: PayloadAction<string>) => {
            state.selectedPackId = action.payload
            state.answersCount = 0
            if (state.requestsCount === 2) {
                state.requestsCount = 0
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(clearNotifyStateAction, state => {
                state.error = null
            })
            .addCase(getSortCard.fulfilled, (state, action) => {
                state.cards = action.payload.cards
            })
            .addMatcher(pendingLearn, state => {
                state.isLoading = true
            })
            .addMatcher(fulfilledLearn, state => {
                state.isLoading = false
            })
            .addMatcher(rejectedLearn, state => {
                state.isLoading = false
            })
            .addMatcher(rejectedWithValueLearn, (state, action) => {
                state.error = action.payload
            })
    },
})

const getSortCard = createAppAsyncThunk<{ cards: CardType[] }, string>(
    'learn/getSortCard',
    async (id, thunkApi) => {
        const { rejectWithValue, dispatch, getState } = thunkApi
        try {
            const sortGrade = getState().learn.requestsCount < 2 ? '0grade' : '1grade'
            const param: GetCardsParamsType = {
                cardsPack_id: id,
                pageCount: '5',
                sortCards: sortGrade,
            }
            const res = await cardsApi.getCards(param)
            dispatch(learnActions.resetCounter(id))
            dispatch(learnActions.setRequestCounter())
            return { cards: res.data.cards }
        } catch (e) {
            const error = thunkErrorHandler(e)
            return rejectWithValue(error)
        }
    }
)
const updateCardGrade = createAppAsyncThunk<void, UpdateCardGradeRequestType>(
    'learn/updateCardGrade',
    async (data, thunkApi) => {
        const { rejectWithValue, dispatch, getState } = thunkApi
        const state = getState().learn
        try {
            await cardsApi.updateCardGrade(data)
            dispatch(learnActions.setAnswersCount())
            if (state.answersCount === state.cards.length - 1) {
                dispatch(learnThunks.getSortCard(state.selectedPackId))
            }
        } catch (e) {
            const error = thunkErrorHandler(e)
            return rejectWithValue(error)
        }
    }
)

const pendingLearn = isPending(getSortCard, updateCardGrade)
const fulfilledLearn = isFulfilled(getSortCard, updateCardGrade)
const rejectedLearn = isRejected(getSortCard, updateCardGrade)
const rejectedWithValueLearn = isRejectedWithValue(getSortCard, updateCardGrade)

export const learnReducer = slice.reducer
export const learnActions = slice.actions
export const learnThunks = { getSortCard, updateCardGrade }

// types
export type learnInitialStateType = typeof learnInitialState