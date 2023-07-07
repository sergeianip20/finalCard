import { ChangeEvent, useCallback } from 'react'
import { authThunks } from 'features/auth/auth.slice'
import { useAppDispatch } from 'app'
import { convertFileToBase64 } from 'common'

export const useUploadImage = () => {
    const dispatch = useAppDispatch()

    const uploadUserAvatar = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (avatar: string) => {
                    dispatch(authThunks.updateProfile({ avatar }))
                })
            } else {
                console.error('Error: ', 'the file is too large!')
            }
        }
    }, [])

    return {
        uploadUserAvatar,
    }
}
