import { describe, expect, it } from '@jest/globals'
import {
    ConfigModalType,
    ModalActionsType,
    modalsAction,
    ModalsInitialStateType,
    modalsReducer,
} from 'features/modals/modals.slice'

describe('cards slice', () => {
    let initialState: ModalsInitialStateType
    beforeEach(() => {
        initialState = {
            isOpen: false,
            modalAction: null as ModalActionsType & null,
            withRedirect: false,
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
    })

    it('should set modalState and toggle showCreateModal flag correctly', () => {
        const modalPayload: ConfigModalType = {
            modalAction: 'createPack',
            modalState: {
                packId: 'qwerty12345',
                packName: 'Game Of Packs',
            },
        }
        const nextState = modalsReducer(initialState, modalsAction.openModal(modalPayload))

        expect(nextState.modalState.packId).toEqual('qwerty12345')
        expect(nextState.modalState.packName).toEqual('Game Of Packs')
        expect(nextState.modalState.packCover).toEqual('')
        expect(nextState.modalState.cardId).toEqual('')
        expect(nextState.modalAction).toEqual('createPack')
        expect(nextState.isOpen).toEqual(true)
        expect(nextState.withRedirect).toEqual(false)
    })

    it('should set state to initial value when modal closed correctly', () => {
        const startState: ModalsInitialStateType = {
            isOpen: false,
            modalAction: 'updatePack',
            withRedirect: false,
            modalState: {
                packId: 'packId',
                cardId: 'cardId',
                packName: 'packName',
                question: 'question',
                answer: 'answer',
                packCover: 'packImg',
                questionImg: 'questionImage',
                answerImg: 'answerImage',
            },
        }
        const nextState = modalsReducer(startState, modalsAction.closeModal())

        expect(nextState).toEqual(initialState)
    })

    it('should set modalState and toggle withRedirect flag correctly', () => {
        const modalPayload: ConfigModalType = {
            modalAction: 'removePack',
            withRedirect: true,
            modalState: {
                packId: 'qwerty12345',
                packName: 'Game Of Packs',
            },
        }
        const nextState = modalsReducer(initialState, modalsAction.openModal(modalPayload))

        expect(nextState.modalState.packId).toEqual('qwerty12345')
        expect(nextState.modalState.packName).toEqual('Game Of Packs')
        expect(nextState.modalState.packCover).toEqual('')
        expect(nextState.modalState.cardId).toEqual('')
        expect(nextState.modalAction).toEqual('removePack')
        expect(nextState.isOpen).toEqual(true)
        expect(nextState.withRedirect).toEqual(true)
    })
})
