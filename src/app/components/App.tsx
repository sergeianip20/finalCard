import React from 'react'
import { AppHeader, AppNotify } from 'common'
import { Main } from 'app/components/Main'
import { AppModals } from 'features/modals/components/AppModals'

export const App = () => {
    return (
        <>
            <AppHeader />
            <Main />
            <AppNotify />
            <AppModals />
        </>
    )
}

