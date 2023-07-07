import { CreatePackModelType, UpdatePackModelType } from 'features/packs/packs.api'
import { packsThunks } from 'features/packs/packs.slice'
import { modalsAction } from 'features/modals/modals.slice'
import { packIdSelector } from 'features/modals/modals.selector'
import { FormInputValues } from 'common'
import { useAppDispatch, useAppSelector } from 'app'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useEditorPack = (defaultImg: string = '', withRedirect: boolean = false) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const packId = useAppSelector(packIdSelector)
    const [img, setImg] = useState(defaultImg)

    const createPack = useCallback(
        (data: FormInputValues) => {
            const payload: CreatePackModelType = {
                name: data.textInput,
                deckCover: img,
                private: data.private,
            }
            dispatch(packsThunks.createPack(payload))
            dispatch(modalsAction.closeModal())
            setImg('')
        },
        [dispatch, img]
    )
    const updatePack = useCallback(
        (data: FormInputValues) => {
            const updatedDeckCover = img === '' ? defaultImg : img
            const payload: UpdatePackModelType = {
                _id: packId || '',
                name: data.textInput,
                private: data.private,
                deckCover: updatedDeckCover,
            }
            dispatch(packsThunks.updatePack(payload))
            dispatch(modalsAction.closeModal())
            setImg('')
        },
        [dispatch, img, packId, defaultImg]
    )


    const removePack = useCallback(() => {
            if (packId)
                dispatch(packsThunks.removePack({ packId, withRedirect }))
                    .then(() => withRedirect ? navigate('/packs') : '')
            dispatch(modalsAction.closeModal())
        },
        [dispatch, navigate, packId, withRedirect]
    )

    return { createPack, removePack, updatePack, setImg, img }
}
