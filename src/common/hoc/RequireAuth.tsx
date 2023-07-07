import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from 'features/auth/hooks/useAuth'
import { paths } from 'common/constants'

export const RequireAuth = () => {
    const { isUserAuth } = useAuth()
    return isUserAuth ? <Outlet /> : <Navigate to={paths.LOGIN} />
}
