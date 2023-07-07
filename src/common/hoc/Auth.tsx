import React from 'react'
import { useAuth } from 'features/auth/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'
import { paths } from 'common/constants'

export const Auth = () => {
    const { isUserAuth } = useAuth()
    return isUserAuth ? <Navigate to={paths.PACKS} /> : <Outlet />
}
