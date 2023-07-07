import React, { memo } from 'react'
import { UpdateCard } from 'features/cards/components/cards-actions/UpdateCard'
import { RemoveCard } from 'features/cards/components/cards-actions/RemoveCard'

type CardsTableActionsPropsType = {
    cardId: string
    question: string
    answer: string
    questionImg?: string
    answerImg?: string
}
export const CardsTableActions: React.FC<CardsTableActionsPropsType> = memo(
    ({ question, answer, cardId, questionImg, answerImg }) => {
        return (
            <>
                <UpdateCard
                    question={question}
                    answer={answer}
                    cardId={cardId}
                    questionImg={questionImg}
                    answerImg={answerImg}
                />
                <RemoveCard cardId={cardId} question={question} questionImg={questionImg} />
            </>
        )
    }
)
