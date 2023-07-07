import { toast } from 'react-toastify'
import { packsErrorSelector, packsInfoMessageSelector } from 'features/packs/packs.selectors'
import { cardQuestionsSelector, cardsInfoMessageSelector } from 'features/cards/cards.selectors'
import { errorLearnSelector } from 'features/learn/learn.selector'
import { errorSelector, infoMessageSelector, useAppDispatch, useAppSelector } from 'app'
import { clearNotifyStateAction, CustomToast } from 'common'

export const useAppNotify = () => {
    const appError = useAppSelector(errorSelector)
    const appInfoMessage = useAppSelector(infoMessageSelector)
    const packsError = useAppSelector(packsErrorSelector)
    const packsInfoMessage = useAppSelector(packsInfoMessageSelector)
    const learnError = useAppSelector(errorLearnSelector)
    const cardsQuestions = useAppSelector(cardQuestionsSelector)
    const cardsInfoMessage = useAppSelector(cardsInfoMessageSelector)
    const dispatch = useAppDispatch()

    const error = appError || packsError || learnError
    const infoMessage = appInfoMessage || packsInfoMessage

    if (infoMessage) {
        toast.success(infoMessage, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            style: {
                backgroundColor: '#366EFF',
            },
        })
        dispatch(clearNotifyStateAction())
    }

    if (error) {
        toast.error(error, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        })
        dispatch(clearNotifyStateAction())
    }

    if (cardsQuestions.question !== '' || cardsQuestions.questionImg !== '') {
        toast.success(
            <CustomToast
                question={cardsQuestions.question}
                questionImg={cardsQuestions.questionImg}
                infoMessage={cardsInfoMessage}
            />,
            {
                style: {
                    backgroundColor: '#366EFF',
                },
            }
        )
        dispatch(clearNotifyStateAction())
    }
}
