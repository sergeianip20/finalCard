import React, { memo } from 'react'
import { FormInputValues } from 'common'
import { EditorPacksModal } from 'features/modals/components/packs-modals/EditorPacksModal'
import { useModalsForm } from 'features/modals/hooks/useModalsForm'
import { ModalForm } from 'features/modals/components/common/ModalForm'

type PacksModalFormPropsType = {
    onSubmit: (data: FormInputValues) => void
    handleClose: () => void
    img: string
    setImg: (img: string) => void
    defaultImg?: string
}

export const PacksModalForm: React.FC<PacksModalFormPropsType> = memo(
    ({ onSubmit, handleClose, img, setImg, defaultImg }) => {
        const { modalState, errors, register, handleSubmit, onSubmitHandler } = useModalsForm(
            onSubmit,
            ['textInput']
        )

        return (
            <>
                <ModalForm
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmitHandler}
                    handleClose={handleClose}
                >
                    <EditorPacksModal
                        img={img}
                        setImg={setImg}
                        defaultImg={defaultImg}
                        errors={errors}
                        register={register}
                        packName={modalState.packName}
                    />
                </ModalForm>
            </>
        )
    }
)
