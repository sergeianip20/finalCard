import React, { memo } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useAppDispatch } from 'app'
import { modalsAction } from 'features/modals/modals.slice'

type RemoveCardPropsType = {
    cardId: string
    question: string
    questionImg?: string
}
export const RemoveCard: React.FC<RemoveCardPropsType> = memo(
    ({ cardId, question, questionImg }) => {
        const dispatch = useAppDispatch()
        const openRemoveModal = () => {
            dispatch(
                modalsAction.openModal({
                    modalAction: 'removeCard',
                    modalState: { cardId, question, questionImg },
                })
            )
        }

        return (
            <IconButton size={'small'} onClick={openRemoveModal}>
                <DeleteForeverIcon sx={{ fontSize: '20px' }} />
            </IconButton>
        )
    }
)
