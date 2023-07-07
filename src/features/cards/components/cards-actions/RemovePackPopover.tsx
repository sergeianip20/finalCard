import React, { FC, memo } from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ListItemText from '@mui/material/ListItemText'
import { RemovePackPropsType } from 'features/packs/components/pack-actions/RemovePack'
import { useAppDispatch } from 'app'
import { modalsAction } from 'features/modals/modals.slice'

export const RemovePackPopover: FC<RemovePackPropsType> = memo(({ packId, packName, packCover }) => {
    const dispatch = useAppDispatch()

    const openRemoveModal = () => {
        dispatch(
            modalsAction.openModal({
                modalAction: 'removePack',
                modalState: { packId, packName, packCover },
                withRedirect: true
            })
        )
    }

    return (
        <ListItemButton onClick={openRemoveModal}>
            <ListItemIcon>
                <DeleteForeverIcon />
            </ListItemIcon>
            <ListItemText primary='Delete' />
        </ListItemButton>
    )
})
