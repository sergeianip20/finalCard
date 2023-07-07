import { expect } from '@jest/globals'
import { learnActions, learnInitialStateType, learnReducer, learnThunks } from 'features/learn/learn.slice'
import { CardType } from 'features/cards/cards.api'

describe('packs slice', () => {
    let initialState: learnInitialStateType

    beforeEach(() => {
        initialState = {
            cards: [] as CardType[],
            answersCount: 0,
            requestsCount: 2,
            selectedPackId: '',
            isLoading: false,
            error: null as null | string
        }
    })

    it('should set answers count', () => {

        const nextState = learnReducer(initialState, learnActions.setAnswersCount())

        expect(nextState.answersCount).toEqual(1)

    })

    it('should set request counter', () => {

        const nextState = learnReducer(initialState, learnActions.setRequestCounter())

        expect(nextState.requestsCount).toEqual(3)
    })

    it('should be reset counter', () => {

        const id = 'pack4'

        const nextState = learnReducer(initialState, learnActions.resetCounter(id))

        expect(nextState.answersCount).toEqual(0)
        expect(nextState.requestsCount).toEqual(0)
        expect(nextState.selectedPackId).toEqual(id)

    })

    it('should handle getSortCard fulfilled actions status', () => {

        const payload = {
            cards: {
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
            } as CardType
        }

        const action = { type: learnThunks.getSortCard.fulfilled.type, payload }
        const nextState = learnReducer(initialState, action)

        expect(nextState.cards).toEqual(payload.cards)
    })

    it('should handle pending actions status', () => {
        const action = { type: learnThunks.getSortCard.pending.type }
        const nextState = learnReducer(initialState, action)

        expect(nextState.isLoading).toEqual(true)
    })

    it('should handle fulfilled actions status', () => {

        const action = { type: learnThunks.updateCardGrade.fulfilled.type }
        const nextState = learnReducer(initialState, action)

        expect(nextState.isLoading).toEqual(false)
    })

    it('should handle rejected action status', () => {
        const action = { type: learnThunks.updateCardGrade.rejected.type }
        const nextState = learnReducer(initialState, action)

        expect(nextState.isLoading).toEqual(false)
    })
})