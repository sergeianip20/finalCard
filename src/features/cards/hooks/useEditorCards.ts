import { useAppDispatch, useAppSelector } from 'app'
import { cardsThunks } from 'features/cards/cards.slice'
import {
    CardRequestType,
    CreateCardRequestType,
    UpdateCardRequestType,
} from 'features/cards/cards.api'
import { FormInputValues, convertFileToBase64 } from 'common'
import { selectedCardsPackIdSelector } from 'features/cards/cards.selectors'
import { cardIdsSelector } from 'features/modals/modals.selector'
import { modalsAction } from 'features/modals/modals.slice'
import { useCallback } from 'react'

export const useEditorCards = () => {
    const dispatch = useAppDispatch()
    const selectedPackId = useAppSelector(selectedCardsPackIdSelector)
    const cardId = useAppSelector(cardIdsSelector)

    const uploadImages = useCallback(
        <T extends CardRequestType>(
            data: FormInputValues,
            requestData: T,
            thunk: (data: T) => any
        ) => {
            const isTwoImageUpload =
                data.answerImg && data.questionImg && data.answerImg[0] && data.questionImg[0]
            const isOnlyAnswerImageUpload =
                data.answerImg && data.answerImg[0] && data.questionImg && !data.questionImg[0]
            const isOnlyQuestionImageUpload =
                data.questionImg && data.questionImg[0] && data.answerImg && !data.answerImg[0]
            const dispatchAndUpdateModal = () => {
                requestData.question = ' '
                requestData.answer = ' '
                dispatch(thunk(requestData))
                dispatch(modalsAction.closeModal())
            }
            if (isTwoImageUpload) {
                const questionImg: File = data.questionImg[0]
                const answerImg: File = data.answerImg[0]
                convertFileToBase64(questionImg, (img: string) => {
                    requestData.questionImg = img
                    convertFileToBase64(answerImg, (img: string) => {
                        requestData.answerImg = img
                        dispatchAndUpdateModal()
                    })
                })
            } else if (isOnlyAnswerImageUpload) {
                const answerImg: File = data.answerImg[0]
                convertFileToBase64(answerImg, (img: string) => {
                    requestData.answerImg = img
                    dispatchAndUpdateModal()
                })
            } else if (isOnlyQuestionImageUpload) {
                const questionImg: File = data.questionImg[0]
                convertFileToBase64(questionImg, (img: string) => {
                    requestData.questionImg = img
                    dispatchAndUpdateModal()
                })
            } else {
                requestData.questionImg = ' '
                requestData.answerImg = ' '
                dispatch(thunk(requestData))
                dispatch(modalsAction.closeModal())
            }
        },
        []
    )

    const createCard = useCallback(
        (data: FormInputValues) => {
            const requestData: CreateCardRequestType = {
                cardsPack_id: selectedPackId,
                question: data.question,
                answer: data.answer,
            }
            uploadImages<CreateCardRequestType>(data, requestData, cardsThunks.createCard)
        },
        [selectedPackId, uploadImages]
    )

    const updateCard = useCallback(
        (data: FormInputValues) => {
            const requestData: UpdateCardRequestType = {
                _id: cardId,
                question: data.question,
                answer: data.answer,
                questionImg: '',
                answerImg: '',
            }
            uploadImages<UpdateCardRequestType>(data, requestData, cardsThunks.updateCard)
        },
        [cardId, uploadImages]
    )

    const removeCard = useCallback(() => {
        dispatch(cardsThunks.removeCard(cardId))
        dispatch(modalsAction.closeModal())
    }, [cardId])

    return { createCard, updateCard, removeCard }
}
