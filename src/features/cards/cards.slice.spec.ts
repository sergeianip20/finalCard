import { describe, it, expect } from '@jest/globals'
import {
    cardsActions,
    CardsInitialStateType,
    cardsThunks,
    GetParamsType,
} from 'features/cards/cards.slice'
import { cardsReducer } from 'features'
import { CardType, GetCardsParamsType, GetCardsResponseType } from 'features/cards/cards.api'
import { clearNotifyStateAction } from 'common/utils'

describe('cards slice', () => {
    let initialState: CardsInitialStateType
    beforeEach(() => {
        initialState = {
            cards: {} as GetCardsResponseType,
            params: {
                cardAnswer: '',
                cardQuestion: '',
                min: '0',
                max: '100',
                sortCards: '0grade',
                page: '1',
                pageCount: '4',
            } as GetCardsParamsType,
            selectedCardsPackId: '',
            isLoading: false,
            infoMessage: '',
            updateCardQuestions: {
                question: '',
                questionImg: '',
            },
        }
    })

    it('should set cards params correctly', () => {
        const params: GetParamsType = {
            cardAnswer: 'answer',
            cardQuestion: 'question',
            min: '0',
            max: '100',
            sortCards: '0grade',
            page: '1',
            pageCount: '4',
        }
        const nextState = cardsReducer(initialState, cardsActions.setCardsParams({ params }))

        expect(nextState.params).toEqual(params)
    })

    it('should set selected cards pack ID correctly', () => {
        const selectedCardsPackId = 'selectedPackId'

        const nextState = cardsReducer(
            initialState,
            cardsActions.setSelectedCardsPackId(selectedCardsPackId)
        )
        expect(nextState.selectedCardsPackId).toEqual(selectedCardsPackId)
    })

    it('should handle logout infoMessage when logout fulfilled', () => {
        const card: CardType = {
            answer: 'string',
            question: 'string',
            cardsPack_id: 'string',
            grade: 4,
            shots: 2,
            user_id: 'userId',
            created: 'created',
            updated: 'updated',
            _id: 'Id',
            type: 'type',
            rating: 2,
            comments: 'comment',
        }
        const cards: GetCardsResponseType = {
            cards: [card],
            cardsTotalCount: 3,
            maxGrade: 2,
            minGrade: 1,
            page: 1,
            packUpdated: 'update',
            packCreated: 'created',
            packDeckCover: null,
            packPrivate: false,
            pageCount: 4,
            packUserId: 'userId',
        }

        const action = { type: cardsThunks.getCards.fulfilled.type, payload: { cards } }
        const nextState = cardsReducer(initialState, action)

        expect(nextState.cards).toEqual(action.payload.cards)
    })

    it('should handle clearNotifyStateAction', () => {
        const nextState = cardsReducer(initialState, clearNotifyStateAction())

        const questions = { questionImg: '', question: '' }
        expect(nextState.updateCardQuestions).toEqual(questions)
    })

    it('should handle pending actions status', () => {
        const action = { type: cardsThunks.getCards.pending.type }
        const nextState = cardsReducer(initialState, action)

        expect(nextState.isLoading).toEqual(true)
    })

    it('should handle fulfilled actions status', () => {
        const payload = {
            updatedCardQuestions: {
                question: 'newQuestion',
                questionImg: 'newQuestionImage',
            },
            infoMessage: 'Card updated!',
        }
        const action = { type: cardsThunks.updateCard.fulfilled.type, payload }

        const nextState = cardsReducer(initialState, action)

        expect(nextState.updateCardQuestions).toEqual(payload.updatedCardQuestions)
        expect(nextState.infoMessage).toEqual(payload.infoMessage)
    })
})
