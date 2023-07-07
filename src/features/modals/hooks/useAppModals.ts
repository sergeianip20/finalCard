import { modalsAction } from 'features/modals/modals.slice'
import {
    isModalOpenSelector,
    modalActionSelector,
    modalStateSelector,
    withRedirectModalSelector,
} from 'features/modals/modals.selector'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'app'
import { useEditorPack } from 'features/packs/hooks/useEditorPack'
import { useEditorCards } from 'features/cards/hooks/useEditorCards'
import { FormInputValues } from 'common'

export const useAppModals = () => {
    const dispatch = useAppDispatch()
    const modalsState = useAppSelector(modalStateSelector)
    const modalAction = useAppSelector(modalActionSelector)
    const isModalOpen = useAppSelector(isModalOpenSelector)
    const withRedirect = useAppSelector(withRedirectModalSelector)

    const packCover = modalsState.packCover
    const packName = modalsState.packName
    const cardQuestionImg = modalsState.questionImg
    const cardQuestion = modalsState.question

    const { createPack, updatePack, removePack, img, setImg } = useEditorPack(
        packCover,
        withRedirect
    )
    const { createCard, updateCard, removeCard } = useEditorCards()

    const handleClose = useCallback(() => {
        dispatch(modalsAction.closeModal())
    }, [dispatch])

    const getModalConfig = (): ModalConfigType => {
        switch (modalAction) {
            case 'createPack':
                return { title: 'Create pack', action: createPack, variant: 'packModal' }
            case 'updatePack':
                return { title: 'Update pack', action: updatePack, variant: 'packModal' }
            case 'createCard':
                return { title: 'Create card', action: createCard, variant: 'cardModal' }
            case 'updateCard':
                return { title: 'Update card', action: updateCard, variant: 'cardModal' }
            case 'removePack':
                return {
                    title: 'Remove pack',
                    action: removePack,
                    variant: 'removeModal',
                    entityName: packName,
                    entityImage: packCover,
                    whatToDelete: 'This pack',
                }
            case 'removeCard':
                return {
                    title: 'Remove card',
                    action: removeCard,
                    variant: 'removeModal',
                    entityName: cardQuestion,
                    entityImage: cardQuestionImg,
                    whatToDelete: 'This card',
                }
            default:
                return {} as ModalConfigType
        }
    }

    const modalConfig = getModalConfig()
    const defaultPackCover = img || packCover

    return {
        handleClose,
        isModalOpen,
        modalConfig,
        defaultPackCover,
        setImg
    }
}

//Types
type ModalConfigType = {
    title: string
    action: (data: FormInputValues) => void
    variant: 'packModal' | 'cardModal' | 'removeModal'
    entityName?: string
    entityImage?: string
    whatToDelete?: 'This pack' | 'This card'
}
