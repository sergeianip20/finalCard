import { GetPacksParamsType, PacksResponseType, PackType } from 'features/packs/packs.api'
import { packsAction, PacksInitialStateType, packsReducer, packsThunks } from 'features/packs/packs.slice'
import { expect } from '@jest/globals'

describe('packs slice', () => {
    let initialState: PacksInitialStateType

    beforeEach(() => {
        initialState = {
            packs: {
                cardPacks: [
                    {
                        _id: 'pack1',
                        user_id: 'string',
                        user_name: 'string',
                        name: 'pack1',
                        private: false,
                        path: 'string',
                        grade: 0,
                        shots: 0,
                        cardsCount: 0,
                        deckCover: 'string',
                        type: 'pack',
                        rating: 0,
                        more_id: 'string',
                        created: 'string',
                        updated: 'string',
                        __v: 0
                    },
                    {
                        _id: 'pack2',
                        user_id: 'string',
                        user_name: 'string',
                        name: 'pack2',
                        private: false,
                        path: 'string',
                        grade: 0,
                        shots: 0,
                        cardsCount: 0,
                        deckCover: 'string',
                        type: 'pack',
                        rating: 0,
                        more_id: 'string',
                        created: 'string',
                        updated: 'string',
                        __v: 0
                    }
                ]
            } as PacksResponseType,
            params: {
                page: '1',
                pageCount: '4',
                min: '0',
                max: '100',
                user_id: '',
                packName: ''
            } as GetPacksParamsType,
            isLoading: false,
            error: null as string | null,
            infoMessage: null as string | null,
            selectedPack: {} as PackType
        }
    })

    it('should set query params', () => {
        const params = {
            page: '2',
            pageCount: '10',
            min: '0',
            max: '100',
            user_id: '123',
            packName: 'Test Pack'
        }

        const nextState = packsReducer(initialState, packsAction.setQueryParams({ params }))

        expect(nextState.params).toEqual(params)

    })

    it('should set selected pack', () => {
        const id = 'pack1'

        const nextState = packsReducer(initialState, packsAction.setSelectedPack({ id }))

        expect(nextState.selectedPack).toEqual(initialState.packs.cardPacks[0])
    })

    it('should handle get packs fulfilled actions status', () => {

        const payload = {
            packs: {
                cardPacks: [
                    {
                        _id: 'pack3',
                        user_id: 'string',
                        user_name: 'string',
                        name: 'pack3',
                        private: false,
                        path: 'string',
                        grade: 0,
                        shots: 0,
                        cardsCount: 0,
                        deckCover: 'string',
                        type: 'pack',
                        rating: 0,
                        more_id: 'string',
                        created: 'string',
                        updated: 'string',
                        __v: 0
                    },
                    {
                        _id: 'pack4',
                        user_id: 'string',
                        user_name: 'string',
                        name: 'pack4',
                        private: false,
                        path: 'string',
                        grade: 0,
                        shots: 0,
                        cardsCount: 0,
                        deckCover: 'string',
                        type: 'pack',
                        rating: 0,
                        more_id: 'string',
                        created: 'string',
                        updated: 'string',
                        __v: 0
                    }
                ],
                page: 1,
                pageCount: 4,
                cardPacksTotalCount: 100,
                minCardsCount: 0,
                maxCardsCount: 100
            }
        }

        const action = { type: packsThunks.getPacks.fulfilled.type, payload }
        const nextState = packsReducer(initialState, action)

        expect(nextState.packs).toEqual(payload.packs)
        expect(nextState.isLoading).toEqual(false)
    })

    it('should handle update pack fulfilled actions status', () => {
        const payload = {
            updatedCardsPack: {
                _id: 'pack4',
                user_id: 'string',
                user_name: 'string',
                name: 'pack4',
                private: false,
                path: 'string',
                grade: 0,
                shots: 0,
                cardsCount: 0,
                deckCover: 'string',
                type: 'pack',
                rating: 0,
                more_id: 'string',
                created: 'string',
                updated: 'string',
                __v: 0
            }
        }

        const action = { type: packsThunks.updatePack.fulfilled.type, payload }
        const nextState = packsReducer(initialState, action)

        expect(nextState.selectedPack).toEqual(payload.updatedCardsPack)
    })

    it('should handle pending actions status', () => {
        const action = { type: packsThunks.getPacks.pending.type }
        const nextState = packsReducer(initialState, action)

        expect(nextState.isLoading).toEqual(true)
    })

    it('should handle fulfilled actions status', () => {
        const payload = { infoMessage: 'pack4 pack removed' }

        const action = { type: packsThunks.removePack.fulfilled.type, payload }
        const nextState = packsReducer(initialState, action)

        expect(nextState.infoMessage).toEqual('pack4 pack removed')
    })

    it('should handle rejected action status', () => {
        const action = { type: packsThunks.createPack.rejected.type }
        const nextState = packsReducer(initialState, action)

        expect(nextState.isLoading).toEqual(false)
    })
})