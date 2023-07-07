import { instance } from 'common/api'

export const packsApi = {
    getPacks: (params: GetPacksParamsType = {}) => {
        return instance.get<PacksResponseType>('cards/pack', { params: params })
    },
    createPack: (packModel: CreatePackModelType) => {
        const data: PackModelType<CreatePackModelType> = {
            cardsPack: packModel
        }
        return instance.post<CommonResponseType & { newCardsPack: PackType }>('cards/pack', data)
    },
    removePack: (id: string) => {
        return instance.delete<CommonResponseType & { deletedCardsPack: PackType }>(`cards/pack?id=${id}`)
    },
    updatePack: (packModel: UpdatePackModelType) => {
        const data: PackModelType<UpdatePackModelType> = {
            cardsPack: packModel
        }
        return instance.put<CommonResponseType & { updatedCardsPack: PackType }>('cards/pack', data)
    }
}

//types
export type GetPacksParamsType = {
    packName?: string
    min?: string
    max?: string
    sortPacks?: '0updated' | '1updated'
    page?: string
    pageCount?: string
    user_id?: string
    block?: string
}
export type PackType = {
    _id: string
    user_id: string
    user_name: string
    name: string
    private: boolean
    path: string
    grade: number
    shots: number
    cardsCount: number
    deckCover: string
    type: 'pack'
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
}
type CommonResponseType = {
    token: string
    tokenDeathTime: number
    error?: string
    in?: string
    info?: string
}
export type PacksResponseType = CommonResponseType & {
    cardPacks: PackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
}
export type UpdatePackModelType = {
    _id: string
    name?: string
    deckCover?: string
    private?: boolean
}
export type CreatePackModelType = Omit<UpdatePackModelType, '_id'>
type PackModelType<T> = {
    cardsPack: T
}
