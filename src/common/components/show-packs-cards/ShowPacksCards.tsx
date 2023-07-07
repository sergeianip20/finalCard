import React, { memo } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

type ShowPacksCardsPropsType = {
    disabled?: boolean
    onClick: () => void
    onMy: boolean
    setOnMy: (value: boolean) => void
}

export const ShowPacksCards: React.FC<ShowPacksCardsPropsType> = memo(
    ({ onClick, onMy, setOnMy, disabled }) => {
        const onClickMy = () => {
            setOnMy(!onMy)
            onClick()
        }
        const onClickAll = () => {
            setOnMy(!onMy)
            onClick()
        }

        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography sx={{ fontWeight: '500', fontSize: '16px', mb: '8px' }}>
                    Show packs cards
                </Typography>
                <ButtonGroup variant='outlined'>
                    <Button onClick={onClickMy} disabled={disabled || !onMy}>
                        My
                    </Button>
                    <Button onClick={onClickAll} disabled={disabled || onMy}>
                        All
                    </Button>
                </ButtonGroup>
            </Box>
        )
    }
)
