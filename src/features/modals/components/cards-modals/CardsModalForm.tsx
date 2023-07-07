import React, { memo } from 'react'
import { FormInputValues } from 'common'
import { EditorCardsModal } from 'features/modals/components/cards-modals/EditorCardsModal'
import { useModalsForm } from 'features/modals/hooks/useModalsForm'
import { ModalForm } from 'features/modals/components/common/ModalForm'

type CardsModalFormPropsType = {
    onSubmit: (data: FormInputValues) => void
    handleClose: () => void
}
export const CardsModalForm: React.FC<CardsModalFormPropsType> = memo(
    ({ onSubmit, handleClose }) => {
        const { modalState, register, handleSubmit, onSubmitHandler, control } =
            useModalsForm(onSubmit)

        return (
            <>
                <ModalForm
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmitHandler}
                    handleClose={handleClose}
                >
                    <EditorCardsModal
                        register={register}
                        answer={modalState.answer}
                        question={modalState.question}
                        answerImg={modalState.answerImg}
                        questionImg={modalState.questionImg}
                        control={control}
                    />
                </ModalForm>
            </>
        )
    }
)
