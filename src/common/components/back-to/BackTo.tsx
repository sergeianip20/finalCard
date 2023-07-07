import React, { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import { AppLink } from 'common/components/link/AppLink'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import Box from '@mui/material/Box'
import { useAppDispatch } from 'app'
import { packsAction } from 'features/packs/packs.slice'

type BackToPropsType = {
    text: string
    link: string
}

export const BackTo: FC<BackToPropsType> = memo(({ text, link }) => {
    const dispatch = useAppDispatch()
    const clearPacksFilters = () => {
        const defaultGetPacksParams = {
            page: '1',
            pageCount: '4',
            min: '0',
            max: '100',
            user_id: '',
            packName: '',
        }
        dispatch(packsAction.setQueryParams({ params: { ...defaultGetPacksParams } }))
    }
    return (
        <AppLink justifyContent={'flex-start'} colorText={'#000'}>
            <Link to={link}>
                <Box
                    component={'span'}
                    onClick={clearPacksFilters}
                    sx={{
                        display: 'flex',
                        gap: '10px',
                        minWidth: '200px',
                        mt: '25px',
                    }}
                >
                    <KeyboardBackspaceIcon />
                    {text}
                </Box>
            </Link>
        </AppLink>
    )
})
