import React, { FC, memo } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { CustomPopover, PopoverProfileList, usePopover } from 'common'

type HeaderProfilePropsType = {
    userName: string
    avatar: string
}

export const HeaderProfile: FC<HeaderProfilePropsType> = memo(({ userName, avatar }) => {
    const { anchorEl, closePopover, handleClick } = usePopover()

    return (
        <Box
            component={'span'}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
            }}
        >
            <Typography component={'span'} sx={{ fontWeight: '500', fontSize: '16px' }}>
                {userName}
            </Typography>
            <IconButton onClick={handleClick}>
                <Avatar alt='user_avatar' src={avatar} />
            </IconButton>
            <CustomPopover anchorEl={anchorEl} closePopover={closePopover}>
                <PopoverProfileList closePopover={closePopover} />
            </CustomPopover>
        </Box>
    )
})
