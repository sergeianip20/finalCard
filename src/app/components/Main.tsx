import { useAppDispatch, useAppState } from 'app/hooks'
import React, { useEffect } from 'react'
import { authThunks } from 'features/auth/auth.slice'
import LinearProgress from '@mui/material/LinearProgress'
import Container from '@mui/material/Container'
import { AppPreloader } from 'common'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'

export const Main = () => {
    const dispatch = useAppDispatch()
    const { isInitialize, isLoadingApp } = useAppState()

    useEffect(() => {
        dispatch(authThunks.authMe())
    }, [dispatch])

    return (
        <>
            <Box sx={{ height: '4px' }}>{isLoadingApp && <LinearProgress />}</Box>
            <Container fixed>{isInitialize ? <AppPreloader /> : <Outlet />}</Container>
        </>
    )
}
