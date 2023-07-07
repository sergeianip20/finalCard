import React, { FC, useCallback } from 'react'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import { paths } from 'common/constants'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'features/auth/hooks/useAuth'

type PopoverProfileListPropsType = {
    closePopover: () => void
}
export const PopoverProfileList: FC<PopoverProfileListPropsType> = ({ closePopover }) => {
    const navigate = useNavigate()
    const { logout } = useAuth()

    const toProfile = useCallback(() => navigate(paths.PROFILE), [])

    return (
        <List>
            <ListItem disablePadding onClick={closePopover}>
                <ListItemButton onClick={toProfile}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary='Profile' />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding onClick={closePopover}>
                <ListItemButton onClick={logout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary='Logout' />
                </ListItemButton>
            </ListItem>
        </List>
    )
}
