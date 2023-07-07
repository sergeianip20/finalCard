import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ModalsInitialStateType = {
    isOpen: false,
    withRedirect: false,
    modalAction: null as ModalActionsType & null,
    modalState: {
        packId: '',
        cardId: '',
        packName: '',
        question: '',
        answer: '',
        packCover: '',
        questionImg: '',
        answerImg: '',
    },
}

const slice = createSlice({
    name: 'modals',
    initialState: initialState,
    reducers: {
        openModal: (state, action: PayloadAction<ConfigModalType>) => {
            state.isOpen = true
            state.modalAction = action.payload.modalAction
            state.withRedirect = action.payload.withRedirect ?? false
            state.modalState = { ...state.modalState, ...action.payload.modalState }
        },
        closeModal: () => initialState,
    },
})

export const modalsReducer = slice.reducer
export const modalsAction = slice.actions

//types
export type ModalStateArgsType = Partial<ModalStateType>
export type ConfigModalType = {
    modalAction: ModalActionsType
    modalState?: ModalStateArgsType
    withRedirect?: boolean
}
type ModalStateType = {
    packId: string
    cardId: string
    packName: string
    question: string
    answer: string
    packCover: string
    questionImg: string
    answerImg: string
}
export type ModalActionsType =
    | 'createPack'
    | 'updatePack'
    | 'removePack'
    | 'createCard'
    | 'updateCard'
    | 'removeCard'
export type ModalsInitialStateType = {
    isOpen: boolean
    withRedirect: boolean
    modalAction: ModalActionsType
    modalState: ModalStateType
}
