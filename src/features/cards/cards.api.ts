import { instance } from 'common/api'

export const cardsApi = {
    getCards: (params: GetCardsParamsType) => {
        return instance.get<GetCardsResponseType>('cards/card', { params: params })
    },
    createCard: (data: CreateCardRequestType) => {
        return instance.post<{ newCard: CommonCardResponseType }>('cards/card', {
            card: { ...data },
        })
    },
    removeCard: (id: string) => {
        return instance.delete<{ deletedCard: CommonCardResponseType }>(`cards/card?id=${id}`)
    },
    updateCard: (data: UpdateCardRequestType) => {
        return instance.put<{ updatedCard: CommonCardResponseType }>('cards/card', {
            card: { ...data },
        })
    },
    updateCardGrade: (data: UpdateCardGradeRequestType) => {
        return instance.put<UpdatedGradeType>('cards/grade', data)
    },
}

//TYPES
export type GetCardsParamsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: string
    max?: string
    sortCards?: '0grade' | '1grade'
    page?: string
    pageCount?: string
}
export type GetCardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    packUpdated: string
    packCreated: string
    packDeckCover: string | null
    packPrivate: boolean
    pageCount: number
    packUserId: string
}
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
    answerImg?: string
    questionImg?: string
    type: string
    rating: number
    comments: string
}
export type CreateCardRequestType = CardRequestType & {
    cardsPack_id: string
}
export type UpdateCardRequestType = CardRequestType & {
    _id: string
}
export type UpdateCardGradeRequestType = {
    grade: '0' | '1' | '2' | '3' | '4' | '5'
    card_id: string
}
export type UpdatedGradeType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}
export type CardRequestType = {
    question?: string
    answer?: string
    grade?: '0' | '1' | '2' | '3' | '4' | '5'
    shots?: number
    answerImg?: string
    questionImg?: string
}
export type CommonCardResponseType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
    answerImg: string
    questionImg: string
}
