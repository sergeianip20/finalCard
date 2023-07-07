import React from 'react'
import { CardsModalForm } from 'features/modals/components/cards-modals/CardsModalForm'
import { PacksModalForm } from 'features/modals/components/packs-modals/PacksModalForm'
import { RemoveModal } from 'features/modals/components/common/RemoveModal'
import { RemoveModalMessage } from 'features/modals/components/common/RemoveModalMessage'
import { AppModal } from 'features/modals/components/common/AppModal'
import { useAppModals } from 'features/modals/hooks/useAppModals'

export const AppModals = () => {
    const {
        isModalOpen,
        modalConfig,
        handleClose,
        defaultPackCover,
        setImg
    } = useAppModals()
    return (
        <AppModal title={modalConfig.title} open={isModalOpen} handleClose={handleClose}>
            {modalConfig.variant === 'packModal'
            && <PacksModalForm
                onSubmit={modalConfig.action}
                handleClose={handleClose}
                img={defaultPackCover}
                setImg={setImg}
            />
            }
            {modalConfig.variant === 'cardModal'
            && <CardsModalForm onSubmit={modalConfig.action} handleClose={handleClose} />}
            {modalConfig.variant === 'removeModal'
            && <RemoveModal
                modalTitle={modalConfig.title}
                handleClose={handleClose}
                onRemove={modalConfig.action as () => void}
            >
                <RemoveModalMessage
                    whatToDelete={modalConfig.whatToDelete || ''}
                    entityName={modalConfig.entityName || ''}
                    entityImage={modalConfig.entityImage}
                />
            </RemoveModal>
            }
        </AppModal>
    )
}
