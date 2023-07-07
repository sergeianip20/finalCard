import React, { useCallback, useState } from 'react'

export const usePopover = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }, [])
    const closePopover = useCallback(() => {
        setAnchorEl(null)
    }, [])

    return {
        anchorEl,
        handleClick,
        closePopover,
    }
}
