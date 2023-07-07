import React, { useCallback } from 'react'
import logo from 'assets/img/icons.jpg'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { paths, SuperButton, HeaderProfile } from 'common'
import { useAuth } from 'features/auth/hooks/useAuth'

export const AppHeader = React.memo(() => {
    const navigate = useNavigate()
    const { profile } = useAuth()

    const toLogin = useCallback(() => navigate(paths.LOGIN), [])

    return (
        <AppBar color={'inherit'} position={'static'}>
            <Container fixed>
                <Toolbar
                    disableGutters
                    sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                >
                    <Link to={paths.PACKS}>
                        <img style={{ height: '60px' }} src={logo} alt='app-logo' />
                    </Link>
                    {profile ? (
                        <HeaderProfile userName={profile.name} avatar={profile.avatar} />
                    ) : (
                        <SuperButton
                            callback={toLogin}
                            width={'113'}
                            rounded={true}
                            color={'primary'}
                            textColor={'white'}
                            name={'Sign In'}
                        />
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
})
