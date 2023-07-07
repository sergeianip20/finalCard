import { createSlice, isFulfilled, isPending, PayloadAction } from '@reduxjs/toolkit'
import {
    cardsApi,
    CreateCardRequestType,
    GetCardsParamsType,
    GetCardsResponseType,
    UpdateCardRequestType,
} from 'features/cards/cards.api'
import { thunkErrorHandler, clearNotifyStateAction, createAppAsyncThunk } from 'common/utils'

const initialState = {
    cards: {} as GetCardsResponseType,
    params: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: '0',
        max: '100',
        sortCards: '0grade',
        page: '1',
        pageCount: '4',
    } as GetCardsParamsType,
    selectedCardsPackId: '' as string,
    isLoading: false as boolean,
    infoMessage: '' as string,
    updateCardQuestions: {
        question: '',
        questionImg: '',
    } as CardQuestionType,
}
export type CardsInitialStateType = typeof initialState

const slice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        setCardsParams: (state, action: PayloadAction<{ params: GetParamsType }>) => {
            state.params = { ...state.params, ...action.payload.params }
        },
        setSelectedCardsPackId: (state, action: PayloadAction<string>) => {
            state.selectedCardsPackId = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getCards.fulfilled, (state, action) => {
                state.cards = action.payload.cards
                state.isLoading = false
            })
            .addCase(clearNotifyStateAction, state => {
                state.updateCardQuestions = { questionImg: '', question: '' }
            })
            .addMatcher(cardsPending, state => {
                state.isLoading = true
            })
            .addMatcher(cardsActionsFulfilled, (state, action) => {
                state.updateCardQuestions = { ...action.payload.updatedCardQuestions }
                state.infoMessage = action.payload.infoMessage
            })
    },
})

const getCards = createAppAsyncThunk<{ cards: GetCardsResponseType }>(
    'cards/getCards',
    async (id, { rejectWithValue, getState }) => {
        const params = {
            ...getState().cards.params,
            cardsPack_id: getState().cards.selectedCardsPackId,
        }
        try {
            const res = await cardsApi.getCards(params)
            return { cards: res.data }
        } catch (e) {
            const error = thunkErrorHandler(e)
            return rejectWithValue(error)
        }
    }
)

const createCard = createAppAsyncThunk<
    { updatedCardQuestions: CardQuestionType; infoMessage: string },
    CreateCardRequestType
>('cards/createCard', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await cardsApi.createCard(data)
        dispatch(getCards())
        return {
            updatedCardQuestions: {
                question: res.data.newCard.question,
                questionImg: res.data.newCard.questionImg,
            },
            infoMessage: 'Card created!',
        }
    } catch (e) {
        const error = thunkErrorHandler(e)
        return rejectWithValue(error)
    }
})
const updateCard = createAppAsyncThunk<
    { updatedCardQuestions: CardQuestionType; infoMessage: string },
    UpdateCardRequestType
>('cards/updateCard', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await cardsApi.updateCard(data)
        dispatch(getCards())
        return {
            updatedCardQuestions: {
                question: res.data.updatedCard.question,
                questionImg: res.data.updatedCard.questionImg,
            },
            infoMessage: 'Card updated!',
        }
    } catch (e) {
        const error = thunkErrorHandler(e)
        return rejectWithValue(error)
    }
})
const removeCard = createAppAsyncThunk<
    { updatedCardQuestions: CardQuestionType; infoMessage: string },
    string
>('cards/removeCard', async (id, { rejectWithValue, dispatch }) => {
    try {
        const res = await cardsApi.removeCard(id)
        dispatch(getCards())
        return {
            updatedCardQuestions: {
                question: res.data.deletedCard.question,
                questionImg: res.data.deletedCard.questionImg,
            },
            infoMessage: 'Card removed!',
        }
    } catch (e) {
        const error = thunkErrorHandler(e)
        return rejectWithValue(error)
    }
})

const cardsPending = isPending(getCards, updateCard, createCard, removeCard)
const cardsActionsFulfilled = isFulfilled(updateCard, createCard, removeCard)

export const cardsReducer = slice.reducer
export const cardsActions = slice.actions
export const cardsThunks = { getCards, createCard, updateCard, removeCard }

//TYPES
export type CardQuestionType = {
    question: string
    questionImg: string
}
export type GetParamsType = Omit<GetCardsParamsType, 'cardsPack_id'>
