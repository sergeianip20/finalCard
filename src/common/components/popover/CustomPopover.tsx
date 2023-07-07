import React, { FC, memo, ReactNode } from 'react'
import Popover from '@mui/material/Popover'

type CustomPopoverPropsType = {
    anchorEl: HTMLButtonElement | null
    closePopover: () => void
    children?: ReactNode
}

export const CustomPopover: FC<CustomPopoverPropsType> = memo(
    ({ closePopover, anchorEl, children }) => {
        return (
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={closePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {children}
            </Popover>
        )
    }
)
