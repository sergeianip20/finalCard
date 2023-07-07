import { createHashRouter } from 'react-router-dom'
import React from 'react'
import { App } from 'app/components/App'
import { PageNotFound } from 'common/components/page-not-found/PageNotFound'
import { paths } from 'common'
import { Cards } from 'features/cards/components/cards/Cards'
import { Packs } from 'features/packs/components/packs/Packs'
import { Profile } from 'features/auth/components/Profile'
import { CheckEmail } from 'features/auth/components/CheckEmail'
import { ForgotPassword } from 'features/auth/components/ForgotPassword'
import { Login } from 'features/auth/components/Login'
import { Registration } from 'features/auth/components/Registration'
import { NewPassword } from 'features/auth/components/NewPassword'
import { RequireAuth } from 'common/hoc/RequireAuth'
import { Auth } from 'common/hoc/Auth'
import { Learn } from 'features/learn/components/learn/Learn'

export const router = createHashRouter([
    {
        path: paths.MAIN,
        element: <App />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: paths.MAIN,
                element: <RequireAuth />,
                children: [
                    {
                        path: paths.CARDS,
                        element: <Cards />,
                    },
                    {
                        path: paths.PACKS,
                        element: <Packs />,
                    },
                    {
                        path: paths.PROFILE,
                        element: <Profile />,
                    },
                    {
                        path: paths.LEARN,
                        element: <Learn />,
                    },
                ],
            },
            {
                path: paths.AUTH,
                element: <Auth />,
                children: [
                    {
                        path: paths.CHECK_EMAIL,
                        element: <CheckEmail />,
                    },
                    {
                        path: paths.FORGOT_PASSWORD,
                        element: <ForgotPassword />,
                    },
                    {
                        path: paths.LOGIN,
                        element: <Login />,
                    },
                    {
                        path: paths.REGISTER,
                        element: <Registration />,
                    },
                    {
                        path: paths.SET_NEW_PASSWORD,
                        element: <NewPassword />,
                    },
                ],
            },
        ],
    },
])
