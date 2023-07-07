import React, { memo } from 'react'
import IconButton from '@mui/material/IconButton'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useAppDispatch, useAppState } from 'app'
import { modalsAction } from 'features/modals/modals.slice'

type UpdateCardActionsPropsType = {
    question: string
    answer: string
    cardId: string
    answerImg?: string
    questionImg?: string
}
export const UpdateCard: React.FC<UpdateCardActionsPropsType> = memo(
    ({ question, answer, cardId, answerImg, questionImg }) => {
        const dispatch = useAppDispatch()
        const openUpdateModal = () => {
            dispatch(
                modalsAction.openModal({
                    modalAction: 'updateCard',
                    modalState: { question, answer, answerImg, cardId, questionImg },
                })
            )
        }
        const { isLoadingApp } = useAppState()

        return (
            <IconButton size={'small'} onClick={openUpdateModal} disabled={isLoadingApp}>
                <BorderColorIcon sx={{ fontSize: '18px' }} />
            </IconButton>
        )
    }
)
