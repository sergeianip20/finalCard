import React, { memo } from 'react'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SchoolIcon from '@mui/icons-material/School'
import { UpdatePackPopover } from 'features/cards/components/cards-actions/UpdatePackPopover'
import { useLearn } from 'features/learn/hooks/useLearn'
import { RemovePackPopover } from 'features/cards/components/cards-actions/RemovePackPopover'

type PopoverCardsPackPropsType = {
    packId: string
    cards: number
    packName: string
    handleClose: () => void
    packCover?: string
}

export const PopoverCards: React.FC<PopoverCardsPackPropsType> = memo(
    ({ packId, packName, cards, packCover, handleClose }) => {
        const { learnHandler } = useLearn(packId)
        return (
            <List>
                <ListItem disablePadding onClick={handleClose}>
                    <UpdatePackPopover packName={packName} packId={packId} packCover={packCover} />
                </ListItem>
                <Divider />
                <ListItem disablePadding onClick={handleClose}>
                    <RemovePackPopover packName={packName} packId={packId} packCover={packCover} />
                </ListItem>
                <Divider />
                <ListItem disablePadding onClick={handleClose}>
                    <ListItemButton onClick={learnHandler} disabled={cards === 0}>
                        <ListItemIcon>
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary='Learn' />
                    </ListItemButton>
                </ListItem>
            </List>
        )
    }
)
