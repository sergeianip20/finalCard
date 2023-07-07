import React from 'react'
import { ToastContainer } from 'react-toastify'
import { useAppNotify } from 'app'

export const AppNotify = () => {
    useAppNotify()
    return (
        <ToastContainer
            position='bottom-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
        />
    )
}
