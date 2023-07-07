import { redirectPathSelector } from 'features/auth/auth.selectors'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from 'app'
import { clearRedirectPathAction } from 'common'

export const useRedirect = () => {
    const redirectPath = useAppSelector(redirectPathSelector)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    if (redirectPath !== '/') {
        navigate(redirectPath)
        dispatch(clearRedirectPathAction())
    }
}
