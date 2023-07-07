import React, { memo } from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { useAppDispatch } from 'app'
import { modalsAction } from 'features/modals/modals.slice'

type UpdatePackTitlePropsType = {
    packId: string
    packName: string
    packCover?: string
}
export const UpdatePackPopover: React.FC<UpdatePackTitlePropsType> = memo(
    ({ packId, packName, packCover }) => {
        const dispatch = useAppDispatch()
        const openUpdateModal = () => {
            dispatch(
                modalsAction.openModal({
                    modalAction: 'updatePack',
                    modalState: { packId, packName, packCover }
                })
            )
        }
        return (
            <ListItemButton onClick={openUpdateModal}>
                <ListItemIcon>
                    <BorderColorIcon />
                </ListItemIcon>
                <ListItemText primary='Edit' />
            </ListItemButton>
        )
    }
)
