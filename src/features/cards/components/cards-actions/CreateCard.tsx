import React, { memo } from 'react'
import { SuperButton } from 'common'
import { useAppDispatch, useAppState } from 'app'
import { modalsAction } from 'features/modals/modals.slice'

export const CreateCard = memo(() => {
    const { isLoadingApp } = useAppState()
    const dispatch = useAppDispatch()
    const openCreateModal = () => {
        dispatch(modalsAction.openModal({ modalAction: 'createCard' }))
    }

    return (
        <SuperButton
            name={'Add new card'}
            callback={openCreateModal}
            rounded={true}
            textColor={'white'}
            disable={isLoadingApp}
        />
    )
})
