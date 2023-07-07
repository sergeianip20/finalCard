import React, { memo, ReactNode } from 'react'
import Button from '@mui/material/Button'

type SuperButtonType = {
    name: string
    disable?: boolean
    textColor?: 'white' | 'black'
    color?: 'primary' | 'secondary' | 'error'
    width?: string
    callback?: () => void
    onMouseDown?: () => void
    rounded?: boolean
    margin?: string
    icon?: ReactNode
    type?: 'button'
}

export const SuperButton: React.FC<SuperButtonType> = memo(
    ({ name, margin, onMouseDown, rounded, textColor, color, callback, width, icon, type, disable }) => {
        const btnStyle = {
            width: `${width}px`,
            color: textColor === 'white' ? '#FFFFFF' : '#000000',
            borderRadius: rounded ? '30px' : '2px',
            textTransform: 'none',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '20px',
            letterSpacing: '0.01em',
            margin: margin ? margin : '0',
            boxShadow:
                '0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.5)'
        }

        return (
            <Button disabled={disable}
                    variant='contained'
                    onClick={callback}
                    onMouseDown={onMouseDown}
                    sx={btnStyle}
                    type={type ? 'button' : 'submit'}
                    color={color}
                    startIcon={icon}>
                {name}
            </Button>
        )
    }
)
