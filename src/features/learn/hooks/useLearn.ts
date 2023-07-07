import { useState } from 'react'
import { useAppSelector, useAppDispatch } from 'app'
import { counterLearnSelector, learnSelector } from 'features/learn/learn.selector'
import { selectedPackSelector } from 'features/packs/packs.selectors'
import { learnThunks } from 'features/learn/learn.slice'
import { useNavigate } from 'react-router-dom'
import { paths } from 'common'


export const useLearn = (packId: string = '') => {
    const dispatch = useAppDispatch()
    const [showAnswer, setShowAnswer] = useState(false)
    const cards = useAppSelector(learnSelector)
    const counter = useAppSelector(counterLearnSelector)
    const selectedPack = useAppSelector(selectedPackSelector)
    const navigate = useNavigate()

    const learnHandler = () => {
        navigate(paths.LEARN)
        dispatch(learnThunks.getSortCard(packId))
    }

    const card = cards[counter] || []

    const onShowAnswer = () => setShowAnswer(true)
    const closeAnswer = () => setShowAnswer(false)

    const updateCardGrade = (grade: GradeType ) => {
        dispatch(learnThunks.updateCardGrade({ card_id: card._id, grade }))
        closeAnswer()
    }

    return {
        updateCardGrade,
        onShowAnswer,
        closeAnswer,
        learnHandler,
        showAnswer,
        selectedPack,
        card,
    }
}

//types
export type GradeType =  "1" | "4" | "0" | "2" | "3" | "5"