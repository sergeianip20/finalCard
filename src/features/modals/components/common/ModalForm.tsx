import React, { memo } from 'react'
import FormGroup from '@mui/material/FormGroup'
import Box from '@mui/material/Box'
import { SuperButton } from 'common'
import { UseFormHandleSubmit } from 'react-hook-form'
import { FormInputValues } from 'common/hooks/useAppForm'

type EditorModalFormPropsType = {
    children: React.ReactNode
    handleClose: () => void
    handleSubmit: UseFormHandleSubmit<FormInputValues>
    onSubmit: (data: FormInputValues) => void
}
export const ModalForm: React.FC<EditorModalFormPropsType> = memo(
    ({ children, handleSubmit, handleClose, onSubmit }) => {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup sx={{ p: '15px 40px' }}>
                    {children}
                    <Box display={'flex'} justifyContent='space-between'>
                        <SuperButton
                            name={'Cancel'}
                            color={'secondary'}
                            rounded={true}
                            width={'130'}
                            type={'button'}
                            callback={handleClose}
                        />
                        <SuperButton
                            name={'Save'}
                            rounded={true}
                            width={'130'}
                            textColor={'white'}
                        />
                    </Box>
                </FormGroup>
            </form>
        )
    }
)
